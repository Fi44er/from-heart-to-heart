package repository

import (
	"context"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/models"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/database"
	"gorm.io/gorm"
)

type INewsRepository interface {
	Create(ctx context.Context, news *models.News) error
	GetAll(ctx context.Context) ([]models.News, error)
	GetByID(ctx context.Context, id string) (models.News, error)
	Update(ctx context.Context, news *models.News) error
	Delete(ctx context.Context, id string) error
}

type NewsRepository struct {
	db database.Database
}

func NewNewsRepository(db database.Database) *NewsRepository {
	return &NewsRepository{db: db}
}

func (r *NewsRepository) Create(ctx context.Context, news *models.News) error {
	if err := r.db.Db.Create(news).Error; err != nil {
		return err
	}
	return nil
}

func (r *NewsRepository) GetAll(ctx context.Context) ([]models.News, error) {
	var news []models.News
	if err := r.db.Db.Find(&news).Error; err != nil {
		return nil, err
	}
	return news, nil
}

func (r *NewsRepository) GetByID(ctx context.Context, id string) (models.News, error) {
	var news models.News
	if err := r.db.Db.Where("id = ?", id).First(&news).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return news, nil
		}
		return news, err
	}
	return news, nil
}

func (r *NewsRepository) Update(ctx context.Context, news *models.News) error {
	if err := r.db.Db.Model(news).Updates(news).Error; err != nil {
		return err
	}
	return nil
}

func (r *NewsRepository) Delete(ctx context.Context, id string) error {
	if err := r.db.Db.Where("id = ?", id).Delete(&models.News{}).Error; err != nil {
		return err
	}
	return nil
}
