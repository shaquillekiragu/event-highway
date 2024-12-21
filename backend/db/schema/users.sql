DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20),
    creatorName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    userPassword VARCHAR(20) NOT NULL,
    isStaffMember BOOLEAN NOT NULL
);