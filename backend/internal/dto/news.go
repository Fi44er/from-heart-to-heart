package dto

import "mime/multipart"

type CreateNews struct {
	Title       string                `json:"title" validate:"required"`
	Description string                `json:"description" validate:"required"`
	Photo       *multipart.FileHeader `json:"photo" validate:"required"`
}

type UpdateNews struct {
	Title       string                `json:"title"`
	Description string                `json:"description"`
	Photo       *multipart.FileHeader `json:"photo"`
}
