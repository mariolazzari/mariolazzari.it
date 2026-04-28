package main

import (
	"encoding/json"
	"net/http"
)

type HealthCheck struct {
	Status string `json:"status"`
}

func handleHealthCheck(w http.ResponseWriter, r *http.Request) {

	hc := HealthCheck{
		Status: "OK",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(hc)
}

func main() {

	//	server.ListenAndServe()

}
