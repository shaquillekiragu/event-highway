const format = require("pg-format");
const db = require("../connection");

const seed = async ({ eventsData, usersData }) => {
  try {
    await db.query(`DROP TABLE IF EXISTS events;`);
    await db.query(`DROP TABLE IF EXISTS users;`);

    await db.query(
      `CREATE TABLE users (
        userId SERIAL PRIMARY KEY,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20),
        display_name VARCHAR(40) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL,
        user_password VARCHAR(20) NOT NULL,
        is_admin BOOLEAN NOT NULL
      )`
    );

    const formattedUserData = usersData.map((user) => {
      return [
        user.first_name,
        user.last_name,
        user.display_name,
        user.email,
        user.user_password,
        user.is_admin,
      ];
    });

    const usersInsertQuery = format(
      `INSERT INTO users (first_name, last_name, display_name, email, user_password, is_admin)
        VALUES %L;`,
      formattedUserData
    );

    await db.query(usersInsertQuery);

    await db.query(
      `CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        publisher VARCHAR(40) NOT NULL REFERENCES users(display_name),
        host VARCHAR(50) NOT NULL,
        event_name VARCHAR(100) NOT NULL,
        event_start TIMESTAMP NOT NULL,
        event_end TIMESTAMP NOT NULL,
        event_description VARCHAR(250) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        category VARCHAR(25) NOT NULL,
        is_online BOOLEAN NOT NULL,
        venue VARCHAR(100),
        venue_address VARCHAR(100),
        is_free BOOLEAN NOT NULL,
        cost_in_gbp INT,
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
        event.cost_in_gbp,
        event.is_limit,
        event.attendee_limit,
        event.thumbnail,
      ];
    });

    const eventsInsertQuery = format(
      `INSERT INTO events (publisher, host, event_name, event_start, event_end, event_description, created_at, category, is_online, venue, venue_address, is_free, cost_in_gbp, is_limit, attendee_limit, thumbnail)
        VALUES %L;`,
      formattedEventData
    );

    await db.query(eventsInsertQuery);
  } catch (error) {
    console.error(error, "<< seed.js async function error");
    throw error;
  }
};

module.exports = seed;
