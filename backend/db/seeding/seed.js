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
        event_name VARCHAR(100) NOT NULL,
        event_start TIMESTAMP NOT NULL,
        event_end TIMESTAMP NOT NULL,
        event_description VARCHAR(250) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        category VARCHAR(25) NOT NULL,
        is_online BOOLEAN NOT NULL,
        venue VARCHAR(50),
        venue_address VARCHAR(100),
        is_free BOOLEAN NOT NULL,
        cost INT,
        is_limit BOOLEAN NOT NULL,
        attendee_limit INT,
        thumbnail VARCHAR(250)
      )`
    );

    const formattedEventData = eventsData.map((event) => {
      return [
        event.publisher,
        event.host,
        event.event_name,
        event.event_start,
        event.event_end,
        event.event_description,
        event.created_at,
        event.category,
        event.is_online,
        event.venue,
        event.venue_address,
        event.is_free,
        event.cost,
        event.is_limit,
        event.attendee_limit,
        event.thumbnail,
      ];
    });

    const eventsInsertQuery = format(
      `INSERT INTO events (publisher, host, event_name, event_start, event_end, event_description, created_at, category, is_online, venue, venue_address, is_free, cost, is_limit, attendee_limit, thumbnail)
        VALUES %L;`,
      formattedEventData
    );

    await db.query(eventsInsertQuery);
  } catch (error) {
    console.error(error, "<< seed.js async function error");
  }
};

module.exports = seed;
