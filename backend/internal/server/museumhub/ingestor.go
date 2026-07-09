package museumhub

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"sync"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/internal/db"
	"github.com/redis/go-redis/v9"
	"golang.org/x/sync/errgroup"
)

// Ingestor handles both real-time user-driven ingestion and scheduled background synchronization
type Ingestor struct {
	pool    *pgxpool.Pool
	queries *db.Queries
	rdb     *redis.Client
	clients []MuseumClient
	log     *slog.Logger
}

// New initializes and returns a high-performance Ingestor instance
func NewIngestor(pool *pgxpool.Pool, rdb *redis.Client, clients []MuseumClient, log *slog.Logger) *Ingestor {
	return &Ingestor{
		pool:    pool,
		queries: db.New(pool),
		rdb:     rdb,
		clients: clients,
		log:     log,
	}
}

// Ingest handles a single search query: logs it, fetches artwork from external APIs concurrently,
// persists records via an optimized PostgreSQL upsert transaction, and updates the Redis cache.
func (i *Ingestor) Ingest(ctx context.Context, queryText string, locale string) ([]Artwork, error) {
	// 1. Log query stats
	_, err := i.queries.UpsertSearchQuery(ctx, queryText)
	if err != nil {
		i.log.Error("Failed to upsert search query statistics", "error", err)
	}

	searchParams := ArtworkSearch{
		Query:  queryText,
		Limit:  100,
		Offset: 0,
		Locale: locale,
	}

	// 2. Fetch dai musei (Usiamo un errgroup locale senza sovrascrivere ctx!)
	g, _ := errgroup.WithContext(ctx)
	var mu sync.Mutex
	var allArtworks []Artwork

	for _, client := range i.clients {
		c := client
		g.Go(func() error {
			results, err := c.Search(ctx, searchParams)
			if err != nil {
				i.log.Error("Error fetching from provider", "provider", c.Name(), "error", err)
				return nil // Ritorniamo nil così un museo offline non blocca gli altri 4
			}

			mu.Lock()
			allArtworks = append(allArtworks, results...)
			mu.Unlock()
			return nil
		})
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}

	// 3. Filtro immagini
	var filtered []Artwork
	for _, art := range allArtworks {
		if art.ImageURL != "" && art.ImagePreviewURL != "" {
			filtered = append(filtered, art)
		}
	}

	if len(filtered) == 0 {
		return filtered, nil
	}

	// 4. SALVATAGGIO PROTETTO (Usa WithoutCancel)
	// Questo garantisce che Postgres e Redis scrivano SEMPRE, senza subire i fallimenti dei musei
	writeCtx := context.WithoutCancel(ctx)

	tx, err := i.pool.Begin(writeCtx)
	if err != nil {
		return nil, fmt.Errorf("failed to initiate postgres transaction: %w", err)
	}
	defer tx.Rollback(writeCtx)

	qtx := i.queries.WithTx(tx)
	for _, art := range filtered {
		_, err = qtx.UpsertArtwork(writeCtx, db.UpsertArtworkParams{
			ID:              art.ID,
			Author:          art.Author,
			Title:           art.Title,
			Description:     art.Description,
			Museum:          art.Museum,
			ImageUrl:        art.ImageURL,
			ImagePreviewUrl: art.ImagePreviewURL,
			Year:            art.Year,
			Source:          art.Source,
		})
		if err != nil {
			i.log.Error("Failed to upsert artwork", "art_id", art.ID, "error", err)
			continue
		}
	}

	if err := tx.Commit(writeCtx); err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	// 5. Scrittura Cache su Redis
	cacheKey := fmt.Sprintf("museumhub:search:%s:%s", locale, queryText)
	jsonData, err := json.Marshal(filtered)
	if err == nil {
		_ = i.rdb.Set(writeCtx, cacheKey, jsonData, 24*time.Hour).Err()
	}

	return filtered, nil
}

// StartBackgroundRefresher runs an infinite loop ticker tied to the application context.
// Every interval, it requests stale queries from PostgreSQL and runs them back through the Ingest mechanism.
func (i *Ingestor) StartBackgroundRefresher(ctx context.Context, interval time.Duration) error {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	i.log.Info("MuseumHub background refresher task successfully initialized")

	for {
		select {
		case <-ctx.Done():
			i.log.Info("Stopping MuseumHub background refresher worker gracefully")
			return ctx.Err()

		case <-ticker.C:
			i.log.Info("Executing scheduled batch ingestion process for stale queries")

			// Query Postgres via sqlc to fetch historical queries older than 24 hours
			staleQueries, err := i.queries.GetStaleQueries(ctx)
			if err != nil {
				i.log.Error("Failed to pull stale query list from database", "error", err)
				continue
			}

			// Synchronously refresh each stale query to avoid third-party API rate-limiting/throttling
			for _, queryText := range staleQueries {
				// Safety check if the application context gets cancelled mid-batch
				if ctx.Err() != nil {
					return ctx.Err()
				}

				i.log.Info("Running scheduled update cycle for search term", "error", queryText)

				// Re-use the master Ingest function to refresh DB entries and update Redis cache
				_, err := i.Ingest(ctx, queryText, "en")
				if err != nil {
					i.log.Error("Background synchronization failed for query '%s': %v", queryText, err)
				}

				// Politeness delay to safeguard against provider IP blocks/rate limits
				time.Sleep(500 * time.Millisecond)
			}
		}
	}
}
