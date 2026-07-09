package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/mariolazzari/mariolazzari.it/internal/config"
	"github.com/mariolazzari/mariolazzari.it/internal/db"
	"github.com/mariolazzari/mariolazzari.it/internal/logger"
	"github.com/mariolazzari/mariolazzari.it/internal/server"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/chicago"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/cleveland"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/europeana"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/met"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/whitney"
)

func main() {
	// read enviroment vars
	cfg := config.New()

	// start logger
	myLog := logger.New(cfg.AppMode)
	myLog.Info("Configuration loaded")

	// main context
	ctx := context.Background()

	// Postgres connection
	myLog.Info("Connecting Postgres")
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

	// ingestors
	museumClients := []museumhub.MuseumClient{
		europeana.New(cfg.EuropeanaApiKey),
		met.New(),
		chicago.New(),
		cleveland.New(),
		whitney.New(),
	}
	museumHubIngestor := museumhub.NewIngestor(dbPool, rdc, museumClients, myLog)

	// Init server
	server := server.New(myLog, dbPool, rdc, cfg, museumHubIngestor)
	httpServer := &http.Server{
		Addr:    ":8080",
		Handler: server.Mux(),
	}

	// Start server
	go func() {
		myLog.Info(fmt.Sprintf("%s starting on port %d", cfg.AppName, cfg.AppPort))
		if err := httpServer.ListenAndServe(); err != nil {
			myLog.Error(fmt.Sprintf("http server error: %s", err))
			os.Exit(1)
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	myLog.Info("Shutting down server...")

	// Create a deadline to wait for current operations to complete
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		myLog.Error("Server forced to shutdown", "error", err)
	}

	// Call your server stop logic
	server.Stop()

	myLog.Info("Server exited properly")
}
