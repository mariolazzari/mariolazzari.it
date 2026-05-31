package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

func ConnectPostgres(ctx context.Context, conn string) {
	// oped connection
	dbPool, err := pgxpool.New(ctx, conn)
	if err != nil {
		log.Fatalf("Postgres connection error: %v", err)
	}
	defer dbPool.Close()

	// check connection
	err = dbPool.Ping(ctx)
	if err != nil {
		log.Fatalf("Postgres ping error: %v", err)
	}

	log.Println("Postgres connection pool open successfully")
}
