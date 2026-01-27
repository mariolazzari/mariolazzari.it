package utils

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ParamType is a constraint for types we support
type ParamType interface {
	int | int64 | float64 | string
}

// GetParam parses a URL param into the requested type T.
// Returns the value and true if successful; otherwise sends 400 response and returns false.
func GetParam[T ParamType](c *gin.Context, param string) (T, bool) {
	var zero T

	valueStr := c.Param(param)
	if valueStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("missing param %s", param)})
		return zero, false
	}

	switch any(zero).(type) {
	case int:
		v, err := strconv.Atoi(valueStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("invalid param %s: %v", param, err)})
			return zero, false
		}
		return any(v).(T), true

	case int64:
		v, err := strconv.ParseInt(valueStr, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("invalid param %s: %v", param, err)})
			return zero, false
		}
		return any(v).(T), true

	case float64:
		v, err := strconv.ParseFloat(valueStr, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("invalid param %s: %v", param, err)})
			return zero, false
		}
		return any(v).(T), true

	case string:
		return any(valueStr).(T), true

	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("unsupported param type for %s", param)})
		return zero, false
	}
}
