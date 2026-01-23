package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

const redisKey = "redis"

func Redis(client *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set(redisKey, client)
		c.Next()
	}
}

func GetRedis(c *gin.Context) *redis.Client {
	return c.MustGet(redisKey).(*redis.Client)
}
