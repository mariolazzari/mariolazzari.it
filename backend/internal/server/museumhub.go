package server

import (
	"context"
	"net/http"
	"sync"
	"time"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/chicago"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/cleveland"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/europeana"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/met"
	"golang.org/x/sync/errgroup"
)

func (s *Server) handleMuseumHubSearch(w http.ResponseWriter, r *http.Request) {
	// querystring parser
	query, ok := s.parseQuery(r, w, "query")
	if !ok {
		return
	}
	locale, ok := s.parseQuery(r, w, "locale")
	if !ok {
		return
	}
	limit, offset := s.extractPagination(r)

	// search options
	searchParams := museumhub.ArtworkSearch{
		Query:  query,
		Limit:  limit,
		Offset: offset,
		Locale: locale,
	}

	// client timeout
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	g, ctx := errgroup.WithContext(ctx)

	// Mutex to protect concurrent writes to the shared results slice
	var mu sync.Mutex
	var allArtworks []museumhub.Artwork

	// clients
	euroClient := europeana.New(s.cfg.EuropeanaApiKey)
	metClient := met.New()
	chicagoClient := chicago.New()
	clevelandClient := cleveland.New()
	clients := []museumhub.MuseumClient{
		euroClient,
		metClient,
		chicagoClient,
		clevelandClient,
	}

	for _, client := range clients {
		// Shadow the loop variable for the goroutine closure
		c := client

		g.Go(func() error {
			// Call the external API concurrently
			results, err := c.Search(ctx, searchParams)
			if err != nil {
				// Log the error but maybe don't fail the whole request if one museum is down
				s.log.Error("Error fetching from %s: %v", c.Name(), err)
				return nil // Return nil if you want partial results from other museums
			}

			// Safely append results to the shared slice
			mu.Lock()
			allArtworks = append(allArtworks, results...)
			mu.Unlock()

			return nil
		})
	}

	// Wait for all goroutines to finish or for the context to timeout/cancel
	if err := g.Wait(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// ensure slice
	if allArtworks == nil {
		allArtworks = []museumhub.Artwork{}
	}

	// avoid missing images
	allArtworks = filter(allArtworks, func(a museumhub.Artwork) bool {
		return a.ImageURL != "" && a.ImagePreviewURL != ""
	})

	s.encode(w, r, http.StatusOK, allArtworks)
}
