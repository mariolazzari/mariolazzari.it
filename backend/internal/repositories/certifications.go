package repositories

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/models"
)

type CertificationsRepository struct {
	pool *pgxpool.Pool
}

func NewCertificationsRepository(pool *pgxpool.Pool) *CertificationsRepository {
	return &CertificationsRepository{
		pool: pool,
	}
}

const getCertificationsQry = `SELECT id, title, image_src, date, url, created_at, updated_at 
								FROM certifications 
								ORDER BY date DESC
							`

// const getCertificationQry = `SELECT id, title, image_src, date, url, created_at, updated_at
// 								FROM certifications
// 								WHERE id = $1
// 							`

func (cr *CertificationsRepository) GetCertifications(ctx context.Context) ([]models.Certification, error) {
	rows, err := cr.pool.Query(ctx, getCertificationsQry)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	certifications := []models.Certification{}
	for rows.Next() {
		var cert models.Certification
		if err := rows.Scan(&cert.ID, &cert.Title, &cert.ImageSrc, &cert.Date, &cert.URL, &cert.CreatedAt, &cert.UpdatedAt); err != nil {
			return nil, err
		}
		certifications = append(certifications, cert)
	}

	return certifications, nil

}
