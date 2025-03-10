const mysql = require("mysql2");
const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_USER,
} = require("./constant");

const pool = mysql
  .createPool({
    port: DATABASE_PORT,
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
  })
  .promise();

module.exports = { pool };
