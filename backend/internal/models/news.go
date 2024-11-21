package models

type News struct {
	ID          string `json:"_id,omitempty"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Photo       string `json:"photo"`
}
