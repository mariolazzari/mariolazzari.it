package museumhub

import (
	"fmt"
	"html"
	"regexp"
	"strings"
)

func IiifImageURL(imageID string, width int) string {
	if imageID == "" {
		return ""
	}

	// prefer smaller safe size first
	return fmt.Sprintf(
		"https://www.artic.edu/iiif/2/%s/full/%d,/0/default.jpg",
		imageID,
		width,
	)
}

func CleanDescription(s string) string {
	s = html.UnescapeString(s)

	re := regexp.MustCompile(`<[^>]*>`)
	s = re.ReplaceAllString(s, "")

	s = strings.ReplaceAll(s, "\n", " ")
	s = strings.TrimSpace(s)

	return s
}
