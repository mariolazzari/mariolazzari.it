package whitney

import "time"

type ArtworkResponse struct {
	Data []ArtworkData `json:"data"`
}

type ArtworkData struct {
	ID            string               `json:"id"`
	Type          string               `json:"type"`
	Attributes    ArtworkAttributes    `json:"attributes"`
	Relationships ArtworkRelationships `json:"relationships"`
}

type ArtworkAttributes struct {
	ID                int64       `json:"id"`
	TopgooseID        int64       `json:"topgoose_id"`
	PortfolioID       *int64      `json:"portfolio_id"`
	TmsID             int64       `json:"tms_id"`
	Title             string      `json:"title"`
	DisplayArtistText string      `json:"display_artist_text"`
	DisplayDate       string      `json:"display_date"`
	AccessionNumber   string      `json:"accession_number"`
	Dimensions        string      `json:"dimensions"`
	Medium            string      `json:"medium"`
	Department        string      `json:"department"`
	Classification    string      `json:"classification"`
	CreditLine        string      `json:"credit_line"`
	IsVirtual         bool        `json:"is_virtual"`
	IsPortfolio       bool        `json:"is_portfolio"`
	PortfolioTmsID    *int64      `json:"portfolio_tms_id"`
	Portfolio         *string     `json:"portfolio"`
	Edition           *string     `json:"edition"`
	PublicationInfo   *string     `json:"publication_info"`
	Description       string      `json:"description"`
	ObjectLabel       *string     `json:"object_label"`
	AIAltText         *string     `json:"ai_alt_text"`
	AltText           *string     `json:"alt_text"`
	VisualDescription *string     `json:"visual_description"`
	OnView            bool        `json:"on_view"`
	Popularity        float64     `json:"popularity"`
	CreatedAt         time.Time   `json:"created_at"`
	UpdatedAt         time.Time   `json:"updated_at"`
	Images            []ImageItem `json:"images"`
}

type ImageItem struct {
	ID  int64  `json:"id"`
	URL string `json:"url"`
}

type ArtworkRelationships struct {
	Artists ArtistRelationship `json:"artists"`
}

type ArtistRelationship struct {
	Data []ArtistRelationData `json:"data"`
}

type ArtistRelationData struct {
	ID   string `json:"id"`
	Type string `json:"type"`
}
