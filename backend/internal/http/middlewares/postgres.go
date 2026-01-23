package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

const postgresKey = "postgres"

func Postgres(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set(postgresKey, pool)
		c.Next()
	}
}

func GetPostgres(c *gin.Context) *pgxpool.Pool {
	return c.MustGet(postgresKey).(*pgxpool.Pool)
}
