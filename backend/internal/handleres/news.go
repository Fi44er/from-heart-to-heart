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

// GetAll godoc
// @Summary Get all news
// @Description Get a list of all news
// @Tags news
// @Accept json
// @Produce json
// @Router /news [get]
func (h *NewsHandler) GetAll(ctx *fiber.Ctx) error {
	context := ctx.Context()
	news, err := h.service.GetAll(context)
	if err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}
	return response.JSON(ctx, 200, news)
}

// Create godoc
// @Summary Create news
// @Description Create a new news item
// @Tags news
// @Accept multipart/form-data
// @Produce json
// @Param title formData string true "Title of the news"
// @Param description formData string true "Description of the news"
// @Param photo formData file true "Photo of the news"
// @Success 200 {string} string "OK"
// @Router /news [post]
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

// GetByID godoc
// @Summary Get news by ID
// @Description Get a news item by its ID
// @Tags news
// @Accept json
// @Produce json
// @Param id path string true "News ID"
// @Router /news/{id} [get]
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

// Update godoc
// @Summary Update news by ID
// @Description Update a news item by its ID
// @Tags news
// @Accept multipart/form-data
// @Produce json
// @Param id path string true "News ID"
// @Param title formData string false "Title of the news" // Изменено на false
// @Param description formData string false "Description of the news" // Изменено на false
// @Param photo formData file false "Photo of the news"
// @Success 200 {string} string "OK"
// @Router /news/{id} [put]
func (h *NewsHandler) Update(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	title := ctx.FormValue("title")
	description := ctx.FormValue("description")
	file, _ := ctx.FormFile("photo")

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

// Delete godoc
// @Summary Delete news
// @Description Delete a news item by its ID
// @Tags news
// @Accept  json
// @Produce  json
// @Param id path string true "ID новости"
// @Success 200 {string} string "OK"
// @Router /news/{id} [delete]
func (h *NewsHandler) Delete(ctx *fiber.Ctx) error {
	context := ctx.Context()
	id := ctx.Params("id")
	if err := h.service.Delete(context, id); err != nil {
		code, message := response.GetErroField(err)
		return response.Error(ctx, code, err, message)
	}
	return response.JSON(ctx, 200, "OK")
}
