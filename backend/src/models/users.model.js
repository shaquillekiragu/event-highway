const db = require("../database/connection");
const { hashPassword } = require("../utils/password");

function sanitizeUser(user) {
	if (!user) return null;
	const { user_password, ...userWithoutPassword } = user;
	return userWithoutPassword;
}

async function fetchUsers() {
	try {
		const { rows } = await db.query(
			`SELECT user_id, first_name, last_name, display_name, email, is_admin FROM users`
		);
		if (!rows || !rows.length) {
			throw { status: 404, msg: "Users not found" };
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
			`SELECT user_id, first_name, last_name, display_name, email, is_admin FROM users
      WHERE user_id = $1`,
			[user_id]
		);
		if (!rows || !rows.length) {
			throw { status: 404, msg: "User not found" };
		}
		return rows[0];
	} catch (err) {
		console.error(err, " << fetchUser model error");
		throw err;
	}
}

async function fetchUserByEmail(email) {
	try {
		const { rows } = await db.query(
			`SELECT * FROM users WHERE email = $1`,
			[email]
		);
		if (!rows || !rows.length) {
			return null;
		}
		return rows[0];
	} catch (err) {
		console.error(err, " << fetchUserByEmail model error");
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
		if (
			(first_name !== undefined && typeof first_name !== "string") ||
			(last_name !== undefined && typeof last_name !== "string") ||
			(display_name !== undefined && typeof display_name !== "string") ||
			(email !== undefined && typeof email !== "string") ||
			(user_password !== undefined && typeof user_password !== "string") ||
			(is_admin !== undefined && typeof is_admin !== "boolean")
		) {
			throw { status: 400, msg: "Bad Request" };
		}

		// Check if user with email already exists
		const existingUser = await fetchUserByEmail(email);
		if (existingUser) {
			throw { status: 409, msg: "User with this email already exists" };
		}

		// Hash the password before storing
		const hashedPassword = await hashPassword(user_password);

		const { rows } = await db.query(
			`INSERT INTO users
      (first_name, last_name, display_name, email, user_password, is_admin)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, first_name, last_name, display_name, email, is_admin;`,
			[first_name, last_name, display_name, email, hashedPassword, is_admin]
		);
		return rows[0];
	} catch (err) {
		console.error(err, " << insertUser model error");
		throw err;
	}
}

module.exports = { fetchUsers, fetchUser, fetchUserByEmail, insertUser, sanitizeUser };
