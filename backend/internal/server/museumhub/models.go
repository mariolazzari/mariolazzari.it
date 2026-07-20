package museumhub

import (
	"context"
)

type ArtworkSearch struct {
	Query  string
	Limit  int
	Offset int
	Locale string
}

type Artwork struct {
	ID              string `json:"id"`
	Author          string `json:"author"`
	Title           string `json:"title"`
	Description     string `json:"description"`
	Museum          string `json:"museum"`
	ImageURL        string `json:"image_url"`
	ImagePreviewURL string `json:"image_preview_url"`
	Year            string `json:"year"`
	Source          string `json:"source"`
}

type ArtworksResponse struct {
	Total   int       `json:"total"`
	Page    int       `json:"page"`
	Pages   int       `json:"pages"`
	PerPage int       `json:"per_page"`
	Data    []Artwork `json:"data"`
}

type MuseumClient interface {
	Search(ctx context.Context, params ArtworkSearch) ([]Artwork, error)
	Name() string
}
