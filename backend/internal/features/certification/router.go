package certification

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
)

// registerCertifications registers certification-related routes.
func RegisterRoutes(rg *gin.RouterGroup, pdb *db.Postgres, rdb *db.Redis) {
	certGroup := rg.Group("/certifications")
	certHandler := NewCertificationHandler(pdb, rdb)

	// public routes
	certGroup.GET("", certHandler.GetAllCertifications)
	certGroup.GET("/:id", certHandler.GetCertificationByID)

	// private routes
	protected := certGroup.Group("", middleware.AuthMiddleware())
	protected.POST("", certHandler.CreateCertification)
	protected.PUT("/:id", certHandler.UpdateCertification)
	protected.DELETE("/:id", certHandler.DeleteCertification)

}
