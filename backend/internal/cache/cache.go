package cache

import (
	"context"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

func Connect(url string) *redis.Client {
	// parse options
	opt, err := redis.ParseURL(url)
	if err != nil {
		log.Fatalf("Errore parsing Redis URL: %v", err)
	}

	// settings
	opt.MaxRetries = 3
	opt.PoolSize = 10
	opt.MinIdleConns = 2
	opt.ConnMaxLifetime = 5 * time.Minute
	opt.ReadTimeout = 3 * time.Second
	opt.WriteTimeout = 3 * time.Second

	// test connection context
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// create client
	client := redis.NewClient(opt)

	// test connection
	if err := client.Ping(ctx).Err(); err != nil {
		log.Fatalf("Redis connection failed: %v", err)
	}

	return client
}

func Close(client *redis.Client) error {
	return client.Close()
}
