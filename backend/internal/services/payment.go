package services

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/dto"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

const (
	yookassaURL       = "https://api.yookassa.ru/v3/payments"
	yookassaShopID    = "481201"                                           // Замените на ваш Shop ID
	yookassaSecretKey = "test_ycGB8uE3UV1mlIP4pGli_f_9ugaE_3YF737NeJz9Ads" // Замените на ваш Secret Key
)

type IPaymentService interface {
	CreatePayment(ctx context.Context, data *dto.PaymentDTO) (string, error)
}

type PaymentService struct {
	validator validator.Validate
}

func NewPaymentService(validator validator.Validate) *PaymentService {
	return &PaymentService{
		validator: validator,
	}
}

func (s *PaymentService) CreatePayment(ctx context.Context, dtoReq *dto.PaymentDTO) (string, error) {
	if err := s.validator.Struct(dtoReq); err != nil {
		return "", &response.ErrorResponse{StatusCode: 400, Message: "validation error", Err: err}
	}

	main_page := os.Getenv("HOME_PAGE")

	data := dto.PaymentRequest{
		Amount: dto.Amount{
			Value:    dtoReq.Value,
			Currency: "RUB",
		},
		Description:  dtoReq.Description,
		Confirmation: dto.Confirmation{Type: "redirect", ReturnURL: main_page},
		Capture:      true,
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", yookassaURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Basic "+basicAuth(yookassaShopID, yookassaSecretKey))
	req.Header.Set("Idempotence-Key", generateIdempotenceKey()) // Добавляем уникальный ключ

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	if resp.StatusCode != http.StatusOK {
		return "", &response.ErrorResponse{StatusCode: resp.StatusCode, Message: "Err yookassa", Err: nil}
	}

	var paymentResponse dto.PaymentResponse
	if err := json.Unmarshal(body, &paymentResponse); err != nil {
		return "", err
	}

	return paymentResponse.Confirmation.ConfirmationURL, nil
}

func basicAuth(user, password string) string {
	auth := user + ":" + password
	return base64.StdEncoding.EncodeToString([]byte(auth))
}

func generateIdempotenceKey() string {
	return uuid.New().String()
}
