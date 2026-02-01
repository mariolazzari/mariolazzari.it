package auth

import (
	"context"
	"errors"

	"github.com/mariolazzari/mariolazzari.it/backend/internal/utils"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrTokenGeneration    = errors.New("token generation failed")
)

type AuthService struct {
	repo  *AuthRepository
	token *utils.TokenManager
}

func NewAuthService(repo *AuthRepository) (*AuthService, error) {
	tm, err := utils.NewTokenManager()
	if err != nil {
		return nil, err
	}

	return &AuthService{
		repo:  repo,
		token: tm,
	}, nil
}

func (s *AuthService) Login(ctx context.Context, input UserLoginInput) (*AuthResponse, error) {
	user, err := s.repo.GetUserByEmail(ctx, input.Email)
	if err != nil {
		return nil, ErrInvalidCredentials
	}

	if !utils.CheckPassword(user.Password, input.Password) {
		return nil, ErrInvalidCredentials
	}

	token, err := s.token.GenerateToken(user.ID, user.Email)
	if err != nil {
		return nil, ErrTokenGeneration
	}

	// hide password
	user.Password = ""

	return &AuthResponse{
		Token:     token,
		User:      user,
		ExpiresIn: int64(s.token.ExpiresIn),
	}, nil
}
