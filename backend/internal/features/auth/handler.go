package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

type AuthHandler struct {
	service *AuthService
	tm      *utils.TokenManager
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler(service *AuthService, tm *utils.TokenManager) *AuthHandler {
	return &AuthHandler{
		service: service,
		tm:      tm,
	}
}

// login user
func (h *AuthHandler) Login(c *gin.Context) {
	var input UserLoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request body",
		})
		return
	}

	resp, err := h.service.Login(c.Request.Context(), input)
	if err != nil {
		switch err {
		case ErrInvalidCredentials:
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "invalid credentials",
			})
		case ErrTokenGeneration:
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "authentication failed",
			})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "internal server error",
			})
		}
		return
	}

	// set secure cookie
	h.tm.SetAccessToken(c.Writer, resp.Token, int(resp.ExpiresIn))

	c.JSON(http.StatusOK, resp)
}

// logout user
func (h *AuthHandler) Logout(c *gin.Context) {
	// delete secure cookie
	h.tm.SetAccessToken(c.Writer, "", -1)

	c.JSON(http.StatusOK, gin.H{
		"message": "logout successful",
	})
}
