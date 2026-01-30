package service

import (
	"errors"

	"github.com/mariolazzari/mariolazzari.it/backend/internal/cache"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
)

type AuthService struct {
	db    *db.DB
	cache *cache.Cache
}

func NewAuthService(db *db.DB, cache *cache.Cache) *AuthService {
	return &AuthService{
		db:    db,
		cache: cache,
	}
}

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrUserInactive       = errors.New("user inactive")
)
