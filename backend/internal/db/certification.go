package db

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/models"
)

type CertificationRepository struct {
	pool *pgxpool.Pool
}

func NewCertificationRepository(pool *pgxpool.Pool) *CertificationRepository {
	return &CertificationRepository{pool: pool}
}

const getCertsQry = `SELECT id, title, image_src, date, url, created_at, updated_at 
					FROM certifications 
					OREDER BY date DESC
				`

const getCertQry = `SELECT id, title, image_src, date, url, created_at, updated_at 
					FROM certifications 
					WHERE id = $1;
					`

const addCertQry = `INSERT INTO certifications (title, image_src, date, url, created_at, updated_at) 
					VALUES ($1, $2, $3, $4, NOW(), NOW()) 
					RETURNING id, title, image_src, date, url, created_at, updated_at;	
					`
const updateCertQry = `UPDATE certifications 
		 				 SET title = COALESCE(NULLIF($1, ''), title),
		     				image_src = COALESCE(NULLIF($2, ''), image_src),
		     				date = COALESCE(NULLIF($3::TIMESTAMP, '0001-01-01'::TIMESTAMP), date),
		     				url = COALESCE(NULLIF($4, ''), url),
		     				updated_at = NOW()
						 WHERE id = $5
						 RETURNING id, title, image_src, date, url, created_at, updated_at;
						`
const delCertQry = `DELETE FROM certifications 
					WHERE id = $1;
					`

// ListByUser retrieves all certifications for a specific user
func (r *CertificationRepository) ReadAll(ctx context.Context) ([]*models.Certification, error) {
	rows, err := r.pool.Query(ctx, getCertsQry)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	certs := []*models.Certification{}
	for rows.Next() {
		c := &models.Certification{}
		if err := rows.Scan(
			&c.ID,
			&c.Title,
			&c.ImageSrc,
			&c.Date,
			&c.URL,
			&c.CreatedAt,
			&c.UpdatedAt,
		); err != nil {
			return nil, err
		}
		certs = append(certs, c)
	}

	return certs, nil
}

// GetByID retrieves a certification by ID
func (r *CertificationRepository) Read(ctx context.Context, id int) (*models.Certification, error) {
	cert := &models.Certification{}
	err := r.pool.QueryRow(ctx, getCertQry, id).Scan(
		&cert.ID,
		&cert.Title,
		&cert.ImageSrc,
		&cert.Date,
		&cert.URL,
		&cert.CreatedAt,
		&cert.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return cert, nil
}

// Create adds a new certification and returns its ID
func (r *CertificationRepository) Create(ctx context.Context, cert *models.Certification) (int, error) {
	var id int
	err := r.pool.QueryRow(ctx, addCertQry,
		cert.Title,
		cert.ImageSrc,
		cert.Date,
		cert.URL,
		cert.CreatedAt,
		cert.UpdatedAt,
	).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

// Update modifies an existing certification by ID
func (r *CertificationRepository) Update(ctx context.Context, cert *models.Certification) error {
	cmdTag, err := r.pool.Exec(ctx, updateCertQry,
		cert.Title,
		cert.ImageSrc,
		cert.Date,
		cert.URL,
		cert.ID,
	)
	if err != nil {
		return err
	}
	if cmdTag.RowsAffected() == 0 {
		return errors.New("no certification found to update")
	}
	return nil
}

// Delete removes a certification by ID
func (r *CertificationRepository) Delete(ctx context.Context, id int) error {
	cmdTag, err := r.pool.Exec(ctx, delCertQry, id)
	if err != nil {
		return err
	}
	if cmdTag.RowsAffected() == 0 {
		return errors.New("no certification found to delete")
	}
	return nil
}
