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
  // console.log(is_online, " <<< is_online");
  // console.log(
  //   [
  //     publisher,
  //     host,
  //     event_name,
  //     event_start,
  //     event_end,
  //     event_description,
  //     created_at,
  //     category,
  //     is_online,
  //     venue,
  //     venue_address,
  //     is_free,
  //     cost_in_gbp,
  //     is_limit,
  //     attendee_limit,
  //     thumbnail,
  //   ],
  //   " <<< array of props"
  // );
  const { rows } = await db.query(
    `INSERT INTO events
      (publisher, host, event_name, event_start, event_end, event_description, created_at, category, is_online, venue, venue_address, is_free, cost_in_gbp, is_limit, attendee_limit, thumbnail)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *;`,
    [
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
  // console.log(rows, " <<< rows");
  return rows[0];
}

async function updateEvent(event_id, changedProperty, newValue) {
  const query = `
    UPDATE events
    SET ${changedProperty} = $2
    WHERE event_id = $1
    RETURNING *;
  `;
  const { rows } = await db.query(query, [event_id, newValue]);
  if (!rows.length) {
    return Promise.reject({
      status: 404,
      msg: "Event not found",
    });
  }
  return rows[0];
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
