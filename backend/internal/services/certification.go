package services

import (
	"time"

	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
)

type CertificationService struct {
	repo *db.CertificationRepository
	// cache *cache
	ttl time.Duration
}
