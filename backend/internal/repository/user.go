package repository

import (
	"context"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/models"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/database"
)

type IUserRepository interface {
	Create(ctx context.Context, user *models.User) error
	GetByUsername(ctx context.Context, username string) (models.User, error)
}

type UserRepository struct {
	db database.Database
}

func NewUserRepository(db database.Database) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(ctx context.Context, user *models.User) error {
	if err := r.db.Db.Create(user).Error; err != nil {
		return err
	}
	return nil
}

func (r *UserRepository) GetByUsername(ctx context.Context, username string) (models.User, error) {
	var user models.User
	if err := r.db.Db.Where("username = ?", username).First(&user).Error; err != nil {
		return user, err
	}
	return user, nil
}
