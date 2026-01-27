package db

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

// connects to the PostgreSQL database using the provided context.
func ConnectPostgres(ctx context.Context) (*pgxpool.Pool, error) {
	dsn := os.Getenv("POSTGRES_URL")
	if dsn == "" {
		return nil, errors.New("POSTGRES_URL not set")
	}

	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, err
	}

	if err = pool.Ping(ctx); err != nil {
		return nil, err
	}

	return pool, nil
}

// ensures that the admin user exists in the database.
func EnsureAdminUser(ctx context.Context, db *pgxpool.Pool) error {
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
	err := db.QueryRow(ctx,
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

	_, err = db.Exec(ctx, `
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
