package server

import (
	"encoding/json"
	"net/http"
	"time"
)

type HealthResponse struct {
	Postgres string  `json:"postgres"`
	Redis    string  `json:"redis"`
	Uptime   float64 `json:"uptime_sec"`
}

func (s *Server) handleHealthCheck(w http.ResponseWriter, r *http.Request) {
	uptime := time.Since(s.startTime)
	postgres := "UP"
	redis := "UP"

	if err := s.db.Ping(r.Context()); err != nil {
		postgres = "down"
	}
	if err := s.cache.Ping(r.Context()).Err(); err != nil {
		redis = "down"
	}

	resp := HealthResponse{
		Postgres: postgres,
		Redis:    redis,
		Uptime:   uptime.Seconds(),
	}

	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
