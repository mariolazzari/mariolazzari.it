package db

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

// DB wraps a pgxpool.Pool to provide database access.
type Postgres struct {
	Pool *pgxpool.Pool
}

// New connects to PostgreSQL using the given DSN and returns a DB instance.
//
// Parameters:
//   - ctx: context for connection timeout and cancellation
//   - dsn: PostgreSQL connection string (e.g., postgres://user:pass@localhost:5432/dbname)
//
// Returns:
//   - *DB: connected DB instance
//   - error: any error occurred during connection or ping
func NewPostgres(ctx context.Context, dsn string) (*Postgres, error) {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, err
	}

	// Ping with timeout to ensure DB is reachable
	pingCtx, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()
	if err := pool.Ping(pingCtx); err != nil {
		pool.Close()
		return nil, err
	}

	return &Postgres{Pool: pool}, nil
}

// Close closes the underlying database connection pool.
func (db *Postgres) Close() {
	db.Pool.Close()
}

// EnsureAdminUser ensures that an admin user exists in the database.
//
// Reads ADMIN_EMAIL and ADMIN_PASSWORD from environment variables. If the admin
// user does not exist, it creates one with hashed password.
//
// Parameters:
//   - ctx: context for query execution
//
// Returns:
//   - error: any error during DB query or password hashing
func (db *Postgres) EnsureAdminUser(ctx context.Context) error {
	adminEmail := os.Getenv("ADMIN_EMAIL")
	if adminEmail == "" {
		return fmt.Errorf("ADMIN_EMAIL environment variable is not set")
	}
	adminPassword := os.Getenv("ADMIN_PASSWORD")
	if adminPassword == "" {
		return fmt.Errorf("ADMIN_PASSWORD environment variable is not set")
	}

	// Check if admin already exists
	var exists bool
	err := db.Pool.QueryRow(ctx,
		`SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)`,
		adminEmail,
	).Scan(&exists)
	if err != nil {
		return err
	}

	if exists {
		return nil
	}

	// Hash the password
	hashedPassword, err := utils.HashPassword(adminPassword)
	if err != nil {
		return err
	}

	// Insert new admin user
	_, err = db.Pool.Exec(ctx, `
		INSERT INTO users (
			email,
			password,
			first_name,
			last_name,
			created_at,
			updated_at
		)
		VALUES ($1, $2, 'Admin', 'User', NOW(), NOW())
	`,
		adminEmail,
		hashedPassword,
	)
	if err != nil {
		return err
	}

	return nil
}
