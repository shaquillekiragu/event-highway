const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "production";

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

console.log(">>> ENV:", ENV);
console.log(">>> PGDATABASE:", process.env.PGDATABASE);
console.log(">>> DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not Set");

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
  config.ssl = { rejectUnauthorized: false };
}

module.exports = new Pool(config);
