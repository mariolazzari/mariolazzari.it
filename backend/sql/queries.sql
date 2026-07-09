-- ==========
-- Museum Hub
-- ==========

-- name: UpsertArtwork :one
INSERT INTO museumhub.artworks (
    id, 
    author, 
    title, 
    description, 
    museum, 
    image_url, 
    image_preview_url, 
    year, 
    source
) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
ON CONFLICT (id) DO UPDATE SET
    author            = EXCLUDED.author,
    title             = EXCLUDED.title,
    description       = EXCLUDED.description,
    museum            = EXCLUDED.museum,
    image_url         = EXCLUDED.image_url,
    image_preview_url = EXCLUDED.image_preview_url,
    year              = EXCLUDED.year,
    source            = EXCLUDED.source
RETURNING id, author, title, description, museum, image_url, image_preview_url, year, source, created_at, updated_at;

-- name: UpsertSearchQuery :one
INSERT INTO museumhub.search_stats (query, count)
VALUES (@query_text::text, 1)
ON CONFLICT (query) DO UPDATE SET
    count = museumhub.search_stats.count + 1
RETURNING query, count, last_update;

-- name: SearchArtworks :many
SELECT id, author, title, description, museum, image_url, image_preview_url, year, source, created_at, updated_at
FROM museumhub.artworks
WHERE to_tsvector('simple', author || ' ' || title || ' ' || description || ' ' || museum) @@ websearch_to_tsquery('simple', @search_term::text);