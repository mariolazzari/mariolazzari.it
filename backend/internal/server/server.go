package server

import (
	"log"
	"log/slog"
	"net/http"

	"github.com/go-redis/redis"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Server struct {
	log   *slog.Logger
	db    *pgxpool.Pool
	cache *redis.Client
	mux   *http.ServeMux
	// queries *db.Qeuries

}

func (s *Server) registerRoutes() {
	s.mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello from Mario Lazzari Go Backend!"))
	})
}

// func New() (*Server, error) {
// 	// server router
// 	mux := http.NewServeMux()

// 	s.registerRoutes()

// 	return s, nil
// }

func (s *Server) Stop() {
	// Check if DB exists before closing to avoid panic
	if s.db != nil {
		s.db.Close()
		log.Println("Database connection pool closed")
	}

	// Check if Redis exists before closing
	if s.cache != nil {
		if err := s.cache.Close(); err != nil {
			log.Printf("Error closing cache: %v", err)
		} else {
			log.Println("Cache connection closed")
		}
	}
}
