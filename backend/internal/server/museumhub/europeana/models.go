package europeana

type DefValue struct {
	Def string `json:"def"`
}

type LangAware = map[string][]string

type Item struct {
	ID                           string     `json:"id"`
	GUID                         string     `json:"guid"`
	Link                         string     `json:"link"`
	Type                         string     `json:"type"`
	Index                        int        `json:"index"`
	Score                        float64    `json:"score"`
	Completeness                 int        `json:"completeness"`
	Title                        []string   `json:"title"`
	Country                      []string   `json:"country"`
	Provider                     []string   `json:"provider"`
	DataProvider                 []string   `json:"dataProvider"`
	Language                     []string   `json:"language"`
	DCLanguage                   []string   `json:"dcLanguage"`
	DCCreator                    []string   `json:"dcCreator"`
	DCDescription                []string   `json:"dcDescription"`
	EDMConcept                   []string   `json:"edmConcept"`
	EDMDatasetName               []string   `json:"edmDatasetName"`
	EuropeanaCollectionName      []string   `json:"europeanaCollectionName"`
	EDMIsShownAt                 []string   `json:"edmIsShownAt"`
	EDMIsShownBy                 []string   `json:"edmIsShownBy"`
	EDMPreview                   []string   `json:"edmPreview"`
	Rights                       []string   `json:"rights"`
	Year                         []string   `json:"year"`
	UGC                          []bool     `json:"ugc"`
	PreviewNoDistribute          bool       `json:"previewNoDistribute"`
	Timestamp                    int64      `json:"timestamp"`
	TimestampCreated             string     `json:"timestamp_created"`
	TimestampCreatedEpoch        int64      `json:"timestamp_created_epoch"`
	TimestampUpdated             string     `json:"timestamp_update"`
	TimestampUpdatedEpoch        int64      `json:"timestamp_update_epoch"`
	DCTitleLangAware             LangAware  `json:"dcTitleLangAware"`
	DCCreatorLangAware           LangAware  `json:"dcCreatorLangAware"`
	DCDescriptionLangAware       LangAware  `json:"dcDescriptionLangAware"`
	DCLanguageLangAware          LangAware  `json:"dcLanguageLangAware"`
	EDMConceptPrefLabelLangAware LangAware  `json:"edmConceptPrefLabelLangAware"`
	EDMPlaceLabelLangAware       LangAware  `json:"edmPlaceLabelLangAware"`
	EDMTimespanLabelLangAware    LangAware  `json:"edmTimespanLabelLangAware"`
	EDMConceptLabel              []DefValue `json:"edmConceptLabel"`
	EDMPlaceLabel                []DefValue `json:"edmPlaceLabel"`
	EDMTimespanLabel             []DefValue `json:"edmTimespanLabel"`
	EDMPlaceLatitude             []string   `json:"edmPlaceLatitude"`
	EDMPlaceLongitude            []string   `json:"edmPlaceLongitude"`
}

func (i Item) GetTitle(lang string) string {
	// localized
	if titles, ok := i.DCTitleLangAware[lang]; ok && len(titles) > 0 {
		return titles[0]
	}

	// original as fallback
	if len(i.Title) > 0 {
		return i.Title[0]
	}

	return ""
}

func (i Item) GetDescription(lang string) string {
	// localized
	if desc, ok := i.DCDescriptionLangAware[lang]; ok && len(desc) > 0 {
		return desc[0]
	}

	// original as fallback
	if len(i.DCDescription) > 0 {
		return i.DCDescription[0]
	}

	return ""
}

func (i Item) GetAuthor(lang string) string {
	// localized
	if desc, ok := i.DCCreatorLangAware[lang]; ok && len(desc) > 0 {
		return desc[0]
	}

	// original as fallback
	if len(i.DCCreator) > 0 {
		return i.DCCreator[0]
	}

	return ""
}

func (i Item) GetMuseum() string {
	if len(i.DataProvider) > 0 {
		return i.DataProvider[0]
	}

	return ""
}

func (i Item) GetImageUrl() string {
	if len(i.EDMIsShownBy) > 0 {
		return i.EDMIsShownBy[0]
	}

	return ""
}

func (i Item) GetImagePreviewUrl() string {
	if len(i.EDMPreview) > 0 {
		return i.EDMPreview[0]
	}

	return ""
}

func (i Item) GetYear() string {
	if len(i.Year) > 0 {
		return i.Year[0]
	}

	return ""
}

type SearchResponse struct {
	Success       bool   `json:"succcess"`
	RequestNumber int    `json:"requestNumber"`
	ItemsCount    int    `json:"itemsCount"`
	TotalResults  int    `json:"totalResults"`
	Items         []Item `json:"items"`
}
