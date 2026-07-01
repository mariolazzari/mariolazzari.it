package europeana

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
)

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

func (c *Client) SearchArtworks(ctx context.Context, params museumhub.ArtworkSearch) ([]museumhub.Artwork, error) {
	u, err := url.Parse(c.baseURL + "/search.json")
	if err != nil {
		return nil, err
	}

	query := u.Query()
	query.Set("wskey", c.apiKey)
	query.Set("query", params.Query)
	query.Set("rows", "20")
	query.Set("media", "true")

	u.RawQuery = query.Encode()

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

	var searchResponse *SearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&searchResponse); err != nil {
		return nil, err
	}

	out := make([]museumhub.Artwork, 0, len(searchResponse.Items))

	for _, it := range searchResponse.Items {
		out = append(out, museumhub.Artwork{
			ID:              it.GUID,
			Title:           it.GetTitle("en"),
			Description:     it.GetDescription("en"),
			Museum:          it.GetMuseum(),
			ImageURL:        it.GetImageUrl(),
			ImagePreviewURL: it.GetImagePreviewUrl(),
			Source:          "europeana",
		})
	}

	return out, nil
}
