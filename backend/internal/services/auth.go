package services

import (
	"context"
	"log"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/dto"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/models"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/repository"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/utils"
	"github.com/go-playground/validator/v10"
)

type IAuthService interface {
	Login(ctx context.Context, data *dto.User) (string, error)
	Create(ctx context.Context, user *models.User) error
}

type AuthService struct {
	validator validator.Validate
	repo      repository.IUserRepository
}

func NewAuthService(validator validator.Validate, repo repository.IUserRepository) *AuthService {
	return &AuthService{
		validator: validator,
		repo:      repo,
	}
}

func (s *AuthService) Login(ctx context.Context, data *dto.User) (string, error) {
	if err := s.validator.Struct(data); err != nil {
		return "", &response.ErrorResponse{StatusCode: 400, Message: "validation error", Err: err}
	}
	user, err := s.repo.GetByUsername(ctx, data.Username)
	if err != nil {
		return "", err
	}
	if user.ID == "" {
		return "", &response.ErrorResponse{StatusCode: 404, Message: "user not found"}
	}

	if !utils.ComparePassword(user.Password, data.Password) {
		log.Println(user.Password, data.Password)
		return "", err
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (s *AuthService) Create(ctx context.Context, user *models.User) error {
	user.Password = utils.GeneratePassword(user.Password)
	if err := s.repo.Create(ctx, user); err != nil {
		return err
	}

	return nil
}
