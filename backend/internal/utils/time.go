package utils

import (
	"fmt"
	"time"
)

// DurationToHuman converts a time.Duration to a human-readable string.
func DurationToHuman(d time.Duration) string {
	days := d / (24 * time.Hour)
	d -= days * 24 * time.Hour

	hours := d / time.Hour
	d -= hours * time.Hour

	minutes := d / time.Minute
	d -= minutes * time.Minute

	seconds := d / time.Second

	return fmt.Sprintf("%dd %dh %dm %ds", days, hours, minutes, seconds)
}

// TimeToHuman converts a time.Time to a human-readable string.
func TimeToHuman(t time.Time) string {
	return t.Format("1975-03-28 00:00:00")
}
