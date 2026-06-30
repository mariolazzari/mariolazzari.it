package server

import (
	"log/slog"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type Server struct {
	mux   *http.ServeMux
	log   *slog.Logger
	db    *pgxpool.Pool
	cache *redis.Client
	// queries *db.Qeuries
}

func New(log *slog.Logger, db *pgxpool.Pool, cache *redis.Client) *Server {
	// server router
	mux := http.NewServeMux()

	// server settings
	s := &Server{
		log:   log,
		mux:   mux,
		db:    db,
		cache: cache,
	}

	// register api routes
	s.registerRoutes()

	return s
}

func (s *Server) registerRoutes() {
	s.mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello from Mario Lazzari Go Backend!"))
	})
}

func (s *Server) Mux() *http.ServeMux {
	return s.mux
}

func (s *Server) Stop() {
	// Check if DB exists before closing to avoid panic
	if s.db != nil {
		s.db.Close()
	}

	// Check if Redis exists before closing
	if s.cache != nil {
		_ = s.cache.Close()
	}
}
