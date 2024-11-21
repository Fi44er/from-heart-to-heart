package models

type News struct {
	ID          string `bson:"_id,omitempty" json:"id"`
	Title       string `bson:"title" json:"title"`
	Description string `bson:"description" json:"description"`
	Photo       string `bson:"photo" json:"photo"`
}
