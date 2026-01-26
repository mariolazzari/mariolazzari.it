package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/models"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
	"github.com/redis/go-redis/v9"
)

type UserHandler Handler

// NewUserHandler creates a new user handler
func NewUserHandler(pdb *pgxpool.Pool, rdb *redis.Client) *UserHandler {
	return &UserHandler{
		pdb: pdb,
		rdb: rdb,
	}
}

// retrieves all users
func (h *UserHandler) GetAllUsers(c *gin.Context) {

	// Try to get from cache
	// cachedUsers, err := h.redis.Get(ctx, "users:all").Result()
	// if err == nil {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"data":  cachedUsers,
	// 		"cache": true,
	// 	})
	// 	return
	// }

	rows, err := h.pdb.Query(c, "SELECT id, email, first_name, last_name, created_at, updated_at FROM users ORDER BY created_at DESC")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	users := []models.User{}
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, gin.H{"data": users})
}

// GetUserByID retrieves a user by ID
func (h *UserHandler) GetUserByID(c *gin.Context) {
	// get user id param
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Try to get from cache
	// cachedUser, err := h.redis.Get(ctx, "user:"+userID).Result()
	// if err == nil {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"data":  cachedUser,
	// 		"cache": true,
	// 	})
	// 	return
	// }

	var user models.User
	err = h.pdb.QueryRow(c, "SELECT id, email, first_name, last_name, created_at, updated_at FROM users WHERE id = $1", userID).
		Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// creates new user
func (h *UserHandler) CreateUser(c *gin.Context) {
	// parse request body
	var input models.UserCreateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if user already exists
	var exists bool
	err := h.pdb.QueryRow(c, "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", input.Email).Scan(&exists)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if exists {
		c.JSON(http.StatusConflict, gin.H{"error": "user already registred"})
		return
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to process password"})
		return
	}

	// insert new user
	var user models.User
	err = h.pdb.QueryRow(c,
		"INSERT INTO users (email, password, first_name, last_name, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, email, first_name, last_name, created_at, updated_at",
		input.Email, hashedPassword, input.FirstName, input.LastName,
	).Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": user})
}

// updates existing user
func (h *UserHandler) UpdateUser(c *gin.Context) {
	// get user id param
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// check request body
	var input models.UserUpdateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update existing user
	var user models.User
	err = h.pdb.QueryRow(c,
		"UPDATE users SET first_name = COALESCE(NULLIF($1, ''), first_name), last_name = COALESCE(NULLIF($2, ''), last_name), updated_at = NOW() WHERE id = $3 RETURNING id, email, first_name, last_name, created_at, updated_at",
		input.FirstName, input.LastName, userID,
	).Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	// Invalidate cache
	// h.redis.Del(ctx, "user:"+userID)
	// h.redis.Del(ctx, "users:all")

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// deletes exiating user
func (h *UserHandler) DeleteUser(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check authorization
	// authUserID, _ := c.Get("user_id")
	// if authUserID != userID {
	// 	c.JSON(http.StatusForbidden, gin.H{"error": "unauthorized"})
	// 	return
	// }

	result, err := h.pdb.Exec(c, "DELETE FROM users WHERE id = $1", userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if result.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	// Invalidate cache
	// h.redis.Del(ctx, "user:"+userID)
	// h.redis.Del(ctx, "users:all")

	c.JSON(http.StatusOK, gin.H{"message": "user deleted successfully"})
}
