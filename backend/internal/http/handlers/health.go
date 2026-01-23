package handlers

import (
	"net/http"
	"runtime"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/http/middlewares"
)

// System health check handler
func HealthHandler(c *gin.Context) {
	ctx := c.Request.Context()
	health := make(map[string]any)

	// Current time
	health["time"] = time.Now().UTC()

	// Postgres
	db := middlewares.GetPostgres(c)
	pg := make(map[string]any)
	start := time.Now()
	err := db.Ping(ctx)
	pg["status"] = "up"
	if err != nil {
		pg["status"] = "down"
		pg["error"] = err.Error()
	}
	pg["ping_ms"] = time.Since(start).Milliseconds()
	stats := db.Stat()
	pg["max_conns"] = stats.MaxConns()
	pg["total_conns"] = stats.TotalConns()
	pg["idle_conns"] = stats.IdleConns()
	pg["acquired_conns"] = stats.AcquiredConns()
	health["postgres"] = pg

	// Redis
	rdb := middlewares.GetRedis(c)
	rd := make(map[string]any)
	start = time.Now()
	if err := rdb.Ping(ctx).Err(); err != nil {
		rd["status"] = "down"
		rd["error"] = err.Error()
	} else {
		rd["status"] = "up"
	}
	rd["ping_ms"] = time.Since(start).Milliseconds()
	poolStats := rdb.PoolStats()
	rd["total_conns"] = poolStats.TotalConns
	rd["idle_conns"] = poolStats.IdleConns
	rd["stale_conns"] = poolStats.StaleConns
	health["redis"] = rd

	// system info
	sys := make(map[string]any)
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	sys["goroutines"] = runtime.NumGoroutine()
	sys["memory_alloc_bytes"] = m.Alloc
	sys["memory_total_bytes"] = m.TotalAlloc
	sys["memory_sys_bytes"] = m.Sys
	sys["memory_heap_alloc"] = m.HeapAlloc
	sys["memory_heap_sys"] = m.HeapSys
	sys["num_cpu"] = runtime.NumCPU()
	health["system"] = sys

	c.JSON(http.StatusOK, gin.H{"status": "ok", "health": health})
}
