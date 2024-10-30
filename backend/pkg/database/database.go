package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	Client *mongo.Client
}

func Connect(uri string) (*Database, error) {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(uri))
	if err != nil {
		return nil, err
	}

	return &Database{Client: client}, nil
}

func Disconnect(client *mongo.Client) {
	if err := client.Disconnect(context.Background()); err != nil {
		log.Fatal(err)
	}
}
