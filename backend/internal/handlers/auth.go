package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/models"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
	"github.com/redis/go-redis/v9"
)

type AuthHandler Handler

// NewAuthHandler creates a new auth handler
func NewAuthHandler(pdb *pgxpool.Pool, rdb *redis.Client) *AuthHandler {
	return &AuthHandler{
		pdb: pdb,
		rdb: rdb,
	}
}

// handles user registration
// func (h *AuthHandler) Register(c *gin.Context) {
// 	ctx := context.Background()
// 	var input models.UserCreateInput

// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Check if user already exists
// 	var exists bool
// 	err := h.db.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", input.Email).Scan(&exists)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
// 		return
// 	}
// 	if exists {
// 		c.JSON(http.StatusConflict, gin.H{"error": "email already registered"})
// 		return
// 	}

// 	// Hash password
// 	hashedPassword, err := utils.HashPassword(input.Password)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to process password"})
// 		return
// 	}

// 	userID := utils.GenerateID()
// 	var user models.User

// 	err = h.db.QueryRow(ctx,
// 		"INSERT INTO users (id, email, password, first_name, last_name, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id, email, first_name, last_name, created_at, updated_at",
// 		userID, input.Email, hashedPassword, input.FirstName, input.LastName,
// 	).Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt)

// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create user"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{
// 		"message": "user registered successfully",
// 		"data":    user,
// 	})
// }

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

	err := h.pdb.QueryRow(c,
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
	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	// httpOnly cookie
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "access_token",
		Value:    token,
		Path:     "/",
		MaxAge:   86400,
		HttpOnly: true,
		Secure:   true, // true SOLO con HTTPS
		SameSite: http.SameSiteLaxMode,
	})

	response := models.AuthResponse{
		Token:     token,
		User:      &user,
		ExpiresIn: 86400, // 24 hours in seconds
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
