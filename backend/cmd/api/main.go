package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/cache"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/config"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/http/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/http/middlewares"
)

func main() {
	// read env variables
	cfg := config.Load()

	// connect postgres
	postgres, err := db.Connect(cfg.PosgresURL)
	if err != nil {
		log.Fatalf("Postgres connection failed: %v", err)
	}
	defer postgres.Close()

	// redis connection
	redis, err := cache.Connect(cfg.RedisURL)
	if err != nil {
		log.Fatalf("Redis connection failed: %v", err)
	}
	defer redis.Close()

	// setup gin router
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// create router
	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())
	router.SetTrustedProxies([]string{cfg.Host})

	// middlewares
	router.Use(
		middlewares.Postgres(postgres),
		middlewares.Redis(redis),
		middlewares.DB(postgres),
	)

	// routes

	// routes
	v1 := router.Group("/api/v1")
	{
		// certifications
		certifications := v1.Group("/certifications")
		{
			certifications.POST("", handlers.CreateCertification)
			certifications.GET("", handlers.ListCertifications)
			certifications.GET("/:id", handlers.GetCertification)
			certifications.PUT("/:id", handlers.UpdateCertification)
			certifications.DELETE("/:id", handlers.DeleteCertification)
		}

		// health
		v1.GET("/health", handlers.HealthHandler)
	}

	// start server
	if err := router.Run(fmt.Sprintf("%s:%s", "127.0.0.1", cfg.Port)); err != nil {
		log.Fatal("Failed to start server:", err)
	}

}
