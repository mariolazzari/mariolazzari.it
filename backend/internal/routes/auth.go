package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/redis/go-redis/v9"
)

// registers authentication routes.
func RegisterAuthRoutes(r *gin.RouterGroup, pdb *pgxpool.Pool, rdb *redis.Client) {
	authHandler := handlers.NewAuthHandler(pdb, rdb)

	auth := r.Group("/auth")
	{
		// public routes
		auth.POST("/login", authHandler.Login)

		// private routes
		auth.Use(middleware.AuthMiddleware())
		auth.POST("/logout", authHandler.Logout)
	}
}
