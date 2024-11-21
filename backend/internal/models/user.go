package models

type User struct {
	ID       string `json:"_id,omitempty"`
	Username string `json:"username,unique"`
	Password string `json:"password"`
}
