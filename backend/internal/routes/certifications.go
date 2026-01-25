package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/redis/go-redis/v9"
)

func RegisterCertificationRoutes(router *gin.RouterGroup, db *pgxpool.Pool, redis *redis.Client) {
	certHandler := handlers.NewCertificationHandler(db, redis)

	certifications := router.Group("/certifications")
	{
		certifications.GET("", certHandler.GetAllCertifications)
		certifications.POST("", certHandler.CreateCertification)
		certifications.GET("/:id", certHandler.GetCertificationByID)
		certifications.PUT("/:id", certHandler.UpdateCertification)
		certifications.DELETE("/:id", certHandler.DeleteCertification)
	}
}
