const db = require("../database/connection");

async function fetchUsers() {
  try {
    const { rows } = await db.query(`SELECT * FROM users`);
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Users not found" });
    }
    return rows;
  } catch (err) {
    console.error(err, " << fetchUsers model error");
    throw err;
  }
}

async function fetchUser(user_id) {
  try {
    const { rows } = await db.query(
      `SELECT * FROM users
      WHERE user_id = $1`,
      [user_id]
    );
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "User not found" });
    }
    return rows[0];
  } catch (err) {
    console.error(err, " << fetchUser model error");
    throw err;
  }
}

async function insertUser(
  first_name,
  last_name,
  display_name,
  email,
  user_password,
  is_admin
) {
  try {
    const { rows } = await db.query(
      `INSERT INTO users
      (first_name, last_name, display_name, email, user_password, is_admin)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
      [first_name, last_name, display_name, email, user_password, is_admin]
    );
    return rows[0];
  } catch (err) {
    console.error(err, " << insertUser model error");
    throw err;
  }
}

async function updateUser(
  user_id,
  first_name,
  last_name,
  display_name,
  email,
  user_password,
  is_admin
) {
  try {
    const { rows } = await db.query(
      `UPDATE users
      SET 
      first_name = $2,
      last_name = $3,
      display_name = $4,
      email = $5,
      user_password = $6,
      is_admin = $7
     WHERE user_id = $1
     RETURNING *;`,
      [
        user_id,
        first_name,
        last_name,
        display_name,
        email,
        user_password,
        is_admin,
      ]
    );
    if (!rows.length) {
      return Promise.reject({
        status: 404,
        msg: "User not found",
      });
    }
    return rows[0];
  } catch (err) {
    console.error(err, " << updateUser model error");
    throw err;
  }
}

module.exports = { fetchUsers, fetchUser, insertUser, updateUser };
