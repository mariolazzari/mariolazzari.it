# Build stage
FROM golang:1.26-alpine AS builder
WORKDIR /app/backend
RUN apk add --no-cache git ca-certificates
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server ./cmd/api

# Runner stage
FROM alpine:3.20
WORKDIR /app/backend
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/backend/server .
EXPOSE 8080
CMD ["./server"]