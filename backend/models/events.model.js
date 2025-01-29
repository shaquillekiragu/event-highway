const db = require("../database/connection");

async function fetchEvents() {
  try {
    const { rows } = await db.query(`SELECT * FROM events;`);
    if (!rows || !rows.length) {
      return Promise.reject({ status: 404, msg: "Events not found" });
    }
    return rows;
  } catch (err) {
    console.error(err, " << fetchEvents model error");
    throw err;
  }
}

async function fetchEvent(event_id) {
  try {
    const { rows } = await db.query(
      `SELECT * FROM events
      WHERE event_id = $1`,
      [event_id]
    );
    if (!rows || !rows.length) {
      return Promise.reject({ status: 404, msg: "Event not found" });
    }
    return rows[0];
  } catch (err) {
    console.error(err, " << fetchEvent model error");
    throw err;
  }
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
    if (
      !publisher ||
      typeof publisher !== "string" ||
      (host !== undefined && typeof host !== "string") ||
      (event_name !== undefined && typeof event_name !== "string") ||
      (event_start !== undefined && typeof event_start !== "string") ||
      (event_end !== undefined && typeof event_end !== "string") ||
      (event_description !== undefined &&
        typeof event_description !== "string") ||
      (created_at !== undefined && typeof created_at !== "string") ||
      (category !== undefined && typeof category !== "string") ||
      (is_online !== undefined && typeof is_online !== "boolean") ||
      (venue !== undefined && venue !== null && typeof venue !== "string") ||
      (venue_address !== undefined &&
        venue_address !== null &&
        typeof venue_address !== "string") ||
      (is_free !== undefined && typeof is_free !== "boolean") ||
      (cost_in_gbp !== undefined &&
        cost_in_gbp !== null &&
        typeof cost_in_gbp !== "number") ||
      (is_limit !== undefined && typeof is_limit !== "boolean") ||
      (attendee_limit !== undefined &&
        attendee_limit !== null &&
        typeof attendee_limit !== "number") ||
      (thumbnail !== undefined &&
        thumbnail !== null &&
        typeof thumbnail !== "string")
    ) {
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
  } catch (err) {
    console.error(err, " << insertEvent model error");
    throw err;
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
    if (
      (event_id !== undefined && typeof event_id !== "string") ||
      (host !== undefined && typeof host !== "string") ||
      (event_name !== undefined && typeof event_name !== "string") ||
      (event_start !== undefined && typeof event_start !== "string") ||
      (event_end !== undefined && typeof event_end !== "string") ||
      (event_description !== undefined &&
        typeof event_description !== "string") ||
      (category !== undefined && typeof category !== "string") ||
      (is_online !== undefined && typeof is_online !== "boolean") ||
      (venue !== undefined && venue !== null && typeof venue !== "string") ||
      (venue_address !== undefined &&
        venue_address !== null &&
        typeof venue_address !== "string") ||
      (is_free !== undefined && typeof is_free !== "boolean") ||
      (cost_in_gbp !== undefined &&
        cost_in_gbp !== null &&
        typeof cost_in_gbp !== "number") ||
      (is_limit !== undefined && typeof is_limit !== "boolean") ||
      (attendee_limit !== undefined &&
        attendee_limit !== null &&
        typeof attendee_limit !== "number") ||
      (thumbnail !== undefined &&
        thumbnail !== null &&
        typeof thumbnail !== "string")
    ) {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }

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
        thumbnail,
      ]
    );
    console.log(rows[0], " <<< rows[0] updateEvent model");
    if (!rows || !rows.length) {
      return Promise.reject({
        status: 404,
        msg: "Event not found",
      });
    }
    return rows[0];
  } catch (err) {
    console.error(err, " << updateEvent model error");
    throw err;
  }
}

async function removeEvent(event_id) {
  try {
    const { rows } = await db.query(
      `DELETE FROM events
      WHERE event_id = $1
      RETURNING *;`,
      [event_id]
    );
    if (!rows || !rows.length) {
      return Promise.reject({
        status: 404,
        msg: "Event not found",
      });
    }
    return rows[0];
  } catch (err) {
    console.error(err, " << removeEvent model error");
    throw err;
  }
}

module.exports = {
  fetchEvents,
  fetchEvent,
  insertEvent,
  updateEvent,
  removeEvent,
};
