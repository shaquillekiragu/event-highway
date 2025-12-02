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
  // Conservative pool size for Render (free tier typically allows 4-10 connections)
  config.max = 10; // Maximum number of clients in the pool
  config.min = 0; // Don't pre-create connections (create on-demand only)
  config.idleTimeoutMillis = 20000; // Close idle clients after 20 seconds
  config.connectionTimeoutMillis = 10000; // Return an error after 10 seconds if connection could not be established
  config.allowExitOnIdle = false; // Don't close all connections when idle
  // Production databases (Render, Heroku, etc.) typically use self-signed certificates
  // Disable SSL verification to allow connections (required for Render databases)
  config.ssl = { rejectUnauthorized: false };
} else {
  // Development/Test: Use PGDATABASE
  if (process.env.PGDATABASE) {
    config.database = process.env.PGDATABASE;
  }
  // Development pool settings (smaller pool)
  config.max = 5;
  config.min = 1;
  config.idleTimeoutMillis = 30000;
  config.connectionTimeoutMillis = 5000;
}

const pool = new Pool(config);

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Log pool events in development
if (ENV !== "production") {
  pool.on("connect", () => {
    console.log("New client connected to database");
  });

  pool.on("remove", () => {
    console.log("Client removed from pool");
  });
}

module.exports = pool;
