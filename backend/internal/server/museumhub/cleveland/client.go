package cleveland

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
		baseURL: "https://openaccess-api.clevelandart.org/api",
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
	q.Set("q", params.Query)
	q.Set("skip", "0")
	q.Set("limit", strconv.Itoa(limit))
	q.Set("hasImages", "1")
	q.Set("type", "Painting")
	q.Set("indent", "1")
	q.Set(
		"fields",
		"title,description,creation_date_latest,images,type",
	)

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

	var res APIResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}

	results := make([]museumhub.Artwork, 0, len(res.Data))

	for _, a := range res.Data {
		if a.Images.Web.URL == "" || a.Images.Print.URL == "" {
			continue
		}

		creator := ""
		if len(a.Creators) > 0 {
			creator = a.Creators[0].Description
		}

		// Safe check for nil pointer on description
		description := ""
		if a.Description != nil {
			description = *a.Description
		}

		results = append(results, museumhub.Artwork{
			ID:              strconv.Itoa(a.ID),
			Title:           a.Title,
			Author:          creator,
			Description:     description,
			Museum:          c.Name(),
			ImageURL:        a.Images.Print.URL,
			ImagePreviewURL: a.Images.Web.URL,
			Year:            strconv.Itoa(a.CreationDateLatest),
			Source:          c.Name(),
		})
	}

	return results, nil
}

func (c *Client) Name() string {
	return "The Cleveland Museum of Art"
}
