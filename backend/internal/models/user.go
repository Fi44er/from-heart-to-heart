package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID       string `gorm:"primaryKey;type:varchar(36);not null" json:"id"`
	Username string `gorm:"unique;type:varchar(255);not null" json:"username"`
	Password string `gorm:"type:varchar(255);not null" json:"password"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New().String()
	return nil
}
