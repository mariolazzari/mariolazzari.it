package utils

import (
	"log"
	"strconv"
)

func ParseInt(val string, def int) int {
	i, err := strconv.Atoi(val)
	if err != nil {
		log.Printf("Warning: invalid integer %q, using default %d", val, def)
		return def
	}
	return i
}
