package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/config"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/routes"
)

// entry point of the application.
func main() {
	// load environment variables
	cfg := config.Load()

	// application context
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

	// create admin user
	db.EnsureAdminUser(ctx, pdb)

	// set gin mode
	if cfg.Env == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// setup router
	router := gin.Default()
	router.SetTrustedProxies([]string{"127.0.0.1"})
	router.Use(middleware.CORSMiddleware())

	// Health check endpoint
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// API routes
	apiGroup := router.Group("/api/v1")
	{
		routes.RegisterAuthRoutes(apiGroup, pdb, rdb)
		routes.RegisterCertificationRoutes(apiGroup, pdb, rdb)
		routes.RegisterUserRoutes(apiGroup, pdb, rdb)
	}

	// start server
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
