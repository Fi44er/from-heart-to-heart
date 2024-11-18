package repository

import (
	"context"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/models"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/database"
	"go.mongodb.org/mongo-driver/bson"
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
	coll := r.db.Client.Database("from-heart-to-heart").Collection("users")
	_, err := coll.InsertOne(ctx, user)
	return err
}

func (r *UserRepository) GetByUsername(ctx context.Context, username string) (models.User, error) {
	coll := r.db.Client.Database("from-heart-to-heart").Collection("users")
	filter := bson.M{"username": username}
	var user models.User
	if err := coll.FindOne(ctx, filter).Decode(&user); err != nil {
		return models.User{}, err
	}
	return user, nil
}
