package logger

import (
	"log/slog"
	"os"
)

func New(env string) *slog.Logger {
	var level slog.Level

	switch env {
	case "prod":
		level = slog.LevelInfo
	case "dev":
		level = slog.LevelDebug
	default:
		level = slog.LevelInfo
	}

	opts := &slog.HandlerOptions{
		Level:     level,
		AddSource: env != "prod",
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			// optional: cleanup keys
			return a
		},
	}

	handler := slog.NewJSONHandler(os.Stdout, opts)

	logger := slog.New(handler)

	// global default
	slog.SetDefault(logger)

	return logger.With(
		// slog.String("service", ""),
		slog.String("env", env),
	)
}
