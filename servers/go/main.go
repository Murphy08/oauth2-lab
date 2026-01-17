package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	godotenv.Load()

	port := os.Getenv("GO_SERVER_PORT")
	if port == "" {
		port = "9000"
	}

	router := gin.Default()

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "go-oauth2-server",
		})
	})

	log.Printf("Go OAuth2 Server running on port %s", port)
	router.Run(":" + port)
}
