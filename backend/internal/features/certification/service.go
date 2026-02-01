package certification

import (
	"time"
)

type CertificationService struct {
	repo *CertificationRepository
	// cache *cache
	ttl time.Duration
}
