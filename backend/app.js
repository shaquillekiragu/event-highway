const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
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
} = require("./controllers/users.controller");

app.use(express.json());

app.get("/api/healthcheck", healthcheck);

app.get("/api", getApi);

app.get("/api/events", getEvents);

app.post("/api/events", postEvent);

app.get("/api/events/:event_id", getEvent);

app.patch("/api/events/:event_id", patchEvent);

app.delete("/api/events/:event_id", deleteEvent);

app.get("/api/users", getUsers);

app.post("/api/users", postUser);

app.get("/api/users/:user_id", getUser);

app.all("*", (request, response) => {
  return response.status(404).send({ msg: "Endpoint not found" });
});

// ERROR HANDLING:

app.use((err, request, response, next) => {
  //   console.log(err, " < error 1");
  //   console.log(err.status, " < error status 1");
  //   console.log(err.msg, " < error msg 1");
  if (err.status && err.msg) {
    return response.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, request, response, next) => {
  //   console.log(err, " < error 2");
  //   console.log(err.code, " < error code 2");
  if (err.code === "22P02" || err.code === "23502") {
    return response.status(400).send({ msg: "Bad Request" });
  } else if (err.code === "23503") {
    return response.status(404).send({ msg: "Not Found" });
  }
  next(err);
});

app.use((err, request, response) => {
  return response.status(500).send({ message: "Internal server error" });
});

module.exports = app;
