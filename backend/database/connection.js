const { Pool } = require("pg");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env.development",
});

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

console.log("PGDATABASE:", process.env.PGDATABASE);

module.exports = new Pool();
