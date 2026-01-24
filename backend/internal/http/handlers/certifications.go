package handlers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	db "github.com/mariolazzari/mariolazzari.it/backend/internal/db/generated"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/http/middlewares"
)

// Response represents the standard API response format
type Response[T any] struct {
	Success bool   `json:"success"`
	Data    T      `json:"data,omitempty"`
	Error   string `json:"error,omitempty"`
	Message string `json:"message,omitempty"`
}

// ListResponse represents a paginated list response
type ListResponse[T any] struct {
	Success bool   `json:"success"`
	Data    []T    `json:"data"`
	Limit   int32  `json:"limit"`
	Offset  int32  `json:"offset"`
	Error   string `json:"error,omitempty"`
}

// CreateCertificationRequest represents the request body for creating a certification
type CreateCertificationRequest struct {
	Title    string `json:"title" binding:"required,min=1,max=255"`
	URL      string `json:"url" binding:"required,url"`
	ImageSrc string `json:"image_src" binding:"required,url"`
	Date     string `json:"date" binding:"required"` // RFC3339 format
}

// UpdateCertificationRequest represents the request body for updating a certification
type UpdateCertificationRequest struct {
	Title    string `json:"title" binding:"required,min=1,max=255"`
	URL      string `json:"url" binding:"required,url"`
	ImageSrc string `json:"image_src" binding:"required,url"`
	Date     string `json:"date" binding:"required"` // RFC3339 format
}

// CreateCertification creates a new certification
func CreateCertification(c *gin.Context) {
	var req CreateCertificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, Response[any]{
			Success: false,
			Error:   "invalid request body: " + err.Error(),
		})
		return
	}

	// Parse date from string
	date, err := time.Parse(time.RFC3339, req.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, Response[any]{
			Success: false,
			Error:   "invalid date format, use RFC3339",
		})
		return
	}

	queries := middlewares.GetDB(c)
	ctx := c.Request.Context()

	cert, err := queries.CreateCertification(ctx, db.CreateCertificationParams{
		Title:    req.Title,
		Url:      req.URL,
		ImageSrc: req.ImageSrc,
		Date:     pgtype.Timestamptz{Time: date, Valid: true},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, Response[any]{
			Success: false,
			Error:   "failed to create certification",
		})
		return
	}

	c.JSON(http.StatusCreated, Response[db.Certification]{
		Success: true,
		Data:    cert,
		Message: "certification created successfully",
	})
}

// GetCertification retrieves a certification by ID
func GetCertification(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, Response[any]{
			Success: false,
			Error:   "invalid certification id",
		})
		return
	}

	queries := middlewares.GetDB(c)
	ctx := c.Request.Context()

	cert, err := queries.GetCertificationByID(ctx, id)
	if err != nil {
		c.JSON(http.StatusNotFound, Response[any]{
			Success: false,
			Error:   "certification not found",
		})
		return
	}

	c.JSON(http.StatusOK, Response[db.Certification]{
		Success: true,
		Data:    cert,
	})
}

// ListCertifications retrieves all certifications with pagination
func ListCertifications(c *gin.Context) {
	limit := int32(10)
	offset := int32(0)

	if l := c.Query("limit"); l != "" {
		if parsed, err := strconv.ParseInt(l, 10, 32); err == nil {
			limit = int32(parsed)
		}
	}

	if o := c.Query("offset"); o != "" {
		if parsed, err := strconv.ParseInt(o, 10, 32); err == nil {
			offset = int32(parsed)
		}
	}

	queries := middlewares.GetDB(c)
	ctx := c.Request.Context()

	certs, err := queries.ListCertifications(ctx, db.ListCertificationsParams{
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, ListResponse[db.Certification]{
			Success: false,
			Error:   "failed to list certifications",
			Limit:   limit,
			Offset:  offset,
		})
		return
	}

	c.JSON(http.StatusOK, ListResponse[db.Certification]{
		Success: true,
		Data:    certs,
		Limit:   limit,
		Offset:  offset,
	})
}

// UpdateCertification updates a certification by ID
func UpdateCertification(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, Response[any]{
			Success: false,
			Error:   "invalid certification id",
		})
		return
	}

	var req UpdateCertificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, Response[any]{
			Success: false,
			Error:   "invalid request body: " + err.Error(),
		})
		return
	}

	// Parse date from string
	date, err := time.Parse(time.RFC3339, req.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, Response[any]{
			Success: false,
			Error:   "invalid date format, use RFC3339",
		})
		return
	}

	queries := middlewares.GetDB(c)
	ctx := c.Request.Context()

	cert, err := queries.UpdateCertification(ctx, db.UpdateCertificationParams{
		ID:       id,
		Title:    req.Title,
		Url:      req.URL,
		ImageSrc: req.ImageSrc,
		Date:     pgtype.Timestamptz{Time: date, Valid: true},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, Response[any]{
			Success: false,
			Error:   "failed to update certification",
		})
		return
	}

	c.JSON(http.StatusOK, Response[db.Certification]{
		Success: true,
		Data:    cert,
		Message: "certification updated successfully",
	})
}

// DeleteCertification deletes a certification by ID
func DeleteCertification(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, Response[any]{
			Success: false,
			Error:   "invalid certification id",
		})
		return
	}

	queries := middlewares.GetDB(c)
	ctx := c.Request.Context()

	if err := queries.DeleteCertification(ctx, id); err != nil {
		c.JSON(http.StatusInternalServerError, Response[any]{
			Success: false,
			Error:   "failed to delete certification",
		})
		return
	}

	c.JSON(http.StatusNoContent, Response[any]{
		Success: true,
		Message: "certification deleted successfully",
	})
}
