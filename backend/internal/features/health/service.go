package health

import (
	"context"
	"time"

	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
)

// Service gestisce la logica della diagnostica
type Service struct {
	Postgres *db.Postgres
	Redis    *db.Redis
	Start    time.Time
}

func NewService(pg *db.Postgres, r *db.Redis) *Service {
	return &Service{
		Postgres: pg,
		Redis:    r,
		Start:    time.Now(),
	}
}

// GetStatus effettua i ping e restituisce lo stato completo
func (s *Service) GetStatus(ctx context.Context) Health {
	h := Health{
		Status:    "ok",
		Uptime:    time.Since(s.Start).String(),
		Timestamp: time.Now().Unix(),
	}

	// Ping Postgres
	if err := s.Postgres.Pool.Ping(ctx); err != nil {
		h.Status = "fail"
		h.Postgres = err.Error()
	} else {
		h.Postgres = "ok"
	}

	// Ping Redis
	if err := s.Redis.Ping(); err != nil {
		h.Status = "fail"
		h.Redis = err.Error()
	} else {
		h.Redis = "ok"
	}

	return h
}
