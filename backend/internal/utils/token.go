package utils

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// CustomClaims represents JWT token claims
type CustomClaims struct {
	UserID int    `json:"user_id"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

var jwtSecret []byte
var jwtExpiresIn int

// Initialize JWT settings
func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatal("JWT_SECRET is not set")
	}
	jwtSecret = []byte(secret)

	expiresIn := os.Getenv("JWT_EXPIRES_IN")
	if expiresIn == "" {
		log.Fatal("JWT_EXPIRES_IN is not set")
	}

	var err error
	jwtExpiresIn, err = strconv.Atoi(expiresIn)
	if err != nil {
		log.Fatal("JWT_EXPIRES_IN is not a valid integer")
	}
}

// GenerateToken generates a JWT token
func GenerateToken(userID int, email string) (string, error) {
	claims := &CustomClaims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(jwtExpiresIn) * time.Second)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidateToken validates a JWT token
func ValidateToken(token string) (*CustomClaims, error) {
	claims := &CustomClaims{}

	parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (any, error) {
		// Verify signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if !parsedToken.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}
