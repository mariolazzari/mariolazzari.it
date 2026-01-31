package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/repositories"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/services"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

// registerAuth registers all authentication-related routes under the given router group.
//
// This includes both public endpoints (accessible without authentication) and protected endpoints
// (accessible only with a valid token). The function initializes the repository, service, token manager,
// and handler, then wires them to the Gin routes.
//
// Routes registered:
//
//	POST /auth/login   - Public login endpoint
//	POST /auth/logout  - Protected logout endpoint (requires authentication)
func (r *Router) registerAuth(rg *gin.RouterGroup) {
	// Initialize the authentication repository to handle DB operations related to users/tokens.
	authRepo := repositories.NewAuthRepository(r.db)

	// Initialize the authentication service, which contains business logic for login/logout.
	authService, _ := services.NewAuthService(authRepo)

	// Initialize the token manager for creating and validating JWTs or other tokens.
	tokenManager, _ := utils.NewTokenManager()

	// Initialize the HTTP handler that connects the service and token manager to HTTP requests.
	authHandler := handlers.NewAuthHandler(authService, tokenManager)

	// Create a route group for /auth endpoints under the parent router group.
	auth := rg.Group("/auth")

	// Public route: POST /auth/login
	auth.POST("/login", authHandler.Login)

	// Protected routes: require authentication via middleware.
	protected := auth.Group("", middleware.AuthMiddleware())
	protected.POST("/logout", authHandler.Logout)
}
