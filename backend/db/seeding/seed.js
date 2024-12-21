const format = require("pg-format");
const db = require("../connection");

const seed = async ({ eventsData, usersData }) => {
  try {
    await db.query(`DROP TABLE IF EXISTS events;`);
    await db.query(`DROP TABLE IF EXISTS users;`);
  } catch (error) {
    console.error(error, "<< seed.js async function error");
  }
};
