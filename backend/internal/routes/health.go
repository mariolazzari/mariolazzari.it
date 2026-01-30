package routes

import "github.com/gin-gonic/gin"

func (r *Router) registerHealth(rg *gin.RouterGroup) {
	rg.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})
}
