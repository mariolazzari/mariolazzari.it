package utils

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type CustomClaims struct {
	UserID int    `json:"user_id"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

type TokenManager struct {
	Secret    []byte
	ExpiresIn int
}

// NewTokenManager crea il manager leggendo le env
func NewTokenManager() (*TokenManager, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		return nil, fmt.Errorf("JWT_SECRET not set")
	}

	expiresStr := os.Getenv("JWT_EXPIRES_IN")
	expires, err := strconv.Atoi(expiresStr)
	if err != nil {
		return nil, fmt.Errorf("JWT_EXPIRES_IN invalid: %w", err)
	}

	return &TokenManager{
		Secret:    []byte(secret),
		ExpiresIn: expires,
	}, nil
}

func (tm *TokenManager) GenerateToken(userID int, email string) (string, error) {
	claims := &CustomClaims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(tm.ExpiresIn) * time.Second)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(tm.Secret)
}

func (tm *TokenManager) ValidateToken(tokenStr string) (*CustomClaims, error) {
	claims := &CustomClaims{}

	parsedToken, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return tm.Secret, nil
	})

	if err != nil {
		return nil, err
	}

	if !parsedToken.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}

// SetAccessToken sets the JWT access token cookie
func (tm *TokenManager) SetAccessToken(w http.ResponseWriter, token string, maxAge int) {
	secure := false
	if os.Getenv("APP_ENV") == "production" {
		secure = true
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "access_token",
		Value:    token,
		Path:     "/",
		MaxAge:   maxAge,
		HttpOnly: true,
		Secure:   secure,
		SameSite: http.SameSiteLaxMode,
	})
}
