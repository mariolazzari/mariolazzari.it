package server

import (
	"fmt"
	"net/http"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
)

// func (s *Server) handleMuseumHubSearch(w http.ResponseWriter, r *http.Request) {
// 	// querystring parser
// 	query, ok := s.parseQuery(r, w, "query")
// 	if !ok {
// 		return
// 	}
// 	locale, ok := s.parseQuery(r, w, "locale")
// 	if !ok {
// 		return
// 	}
// 	limit, offset := s.extractPagination(r)

// 	// search options
// 	searchParams := museumhub.ArtworkSearch{
// 		Query:  query,
// 		Limit:  limit,
// 		Offset: offset,
// 		Locale: locale,
// 	}

// 	// client timeout
// 	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
// 	defer cancel()

// 	g, ctx := errgroup.WithContext(ctx)

// 	// Mutex to protect concurrent writes to the shared results slice
// 	var mu sync.Mutex
// 	var allArtworks []museumhub.Artwork

// 	// clients
// 	euroClient := europeana.New(s.cfg.EuropeanaApiKey)
// 	metClient := met.New()
// 	chicagoClient := chicago.New()
// 	clevelandClient := cleveland.New()
// 	whitneyCLient := whitney.New()
// 	clients := []museumhub.MuseumClient{
// 		euroClient,
// 		metClient,
// 		chicagoClient,
// 		clevelandClient,
// 		whitneyCLient,
// 	}

// 	for _, client := range clients {
// 		// Shadow the loop variable for the goroutine closure
// 		c := client

// 		g.Go(func() error {
// 			// Call the external API concurrently
// 			results, err := c.Search(ctx, searchParams)
// 			if err != nil {
// 				// Log the error but maybe don't fail the whole request if one museum is down
// 				s.log.Error("Error fetching from %s: %v", c.Name(), err)
// 				return nil // Return nil if you want partial results from other museums
// 			}

// 			// Safely append results to the shared slice
// 			mu.Lock()
// 			allArtworks = append(allArtworks, results...)
// 			mu.Unlock()

// 			return nil
// 		})
// 	}

// 	// Wait for all goroutines to finish or for the context to timeout/cancel
// 	if err := g.Wait(); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// ensure slice
// 	if allArtworks == nil {
// 		allArtworks = []museumhub.Artwork{}
// 	}

// 	// avoid missing images
// 	allArtworks = filter(allArtworks, func(a museumhub.Artwork) bool {
// 		return a.ImageURL != "" && a.ImagePreviewURL != ""
// 	})

// 	s.encode(w, r, http.StatusOK, allArtworks)
// }

func (s *Server) handleMuseumHubSearch(w http.ResponseWriter, r *http.Request) {
	query, ok := s.parseQuery(r, w, "query")
	if !ok {
		return
	}
	locale, ok := s.parseQuery(r, w, "locale")
	if !ok {
		return
	}

	cacheKey := fmt.Sprintf("museumhub:search:%s:%s", locale, query)
	ctx := r.Context()

	// 1. Tenta il recupero da Redis (Cache Hit)
	cachedData, err := s.cache.Get(ctx, cacheKey).Result()
	if err == nil && cachedData != "" {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("X-Cache", "HIT")
		w.Write([]byte(cachedData))
		return
	}

	// 2. Cache Miss: Invoca l'ingestor per fare fetch, persistenza su DB e Redis
	// s.ingestor istanziato all'avvio dell'applicazione
	artworks, err := s.museumHubIngestor.Ingest(ctx, query, locale)
	if err != nil {
		s.log.Error("Ingestion failed", "error", err)
		http.Error(w, "Failed to fetch artwork data", http.StatusInternalServerError)
		return
	}

	if artworks == nil {
		artworks = []museumhub.Artwork{}
	}

	w.Header().Set("X-Cache", "MISS")
	s.encode(w, r, http.StatusOK, artworks)
}
