package main

import (
	"context"
	"log"
	"net/http"

	"github.com/mariolazzari/mariolazzari.it/internal/config"
	"github.com/mariolazzari/mariolazzari.it/internal/db"
)

func main() {
	// read enviroment vars
	cfg := config.New()

	// main context
	ctx := context.Background()
	// Postgres connection
	db.ConnectPostgres(ctx, cfg.PostgresUrl)
	// Redis connection

	// 2. Avvia il server HTTP
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
