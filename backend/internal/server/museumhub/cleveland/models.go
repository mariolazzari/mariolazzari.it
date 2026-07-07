package cleveland

// APIResponse represents the root structure of the JSON payload.
type APIResponse struct {
	Info Info   `json:"info"`
	Data []Item `json:"data"`
}

// Info holds pagination and search parameters metadata.
type Info struct {
	Total      int        `json:"total"`
	Parameters Parameters `json:"parameters"`
}

// Parameters contains the filter and query criteria used for the search.
type Parameters struct {
	Skip     int    `json:"skip"`
	Limit    int    `json:"limit"`
	Q        string `json:"q"`
	HasImage string `json:"has_image"` // Note: this is a string "1" in the JSON
	Select   string `json:"select"`
	Search   string `json:"search"`
}

// Item represents a single artwork entry in the data collection.
type Item struct {
	ID                    int       `json:"id"`
	AccessionNumber       string    `json:"accession_number"`
	Title                 string    `json:"title"`
	CreationDateLatest    int       `json:"creation_date_latest"`
	Description           *string   `json:"description"` // Can be null
	Images                Images    `json:"images"`
	HasConservationImages bool      `json:"has_conservation_images"`
	Creators              []Creator `json:"creators"`
	Type                  string    `json:"type"`
}

// Images groups the different formats available for the artwork illustrations.
type Images struct {
	Annotation *string    `json:"annotation"` // Can be null or string
	Web        ImageSpecs `json:"web"`
	Print      ImageSpecs `json:"print"`
	Full       ImageSpecs `json:"full"`
}

type Creator struct {
	ID                     int     `json:"id"`
	Description            string  `json:"description"`
	Extent                 *string `json:"extent"`    // Can be null
	Qualifier              *string `json:"qualifier"` // Can be null
	Role                   string  `json:"role"`
	Biography              string  `json:"biography"`
	NameInOriginalLanguage *string `json:"name_in_original_language"` // Can be null
	BirthYear              string  `json:"birth_year"`                // Note: string in JSON
	DeathYear              string  `json:"death_year"`                // Note: string in JSON
	UseInCaption           bool    `json:"use_in_caption"`
	IncludeExtent          bool    `json:"include_extent"`
	Weight                 int     `json:"weight"`
}

// ImageSpecs details the dimensions, size, and source location of an image file.
type ImageSpecs struct {
	URL      string `json:"url"`
	Width    string `json:"width"`    // Note: numeric string in JSON
	Height   string `json:"height"`   // Note: numeric string in JSON
	Filesize string `json:"filesize"` // Note: numeric string in JSON
	Filename string `json:"filename"`
}
