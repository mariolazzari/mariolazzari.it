package cache

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

// Cache wraps a Redis client.
type Cache struct {
	client *redis.Client
}

// New creates a new Cache instance and connects to Redis.
func New(ctx context.Context, url string) (*Cache, error) {
	opt, err := redis.ParseURL(url)
	if err != nil {
		return nil, err
	}

	rdb := redis.NewClient(opt)

	if err := rdb.Ping(ctx).Err(); err != nil {
		return nil, err
	}

	return &Cache{client: rdb}, nil
}

// Get retrieves a value from cache.
// Returns false if not found or error.
func (c *Cache) Get(ctx context.Context, key string, dest any) bool {
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

// Set saves value in cache with TTL.
func (c *Cache) Set(ctx context.Context, key string, value any, ttl time.Duration) {
	data, err := json.Marshal(value)
	if err != nil {
		log.Printf("cache: failed to marshal value for key %s: %v", key, err)
		return
	}

	if err = c.client.Set(ctx, key, data, ttl).Err(); err != nil {
		log.Printf("cache: failed to set key %s: %v", key, err)
	}
}

// Del deletes a key from cache.
func (c *Cache) Del(ctx context.Context, key string) {
	if err := c.client.Del(ctx, key).Err(); err != nil {
		log.Printf("cache: failed to delete key %s: %v", key, err)
	}
}

// Close
func (c *Cache) Close() error {
	return c.client.Close()
}
