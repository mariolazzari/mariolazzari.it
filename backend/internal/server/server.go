package server

import (
	"net/http"
	"time"
)

type Server struct {
}

func New() *http.Server {

	mux := http.NewServeMux()
	

	return &http.Server{
		Addr:         ":4001",
		Handler:      NewRouter(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

}
