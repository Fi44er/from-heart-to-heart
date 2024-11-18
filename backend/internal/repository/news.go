package repository

import (
	"context"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/models"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/database"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	coll := r.db.Client.Database("from-heart-to-heart").Collection("news")
	_, err := coll.InsertOne(ctx, news)
	return err
}

func (r *NewsRepository) GetAll(ctx context.Context) ([]models.News, error) {
	coll := r.db.Client.Database("from-heart-to-heart").Collection("news")

	filter := bson.D{}
	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	var news []models.News
	if err = cursor.All(ctx, &news); err != nil {
		return nil, err
	}

	return news, nil
}

func (r *NewsRepository) GetByID(ctx context.Context, idHex string) (models.News, error) {
	coll := r.db.Client.Database("from-heart-to-heart").Collection("news")
	id, err := primitive.ObjectIDFromHex(idHex)

	if err != nil {
		return models.News{}, &response.ErrorResponse{
			StatusCode: 400,
			Message:    "Invalid ID",
			Err:        err,
		}
	}

	filter := bson.M{"_id": id}

	var news models.News
	if err := coll.FindOne(ctx, filter).Decode(&news); err != nil {
		return models.News{}, err
	}

	return news, nil
}

func (r *NewsRepository) Update(ctx context.Context, news *models.News) error {
	coll := r.db.Client.Database("from-heart-to-heart").Collection("news")
	id, _ := primitive.ObjectIDFromHex(news.ID)

	updateFields := utils.BsonFieldExtractor(news)
	filter := bson.D{{"_id", id}}
	_, err := coll.UpdateOne(ctx, filter, bson.M{"$set": updateFields})
	return err
}

func (r *NewsRepository) Delete(ctx context.Context, id string) error {
	coll := r.db.Client.Database("from-heart-to-heart").Collection("news")
	idHex, _ := primitive.ObjectIDFromHex(id)
	filter := bson.D{{"_id", idHex}}
	_, err := coll.DeleteOne(ctx, filter)
	return err
}
