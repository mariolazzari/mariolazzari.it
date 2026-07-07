package whitney

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
)

type Client struct {
	baseURL    string
	httpClient *http.Client
}

func New() *Client {
	return &Client{
		baseURL: "https://whitney.org/api",
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

	u, err := url.Parse(c.baseURL + "/artworks")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("q[title_or_description_cont]", params.Query)
	q.Set("filter[artist]", params.Query)
	q.Set("page[size]", strconv.Itoa(limit))
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

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("search failed: %s", resp.Status)
	}

	var res ArtworkResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}

	results := make([]museumhub.Artwork, 0, len(res.Data))

	for _, a := range res.Data {
		if len(a.Attributes.Images) == 0 {
			continue
		}

		results = append(results, museumhub.Artwork{
			ID:              a.ID,
			Title:           a.Attributes.Title,
			Author:          a.Attributes.DisplayArtistText,
			Description:     museumhub.CleanDescription(a.Attributes.Description),
			Museum:          c.Name(),
			ImageURL:        a.Attributes.Images[0].URL,
			ImagePreviewURL: a.Attributes.Images[0].URL,
			Year:            a.Attributes.DisplayDate,
			Source:          c.Name(),
		})
	}

	return results, nil
}

func (c *Client) Name() string {
	return "Whitney Museum of American Art"
}
