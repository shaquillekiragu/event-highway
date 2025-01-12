const { Pool } = require("pg");

require("dotenv").config();

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

console.log("PGDATABASE:", process.env.PGDATABASE);

module.exports = new Pool();
