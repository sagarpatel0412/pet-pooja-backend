const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8001;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_PASS = process.env.DATABASE_PASS;
const DATABASE_PORT = parseInt(process.env.DATABASE_PORT);

module.exports = {
  PORT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_PORT,
};
