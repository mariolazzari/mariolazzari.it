-- ==========
-- Museum Hub
-- ==========

CREATE SCHEMA IF NOT EXISTS museumhub;

CREATE TABLE museumhub.artworks (
    id                VARCHAR(255) PRIMARY KEY, -- o UUID se usi identificativi univoci generati
    author            VARCHAR(255) NOT NULL,
    title             VARCHAR(255) NOT NULL,
    description       TEXT NOT NULL,
    museum            VARCHAR(255) NOT NULL,
    image_url         TEXT NOT NULL,
    image_preview_url TEXT NOT NULL,
    year              VARCHAR(50) NOT NULL,    -- stringa per gestire formati come "ca. 1503" o range
    source            VARCHAR(255) NOT NULL,
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_artworks_museum ON museumhub.artworks(museum);

CREATE TABLE museumhub.queries (
    query       TEXT PRIMARY KEY,
    count       INTEGER DEFAULT 1 NOT NULL,
    last_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);