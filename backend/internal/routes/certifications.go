package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/redis/go-redis/v9"
)

func RegisterCertificationRoutes(r *gin.RouterGroup, pdb *pgxpool.Pool, rdb *redis.Client) {
	certHandler := handlers.NewCertificationHandler(pdb, rdb)

	certifications := r.Group("/certifications")
	{
		// public routes
		certifications.GET("", certHandler.GetAllCertifications)
		certifications.GET("/:id", certHandler.GetCertificationByID)

		// private routes
		certifications.Use(middleware.AuthMiddleware())
		certifications.POST("", certHandler.CreateCertification)
		certifications.PUT("/:id", certHandler.UpdateCertification)
		certifications.DELETE("/:id", certHandler.DeleteCertification)
	}
}
