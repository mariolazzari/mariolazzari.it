package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
)

// registerAuth registers authentication routes.
func (r *Router) registerAuth(rg *gin.RouterGroup) {
	h := handlers.NewAuthHandler(r.db, r.cache)

	auth := rg.Group("/auth")
	auth.POST("/login", h.Login)

	protected := auth.Group("", middleware.AuthMiddleware())
	protected.POST("/logout", h.Logout)
}
