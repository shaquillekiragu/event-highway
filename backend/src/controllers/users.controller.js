const { fetchUsers, fetchUser, fetchUserByEmail, insertUser } = require("../models/users.model");
const { comparePassword } = require("../utils/password");
const { generateToken } = require("../middleware/auth.middleware");

async function getUsers(request, response, next) {
	try {
		const users = await fetchUsers();
		return response.status(200).send({ users });
	} catch (err) {
		next(err);
	}
}

async function getUser(request, response, next) {
	try {
		const { user_id } = request.params;
		const user = await fetchUser(user_id);
		return response.status(200).send({ user });
	} catch (err) {
		next(err);
	}
}

async function postUser(request, response, next) {
	try {
		const {
			first_name,
			last_name,
			display_name,
			email,
			user_password,
			is_admin,
		} = request.body;
		const user = await insertUser(
			first_name,
			last_name,
			display_name,
			email,
			user_password,
			is_admin
		);
		
		const token = generateToken(user);
		
		return response.status(201).send({ user, token });
	} catch (err) {
		next(err);
	}
}

async function loginUser(request, response, next) {
	try {
		const { email, user_password } = request.body;

		if (!email || !user_password) {
			return response.status(400).send({ msg: "Email and password are required" });
		}

		const user = await fetchUserByEmail(email);
		if (!user) {
			return response.status(401).send({ msg: "Invalid email or password" });
		}

		const isPasswordValid = await comparePassword(user_password, user.user_password);
		if (!isPasswordValid) {
			return response.status(401).send({ msg: "Invalid email or password" });
		}

		const { sanitizeUser } = require("../models/users.model");
		const userWithoutPassword = sanitizeUser(user);

		const token = generateToken(userWithoutPassword);

		return response.status(200).send({
			user: userWithoutPassword,
			token,
		});
	} catch (err) {
		next(err);
	}
}

async function validateToken(request, response, next) {
	try {
		const user = await fetchUser(request.user.user_id);
		return response.status(200).send({ user, valid: true });
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getUsers,
	getUser,
	postUser,
	loginUser,
	validateToken,
};
