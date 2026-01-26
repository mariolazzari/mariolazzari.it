package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

func EnsureAdminUser(ctx context.Context, db *pgxpool.Pool) error {
	adminEmail := os.Getenv("ADMIN_USER")
	if adminEmail == "" {
		return fmt.Errorf("ADMIN_USER environment variable is not set")
	}
	adminPassword := os.Getenv("ADMIN_PASSWORD")
	if adminEmail == "" {
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
