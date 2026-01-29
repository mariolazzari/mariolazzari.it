package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/redis/go-redis/v9"
)

// RegisterUserRoutes registers user-related routes.
func RegisterUserRoutes(r *gin.RouterGroup, pdb *pgxpool.Pool, rdb *redis.Client) {
	users := r.Group("/users")
	userHandler := handlers.NewUserHandler(pdb, rdb)

	// public routes
	users.GET("", userHandler.GetAllUsers)
	users.GET("/:id", userHandler.GetUserByID)

	// private routes
	authMiddleware := middleware.AuthMiddleware()
	users.POST("", authMiddleware, userHandler.CreateUser)
	users.PUT("/:id", authMiddleware, userHandler.UpdateUser)
	users.DELETE("/:id", authMiddleware, userHandler.DeleteUser)
}
