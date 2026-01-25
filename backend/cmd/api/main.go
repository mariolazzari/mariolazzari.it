package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/config"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/routes"
)

func main() {
	// load environment variables
	cfg := config.Load()

	ctx := context.Background()

	// connect database
	pdb, err := db.ConnectPostgres(ctx)
	if err != nil {
		log.Fatalf("Postgres connection error: %s", err.Error())
	}
	defer pdb.Close()

	// enable caching
	rdb, err := db.ConnectRedis(ctx)
	if err != nil {
		log.Fatalf("Redis connection error: %s", err.Error())
	}
	defer rdb.Close()

	// set gin mode
	if cfg.Env == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// setup router
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())

	// Health check endpoint
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// API routes
	apiGroup := router.Group("/api/v1")
	{
		// routes.RegisterUserRoutes(apiGroup, pdb, rdb)
		routes.RegisterCertificationRoutes(apiGroup, pdb, rdb)
	}

	fmt.Printf("Server running on %s:%s in %s mode\n", cfg.Host, cfg.Port, cfg.Env)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

}
