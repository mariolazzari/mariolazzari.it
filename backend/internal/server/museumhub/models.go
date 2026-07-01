package museumhub

type ArtworkSearch struct {
	Query  string
	Limit  int
	Offset int
	Locale string
}

type Artwork struct {
	ID              string `json:"id"`
	Title           string `json:"title"`
	Description     string `json:"description"`
	Museum          string `json:"museum"`
	ImageURL        string `json:"image_url"`
	ImagePreviewURL string `json:"image_preview_url"`
	Source          string `json:"source"`
}

type ArtworksResponse struct {
	Total   int       `json:"total"`
	PerPage int       `json:"per_page"`
	Page    int       `json:"page"`
	Pages   int       `json:"pages"`
	Items   []Artwork `json:"items"`
}
