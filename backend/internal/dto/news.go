package dto

import "mime/multipart"

type CreateNews struct {
	Title       string                `bson:"title" validate:"required"`
	Description string                `bson:"description" validate:"required"`
	Photo       *multipart.FileHeader `bson:"photo" validate:"required"`
}

type UpdateNews struct {
	Title       string                `bson:"title"`
	Description string                `bson:"description"`
	Photo       *multipart.FileHeader `bson:"photo"`
}
