const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../../.env.${ENV}` });

// Log environment info
if (ENV !== "production") {
  console.log("Loaded env file:", `${__dirname}/../../.env.${ENV}`);
  console.log("Environment:", ENV);
} else {
  // In production, log that we're using DATABASE_URL (but not the actual URL for security)
  console.log("Production environment detected");
  console.log("DATABASE_URL is", process.env.DATABASE_URL ? "SET" : "NOT SET");
  if (process.env.DATABASE_URL) {
    // Log connection string info without exposing credentials
    const url = new URL(process.env.DATABASE_URL);
    console.log(
      `Connecting to database at: ${url.hostname}:${url.port || 5432}`
    );
    console.log(`Database name: ${url.pathname.slice(1)}`);
  }
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
  // Development pool settings (smaller pool)
  config.max = 5;
  config.min = 1;
  config.idleTimeoutMillis = 30000;
  config.connectionTimeoutMillis = 5000;
}

const pool = new Pool(config);

// Handle pool errors (critical - log in all environments)
pool.on("error", (err) => {
  console.error("CRITICAL: Unexpected error on idle database client", {
    message: err.message,
    code: err.code,
    stack: err.stack,
  });
  // Don't exit in production - let the app handle it gracefully
  if (ENV !== "production") {
    process.exit(-1);
  }
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
