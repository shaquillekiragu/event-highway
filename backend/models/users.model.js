const db = require("../db/connection");

async function fetchUser(userId) {
  const { rows } = await db.query(
    `SELECT firstName, lastName, displayName, email, userPassword, isAdmin
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
  firstName,
  lastName,
  fullName,
  email,
  userPassword,
  isAdmin
) {
  const { rows } = await db.query(
    `INSERT INTO users
      (firstName, lastName, fullName, email, userPassword, isAdmin)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
    [firstName, lastName, fullName, email, userPassword, isAdmin]
  );
  return rows[0];
}

async function updateUser(eventId, changedProperty, newValue) {
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
      msg: "User not found",
    });
  }
  return rows[0];
}

module.exports = { fetchUser, insertUser, updateUser };
