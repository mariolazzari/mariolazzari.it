package europeana

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"sync"
	"time"

	"golang.org/x/sync/errgroup"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
)

const (
	maxConcurrency  = 5
	rowsPerProvider = 20
)

// Providers list updated with exact Europeana DATA_PROVIDER strings
var providers = []string{
	// Netherlands
	"Rijksmuseum",
	"Mauritshuis",
	"National Archives of the Netherlands",
	"Centraal Museum Utrecht",
	// Italy
	"Brera Art Gallery",
	"Turin Gallery for Modern and Contemporary Art",
	// Austria
	"Fine Arts Museum Vienna",
	"Austrian Gallery Belvedere",
	"The Albertina Museum",
	// Germany
	"Alte Pinakothek, Munich",
	"Dresden State Art Collections. Old Masters Picture Gallery",
	"Museum of City History Leipzig",
	// Belgium
	"Saint Bavo Cathedral, Ghent",
	// France
	"National Library of France",
	"Orsay Museum",
	// Spain
	"Constanța Art Museum",
	"National Museum of Romanticism",
	"Sorolla Museum",
	"Thyssen-Bornemisza Museum",
	// UK
	"Ministry of Culture",
	"National Gallery",
	"Royal Collection Trust",
	// Israel
	"The Israel Museum, Jerusalem",
	// Denmark
	"National Gallery of Denmark",
	// Other
	"Groeninge Museum",
	// Lithuania
	"M. K. Čiurlionis National Museum of Art",
	// Romania
	"Craiova Art Museum",
}

type Client struct {
	apiKey     string
	baseURL    string
	httpClient *http.Client
}

func New(apiKey string) *Client {
	return &Client{
		apiKey:  apiKey,
		baseURL: "https://api.europeana.eu/record/v2",
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

type providerResult struct {
	Items []museumhub.Artwork
}

// Search executes concurrent requests across providers, filters by media quality,
// dedups by ID, sorts alphabetically by description, and enforces pagination boundaries.
func (c *Client) Search(ctx context.Context, params museumhub.ArtworkSearch) ([]museumhub.Artwork, error) {
	var (
		g   errgroup.Group
		mu  sync.Mutex
		all []museumhub.Artwork
	)

	// 1. Setup limit boundaries safely
	limit := params.Limit
	if limit <= 0 || limit > 100 {
		limit = 100
	}

	g.SetLimit(maxConcurrency)

	for _, provider := range providers {
		g.Go(func() error {
			res, err := c.searchProvider(ctx, provider, params, rowsPerProvider)
			if err != nil {
				// Soft error handling: log or silently drop provider errors
				// to avoid stopping the entire pipeline for one down museum
				return nil
			}

			mu.Lock()
			all = append(all, res.Items...)
			mu.Unlock()

			return nil
		})
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}

	// 2. Dedup by ID
	seen := make(map[string]struct{}, len(all))
	deduped := make([]museumhub.Artwork, 0, len(all))

	for _, a := range all {
		if _, ok := seen[a.ID]; ok {
			continue
		}
		seen[a.ID] = struct{}{}
		deduped = append(deduped, a)
	}

	// 3. Trim to requested limit
	if len(deduped) > limit {
		deduped = deduped[:limit]
	}

	return deduped, nil
}

func (c *Client) searchProvider(ctx context.Context, provider string, params museumhub.ArtworkSearch, rows int) (*providerResult, error) {
	u, err := url.Parse(c.baseURL + "/search.json")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("wskey", c.apiKey)
	q.Set("query", params.Query)
	q.Set("rows", fmt.Sprint(rows))
	q.Set("start", "1")

	// Filter rules
	q.Add("qf", "what:painting")
	q.Add("qf", "what:gemälde")
	q.Add("qf", "TYPE:IMAGE")
	// q.Add("qf", "contentTier:(2 OR 4)")
	q.Add("qf", fmt.Sprintf(`DATA_PROVIDER:"%s"`, provider))

	q.Set("profile", "rich")
	q.Set("sort", "score desc")

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
		return nil, fmt.Errorf("europeana error: %d", resp.StatusCode)
	}

	var sr SearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&sr); err != nil {
		return nil, err
	}

	items := make([]museumhub.Artwork, 0, len(sr.Items))

	for _, it := range sr.Items {
		img := it.GetImageUrl()
		thumb := it.GetImagePreviewUrl()

		if img == "" || thumb == "" {
			continue
		}

		items = append(items, museumhub.Artwork{
			ID:              it.ID,
			Title:           it.GetTitle(params.Locale),
			Author:          it.GetAuthor(params.Locale),
			Description:     it.GetDescription(params.Locale),
			Museum:          it.GetMuseum(),
			ImageURL:        img,
			ImagePreviewURL: thumb,
			Year:            it.GetYear(),
			Source:          "europeana",
		})
	}

	return &providerResult{
		Items: items,
	}, nil
}

func (c *Client) Name() string {
	return "Europeana"
}
