package main

import (
	"log"
	"os"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/app"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/database"
	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
	client, err := database.Connect(os.Getenv("MONGODB_URI"))
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
