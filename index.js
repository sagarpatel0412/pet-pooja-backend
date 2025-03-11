const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./src/config/constant");
const { pool } = require("./src/config/connection");

const mainRoutes = require("./src/index");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Connected to the database successfully!");
  connection.release();
});

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Database is connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testConnection();

app.use("/api", mainRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
