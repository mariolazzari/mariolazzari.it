package db

import (
	"context"
	"errors"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func ConnectPostgres(ctx *context.Context) (*pgxpool.Pool, error) {
	dsn := os.Getenv("POSTGRES_URL")
	if dsn == "" {
		return nil, errors.New("POSTGRES_URL not set")
	}

	pool, err := pgxpool.New(*ctx, dsn)
	if err != nil {
		return nil, err
	}

	if err = pool.Ping(*ctx); err != nil {
		return nil, err
	}

	return pool, nil
}
