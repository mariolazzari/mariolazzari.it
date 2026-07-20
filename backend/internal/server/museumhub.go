package server

import (
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"time"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
)

func (s *Server) handleMuseumHubSearch(w http.ResponseWriter, r *http.Request) {
	query, ok := s.parseQuery(r, w, "query")
	if !ok {
		return
	}
	locale, ok := s.parseQuery(r, w, "locale")
	if !ok {
		return
	}

	// get pagination
	limit, offset := s.extractPagination(r)

	cacheKey := fmt.Sprintf("museumhub:search:%s:%s:%d:%d", locale, query, limit, offset)
	ctx := r.Context()

	fmt.Println("cache key", cacheKey)

	// Tenta il recupero da Redis (Cache Hit)
	cachedData, err := s.cache.Get(ctx, cacheKey).Result()
	if err == nil && cachedData != "" {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("X-Cache", "HIT")
		w.Write([]byte(cachedData))
		return
	}

	// Cache Miss: Invoca l'ingestor per fare fetch, persistenza su DB e Redis
	artworks, err := s.museumHubIngestor.Ingest(ctx, query, locale)
	if err != nil {
		s.log.Error("Ingestion failed", "error", err)
		http.Error(w, "Failed to fetch artwork data", http.StatusInternalServerError)
		return
	}

	if artworks == nil {
		artworks = []museumhub.Artwork{}
	}

	// 5. Calculate Pagination Metadata
	totalItems := len(artworks)
	perPage := limit

	// Calculate current page (1-indexed) based on offset
	currentPage := (offset / limit) + 1

	// Calculate total pages safely
	totalPages := 0
	if totalItems > 0 {
		totalPages = int(math.Ceil(float64(totalItems) / float64(perPage)))
	}

	// 6. Slice the results for the current page
	paginatedItems := []museumhub.Artwork{}
	if offset < totalItems {
		end := min(offset+limit, totalItems)
		paginatedItems = artworks[offset:end]
	}

	// 7. Construct the final envelope response
	response := PaginatedResponse[[]museumhub.Artwork]{
		Total:   totalItems,
		Page:    currentPage,
		Pages:   totalPages,
		PerPage: perPage,
		Data:    paginatedItems,
	}

	// 8. Serialize the entire ArtworksResponse struct to JSON
	jsonData, err := json.Marshal(response)
	if err != nil {
		s.log.Error("Failed to marshal response wrapper", "error", err)
		w.Header().Set("X-Cache", "MISS")
		s.encode(w, r, http.StatusOK, response)
		return
	}

	// 9. Save JSON string into Redis with TTL
	err = s.cache.Set(ctx, cacheKey, jsonData, 24*time.Hour).Err()
	if err != nil {
		s.log.Error("Failed to save response to Redis", "error", err)
	}

	w.Header().Set("X-Cache", "MISS")
	s.encode(w, r, http.StatusOK, response)
}
