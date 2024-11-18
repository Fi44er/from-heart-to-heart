package app

import (
	"fmt"
	"os"
	"strconv"

	"github.com/Fi44er/from-heart-to-heart/backend/internal/handleres"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/repository"
	"github.com/Fi44er/from-heart-to-heart/backend/internal/services"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/database"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/midleware"
	"github.com/Fi44er/from-heart-to-heart/backend/pkg/response"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/swagger"
)

type App struct {
	app       *fiber.App
	db        database.Database
	validator validator.Validate
}

func NewApp(db database.Database, validator validator.Validate) *App {
	return &App{
		app:       fiber.New(),
		db:        db,
		validator: validator,
	}
}

func (s App) Run() error {
	s.app.Use(cors.New(cors.Config{
		AllowOrigins:     os.Getenv("CORS_ALLOW_ORIGINS"), // Укажите источник вашего клиента
		AllowCredentials: true,                            // Включение поддержки учетных данных
	}))

	if err := s.MapRoutes(); err != nil {
		log.Fatalf("MapRoutes Error: %v", err)
	}

	s.app.Get("/swagger/*", swagger.HandlerDefault)

	s.app.Get("/health", func(c *fiber.Ctx) error {
		response.JSON(c, 200, nil)
		return nil
	})

	port, _ := strconv.Atoi(os.Getenv("PORT"))

	log.Info("HTTP server is listening on PORT: ", port)
	if err := s.app.Listen(fmt.Sprintf(":%d", port)); err != nil {
		log.Fatalf("Running HTTP server: %v", err)
	}
	return nil
}

func (s App) GetApp() *fiber.App {
	return s.app
}

func (s App) MapRoutes() error {
	s.app.Static("/", "./images")

	v1 := s.app.Group("/api/v1")

	// ---
	newsRepo := repository.NewNewsRepository(s.db)
	newsService := services.NewNewsService(newsRepo, s.validator)
	newsHandler := handleres.NewNewsHandler(newsService)
	news := v1.Group("/news")

	news.Get("/", newsHandler.GetAll)
	news.Get("/:id", newsHandler.GetByID)
	news.Post("/", midleware.JWTProtected, newsHandler.Create)
	news.Put("/:id", midleware.JWTProtected, newsHandler.Update)
	news.Delete("/:id", midleware.JWTProtected, newsHandler.Delete)

	// ---
	paymentService := services.NewPaymentService(s.validator)
	paymentHandler := handleres.NewPaymentHandler(paymentService)
	payment := v1.Group("/payment")

	payment.Post("/", paymentHandler.CreatePayment)

	// ---
	userRepo := repository.NewUserRepository(s.db)
	authService := services.NewAuthService(s.validator, userRepo)
	authHandler := handleres.NewAuthHandler(authService)
	auth := v1.Group("/auth")
	auth.Post("/login", authHandler.Login)
	auth.Post("/logout", authHandler.Logout)
	auth.Post("/register", authHandler.Create)

	return nil
}
