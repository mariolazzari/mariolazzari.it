package repositories

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/models"
)

const getUserByEmailQry = `SELECT id, email, password, first_name, last_name, created_at, updated_at 
							FROM users 
							WHERE email = $1;
						`

var ErrUserNotFound = errors.New("user not found")

type AuthRepository struct {
	db *db.DB
}

func NewAuthRepository(db *db.DB) *AuthRepository {
	return &AuthRepository{
		db: db,
	}
}

func (r *AuthRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	var u models.User

	err := r.db.Pool.QueryRow(ctx, getUserByEmailQry, email).Scan(
		&u.ID,
		&u.Email,
		&u.Password,
		&u.FirstName,
		&u.LastName,
		&u.CreatedAt,
		&u.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	return &u, nil
}
