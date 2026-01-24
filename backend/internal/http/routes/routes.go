package routes

import (
	"github.com/gin-gonic/gin"
)

// Register registers all API routes
func Register(router *gin.Engine) {
	v1 := router.Group("/api/v1")
	{
		RegisterHealth(v1)
		RegisterCertifications(v1)
	}
}
