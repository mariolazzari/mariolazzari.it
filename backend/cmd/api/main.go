package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/mariolazzari/mariolazzari.it/internal/config"
	"github.com/mariolazzari/mariolazzari.it/internal/db"
	"github.com/mariolazzari/mariolazzari.it/internal/logger"
)

func main() {
	// read enviroment vars
	cfg := config.New()

	// start logger
	myLog := logger.New(cfg.AppMode)
	myLog.Info("Configuration loaded")

	// main context
	ctx := context.Background()

	// postgres connection
	myLog.Info("Connecting Postgres")

	// Postgres connection
	dbPool, err := db.NewPostgresPool(ctx, cfg.PostgresUrl)
	if err != nil {
		myLog.Error(fmt.Sprintf("Postgres connection error: %s", err))
		os.Exit(1)
	}
	defer dbPool.Close()
	myLog.Info("Posgres connected")

	// Redis connection
	rdc, err := db.NewRedisClient(ctx, cfg.RedisUrl)
	if err != nil {
		myLog.Error(fmt.Sprintf("Redis connection error: %s", err))
		os.Exit(1)
	}
	defer rdc.Close()
	myLog.Info("Redis connected")

	// Start server
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello from Mario Lazzari Go Backend!"))
	})

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Printf("%s starting on port %d", cfg.AppName, cfg.AppPort)
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
