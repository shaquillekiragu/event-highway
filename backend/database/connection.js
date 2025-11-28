const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../../.env.${ENV}` });

console.log("Loaded env file 1:", `${__dirname}/../../.env.${ENV}`);
console.log("Loaded env file 2:", `~/.env.${ENV}`);
// console.log("Environment variables:", Object.keys(process.env));

console.log(">>> process.env.NODE_ENV:", process.env.NODE_ENV);
console.log(">>> ENV:", ENV);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  console.log("HELLO, THROWN ERROR LISTEN.JS");
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

console.log(">>> PGDATABASE:", process.env.PGDATABASE);
console.log(">>> DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not Set");

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 15;
  config.ssl = { rejectUnauthorized: false };
  config.family = 4;
}

module.exports = new Pool(config);
