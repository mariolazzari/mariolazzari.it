package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/cache"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/config"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
)

func main() {
	// read env variables
	cfg := config.Load()

	// connect postgres
	postgres := db.Connect(cfg.PosgresURL)
	defer postgres.Close()

	// redis connection
	redis := cache.Connect(cfg.RedisURL)
	defer cache.Close(redis)

	// setup gin router
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// create router
	router := gin.Default()
	router.SetTrustedProxies([]string{cfg.Host})

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "OK",
		})
	})

	// start server
	if err := router.Run(fmt.Sprintf("%s:%s", "127.0.0.1", cfg.Port)); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
