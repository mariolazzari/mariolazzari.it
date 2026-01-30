package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/cache"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/middleware"
)

type Router struct {
	engine *gin.Engine
	db     *db.DB
	cache  *cache.Cache
}

func New(db *db.DB, cache *cache.Cache, env string) *Router {
	if env == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.SetTrustedProxies([]string{"127.0.0.1"})
	r.Use(middleware.CORSMiddleware())

	return &Router{
		engine: r,
		db:     db,
		cache:  cache,
	}
}

func (r *Router) RegisterRoutes() {
	api := r.engine.Group("/api/v1")

	r.registerHealth(api)
	r.registerAuth(api)
	// r.registerUsers(api)
}

func (r *Router) Run(addr string) error {
	return r.engine.Run(addr)
}
