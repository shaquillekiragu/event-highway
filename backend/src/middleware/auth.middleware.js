const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

function authenticateToken(request, response, next) {
	const authHeader = request.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

	if (!token) {
		return response.status(401).send({ msg: "Access token required" });
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return response.status(403).send({ msg: "Invalid or expired token" });
		}
		request.user = user; // Attach user info to request
		next();
	});
}

function requireAdmin(request, response, next) {
	if (!request.user || !request.user.is_admin) {
		return response.status(403).send({ msg: "Admin access required" });
	}
	next();
}

function generateToken(user) {
	const payload = {
		user_id: user.user_id,
		email: user.email,
		display_name: user.display_name,
		is_admin: user.is_admin,
	};
	return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

module.exports = { authenticateToken, requireAdmin, generateToken };
