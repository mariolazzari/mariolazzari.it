package handlers

import (
	"github.com/mariolazzari/mariolazzari.it/backend/internal/cache"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
)

type Handler struct {
	db    *db.DB
	cache *cache.Cache
}
