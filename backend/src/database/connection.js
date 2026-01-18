const { Pool } = require("pg");

const hasExplicitDatabaseUrl = !!process.env.DATABASE_URL;
const isProductionDatabase = hasExplicitDatabaseUrl && process.env.DATABASE_URL.includes("neon.tech");

const ENV = process.env.NODE_ENV || (isProductionDatabase ? "production" : "development");

if (!hasExplicitDatabaseUrl) {
	require("dotenv").config({ path: `${__dirname}/../../../.env.${ENV}` });
}

if (ENV !== "production") {
	console.log("Loaded env file:", `${__dirname}/../../../.env.${ENV}`);
	console.log("Environment:", ENV);
}

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
	throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (ENV === "production" || process.env.DATABASE_URL) {
	config.connectionString = process.env.DATABASE_URL;
	config.max = 10;
	config.min = 0;
	config.idleTimeoutMillis = 20000;
	config.connectionTimeoutMillis = 10000;
	config.allowExitOnIdle = false;
	config.ssl = { rejectUnauthorized: false };
} else {
	if (process.env.PGDATABASE) {
		config.database = process.env.PGDATABASE;
	}
	config.max = 5;
	config.min = 1;
	config.idleTimeoutMillis = 30000;
	config.connectionTimeoutMillis = 5000;
}

const pool = new Pool(config);

pool.on("error", (err) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});

if (ENV !== "production") {
	pool.on("connect", () => {
		console.log("New client connected to database");
	});

	pool.on("remove", () => {
		console.log("Client removed from pool");
	});
}

module.exports = pool;
