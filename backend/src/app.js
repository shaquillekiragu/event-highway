const express = require("express");
const app = express();

const cors = require("cors");

app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? "https://event-highway.netlify.app"
				: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

const healthcheck = require("./controllers/healthcheck.controller");
const getApi = require("./controllers/api.controller");

const {
	getEvents,
	getEvent,
	postEvent,
	patchEvent,
	deleteEvent,
} = require("./controllers/events.controller");

const {
	getUsers,
	getUser,
	postUser,
	loginUser,
	validateToken,
} = require("./controllers/users.controller");

const { authenticateToken, requireAdmin } = require("./middleware/auth.middleware");

app.use(express.json());

app.get("/api/healthcheck", healthcheck);

app.get("/api", getApi);

// Public routes
app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEvent);

// Authentication routes
app.post("/api/login", loginUser);
app.post("/api/users", postUser);
app.get("/api/auth/validate", authenticateToken, validateToken);

// Protected routes - require authentication
app.post("/api/events", authenticateToken, requireAdmin, postEvent);
app.patch("/api/events/:event_id", authenticateToken, requireAdmin, patchEvent);
app.delete("/api/events/:event_id", authenticateToken, requireAdmin, deleteEvent);

// User routes (keeping getUsers public for now, but could be protected)
app.get("/api/users", getUsers);
app.get("/api/users/:user_id", getUser);

app.all("*", (request, response) => {
	return response.status(404).send({ msg: "Endpoint not found" });
});

// ERROR HANDLING:

app.use((error, request, response, next) => {
	if (error.status && error.msg) {
		return response.status(error.status).send({ msg: error.msg });
	}
	next(error);
});

app.use((error, request, response, next) => {
	if (error.code === "22P02" || error.code === "23502") {
		return response.status(400).send({ msg: "Bad Request" });
	} else if (error.code === "23503") {
		return response.status(404).send({ msg: "Not Found" });
	}
	next(error);
});

app.use((error, request, response) => {
	return response.status(500).send({ message: "Internal server error" });
});

module.exports = app;
