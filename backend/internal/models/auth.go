package models

// UserLoginInput represents input for user login
type UserLoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	Token     string `json:"token"`
	User      *User  `json:"user"`
	ExpiresIn int64  `json:"expires_in"`
}
