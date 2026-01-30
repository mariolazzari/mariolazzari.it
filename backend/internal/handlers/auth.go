package handlers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/cache"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/models"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

type AuthHandler Handler

// NewAuthHandler creates a new auth handler
func NewAuthHandler(db *db.DB, cache *cache.Cache) *AuthHandler {
	return &AuthHandler{
		db:    db,
		cache: cache,
	}
}

// login user
func (h *AuthHandler) Login(c *gin.Context) {
	// read request body
	var input models.UserLoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	var hashedPassword string
	err := h.db.Pool.QueryRow(c,
		"SELECT id, email, password, first_name, last_name, created_at, updated_at FROM users WHERE email = $1",
		input.Email,
	).Scan(&user.ID, &user.Email, &hashedPassword, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user email not found"})
		return
	}

	// Check password
	if !utils.CheckPassword(hashedPassword, input.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid user password"})
		return
	}

	// Generate token
	tm, err := utils.NewTokenManager()
	if err != nil {
		fmt.Println("Config error:", err)
		return
	}

	token, err := tm.GenerateToken(user.ID, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	// Set secure cookie for production
	secure := false
	if os.Getenv("APP_ENV") == "production" {
		secure = true
	}

	// httpOnly cookie
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "access_token",
		Value:    token,
		Path:     "/",
		MaxAge:   tm.ExpiresIn,
		HttpOnly: true,
		Secure:   secure,
		SameSite: http.SameSiteLaxMode,
	})

	response := models.AuthResponse{
		Token:     token,
		User:      &user,
		ExpiresIn: int64(tm.ExpiresIn),
	}

	c.JSON(http.StatusOK, gin.H{"data": response})
}

// logout user
func (h *AuthHandler) Logout(c *gin.Context) {
	c.SetCookie(
		"access_token",
		"",
		-1,
		"/",
		"",
		true,
		true,
	)

	c.JSON(http.StatusOK, gin.H{
		"message": "logout successful",
	})
}
