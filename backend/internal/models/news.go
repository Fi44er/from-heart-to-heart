package models

type News struct {
	ID          string `bson:"_id,omitempty"`
	Title       string `bson:"title"`
	Description string `bson:"description"`
	Photo       string `bson:"photo"`
}
