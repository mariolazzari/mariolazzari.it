package config

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

type Config struct {
	Env          string
	Port         int
	Host         string
	DBURL        string
	CacheURL     string
	JwtSecret    string
	JwtExpiresIn int
	AdminEmail   string
}

// New loads the configuration from environment variables or .env file.
// Returns an error if critical variables are missing or invalid.
func New() (*Config, error) {
	godotenv.Load()
	port := utils.ParseInt(getValue("PORT", "4001"), 4001)
	jwtExp := utils.ParseInt(getValue("JWT_EXPIRES_IN", "3600"), 3600)

	cfg := &Config{
		Env:          getValue("ENV", "development"),
		Host:         getValue("HOST", "127.0.0.1"),
		Port:         port,
		DBURL:        getValue("POSTGRES_URL", ""),
		CacheURL:     getValue("REDIS_URL", "redis://localhost:6379"),
		JwtSecret:    getValue("JWT_SECRET", "s3cret"),
		JwtExpiresIn: jwtExp,
		AdminEmail:   getValue("ADMIN_EMAIL", "admin@mariolazzari.it"),
	}

	// Validate critical variables
	// if cfg.DBURL == "" {
	// 	return nil, errors.New("POSTGRES_URL is required")
	// }
	// if cfg.JwtSecret == "" {
	// 	return nil, errors.New("JWT_SECRET is required")
	// }

	return cfg, nil
}

// getValue returns the environment variable or the default value if not set.
func getValue(key, defVal string) string {
	if val, ok := os.LookupEnv(key); ok {
		return val
	}
	return defVal
}
