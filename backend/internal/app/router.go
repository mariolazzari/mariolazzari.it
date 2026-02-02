package app

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/features/auth"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/features/certification"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/features/health"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/features/user"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
)

// Router holds the Gin engine along with references to
// the database and cache for dependency injection into handlers.
type Router struct {
	engine   *gin.Engine
	postgres *db.Postgres
	redis    *db.Redis
}

// NewRouter creates a new Router instance.
// It initializes the Gin engine, sets the mode based on the environment,
// applies global middleware, and sets trusted proxies.
func NewRouter(db *db.Postgres, cache *db.Redis, env string) *Router {
	if env == gin.ReleaseMode {
		gin.SetMode(gin.ReleaseMode)
	}
	// Create default Gin engine with Logger and Recovery middleware.
	r := gin.Default()
	r.SetTrustedProxies([]string{"127.0.0.1"})
	r.Use(middleware.CORSMiddleware())

	return &Router{
		engine:   r,
		postgres: db,
		redis:    cache,
	}
}

// RegisterRoutes registers all API routes under the /api/v1 group.
// Additional route registration methods (like users, certifications, etc.) can be called here.
func (r *Router) RegisterRoutes() {
	api := r.engine.Group("/api/v1")
	auth.RegisterRoutes(api, r.postgres, r.redis)
	certification.RegisterRoutes(api, r.postgres, r.redis)
	health.RegisterRoutes(api, r.postgres, r.redis)
	user.RegisterRoutes(api, r.postgres, r.redis)
}

// Run starts the HTTP server on the specified address.
// Returns any error encountered when running the server.
func (r *Router) Run(addr string) error {
	return r.engine.Run(addr)
}
