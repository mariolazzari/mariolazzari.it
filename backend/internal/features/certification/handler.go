package certification

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

type CertificationHandler struct {
	db    *db.Postgres
	cache *db.Redis
}

// creates a new certification handler
func NewCertificationHandler(db *db.Postgres, cache *db.Redis) *CertificationHandler {
	return &CertificationHandler{
		db:    db,
		cache: cache,
	}
}

// retrieves all certifications for the authenticated user
func (h *CertificationHandler) GetAllCertifications(c *gin.Context) {

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

	// certRepo := repositories.NewCertificationCache(h.db.Pool)
	// certifications, err := certRepo.GetCertifications(c)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{"data": "wip"})
}

// GetCertificationByID retrieves a specific certification
func (h *CertificationHandler) GetCertificationByID(c *gin.Context) {
	// get certification id
	certID, ok := utils.GetParam[int](c, "id")
	if !ok {
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

	var cert Certification
	err := h.db.Pool.QueryRow(c,
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
	//
	var input CertificationInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// add new certification
	var cert Certification
	err := h.db.Pool.QueryRow(c,
		"INSERT INTO certifications (title, image_src, date, url, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, title, image_src, date, url, created_at, updated_at",
		input.Title, input.ImageSrc, input.Date, input.URL,
	).Scan(&cert.ID, &cert.Title, &cert.ImageSrc, &cert.Date, &cert.URL, &cert.CreatedAt, &cert.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Invalidate cache
	//	db.DelCache(c,h.rdb, )

	c.JSON(http.StatusCreated, gin.H{"data": cert})
}

// UpdateCertification updates a certification
func (h *CertificationHandler) UpdateCertification(c *gin.Context) {
	// get certification id
	certID, ok := utils.GetParam[int](c, "id")
	if !ok {
		return
	}

	var input CertificationInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cert Certification
	err := h.db.Pool.QueryRow(c,
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
	// get certification id
	certID, ok := utils.GetParam[int](c, "id")
	if !ok {
		return
	}

	result, err := h.db.Pool.Exec(c, "DELETE FROM certifications WHERE id = $1", certID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if result.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "certification not found"})
		return
	}

	// Invalidate cache
	// h.cache.Del(c, "certs:all")

	c.JSON(http.StatusOK, gin.H{"message": "certification deleted successfully"})
}
