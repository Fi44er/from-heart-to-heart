package response

import (
	"github.com/gofiber/fiber/v2"
)

func Error(ctx *fiber.Ctx, status int, err error, message string) error {
	errorRes := map[string]interface{}{
		"message": message,
	}

	return ctx.Status(status).JSON(Response{
		Error: errorRes,
	})
}

type ErrorResponse struct {
	StatusCode int
	Message    string
	Err        error
}

func (e *ErrorResponse) Error() string {
	return e.Message
}

func GetErroField(err error) (int, string) {
	if errWrap, ok := err.(*ErrorResponse); ok {
		return errWrap.StatusCode, errWrap.Message
	}
	return 500, "Something went wrong"
}
