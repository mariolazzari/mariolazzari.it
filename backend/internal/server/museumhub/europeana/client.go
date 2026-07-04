package europeana

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
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

func buildDataProviderQuery() string {
	providers := []string{
		// neetherland
		"Rijksmuseum",
		"Mauritshuis",
		"National Archives of the Netherlands",
		// Austra
		"Fine Arts Museum Vienna",
		"Austrian Gallery Belvedere",
		"The Albertina Museum",
		// Germany
		"Alte Pinakothek, Munich",
		"Dresden State Art Collections. Old Masters Picture Gallery",
		// France - wip
		"National Library of France",
		"Orsay Museum",
		// Spain - wip
		"Sorolla Museum",
		"Thyssen-Bornemisza Museum",
		// UK - wip
		"National Gallery",
		// Israel
		"The Israel Museum, Jerusalem",
	}

	// Create the quoted list: "Rijksmuseum" OR "Mauritshuis"...
	quoted := make([]string, len(providers))
	for i, p := range providers {
		quoted[i] = fmt.Sprintf("\"%s\"", p)
	}

	// Join with OR and wrap in parentheses
	return fmt.Sprintf("DATA_PROVIDER:(%s)", strings.Join(quoted, " OR "))
}

func (c *Client) Search(ctx context.Context, params museumhub.ArtworkSearch) (*museumhub.ArtworksResponse, error) {
	u, err := url.Parse(c.baseURL + "/search.json")
	if err != nil {
		return nil, err
	}

	query := u.Query()
	// api key and query
	query.Set("wskey", c.apiKey)
	query.Set("query", params.Query)
	// pagination
	query.Set("rows", fmt.Sprint(params.Limit))
	query.Set("start", fmt.Sprint(params.Offset+1))
	// media filters
	query.Add("qf", "what:painting")
	query.Add("qf", "TYPE:IMAGE")
	query.Add("qf", "contentTier:(3 OR 4)")
	query.Add("qf", buildDataProviderQuery())
	query.Set("profile", "rich")
	//query.Set("sort", "score desc")

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

	var searchResponse SearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&searchResponse); err != nil {
		return nil, err
	}

	items := make([]museumhub.Artwork, 0, len(searchResponse.Items))

	for _, it := range searchResponse.Items {

		// avoid missing images
		imgUrl := it.GetImageUrl()
		thumbUrl := it.GetImagePreviewUrl()
		if imgUrl == "" || thumbUrl == "" {
			continue
		}

		items = append(items, museumhub.Artwork{
			ID:              it.ID,
			Title:           it.GetTitle(params.Locale),
			Author:          it.GetAuthor(params.Locale),
			Description:     it.GetDescription(params.Locale),
			Museum:          it.GetMuseum(),
			ImageURL:        imgUrl,
			ImagePreviewURL: thumbUrl,
			Year:            it.GetYear(),
			Source:          "europeana",
		})
	}

	pages := 0
	if searchResponse.ItemsCount > 0 {
		pages = (searchResponse.TotalResults + searchResponse.ItemsCount - 1) / searchResponse.ItemsCount
	}

	page := 0
	if params.Limit > 0 {
		page = (params.Offset / params.Limit) + 1
	}

	artworksResponse := &museumhub.ArtworksResponse{
		Total:   searchResponse.TotalResults,
		PerPage: searchResponse.ItemsCount,
		Items:   items,
		Pages:   pages,
		Page:    page,
	}

	return artworksResponse, nil
}
