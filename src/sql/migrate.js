const fs = require("fs");
const path = require("path");
const connection = require("./db");

const sqlFilePath = path.join(__dirname, "queries.sql");
const sqlQueries = fs.readFileSync(sqlFilePath, "utf8");

connection.query(sqlQueries, (err, results) => {
  if (err) {
    console.error("Error executing SQL file:", err);
    return;
  }
  console.log("Database migration completed successfully!");
  connection.end();
});
