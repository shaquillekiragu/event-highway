const format = require("pg-format");
const db = require("../connection");

const seed = async ({ eventsData, usersData }) => {
  try {
    await db.query(`DROP TABLE IF EXISTS events;`);
    await db.query(`DROP TABLE IF EXISTS users;`);

    await db.query(
      `CREATE TABLE users (
        userId SERIAL PRIMARY KEY,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20),
        displayName VARCHAR(40) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL,
        userPassword VARCHAR(20) NOT NULL,
        isAdmin BOOLEAN NOT NULL
      )`
    );

    const formattedUserData = usersData.map((user) => {
      return [
        user.firstName,
        user.lastName,
        user.displayName,
        user.email,
        user.userPassword,
        user.isAdmin,
      ];
    });

    const usersInsertQuery = format(
      `INSERT INTO users (firstName, lastName, displayName, email, userPassword, isAdmin)
        VALUES %L;`,
      formattedUserData
    );

    await db.query(usersInsertQuery);

    await db.query(
      `CREATE TABLE events (
        eventId SERIAL PRIMARY KEY,
        publisher VARCHAR(40) NOT NULL REFERENCES users(displayName),
        host VARCHAR(50) NOT NULL,
        eventName VARCHAR(100) NOT NULL,
        eventStart TIMESTAMP NOT NULL,
        eventEnd TIMESTAMP NOT NULL,
        eventDescription VARCHAR(250) NOT NULL,
        createdAt TIMESTAMP NOT NULL,
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

    const formattedEventData = eventsData.map((event) => {
      return [
        event.publisher,
        event.host,
        event.eventName,
        event.eventStart,
        event.eventEnd,
        event.eventDescription,
        event.createdAt,
        event.category,
        event.isOnline,
        event.venue,
        event.isFree,
        event.cost,
        event.isLimit,
        event.attendeeLimit,
        event.thumbnail,
      ];
    });

    const eventsInsertQuery = format(
      `INSERT INTO events (publisher, host, eventName, eventStart, eventEnd, eventDescription, createdAt, category, isOnline, venue, isFree, cost, isLimit, attendeeLimit, thumbnail)
        VALUES %L;`,
      formattedEventData
    );

    await db.query(eventsInsertQuery);
  } catch (error) {
    console.error(error, "<< seed.js async function error");
  }
};

module.exports = seed;
