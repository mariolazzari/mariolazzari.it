package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/config"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
)

func main() {
	// read env variables
	cfg := config.Load()

	// connect postgres
	postgres := db.Connect(cfg.PosgresURL)
	defer postgres.Close()

	// setup gin router
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// create router
	router := gin.Default()
	router.SetTrustedProxies([]string{cfg.Host})

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "OK",
		})
	})

	router.Run(fmt.Sprintf("%s:%s", cfg.Host, cfg.Port))
}
