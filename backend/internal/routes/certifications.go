package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/handlers"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
	"github.com/redis/go-redis/v9"
)

// RegisterCertificationRoutes registers certification-related routes.
func RegisterCertificationRoutes(r *gin.RouterGroup, pdb *pgxpool.Pool, rdb *redis.Client) {
	certGroup := r.Group("/certifications")
	certHandler := handlers.NewCertificationHandler(pdb, rdb)

	// public routes
	certGroup.GET("", certHandler.GetAllCertifications)
	certGroup.GET("/:id", certHandler.GetCertificationByID)

	// private routes
	authMW := middleware.AuthMiddleware()
	certGroup.POST("", authMW, certHandler.CreateCertification)
	certGroup.PUT("/:id", authMW, certHandler.UpdateCertification)
	certGroup.DELETE("/:id", authMW, certHandler.DeleteCertification)

}
