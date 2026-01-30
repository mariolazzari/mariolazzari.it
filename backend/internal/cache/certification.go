package cache

import (
	"context"
	"encoding/json"
	"errors"
	"strconv"
	"time"

	"github.com/mariolazzari/mariolazzari.it/backend/internal/models"
)

type CertificationCache struct {
	cache *Cache
	ttl   time.Duration
}

// key helper
func (r *CertificationCache) key(id int) string {
	return "certification:" + strconv.Itoa(id)
}

func NewCertificationCache(cache *Cache, ttl time.Duration) *CertificationCache {
	return &CertificationCache{
		cache: cache,
		ttl:   ttl,
	}
}

// GetByID tries to get a certification from Redis
func (r *CertificationCache) GetByID(ctx context.Context, id int) (*models.Certification, error) {
	var chached string

	key := r.key(id)
	ok := r.cache.Get(ctx, key, &chached)
	if !ok {
		return nil, errors.New("Cache miss")
	}
	var cert models.Certification
	if err := json.Unmarshal([]byte(chached), &cert); err != nil {
		return nil, err
	}
	return &cert, nil
}
