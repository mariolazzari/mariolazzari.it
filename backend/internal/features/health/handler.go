package health

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(s *Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) GetHealth(c *gin.Context) {
	health := h.service.GetStatus(c.Request.Context())

	fmt.Println("XXXXX")

	statusCode := http.StatusOK
	if health.Status != "ok" {
		statusCode = http.StatusServiceUnavailable
	}
	c.JSON(statusCode, health)
}
