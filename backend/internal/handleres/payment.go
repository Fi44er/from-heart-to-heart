package handleres

import (
	"github.com/Fi44er/from-heart-to-heart/backend/internal/dto"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/services"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/gofiber/fiber/v2"
)

type PaymentHandler struct {
	service services.IPaymentService
}

func NewPaymentHandler(service services.IPaymentService) *PaymentHandler {
	return &PaymentHandler{service: service}
}

// CreatePayment godoc
// @Summary Create a new payment
// @Description Create a new payment and return the payment URL
// @Tags payments
// @Accept json
// @Produce json
// @Param payment body dto.PaymentDTO true "Payment request"
// @Success 200 {string} string
// @Router /payment [post]
func (h *PaymentHandler) CreatePayment(ctx *fiber.Ctx) error {
	data := new(dto.PaymentDTO)

	if err := ctx.BodyParser(data); err != nil {
		return response.Error(ctx, 400, err, "Invalid parametrs")
	}

	paymentURL, err := h.service.CreatePayment(ctx.Context(), data)
	if err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}

	return response.JSON(ctx, 200, paymentURL)
}
