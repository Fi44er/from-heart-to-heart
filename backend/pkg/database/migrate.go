package database

import (
	"github.com/Fi44er/from-heart-to-heart/backend/internal/models"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	models := []interface{}{
		&models.User{},
		&models.News{},
	}

	if err := db.AutoMigrate(models...); err != nil {
		return err
	}

	return nil
}
