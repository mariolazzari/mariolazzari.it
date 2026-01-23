package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Env        string
	Port       string
	Host       string
	PosgresURL string
}

// load config from .env or other sources
func init() {
	godotenv.Load()
}

// Load configuration from environment variables
func Load() *Config {
	// read env variables
	cfg := Config{
		Env:        getValue("ENV", "development"),
		Host:       getValue("HOST", "127.0.0.1"),
		Port:       getValue("PORT", "4001"),
		PosgresURL: getValue("POSTGRES_URL", ""),
	}

	// check if postgres url is empty
	if cfg.PosgresURL == "" {
		log.Panic("Postgres URL is empty")
	}

	return &cfg
}

func getValue(key, defVal string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		return defVal
	}
	return val
}
