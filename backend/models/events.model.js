const db = require("../db/connection");

async function fetchEvents() {
  const { rows } = await db.query(
    `SELECT publisher, host, event_name, event_start, event_end, event_description, created_at, category, is_online, venue, venue_address, is_free, cost_in_gbp, is_limit, attendee_limit, thumbnail
      FROM events;`
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Events not found" });
  }
  return rows;
}

async function fetchEvent(event_id) {
  if (!event_id) {
    return Promise.reject({
      status: 400,
      msg: "Event Id not provided",
    });
  }
  const { rows } = await db.query(
    `SELECT publisher, host, event_name, event_start, event_end, event_description, created_at, category, is_online, venue, venue_address, is_free, cost_in_gbp, is_limit, attendee_limit, thumbnail
      FROM events
      WHERE event_id = $1`,
    [event_id]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Event not found" });
  }
  return rows[0];
}

async function insertEvent(
  publisher,
  host,
  event_name,
  event_start,
  event_end,
  event_description,
  created_at,
  category,
  is_online,
  venue,
  venue_address,
  is_free,
  cost_in_gbp,
  is_limit,
  attendee_limit,
  thumbnail
) {
  try {
    if (!publisher) {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
    const trimmedPublisher = publisher.trim();

    const userResult = await db.query(
      `SELECT display_name FROM users WHERE display_name = $1;`,
      [trimmedPublisher]
    );

    if (!userResult.rows.length) {
      throw {
        status: 400,
        msg: `Invalid publisher: ${publisher} does not exist in users table.`,
      };
    }

    const display_name = userResult.rows[0].display_name;
    const { rows } = await db.query(
      `INSERT INTO events
      (publisher, host, event_name, event_start, event_end, event_description, created_at, category, is_online, venue, venue_address, is_free, cost_in_gbp, is_limit, attendee_limit, thumbnail)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *;`,
      [
        display_name,
        host,
        event_name,
        event_start,
        event_end,
        event_description,
        created_at,
        category,
        is_online,
        venue,
        venue_address,
        is_free,
        cost_in_gbp,
        is_limit,
        attendee_limit,
        thumbnail,
      ]
    );
    return rows[0];
  } catch (error) {
    console.error(error, " << error");
    throw error;
  }
}

async function updateEvent(
  event_id,
  host,
  event_name,
  event_start,
  event_end,
  event_description,
  category,
  is_online,
  venue,
  venue_address,
  is_free,
  cost_in_gbp,
  is_limit,
  attendee_limit,
  thumbnail
) {
  try {
    console.log(is_free, " <<< is_free updateEvent model");
    const { rows } = await db.query(
      `UPDATE events
     SET 
      host = $2,
      event_name = $3,
      event_start = $4,
      event_end = $5,
      event_description = $6,
      category = $7,
      is_online = $8,
      venue = $9,
      venue_address = $10,
      is_free = $11,
      cost_in_gbp = $12,
      is_limit = $13,
      attendee_limit = $14,
      thumbnail = $15
    WHERE event_id = $1
    RETURNING *;`,
      [
        event_id,
        publisher,
        host,
        event_name,
        event_start,
        event_end,
        event_description,
        created_at,
        category,
        is_online,
        venue,
        venue_address,
        is_free,
        cost_in_gbp,
        is_limit,
        attendee_limit,
        thumbnail,
      ]
    );
    console.log(rows[0], " <<< rows[0] updateEvent model");
    if (!rows.length) {
      return Promise.reject({
        status: 404,
        msg: "Event not found",
      });
    }
    return rows[0];
  } catch (error) {
    console.error(error, " << updateEvent error");
    throw error;
  }
}

async function removeEvent(event_id) {
  const { rows } = await db.query(
    `DELETE FROM events
      WHERE event_id = $1
      RETURNING *;`,
    [event_id]
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
