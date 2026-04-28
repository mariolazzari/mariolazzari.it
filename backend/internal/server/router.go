package server

import "net/http"

func (s *Server) registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/v1/system/heatlh", s.getSystemHealth)

	
}
