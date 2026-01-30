package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/cache"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/config"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/routes"
)

// entry point of the application.
func main() {
	// load environment variables
	cfg, err := config.New()
	if err != nil {
		log.Fatalf("Error reading enviroment variables: %s", err)
	}

	// application context
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// connect database
	pdb, err := db.New(ctx, cfg.DBURL)
	if err != nil {
		log.Fatalf("Postgres connection error: %s", err.Error())
	}
	defer pdb.Close()

	// create admin user
	pdb.EnsureAdminUser(ctx)

	// enable caching
	rdb, err := cache.New(ctx, cfg.CacheURL)
	if err != nil {
		log.Fatalf("Redis connection error: %s", err.Error())
	}
	defer rdb.Close()

	// set gin mode
	if cfg.Env == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// setup router
	router := routes.New(pdb, rdb, cfg.Env)
	router.RegisterRoutes()

	// start server
	if err := router.Run(fmt.Sprintf(":%d", cfg.Port)); err != nil {
		log.Fatalf("Failed to start server: %s", err)
	}
}
