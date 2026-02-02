package health

import "time"

type Health struct {
	Status    string    `json:"status"`
	Uptime    string    `json:"uptime"`
	Postgres  string    `json:"postgres,omitempty"`
	Redis     string    `json:"redis,omitempty"`
	Timestamp int64     `json:"timestamp,omitempty"`
	DateTime  time.Time `json:"date_time"`
}
