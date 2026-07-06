package chicago

type SearchResponse struct {
	Data []struct {
		ID int `json:"id"`
	} `json:"data"`
}

type ArtworkResponse struct {
	Data []struct {
		ID          int    `json:"id"`
		Title       string `json:"title"`
		ArtistTitle string `json:"artist_title"`
		DateDisplay string `json:"date_display"`
		ImageID     string `json:"image_id"`
		Description string `json:"description"`
	} `json:"data"`
}
