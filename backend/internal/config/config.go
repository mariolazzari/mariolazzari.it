package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Env          string
	Port         string
	Host         string
	PosgresURL   string
	RedisURL     string
	JwtSecret    string
	JwtExpiresIn string
}

// load config from .env or other sources
func init() {
	godotenv.Load()
}

// Load configuration from environment variables
func Load() *Config {
	// read env variables
	cfg := Config{
		Env:          getValue("ENV", "development"),
		Host:         getValue("HOST", "127.0.0.1"),
		Port:         getValue("PORT", "4001"),
		PosgresURL:   getValue("POSTGRES_URL", "postgresql://user:password@localhost:5432/dbname"),
		RedisURL:     getValue("REDIS_URL", "redis://localhost:6379"),
		JwtSecret:    getValue("JWT_SECRET", "default_secret"),
		JwtExpiresIn: getValue("JWT_EXPIRES_IN", "1d"),
	}

	return &cfg
}

// retrieves the value of the environment variable named by the key.
func getValue(key, defVal string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		return defVal
	}
	return val
}
