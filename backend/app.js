const express = require("express");
const app = express();

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
  getUser,
  postUser,
  patchUser,
} = require("./controllers/users.controller");

app.use(express.json());

app.get("/api/healthcheck", healthcheck);

app.get("/api", getApi);

app.get("/api/events", getEvents);

app.post("/api/events", postEvent);

app.get("/api/events/:eventId", getEvent);

app.patch("/api/events/:eventId", patchEvent);

app.delete("/api/events/:eventId", deleteEvent);

app.post("/api/users", postUser);

app.get("/api/users/:userId", getUser);

app.patch("/api/users/:userId", patchUser);

app.all("*", (request, response) => {
  response.status(404).send({ msg: "Endpoint not found" });
});

// ERROR HANDLING:

app.use((err, request, response, next) => {
  //   console.log(err, " << error 1");
  //   console.log(err.status, " << error status 1");
  //   console.log(err.msg, " << error msg 1");
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, request, response, next) => {
  //   console.log(err, " << error 2");
  //   console.log(err.code, " << error code 2");
  if (err.code === "22P02" || err.code === "23502") {
    response.status(400).send({ msg: "Bad Request" });
  } else if (err.code === "23503") {
    response.status(404).send({ msg: "Not Found" });
  }
  next(err);
});

app.use((err, request, response) => {
  response.status(500).send({ message: "Internal server error" });
});

module.exports = app;
