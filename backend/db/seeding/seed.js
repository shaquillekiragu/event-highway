const format = require("pg-format");
const db = require("../connection");

const seed = async ({ eventsData, usersData }) => {
  try {
    await db.query(`DROP TABLE IF EXISTS events;`);
    await db.query(`DROP TABLE IF EXISTS users;`);

    await db.query(
      `CREATE TABLE events (
        eventId SERIAL PRIMARY KEY,
        publisher VARCHAR(40) NOT NULL REFERENCES users(fullName),
        host VARCHAR(50) NOT NULL,
        eventName VARCHAR(100) NOT NULL,
        eventStart DATETIME NOT NULL,
        eventEnd DATETIME NOT NULL,
        eventDescription VARCHAR(250) NOT NULL,
        createdAt DATETIME NOT NULL,
        category VARCHAR(25) NOT NULL,
        isOnline BOOLEAN NOT NULL,
        venue VARCHAR(50),
        isFree BOOLEAN NOT NULL,
        cost INT,
        isLimit BOOLEAN NOT NULL,
        attendeeLimit INT,
        thumbnail VARCHAR(250)
      )`
    );

    await db.query(
      `CREATE TABLE users (
        userId SERIAL PRIMARY KEY,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20),
        fullName VARCHAR(40) NOT NULL,
        email VARCHAR(50) NOT NULL,
        userPassword VARCHAR(20) NOT NULL,
        isAdmin BOOLEAN NOT NULL
      )`
    );

    await db.query(
      `INSERT INTO events (publisher, host, eventName, eventStart, eventEnd, eventDescription, createdAt, category, isOnline, venue, isFree, cost, isLimit, attendeeLimit, thumbnail)
        VALUES %L;`,
      eventsData
    );

    await db.query(
      `INSERT INTO users (userId, firstName, lastName, creatorName, email, userPassword, isAdmin)
        VALUES %L;`,
      usersData
    );
  } catch (error) {
    console.error(error, "<< seed.js async function error");
  }
};
