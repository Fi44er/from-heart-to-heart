package handleres

import (
	"os"
	"strconv"
	"time"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/dto"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/models"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/services"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/gofiber/fiber/v2"
)

type AuthHandler struct {
	service services.IAuthService
}

func NewAuthHandler(service services.IAuthService) *AuthHandler {
	return &AuthHandler{service: service}
}

// Login godoc
// @Summary Login
// @Description Logs in a user
// @Tags auth
// @Accept json
// @Produce json
// @Param user body dto.User true "User  credentials"
// @Success 200 {string} string "OK"
// @Router /auth/login [post]
func (h *AuthHandler) Login(ctx *fiber.Ctx) error {
	user := new(dto.User)

	if err := ctx.BodyParser(user); err != nil {
		return response.JSON(ctx, 400, "Failed to get body")
	}

	token, err := h.service.Login(ctx.Context(), user)
	if err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}

	hour, _ := strconv.Atoi(os.Getenv("JWT_EXP"))

	ctx.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * time.Duration(hour)),
		HTTPOnly: true,
		Secure:   true,
	})

	return response.JSON(ctx, 200, "OK")
}

// Logout godoc
// @Summary Logout
// @Description Logs out a user
// @Tags auth
// @Accept json
// @Produce json
// @Success 200 {string} string "OK"
// @Router /auth/logout [post]
func (h *AuthHandler) Logout(ctx *fiber.Ctx) error {
	ctx.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		Secure:   true,
	})
	return response.JSON(ctx, 200, "OK")
}

// Create godoc
// @Summary Create user
// @Description Create a new user
// @Tags auth
// @Accept json
// @Produce json
// @Param user body models.User true "User  credentials"
// @Success 200 {string} string "OK"
// @Router /auth/register [post]
func (h *AuthHandler) Create(ctx *fiber.Ctx) error {
	user := new(models.User)

	if err := ctx.BodyParser(user); err != nil {
		return response.JSON(ctx, 400, "Failed to get body")
	}

	if err := h.service.Create(ctx.Context(), user); err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}
	return response.JSON(ctx, 200, "OK")
}
