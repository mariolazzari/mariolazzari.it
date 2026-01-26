package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

// validates JWT token
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		cookies := c.Request.Header.Get("Cookie")
		auth := c.GetHeader("Authorization")
		println("Cookie header:", cookies)
		println("Authorization:", auth)

		var token string

		// 1. Try Authorization header
		authHeader := c.GetHeader("Authorization")
		if strings.HasPrefix(authHeader, "Bearer ") {
			token = strings.TrimPrefix(authHeader, "Bearer ")
			token = strings.TrimSpace(token)
			token = strings.Trim(token, `"`)
		}

		// 2. Fallback to cookie
		if token == "" {
			cookieToken, err := c.Cookie("access_token")

			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "authentication required"})
				c.Abort()
				return
			}
			token = cookieToken
		}

		claims, err := utils.ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Next()
	}
}
