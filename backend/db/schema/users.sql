DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20),
    fullName VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    userPassword VARCHAR(20) NOT NULL,
    isAdmin BOOLEAN NOT NULL
);

INSERT INTO users (userId, firstName, lastName, creatorName, email, userPassword, isAdmin)
VALUES
(),
();