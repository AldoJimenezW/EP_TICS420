package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	response := Response{Message: "Hello from Go backend!"}
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/api/hello", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
