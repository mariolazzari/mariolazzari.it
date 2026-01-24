package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/http/handlers"
)

// certification routes
func RegisterHealth(v1 *gin.RouterGroup) {
	health := v1.Group("/health")
	{
		health.GET("/", handlers.HealthHandler)
	}
}
