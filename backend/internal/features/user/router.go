package user

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
)

// RegisterUserRoutes registers user-related routes.
func RegisterRoutes(rg *gin.RouterGroup, pdb *db.Postgres, rdb *db.Redis) {
	users := rg.Group("/users")
	userHandler := NewUserHandler(pdb, rdb)

	// public routes
	users.GET("", userHandler.GetAllUsers)
	users.GET("/:id", userHandler.GetUserByID)

	// private routes
	authMiddleware := middleware.AuthMiddleware()
	users.POST("", authMiddleware, userHandler.CreateUser)
	users.PUT("/:id", authMiddleware, userHandler.UpdateUser)
	users.DELETE("/:id", authMiddleware, userHandler.DeleteUser)
}
