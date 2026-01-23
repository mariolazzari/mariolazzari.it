package db

import (
	"context"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect(dbUrl string) *pgxpool.Pool {
	// create context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// parse config
	cfg, err := pgxpool.ParseConfig(dbUrl)
	if err != nil {
		log.Fatalf("Postgres config parsing error: %v", err)
	}

	// pool settings
	cfg.MaxConns = 25
	cfg.MinConns = 5
	cfg.MaxConnLifetime = 5 * time.Minute
	cfg.MaxConnIdleTime = 1 * time.Minute
	cfg.HealthCheckPeriod = 1 * time.Minute

	// create pool
	pool, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		log.Fatalf("Pool creation error: %v", err)
	}

	// test connection
	if err := pool.Ping(ctx); err != nil {
		log.Fatalf("Postgres connection error: %v", err)
	}

	return pool
}

func Close(pool *pgxpool.Pool) {
	pool.Close()
}
