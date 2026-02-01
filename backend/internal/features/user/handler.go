package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

type UserHandler struct {
	db    *db.Postgres
	cache *db.Redis
}

// creates a new user handler
func NewUserHandler(db *db.Postgres, cache *db.Redis) *UserHandler {
	return &UserHandler{
		db:    db,
		cache: cache,
	}
}

// retrieves all users
func (h *UserHandler) GetAllUsers(c *gin.Context) {
	// Try to get from cache
	var users []User

	// ok := cache.Get(c, usersCacheKey, &users)
	// if ok {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"data":  cachedUsers,
	// 		"cache": true,
	// 	})
	// 	return
	// }

	// get users from db
	rows, err := h.db.Pool.Query(c, "SELECT id, email, first_name, last_name, created_at, updated_at FROM users ORDER BY created_at DESC")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	// save results
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		users = append(users, user)
	}

	// save results in cache
	//db.SetCache(c, h.rdb, usersCacheKey, users, 0)

	c.JSON(http.StatusOK, gin.H{"data": users})
}

// GetUserByID retrieves a user by ID
func (h *UserHandler) GetUserByID(c *gin.Context) {
	// get user id param
	userID, ok := utils.GetParam[int](c, "id")
	if !ok {
		return
	}

	var user User
	err := h.db.Pool.QueryRow(c, "SELECT id, email, first_name, last_name, created_at, updated_at FROM users WHERE id = $1", userID).
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
	var input UserCreateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if user already exists
	var exists bool
	err := h.db.Pool.QueryRow(c, "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", input.Email).Scan(&exists)
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
	var user User
	err = h.db.Pool.QueryRow(c,
		"INSERT INTO users (email, password, first_name, last_name, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, email, first_name, last_name, created_at, updated_at",
		input.Email, hashedPassword, input.FirstName, input.LastName,
	).Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// invalidate cache
	//db.DelCache(c, h.rdb, usersCacheKey)

	c.JSON(http.StatusCreated, gin.H{"data": user})
}

// updates existing user
func (h *UserHandler) UpdateUser(c *gin.Context) {
	// get user id param
	userID, ok := utils.GetParam[int](c, "id")
	if !ok {
		return
	}

	// check request body
	var input UserUpdateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update existing user
	var user User
	err := h.db.Pool.QueryRow(c,
		"UPDATE users SET first_name = COALESCE(NULLIF($1, ''), first_name), last_name = COALESCE(NULLIF($2, ''), last_name), updated_at = NOW() WHERE id = $3 RETURNING id, email, first_name, last_name, created_at, updated_at",
		input.FirstName, input.LastName, userID,
	).Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	// invalidate cache
	//db.DelCache(c, h.rdb, usersCacheKey)

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// deletes exiating user
func (h *UserHandler) DeleteUser(c *gin.Context) {
	// get user id param
	userID, ok := utils.GetParam[int](c, "id")
	if !ok {
		return
	}

	result, err := h.db.Pool.Exec(c, "DELETE FROM users WHERE id = $1", userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if result.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	// invalidate cache
	//db.DelCache(c, h.rdb, userCacheKey(userID))

	c.JSON(http.StatusOK, gin.H{"message": "user deleted successfully"})
}
