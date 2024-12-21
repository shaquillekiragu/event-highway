const express = require("express");
const app = express();

const healthcheck = require("./controllers/healthcheck.controller");
const getApi = require("./controllers/api.controller");

app.use(express.json());

app.get("/api/healthcheck", healthcheck);

app.get("/api", getApi);

module.exports = app;
