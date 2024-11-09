package midleware

import (
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/utils"
	"github.com/gofiber/fiber/v2"
)

func JWTProtected(ctx *fiber.Ctx) error {
	token := ctx.Cookies("token")

	if token == "" {
		return response.Error(ctx, 401, nil, "unauthorized")
	}

	bool, err := utils.VerifyToken(token)
	if err != nil || !bool {
		return response.Error(ctx, 401, err, "unauthorized")
	}

	return ctx.Next()
}
