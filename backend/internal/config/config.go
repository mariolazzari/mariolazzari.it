package config

import (
	"os"

	"github.com/joho/godotenv"
)

// load config from .env or other sources
func init() {
	godotenv.Load()
}

type Config struct {
	Env          string
	Port         string
	Host         string
	PosgresURL   string
	RedisURL     string
	JwtSecret    string
	JwtExpiresIn string
	AdminEmail   string
}

// Load configuration from environment variables
func Load() *Config {
	return &Config{
		Env:          getValue("ENV", "development"),
		Host:         getValue("HOST", "127.0.0.1"),
		Port:         getValue("PORT", "4001"),
		PosgresURL:   getValue("POSTGRES_URL", "postgresql://user:password@localhost:5432/dbname"),
		RedisURL:     getValue("REDIS_URL", "redis://localhost:6379"),
		JwtSecret:    getValue("JWT_SECRET", "default_secret"),
		JwtExpiresIn: getValue("JWT_EXPIRES_IN", "3600"),
		AdminEmail:   getValue("ADMIN_EMAL", "admin@mariolazzari.it"),
	}
}

// retrieves the value of the environment variable named by the key.
func getValue(key, defVal string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		return defVal
	}
	return val
}
