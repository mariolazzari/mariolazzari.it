package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

type DB struct {
	Pool *pgxpool.Pool
}

// ConnectPostgres connects to the PostgreSQL database using the provided context.
func New(ctx context.Context, dsn string) (*DB, error) {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, err
	}

	pingCtx, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()
	if err := pool.Ping(pingCtx); err != nil {
		pool.Close()
		return nil, err
	}

	return &DB{Pool: pool}, nil
}

func (db *DB) Close() {
	db.Pool.Close()
}

// EnsureAdminUser ensures that the admin user exists in the database.
func (db *DB) EnsureAdminUser(ctx context.Context) error {
	// read admin user email and password from environment variables
	adminEmail := os.Getenv("ADMIN_EMAIL")
	if adminEmail == "" {
		return fmt.Errorf("ADMIN_EMAIL environment variable is not set")
	}
	adminPassword := os.Getenv("ADMIN_PASSWORD")
	if adminPassword == "" {
		return fmt.Errorf("ADMIN_PASSWORD environment variable is not set")
	}

	// check if admin already created
	var exists bool
	err := db.Pool.QueryRow(ctx,
		`SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)`,
		adminEmail,
	).Scan(&exists)

	if err != nil {
		return err
	}

	if exists {
		log.Println("admin user already exists")
		return nil
	}

	// hash password
	hashedPassword, err := utils.HashPassword(adminPassword)
	if err != nil {
		return err
	}

	_, err = db.Pool.Exec(ctx, `
		INSERT INTO users (
			email,
			password,
			first_name,
			last_name,
			created_at,
			updated_at
		)
		VALUES ($1, $2, $3, $4, NOW(), NOW())
	`,
		adminEmail,
		hashedPassword,
		"Admin",
		"User",
	)

	if err != nil {
		return err
	}

	return nil
}
