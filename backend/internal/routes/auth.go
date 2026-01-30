package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/repositories"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/services"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

// registerAuth registers authentication routes.
func (r *Router) registerAuth(rg *gin.RouterGroup) {
	authRepo := repositories.NewAuthRepository(r.db)
	authService, _ := services.NewAuthService(authRepo)
	tokenManager, _ := utils.NewTokenManager()
	authHandler := handlers.NewAuthHandler(authService, tokenManager)

	auth := rg.Group("/auth")
	auth.POST("/login", authHandler.Login)

	protected := auth.Group("", middleware.AuthMiddleware())
	protected.POST("/logout", authHandler.Logout)
}
