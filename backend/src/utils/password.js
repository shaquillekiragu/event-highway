const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function hashPassword(password) {
	try {
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		return hashedPassword;
	} catch (err) {
		console.error(err, " << hashPassword error");
		throw err;
	}
}

async function comparePassword(password, hashedPassword) {
	try {
		const isMatch = await bcrypt.compare(password, hashedPassword);
		return isMatch;
	} catch (err) {
		console.error(err, " << comparePassword error");
		throw err;
	}
}

module.exports = { hashPassword, comparePassword };
