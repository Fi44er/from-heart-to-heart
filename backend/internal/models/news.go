package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type News struct {
	ID          string `gorm:"primaryKey;type:varchar(36)" json:"id"`
	Title       string `gorm:"type:varchar(255);not null" json:"title"`
	Description string `gorm:"type:text" json:"description"`
	Photo       string `gorm:"type:varchar(255)" json:"photo"`
}

func (n *News) BeforeCreate(tx *gorm.DB) error {
	n.ID = uuid.New().String()
	return nil
}
