package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

func Connect(url string) (*redis.Client, error) {
	opt, err := redis.ParseURL(url)
	if err != nil {
		return nil, fmt.Errorf("parse redis url: %w", err)
	}

	opt.MaxRetries = 3
	opt.PoolSize = 10
	opt.MinIdleConns = 2
	opt.ConnMaxLifetime = 5 * time.Minute
	opt.ReadTimeout = 3 * time.Second
	opt.WriteTimeout = 3 * time.Second

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client := redis.NewClient(opt)

	if err := client.Ping(ctx).Err(); err != nil {
		client.Close()
		return nil, fmt.Errorf("redis ping failed: %w", err)
	}

	return client, nil
}
