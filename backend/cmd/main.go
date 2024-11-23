package main

import (
	"log"

	_ "github.com/Fi44er/from-heart-to-heart/backend/docs"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/app"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/database"
	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
)

//	@title			From heart to heart API
//	@version		1.0
//	@description	This is a sample swagger for Fiber
//	@host			localhost:8080
//	@BasePath		/api/v1/

func main() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	db, err := database.ConnectDb()
	if err != nil {
		log.Fatalf("Connection error to database: %v", err)
	}

	if err = database.Migrate(db.Db); err != nil {
		log.Fatalf("Database migration failed: %v", err)
	}

	validator := validator.New()

	httpSvr := app.NewApp(db, *validator)
	if err = httpSvr.Run(); err != nil {
		log.Fatal(err)
	}
}
