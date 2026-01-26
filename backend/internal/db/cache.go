package db

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

func ConnectRedis(ctx *context.Context) (*redis.Client, error) {
	// get redis url from env
	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		return nil, errors.New("REDIS_URL not set")
	}

	// parse redis url
	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		return nil, err
	}
	rdb := redis.NewClient(opt)

	// ping redis
	if err := rdb.Ping(*ctx).Err(); err != nil {
		return nil, err
	}

	return rdb, nil
}

// read key from cache
func GetCache[T any](ctx context.Context, rdb *redis.Client, key string) (T, bool) {
	var result T

	cached, err := rdb.Get(ctx, key).Result()
	if err != nil {
		// cache miss or Redis error
		return result, false
	}

	if err := json.Unmarshal([]byte(cached), &result); err != nil {
		log.Printf("cache: failed to unmarshal key %s: %v", key, err)
		return result, false
	}

	return result, true
}

// save value in cache with TTL
func SetCache[T any](ctx context.Context, rdb *redis.Client, key string, value T, ttl time.Duration) {
	data, err := json.Marshal(value)
	if err != nil {
		log.Printf("cache: failed to marshal value for key %s: %v", key, err)
		return
	}

	err = rdb.SetNX(ctx, key, data, ttl).Err()
	if err != nil {
		log.Printf("cache: failed to set key %s in Redis: %v", key, err)
	}
}
