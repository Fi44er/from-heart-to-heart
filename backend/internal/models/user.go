package models

type User struct {
	ID       string `bson:"_id,omitempty"`
	Username string `bson:"username,unique"`
	Password string `bson:"password"`
}
