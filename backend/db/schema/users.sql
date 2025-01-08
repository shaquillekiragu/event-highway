CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    display_name VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    user_password VARCHAR(20) NOT NULL,
    is_admin BOOLEAN NOT NULL
);

INSERT INTO users (userId, first_name, last_name, display_name, email, user_password, is_admin)
VALUES
(),
();