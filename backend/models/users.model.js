const db = require("../db/connection");

async function fetchUser(userId) {
  const { rows } = await db.query(
    `SELECT first_name, last_name, display_name, email, user_password, is_admin
      FROM users
      WHERE userId = $1`,
    [userId]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "User not found" });
  }
  return rows[0];
}

async function insertUser(
  first_name,
  last_name,
  display_name,
  email,
  user_password,
  is_admin
) {
  const { rows } = await db.query(
    `INSERT INTO users
      (first_name, last_name, display_name, email, user_password, is_admin)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
    [first_name, last_name, display_name, email, user_password, is_admin]
  );
  return rows[0];
}

async function updateUser(event_id, changedProperty, newValue) {
  const { rows } = await db.query(
    `UPDATE events
      SET $2 = $3
      WHERE event_id = $1
      RETURNING *;`,
    [event_id, changedProperty, newValue]
  );
  if (!rows.length) {
    return Promise.reject({
      status: 404,
      msg: "User not found",
    });
  }
  return rows[0];
}

module.exports = { fetchUser, insertUser, updateUser };
