CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20),
    displayName VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    userPassword VARCHAR(20) NOT NULL,
    isAdmin BOOLEAN NOT NULL
);

INSERT INTO users (userId, firstName, lastName, displayName, email, userPassword, isAdmin)
VALUES
(),
();