package app

import "errors"

var (
	ErrPostgresURLRequired = errors.New("POSTGRES_URL is required")
	ErrJWTSecretRequired   = errors.New("JWT_SECRET is required")
)
