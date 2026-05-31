package config

import (
	"log"
	"os"
	"strconv"
)

type Config struct {
	AppName     string
	AppMode     string
	AppPort     int
	PostgresUrl string
	RedisUrl    string
}

func New() *Config {
	return &Config{
		AppName:     getEnv("APP_NAME"),
		AppMode:     getEnv("APP_MODE"),
		AppPort:     getIntEnv("APP_PORT"),
		PostgresUrl: getEnv("POSTGRES_URL"),
		RedisUrl:    getEnv("REDIS_URL"),
	}
}

func getEnv(name string) string {
	if name == "" {
		log.Fatal("var is empty")
	}

	val := os.Getenv(name)
	if val == "" {
		log.Fatalf("%s var is empty", name)
	}

	return val
}

func getIntEnv(name string) int {
	if name == "" {
		log.Fatal("var is empty")
	}

	strVal := os.Getenv(name)
	val, err := strconv.Atoi(strVal)
	if err != nil {
		log.Fatalf("%s var cast error: %s", name, err)
	}

	return val
}
