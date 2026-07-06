package chicago

import (
	"context"
	"encoding/json"
	"fmt"
	"html"
	"net/http"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
)

type Client struct {
	baseURL    string
	httpClient *http.Client
}

func New() *Client {
	return &Client{
		baseURL: "https://api.artic.edu/api/v1",
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func iiifImageURL(imageID string, width int) string {
	if imageID == "" {
		return ""
	}

	// prefer smaller safe size first
	return fmt.Sprintf(
		"https://www.artic.edu/iiif/2/%s/full/%d,/0/default.jpg",
		imageID,
		width,
	)
}

func (c *Client) Search(ctx context.Context, params museumhub.ArtworkSearch) ([]museumhub.Artwork, error) {

	limit := params.Limit
	if limit <= 0 || limit > 100 {
		limit = 100
	}

	//--------------------------------------
	// SEARCH
	//--------------------------------------

	u, err := url.Parse(c.baseURL + "/artworks/search")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("q", fmt.Sprintf(`artist_title:"%s"`, params.Query))
	q.Set("hasImages", "true")
	q.Set("limit", strconv.Itoa(limit))
	q.Set(
		"fields",
		"id,title,artist_title,date_display,image_id,description",
	)
	q.Set("query[bool][must][0][term][is_on_view]", "true")

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

	var sr struct {
		Data []struct {
			ID          int    `json:"id"`
			Title       string `json:"title"`
			ArtistTitle string `json:"artist_title"`
			DateDisplay string `json:"date_display"`
			ImageID     string `json:"image_id"`
			Description string `json:"description"`
		} `json:"data"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&sr); err != nil {
		return nil, err
	}

	results := make([]museumhub.Artwork, 0, len(sr.Data))

	for _, a := range sr.Data {

		if a.ImageID == "" {
			continue
		}

		results = append(results, museumhub.Artwork{
			ID:              strconv.Itoa(a.ID),
			Title:           a.Title,
			Author:          a.ArtistTitle,
			Description:     cleanDescription(a.Description),
			Museum:          c.Name(),
			ImageURL:        iiifImageURL(a.ImageID, 1200),
			ImagePreviewURL: iiifImageURL(a.ImageID, 400),
			Year:            a.DateDisplay,
			Source:          c.Name(),
		})
	}

	return results, nil
}

func (c *Client) Name() string {
	return "Chicago Art Institute"
}

func cleanDescription(s string) string {
	s = html.UnescapeString(s)

	re := regexp.MustCompile(`<[^>]*>`)
	s = re.ReplaceAllString(s, "")

	s = strings.ReplaceAll(s, "\n", " ")
	s = strings.TrimSpace(s)

	return s
}
