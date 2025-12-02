const db = require("../database/connection");

async function healthcheck(request, response) {
  try {
    // Test database connection
    const result = await db.query(
      "SELECT NOW() as current_time, version() as pg_version"
    );
    return response.status(200).send({
      msg: "connection is healthy",
      database: {
        connected: true,
        currentTime: result.rows[0].current_time,
        postgresVersion:
          result.rows[0].pg_version.split(" ")[0] +
          " " +
          result.rows[0].pg_version.split(" ")[1],
      },
    });
  } catch (err) {
    console.error("Healthcheck database error:", err);
    return response.status(503).send({
      msg: "database connection unhealthy",
      error: err.message,
      code: err.code,
    });
  }
}

module.exports = healthcheck;
