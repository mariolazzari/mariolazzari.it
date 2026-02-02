package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/mariolazzari/mariolazzari.it/backend/internal/app"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
)

// main is the entry point of the backend application.
// It loads configuration, establishes database and cache connections,
// registers HTTP routes, and starts the HTTP server.
func main() {
	// Load environment variables and application configuration.
	cfg, err := app.New()
	if err != nil {
		log.Fatalf("Error reading enviroment variables: %s", err)
	}

	// Create a context with a timeout for initialization operations
	// such as connecting to the database or Redis.
	// NOTE: the 5-second timeout is only for setup; requests will use separate contexts.
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Connect to PostgreSQL and create an admin user if necessary.
	pdb, err := db.NewPostgres(ctx, cfg.DBURL)
	if err != nil {
		log.Fatalf("Postgres connection error: %s", err)
	}
	defer pdb.Close()

	// Ensure an admin user exists in the database.
	if err := pdb.EnsureAdminUser(ctx); err != nil {
		log.Fatalf("Failed to ensure admin user: %s", err)
	}

	// Connect to Redis for caching.
	rdb, err := db.NewRedis(ctx, cfg.CacheURL)
	if err != nil {
		log.Fatalf("Redis connection error: %s", err)
	}
	defer rdb.Close()

	// Initialize the HTTP router with database and Redis dependencies.
	router := app.NewRouter(pdb, rdb, cfg.Env)
	// Register all application routes.
	router.RegisterRoutes()

	// Start the HTTP server on the configured port.
	if err := router.Run(fmt.Sprintf(":%d", cfg.Port)); err != nil {
		log.Fatalf("Failed to start server: %s", err)
	}
}
