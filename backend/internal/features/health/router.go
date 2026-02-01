package health

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
)

func RegisterRoutes(rg *gin.RouterGroup, pg *db.Postgres, r *db.Redis) {
	service := NewService(pg, r)
	handler := NewHandler(service)

	rg.GET("/health", handler.GetHealth)
}
