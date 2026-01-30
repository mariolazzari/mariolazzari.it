package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
)

// RegisterUserRoutes registers user-related routes.
func (r *Router) RegisterUserRoutes(rg *gin.RouterGroup) {
	users := rg.Group("/users")
	userHandler := handlers.NewUserHandler(r.db, r.cache)

	// public routes
	users.GET("", userHandler.GetAllUsers)
	users.GET("/:id", userHandler.GetUserByID)

	// private routes
	authMiddleware := middleware.AuthMiddleware()
	users.POST("", authMiddleware, userHandler.CreateUser)
	users.PUT("/:id", authMiddleware, userHandler.UpdateUser)
	users.DELETE("/:id", authMiddleware, userHandler.DeleteUser)
}
