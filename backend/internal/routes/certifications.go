package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
)

// RegisterCertificationRoutes registers certification-related routes.
func (r *Router) RegisterCertificationRoutes(rg *gin.RouterGroup) {
	certGroup := rg.Group("/certifications")
	certHandler := handlers.NewCertificationHandler(r.db, r.cache)

	// public routes
	certGroup.GET("", certHandler.GetAllCertifications)
	certGroup.GET("/:id", certHandler.GetCertificationByID)

	// private routes
	authMW := middleware.AuthMiddleware()
	certGroup.POST("", authMW, certHandler.CreateCertification)
	certGroup.PUT("/:id", authMW, certHandler.UpdateCertification)
	certGroup.DELETE("/:id", authMW, certHandler.DeleteCertification)

}
