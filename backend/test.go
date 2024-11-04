package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/google/uuid"
)

const (
	yookassaURL       = "https://api.yookassa.ru/v3/payments"
	yookassaShopID    = "481201"                                           // Замените на ваш Shop ID
	yookassaSecretKey = "test_ycGB8uE3UV1mlIP4pGli_f_9ugaE_3YF737NeJz9Ads" // Замените на ваш Secret Key
)

type PaymentRequest struct {
	Amount       Amount       `json:"amount"`
	Description  string       `json:"description"`
	Confirmation Confirmation `json:"confirmation"`
	Capture      bool         `json:"capture"`
}

type Amount struct {
	Value    string `json:"value"`
	Currency string `json:"currency"`
}

type Confirmation struct {
	Type      string `json:"type"`
	ReturnURL string `json:"return_url"`
}

type PaymentResponse struct {
	Confirmation Confirmation `json:"confirmation"`
}

func main() {

	paymentRequest := PaymentRequest{}

	paymentRequest.Amount.Value = "1000.00" // Сумма платежа
	paymentRequest.Amount.Currency = "RUB"  // Валюта
	paymentRequest.Description = "Тестовый платеж"
	paymentRequest.Confirmation.Type = "redirect"                     // Тип подтверждения
	paymentRequest.Confirmation.ReturnURL = "https://www.example.com" // URL для редиректа
	paymentRequest.Capture = true                                     // Установка на true, если хотите захватить платеж сразу
	jsonData, err := json.Marshal(paymentRequest)

	if err != nil {
		fmt.Println("Ошибка при маршализации JSON:", err)
		return
	}

	req, err := http.NewRequest("POST", yookassaURL, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Ошибка при создании запроса:", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Basic "+basicAuth(yookassaShopID, yookassaSecretKey))
	req.Header.Set("Idempotence-Key", generateIdempotenceKey()) // Добавляем уникальный ключ

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Ошибка при отправке запроса:", err)
		return

	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Ошибка при чтении ответа:", err)
		return
	}

	var paymentResponse PaymentResponse
	if err := json.Unmarshal(body, &paymentResponse); err != nil {
		fmt.Println("Ошибка при разборе ответа:", err)
		return
	}

	log.Println(string(body))
}

func basicAuth(user, password string) string {
	auth := user + ":" + password
	return base64.StdEncoding.EncodeToString([]byte(auth))
}

func generateIdempotenceKey() string {
	return uuid.New().String()
}
