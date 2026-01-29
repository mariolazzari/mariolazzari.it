package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/redis/go-redis/v9"
)

// RegisterAuthRoutes registers authentication routes.
func RegisterAuthRoutes(r *gin.RouterGroup, pdb *pgxpool.Pool, rdb *redis.Client) {
	auth := r.Group("/auth")
	authHandler := handlers.NewAuthHandler(pdb, rdb)

	// public routes
	auth.POST("/login", authHandler.Login)

	// private routes
	authMW := middleware.AuthMiddleware()
	auth.POST("/logout", authMW, authHandler.Logout)
}
