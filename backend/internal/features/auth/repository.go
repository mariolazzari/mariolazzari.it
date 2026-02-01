package auth

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/db"
	"github.com/mariolazzari/mariolazzari.it/backend/internal/features/user"
)

// getByEmailQry is the SQL query used to retrieve a user by their email.
const getByEmailQry = `SELECT 
							id, 
							email, 
							password, 
							first_name, 
							last_name, 
							created_at, 
							updated_at 
						FROM users 
						WHERE email = $1;
					`

// ErrUserNotFound is returned when a user is not found in the database.
var ErrUserNotFound = errors.New("user not found")

// AuthRepository provides access to user authentication data in the database.
type AuthRepository struct {
	db *db.Postgres
}

// NewAuthRepository creates a new AuthRepository with the given database connection.
func NewAuthRepository(db *db.Postgres) *AuthRepository {
	return &AuthRepository{
		db: db,
	}
}

// GetUserByEmail retrieves a user from the database by their email.
//
// It returns ErrUserNotFound if no user exists with the provided email.
//
// Parameters:
//   - ctx: context for request scoping, cancellation, and timeout
//   - email: the email address of the user to retrieve
//
// Returns:
//   - *models.User: pointer to the retrieved User model
//   - error: an error if the user was not found or a database error occurred
func (r *AuthRepository) GetUserByEmail(ctx context.Context, email string) (*user.User, error) {
	var u user.User

	// Execute the query and scan the result into the User model
	err := r.db.Pool.QueryRow(ctx, getByEmailQry, email).Scan(
		&u.ID,
		&u.Email,
		&u.Password,
		&u.FirstName,
		&u.LastName,
		&u.CreatedAt,
		&u.UpdatedAt,
	)

	if err != nil {
		// Return custom error if no rows were found
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		// Return any other database error
		return nil, err
	}

	return &u, nil
}
