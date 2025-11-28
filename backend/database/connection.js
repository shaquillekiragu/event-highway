const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../../.env.${ENV}` });

// Only log debug info in development
if (ENV !== "production") {
  console.log("Loaded env file:", `${__dirname}/../../.env.${ENV}`);
  console.log("Environment:", ENV);
}

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (ENV === "production") {
  // Production: Use DATABASE_URL from environment (e.g., Render, Heroku)
  config.connectionString = process.env.DATABASE_URL;
  config.max = 15; // Connection pool size
  // Render requires SSL but doesn't provide CA cert, so we disable verification
  // For other providers, you may want to set rejectUnauthorized: true
  config.ssl = process.env.DATABASE_URL?.includes("render.com")
    ? { rejectUnauthorized: false }
    : { rejectUnauthorized: true };
} else {
  // Development/Test: Use PGDATABASE
  if (process.env.PGDATABASE) {
    config.database = process.env.PGDATABASE;
  }
}

module.exports = new Pool(config);
