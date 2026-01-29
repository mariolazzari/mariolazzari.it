package models

import "time"

// Certification represents a certification table
type Certification struct {
	ID        int64     `json:"id" db:"id"`
	Title     string    `json:"title" db:"title"`
	ImageSrc  string    `json:"image_src" db:"image_src"`
	Date      time.Time `json:"date" db:"date"`
	URL       string    `json:"url" db:"url"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// CertificationCreateInput represents input for creating a certification
type CertificationCreateInput struct {
	Title    string    `json:"title" binding:"required,max=255"`
	ImageSrc string    `json:"image_src" binding:"required"`
	Date     time.Time `json:"date" binding:"required"`
	URL      string    `json:"url" binding:"required,url"`
}

// CertificationUpdateInput represents input for updating a certification
type CertificationUpdateInput struct {
	Title    string    `json:"title"`
	ImageSrc string    `json:"image_src"`
	Date     time.Time `json:"date"`
	URL      string    `json:"url"`
}
