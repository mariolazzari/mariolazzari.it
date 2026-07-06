package met

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"sync"
	"time"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
	"golang.org/x/sync/errgroup"
)

type Client struct {
	baseURL    string
	httpClient *http.Client
}

func New() *Client {
	return &Client{
		baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *Client) Search(ctx context.Context, params museumhub.ArtworkSearch) ([]museumhub.Artwork, error) {
	limit := params.Limit
	if limit <= 0 || limit > 100 {
		limit = 100
	}

	// 1. Search
	u, err := url.Parse(c.baseURL + "/search")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("q", params.Query)
	q.Set("isHighlight", "true")
	q.Set("hasImages", "true")
	q.Set("medium", "Paintings")
	u.RawQuery = q.Encode()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
	if err != nil {
		return nil, err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("MET error: %d", resp.StatusCode)
	}

	var sr SearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&sr); err != nil {
		return nil, err
	}

	if len(sr.ObjectIDs) == 0 {
		return nil, nil
	}

	ids := sr.ObjectIDs
	if len(ids) > limit {
		ids = ids[:limit]
	}

	// 2. Fan-out
	g, ctx := errgroup.WithContext(ctx)

	var (
		mu      sync.Mutex
		results []museumhub.Artwork
	)

	// obj details
	for _, id := range ids {
		g.Go(func() error {
			u, err := url.Parse(c.baseURL + "/objects/" + strconv.Itoa(id))
			if err != nil {
				return err
			}

			req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
			if err != nil {
				return err
			}

			resp, err := c.httpClient.Do(req)
			if err != nil {
				return err
			}
			defer resp.Body.Close()

			if resp.StatusCode >= 400 {
				return fmt.Errorf("object %d error: %d", id, resp.StatusCode)
			}

			var obj Object
			if err := json.NewDecoder(resp.Body).Decode(&obj); err != nil {
				return err
			}

			art := museumhub.Artwork{
				ID:              strconv.Itoa(obj.ObjectID),
				Title:           obj.Title,
				Author:          obj.ArtistDisplayName,
				Description:     obj.CreditLine,
				Museum:          c.Name(),
				ImageURL:        obj.PrimaryImage,
				ImagePreviewURL: obj.PrimaryImageSmall,
				Year:            strconv.Itoa(obj.ObjectEndDate),
				Source:          c.Name(),
			}

			mu.Lock()
			results = append(results, art)
			mu.Unlock()

			return nil
		})
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}

	// 3. Trim
	if len(results) > limit {
		results = results[:limit]
	}

	return results, nil
}
func (c *Client) Name() string {
	return "The Metropolitan Museum of Art"
}
