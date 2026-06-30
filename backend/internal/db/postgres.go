package db

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgresPool(ctx context.Context, conn string) (*pgxpool.Pool, error) {
	// configuration tuning
	config, err := pgxpool.ParseConfig(conn)
	if err != nil {
		return nil, err
	}
	config.MaxConns = 50
	config.MinConns = 10
	config.MaxConnLifetime = 30 * time.Minute
	config.MaxConnIdleTime = 5 * time.Minute
	config.HealthCheckPeriod = 1 * time.Minute

	// open connection
	dbPool, err := pgxpool.New(ctx, conn)
	if err != nil {
		return nil, fmt.Errorf("create postgres pool: %w", err)
	}

	// check connection
	err = dbPool.Ping(ctx)
	if err != nil {
		return nil, fmt.Errorf("ping postgres: %w", err)
	}

	return dbPool, err
}
