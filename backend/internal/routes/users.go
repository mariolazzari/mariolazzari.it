package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/redis/go-redis/v9"
)

func RegisterUserRoutes(r *gin.RouterGroup, pdb *pgxpool.Pool, rdb *redis.Client) {
	userHandler := handlers.NewUserHandler(pdb, rdb)

	users := r.Group("/users")
	{
		// public routes
		users.GET("", userHandler.GetAllUsers)
		users.GET("/:id", userHandler.GetUserByID)

		// private routes
		users.Use(middleware.AuthMiddleware())
		users.POST("", userHandler.CreateUser)
		users.PUT("/:id", userHandler.UpdateUser)
		users.DELETE("/:id", userHandler.DeleteUser)
	}
}
