package db

import (
	"context"

	"github.com/go-redis/redis"
)

func ConnectRedis(ctx context.Context, conn string) {
	opts := redis.Options{
		Addr:     conn,
		Password: "",
		DB:       0,
	}

	rdc := redis.NewClient(&opts)

	defer rdc.Close()

}
