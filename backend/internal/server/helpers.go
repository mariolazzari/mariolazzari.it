package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

// decode reads the request body into the provided destination 'v'.
// It enforces security constraints such as body size limits and strict field matching.
// func (s *Server) decode(w http.ResponseWriter, r *http.Request, v any) error {
// 	// Limit the request body size to 1MB to prevent Denial of Service (DoS) attacks.
// 	// http.MaxBytesReader will return an error if the client sends a larger payload.
// 	r.Body = http.MaxBytesReader(w, r.Body, 1024*1024)
// 	defer r.Body.Close()

// 	dec := json.NewDecoder(r.Body)

// 	// Force an error if the JSON contains fields not defined in the target struct.
// 	// This ensures strict contract adherence and prevents "garbage" data injection.
// 	dec.DisallowUnknownFields()

// 	if err := dec.Decode(v); err != nil {
// 		s.log.Warn("json decode failed",
// 			"remote_addr", r.RemoteAddr,
// 			"path", r.URL.Path,
// 			"error", err,
// 		)
// 		return fmt.Errorf("decode json: %w", err)
// 	}

// 	// Ensure the request body contains only a single JSON object.
// 	// We attempt to decode a second empty struct; if it doesn't return io.EOF,
// 	// it means there is extra trailing data in the body.
// 	err := dec.Decode(&struct{}{})
// 	if err != io.EOF {
// 		return fmt.Errorf("request body must only contain a single JSON object")
// 	}

// 	return nil
// }

// encode writes a JSON response with the specified HTTP status code.
func (s *Server) encode(w http.ResponseWriter, r *http.Request, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(v); err != nil {
		s.log.Error("json encode failed",
			"path", r.URL.Path,
			"error", err,
		)
	}
}

// extractPagination extracts and validates both limit and offset from query string.
// ex: /remarks?limit=10&offset=20
func (s *Server) extractPagination(r *http.Request) (int, int) {
	q := r.URL.Query()

	// Limit
	limit, err := strconv.Atoi(q.Get("limit"))
	if err != nil || limit <= 0 {
		// default limit 10
		limit = 10
	}

	// Max 100 records
	if limit > 100 {
		limit = 100
	}

	// Offset
	offset, err := strconv.Atoi(q.Get("offset"))
	if err != nil || offset < 0 {
		// default offset 0
		offset = 0
	}

	return limit, offset
}

func (s *Server) parseQuery(r *http.Request, w http.ResponseWriter, key string) (string, bool) {
	qry := r.URL.Query().Get(key)
	qry = strings.TrimSpace(qry)

	if qry == "" {
		msg := fmt.Sprintf("missing %s parameter", qry)
		s.log.Error(msg)
		http.Error(w, msg, http.StatusBadRequest)
		return "", false
	}
	return qry, true
}
