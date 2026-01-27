package handlers

import (
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type Handler struct {
	pdb *pgxpool.Pool
	rdb *redis.Client
}

const usersCacheKey = "user:all"

// user cache id
func userCacheKey(id int) string {
	return fmt.Sprintf("user:%d", id)
}
