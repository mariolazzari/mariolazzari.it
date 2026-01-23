-- name: CreateCertification :one
INSERT INTO certifications (title, url, image_src, date)
VALUES ($1, $2, $3, $4)
RETURNING id, title, url, image_src, date, created_at, updated_at;

-- name: GetCertificationByID :one
SELECT id, title, url, image_src, date, created_at, updated_at
FROM certifications
WHERE id = $1;

-- name: ListCertifications :many
SELECT id, title, url, image_src, date, created_at, updated_at
FROM certifications
ORDER BY date DESC
LIMIT $1 OFFSET $2;

-- name: ListAllCertifications :many
SELECT id, title, url, image_src, date, created_at, updated_at
FROM certifications
ORDER BY date DESC;

-- name: UpdateCertification :one
UPDATE certifications
SET title = $2, url = $3, image_src = $4, date = $5, updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING id, title, url, image_src, date, created_at, updated_at;

-- name: DeleteCertification :exec
DELETE FROM certifications
WHERE id = $1;

-- name: CountCertifications :one
SELECT COUNT(*) as count
FROM certifications;