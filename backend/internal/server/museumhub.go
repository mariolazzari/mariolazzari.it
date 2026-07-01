package server

import (
	"net/http"

	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub"
	"github.com/mariolazzari/mariolazzari.it/internal/server/museumhub/europeana"
)

func (s *Server) handleMuseumHubSearch(w http.ResponseWriter, r *http.Request) {
	query, ok := s.parseQuery(r, w, "query")
	if !ok {
		return
	}
	locale, ok := s.parseQuery(r, w, "locale")
	if !ok {
		return
	}

	limit, offset := s.extractPagination(r)

	euroClient := europeana.New(s.cfg.EuropeanaApiKey)
	artworks, err := euroClient.Search(r.Context(), museumhub.ArtworkSearch{
		Query:  query,
		Limit:  limit,
		Offset: offset,
		Locale: locale,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	s.encode(w, r, http.StatusOK, artworks)
}
