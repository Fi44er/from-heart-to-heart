package main

import (
	"log"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/app"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/database"
	"github.com/go-playground/validator/v10"
)

func main() {
	client, err := database.Connect("mongodb://localhost:27017")
	if err != nil {
		log.Fatal(err)
	}
	defer database.Disconnect(client.Client)

	validator := validator.New()
	httpSvr := app.NewApp(*client, *validator)
	if err = httpSvr.Run(); err != nil {
		log.Fatal(err)
	}
}
