package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	db "github.com/mariolazzari/mariolazzari.it/backend/internal/db/generated"
)

// DB middleware injects queries into the context
func DB(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		queries := db.New(pool)
		c.Set("db", queries)
		c.Next()
	}
}

// GetDB retrieves queries from context
func GetDB(c *gin.Context) *db.Queries {
	return c.MustGet("db").(*db.Queries)
}
