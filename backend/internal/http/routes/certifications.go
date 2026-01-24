package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/http/handlers"
)

// certification routes
func RegisterCertifications(v1 *gin.RouterGroup) {
	certifications := v1.Group("/certifications")
	{
		certifications.POST("", handlers.CreateCertification)
		certifications.GET("", handlers.ListCertifications)
		certifications.GET("/:id", handlers.GetCertification)
		certifications.PUT("/:id", handlers.UpdateCertification)
		certifications.DELETE("/:id", handlers.DeleteCertification)
	}
}
