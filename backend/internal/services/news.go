package services

import (
	"context"
	"strings"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/dto"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/models"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/repository"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/utils"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type INewsService interface {
	Create(ctx context.Context, news *dto.CreateNews) error
	GetAll(ctx context.Context) ([]models.News, error)
	GetByID(ctx context.Context, id string) (models.News, error)
	Update(ctx context.Context, news *dto.UpdateNews, id string) error
	Delete(ctx context.Context, id string) error
}

type NewsService struct {
	repo      repository.INewsRepository
	validator validator.Validate
}

func NewNewsService(repo repository.INewsRepository, validator validator.Validate) *NewsService {
	return &NewsService{
		repo:      repo,
		validator: validator,
	}
}

func (s *NewsService) Create(ctx context.Context, data *dto.CreateNews) error {
	if err := s.validator.Struct(data); err != nil {
		return &response.ErrorResponse{StatusCode: 400, Message: "validation error", Err: err}
	}

	lastDot := strings.LastIndex(data.Photo.Filename, ".")
	name := uuid.New().String() + data.Photo.Filename[lastDot:]
	if err := utils.UploadFile(data.Photo, "./images", name); err != nil {
		return err
	}

	news := models.News{
		Title:       data.Title,
		Description: data.Description,
		Photo:       name,
	}
	if err := s.repo.Create(ctx, &news); err != nil {
		return err
	}

	return nil
}

func (s *NewsService) GetAll(ctx context.Context) ([]models.News, error) {
	news, err := s.repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	return news, nil
}

func (s *NewsService) GetByID(ctx context.Context, id string) (models.News, error) {
	news, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			return models.News{}, &response.ErrorResponse{
				StatusCode: 404,
				Message:    "News not found",
				Err:        err,
			}
		}
		return models.News{}, err
	}
	return news, nil
}

func (s *NewsService) Update(ctx context.Context, data *dto.UpdateNews, id string) error {
	var name string
	if data.Photo != nil {
		news, err := s.repo.GetByID(ctx, id)
		if err != nil {
			if err.Error() != "mongo: no documents in result" {
				return err
			}
		}

		if err := utils.DeleteFile("./images/" + news.Photo); err != nil && news.Photo != "" {
			return err
		}

		lastDot := strings.LastIndex(data.Photo.Filename, ".")
		name = uuid.New().String() + data.Photo.Filename[lastDot:]
		if err := utils.UploadFile(data.Photo, "./images", name); err != nil {
			return err
		}
	}

	news := models.News{
		ID:          id,
		Title:       data.Title,
		Description: data.Description,
		Photo:       name,
	}

	if err := s.repo.Update(ctx, &news); err != nil {
		return err
	}
	return nil
}

func (s *NewsService) Delete(ctx context.Context, id string) error {
	news, err := s.repo.GetByID(ctx, id)
	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			return nil
		}
		return err
	}
	if err := s.repo.Delete(ctx, id); err != nil {
		return err
	}

	if news.Photo != "" {
		if err := utils.DeleteFile("./images/" + news.Photo); err != nil && news.Photo != "" {
			return err
		}
	}
	return nil
}
