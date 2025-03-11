const mysql = require("mysql2");
const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_USER,
} = require("../config/constant");

const connection = mysql.createConnection({
  port: DATABASE_PORT,
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASS,
  database: DATABASE_NAME,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL Database.");
});

module.exports = connection;
