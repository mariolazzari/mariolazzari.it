package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

type contextKey string

const UserIDKey contextKey = "user_id"

// AuthMiddleware returns a Gin middleware that authenticates requests using a JWT.
//
// The middleware attempts to extract the token in the following order:
//  1. From the Authorization header using the Bearer scheme.
//  2. From the "access_token" cookie as a fallback.
//
// If the token is missing or invalid, the request is aborted with
// HTTP 401 Unauthorized. On success, the authenticated user ID is
// stored in the Gin context under the "user_id" key.
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		var token string

		// 1. Try Authorization header
		authHeader := c.GetHeader("Authorization")
		if after, ok := strings.CutPrefix(authHeader, "Bearer "); ok {
			token = strings.Trim(strings.TrimSpace(after), `"`)
		}

		// 2. Fallback to cookie if token is still empty
		if token == "" {
			cookieToken, err := c.Cookie("access_token")
			if err != nil || cookieToken == "" {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "authentication required"})
				c.Abort()
				return
			}
			token = cookieToken
		}

		// Token manager
		tm, err := utils.NewTokenManager()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
			c.Abort()
			return
		}

		claims, err := tm.ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		// Set user ID in context using typed key
		c.Set(string(UserIDKey), claims.UserID)
		c.Next()
	}
}
