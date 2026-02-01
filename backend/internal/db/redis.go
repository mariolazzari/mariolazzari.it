package db

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

// Cache wraps a Redis client and provides methods for storing and retrieving
// serialized data in Redis.
type Redis struct {
	client *redis.Client
}

// New creates a new Cache instance and connects to Redis using the provided URL.
// It pings the Redis server to ensure the connection is valid.
//
// Parameters:
//   - ctx: the context for timeout/cancellation.
//   - url: the Redis connection URL (e.g., "redis://localhost:6379/0").
//
// Returns:
//   - *Cache: a pointer to the initialized Cache instance.
//   - error: any error encountered during connection or ping.
func NewRedis(ctx context.Context, url string) (*Redis, error) {
	opt, err := redis.ParseURL(url)
	if err != nil {
		return nil, err
	}

	rdb := redis.NewClient(opt)

	if err := rdb.Ping(ctx).Err(); err != nil {
		return nil, err
	}

	return &Redis{client: rdb}, nil
}

// Get retrieves a value from Redis and unmarshals it into dest.
// Returns true if the value was found and unmarshaled successfully, false otherwise.
//
// Parameters:
//   - ctx: the context for timeout/cancellation.
//   - key: the Redis key to retrieve.
//   - dest: a pointer to the variable where the unmarshaled value will be stored.
//
// Returns:
//   - bool: true if the key exists and was unmarshaled, false if not found or on error.
func (c *Redis) Get(ctx context.Context, key string, dest any) bool {
	cached, err := c.client.Get(ctx, key).Result()
	if err != nil {
		return false
	}
	if err := json.Unmarshal([]byte(cached), dest); err != nil {
		log.Printf("cache: failed to unmarshal key %s: %v", key, err)
		return false
	}
	return true
}

// SetCache serializes the given value and stores it in Redis under the given key with a TTL.
//
// Parameters:
//   - ctx: the context for timeout/cancellation.
//   - key: the Redis key to set.
//   - value: the value to serialize and store.
//   - ttl: time-to-live duration for the key.
func (c *Redis) Set(ctx context.Context, key string, value any, ttl time.Duration) {
	data, err := json.Marshal(value)
	if err != nil {
		log.Printf("cache: failed to marshal value for key %s: %v", key, err)
		return
	}

	if err = c.client.Set(ctx, key, data, ttl).Err(); err != nil {
		log.Printf("cache: failed to set key %s: %v", key, err)
	}
}

// Del removes the specified key from Redis.
//
// Parameters:
//   - ctx: the context for timeout/cancellation.
//   - key: the Redis key to delete.
func (c *Redis) Del(ctx context.Context, key string) {
	if err := c.client.Del(ctx, key).Err(); err != nil {
		log.Printf("cache: failed to delete key %s: %v", key, err)
	}
}

// Close closes the underlying Redis client connection.
//
// Returns:
//   - error: any error encountered while closing the connection.
func (c *Redis) Close() error {
	return c.client.Close()
}

func (r *Redis) Ping() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return r.client.Ping(ctx).Err()
}
