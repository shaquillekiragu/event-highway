const db = require("../db/connection");

async function fetchEvents() {
  const { rows } = await db.query(
    `SELECT publisher, host, eventName, eventStart, eventEnd, eventDescription, createdAt, category, isOnline, venue, isFree, cost, isLimit, attendeeLimit, thumbnail
      FROM events;`
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Events not found" });
  }
  // console.log(rows, "rows");
  return rows;
}

async function fetchEvent(eventId) {
  const { rows } = await db.query(
    `SELECT publisher, host, eventName, eventStart, eventEnd, eventDescription, createdAt, category, isOnline, venue, isFree, cost, isLimit, attendeeLimit, thumbnail
      FROM events
      WHERE eventId = $1`,
    [eventId]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Event not found" });
  }
  return rows[0];
}

async function insertEvent(
  publisher,
  host,
  eventName,
  eventStart,
  eventEnd,
  eventDescription,
  createdAt,
  category,
  isOnline,
  venue,
  isFree,
  cost,
  isLimit,
  attendeeLimit,
  thumbnail
) {
  const { rows } = await db.query(
    `INSERT INTO events
      (publisher, host, eventName, eventStart, eventEnd, eventDescription, createdAt, category, isOnline, venue, isFree, cost, isLimit, attendeeLimit, thumbnail)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;`,
    [
      publisher,
      host,
      eventName,
      eventStart,
      eventEnd,
      eventDescription,
      createdAt,
      category,
      isOnline,
      venue,
      isFree,
      cost,
      isLimit,
      attendeeLimit,
      thumbnail,
    ]
  );
  return rows[0];
}

async function updateEvent(eventId, changedProperty, newValue) {
  const { rows } = await db.query(
    `UPDATE events
      SET $2 = $3
      WHERE eventId = $1
      RETURNING *;`,
    [eventId, changedProperty, newValue]
  );
  if (!rows.length) {
    return Promise.reject({
      status: 404,
      msg: "Event not found",
    });
  }
  return rows[0];
}

async function removeEvent(eventId) {
  const { rows } = await db.query(
    `DELETE FROM events
      WHERE eventId = $1
      RETURNING *;`,
    [eventId]
  );
  if (!rows.length) {
    return Promise.reject({
      status: 404,
      msg: "Event not found",
    });
  }
  return rows[0];
}

module.exports = {
  fetchEvents,
  fetchEvent,
  insertEvent,
  updateEvent,
  removeEvent,
};
