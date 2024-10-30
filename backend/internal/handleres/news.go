package handleres

import (
	"log"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/dto"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/services"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/gofiber/fiber/v2"
)

type NewsHandler struct {
	service services.INewsService
}

func NewNewsHandler(service services.INewsService) *NewsHandler {
	return &NewsHandler{service: service}
}

func (h *NewsHandler) GetAll(ctx *fiber.Ctx) error {
	context := ctx.Context()
	news, err := h.service.GetAll(context)
	if err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}
	return response.JSON(ctx, 200, news)
}

func (h *NewsHandler) Create(ctx *fiber.Ctx) error {

	title := ctx.FormValue("title")
	description := ctx.FormValue("description")
	file, err := ctx.FormFile("photo")
	log.Print(title, description)
	if err != nil {
		return response.Error(ctx, 400, err, "Failed to get file")
	}

	data := dto.CreateNews{
		Title:       title,
		Description: description,
		Photo:       file,
	}

	if err := h.service.Create(ctx.Context(), &data); err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}

	return response.JSON(ctx, 200, "OK")
}

func (h *NewsHandler) GetByID(ctx *fiber.Ctx) error {
	context := ctx.Context()
	id := ctx.Params("id")
	news, err := h.service.GetByID(context, id)
	if err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}
	return response.JSON(ctx, 200, news)
}

func (h *NewsHandler) Update(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	title := ctx.FormValue("title")
	description := ctx.FormValue("description")
	file, err := ctx.FormFile("photo")
	log.Print(title, description)
	if err != nil {
		return response.Error(ctx, 400, err, "Failed to get file")
	}

	data := dto.UpdateNews{
		Title:       title,
		Description: description,
		Photo:       file,
	}

	if err := h.service.Update(ctx.Context(), &data, id); err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}
	return response.JSON(ctx, 200, "OK")
}

func (h *NewsHandler) Delete(ctx *fiber.Ctx) error {
	context := ctx.Context()
	id := ctx.Params("id")
	if err := h.service.Delete(context, id); err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}
	return response.JSON(ctx, 200, "OK")
}
