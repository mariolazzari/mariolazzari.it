package handlers

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/models"
	"github.com/redis/go-redis/v9"
)

type CertificationHandler struct {
	db    *pgxpool.Pool
	redis *redis.Client
}

// NewCertificationHandler creates a new certification handler
func NewCertificationHandler(db *pgxpool.Pool, redisClient *redis.Client) *CertificationHandler {
	return &CertificationHandler{
		db:    db,
		redis: redisClient,
	}
}

// GetAllCertifications retrieves all certifications for the authenticated user
func (h *CertificationHandler) GetAllCertifications(c *gin.Context) {
	ctx := context.Background()
	// userID, _ := c.Get("user_id")

	// cacheKey := "certifications:" + userID.(string)

	// // Try to get from cache
	// cachedCerts, err := h.redis.Get(ctx, cacheKey).Result()
	// if err == nil {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"data":  cachedCerts,
	// 		"cache": true,
	// 	})
	// 	return
	// }

	rows, err := h.db.Query(ctx,
		"SELECT id, title, image_src, date, url, created_at, updated_at FROM certifications ORDER BY date DESC",
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch certifications"})
		return
	}
	defer rows.Close()

	certifications := []models.Certification{}
	for rows.Next() {
		var cert models.Certification
		if err := rows.Scan(&cert.ID, &cert.Title, &cert.ImageSrc, &cert.Date, &cert.URL, &cert.CreatedAt, &cert.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		certifications = append(certifications, cert)
	}

	c.JSON(http.StatusOK, gin.H{"data": certifications})
}

// GetCertificationByID retrieves a specific certification
func (h *CertificationHandler) GetCertificationByID(c *gin.Context) {
	ctx := context.Background()
	//	userID, _ := c.Get("user_id")
	certID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//	cacheKey := "certification:" + certID

	// Try to get from cache
	// cachedCert, err := h.redis.Get(ctx, cacheKey).Result()
	// if err == nil {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"data":  cachedCert,
	// 		"cache": true,
	// 	})
	// 	return
	// }

	var cert models.Certification
	err = h.db.QueryRow(ctx,
		"SELECT id, title, image_src, date, url, created_at, updated_at FROM certifications WHERE id = $1",
		certID,
	).Scan(&cert.ID, &cert.Title, &cert.ImageSrc, &cert.Date, &cert.URL, &cert.CreatedAt, &cert.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cert})
}

// CreateCertification creates a new certification
func (h *CertificationHandler) CreateCertification(c *gin.Context) {
	ctx := context.Background()
	//	userID, _ := c.Get("user_id")

	var input models.CertificationCreateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// add new certification
	var cert models.Certification
	err := h.db.QueryRow(ctx,
		"INSERT INTO certifications (title, image_src, date, url, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, title, image_src, date, url, created_at, updated_at",
		input.Title, input.ImageSrc, input.Date, input.URL,
	).Scan(&cert.ID, &cert.Title, &cert.ImageSrc, &cert.Date, &cert.URL, &cert.CreatedAt, &cert.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Invalidate cache
	//	h.redis.Del(ctx, "certifications:"+userID.(string))

	c.JSON(http.StatusCreated, gin.H{"data": cert})
}

// UpdateCertification updates a certification
func (h *CertificationHandler) UpdateCertification(c *gin.Context) {
	ctx := context.Background()
	// userID, _ := c.Get("user_id")
	certID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var input models.CertificationUpdateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cert models.Certification
	err = h.db.QueryRow(ctx,
		`UPDATE certifications 
		 SET title = COALESCE(NULLIF($1, ''), title),
		     image_src = COALESCE(NULLIF($2, ''), image_src),
		     date = COALESCE(NULLIF($3::TIMESTAMP, '0001-01-01'::TIMESTAMP), date),
		     url = COALESCE(NULLIF($4, ''), url),
		     updated_at = NOW()
		 WHERE id = $5
		 RETURNING id, title, image_src, date, url, created_at, updated_at`,
		input.Title, input.ImageSrc, input.Date, input.URL, certID,
	).Scan(&cert.ID, &cert.Title, &cert.ImageSrc, &cert.Date, &cert.URL, &cert.CreatedAt, &cert.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "certification not found"})
		return
	}

	// Invalidate cache
	// h.redis.Del(ctx, "certification:"+certID)

	c.JSON(http.StatusOK, gin.H{"data": cert})
}

// DeleteCertification deletes a certification
func (h *CertificationHandler) DeleteCertification(c *gin.Context) {
	ctx := context.Background()
	// userID, _ := c.Get("user_id")
	certID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := h.db.Exec(ctx, "DELETE FROM certifications WHERE id = $1", certID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if result.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "certification not found"})
		return
	}

	// Invalidate cache
	// h.redis.Del(ctx, "certification:"+certID)

	c.JSON(http.StatusOK, gin.H{"message": "certification deleted successfully"})
}
