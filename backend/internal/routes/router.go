package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/cache"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
)

// Router holds the Gin engine along with references to
// the database and cache for dependency injection into handlers.
type Router struct {
	engine *gin.Engine
	db     *db.DB
	cache  *cache.Cache
}

// New creates a new Router instance.
// It initializes the Gin engine, sets the mode based on the environment,
// applies global middleware, and sets trusted proxies.
func New(db *db.DB, cache *cache.Cache, env string) *Router {
	if env == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create default Gin engine with Logger and Recovery middleware.
	r := gin.Default()
	r.SetTrustedProxies([]string{"127.0.0.1"})
	// Apply global middleware, e.g., CORS.
	r.Use(middleware.CORSMiddleware())

	return &Router{
		engine: r,
		db:     db,
		cache:  cache,
	}
}

// RegisterRoutes registers all API routes under the /api/v1 group.
// Additional route registration methods (like users, certifications, etc.) can be called here.
func (r *Router) RegisterRoutes() {
	api := r.engine.Group("/api/v1")
	r.registerAuth(api)
	r.registerHealth(api)
	// r.registerUsers(api)
}

// Run starts the HTTP server on the specified address.
// Returns any error encountered when running the server.
func (r *Router) Run(addr string) error {
	return r.engine.Run(addr)
}
