const fs = require("fs");
const path = require("path");
const connection = require("./db");

const rollbackFilePath = path.join(__dirname, "rollback.sql");
const rollbackSQL = fs.readFileSync(rollbackFilePath, "utf8");

connection.query(rollbackSQL, (err, results) => {
  if (err) {
    console.error("Error rolling back:", err);
    return;
  }
  console.log("Rollback successful!");
  connection.end();
});
