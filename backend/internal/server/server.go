package server

import (
	"log/slog"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/internal/config"
	"github.com/mariolazzari/mariolazzari.it/internal/db"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
	"github.com/redis/go-redis/v9"
)

type Server struct {
	startTime         time.Time
	mux               *http.ServeMux
	log               *slog.Logger
	db                *pgxpool.Pool
	queries           *db.Queries
	cache             *redis.Client
	cfg               *config.Config
	museumHubIngestor *museumhub.Ingestor
}

func New(log *slog.Logger, pool *pgxpool.Pool, cache *redis.Client, cfg *config.Config, mhi *museumhub.Ingestor) *Server {
	// server router
	mux := http.NewServeMux()

	// server settings
	s := &Server{
		startTime:         time.Now(),
		log:               log,
		mux:               mux,
		db:                pool,
		queries:           db.New(pool),
		cache:             cache,
		cfg:               cfg,
		museumHubIngestor: mhi,
	}

	// register api routes
	s.registerRoutes()

	return s
}

func (s *Server) registerRoutes() {
	// museumhub
	s.mux.HandleFunc("GET /api/museumhub/search", s.handleMuseumHubSearch)
	// system
	s.mux.HandleFunc("GET /api/system/health", s.handleHealthCheck)
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
