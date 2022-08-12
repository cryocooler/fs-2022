require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
process.env.NODE_ENV === "test"
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

const JWT_SECRET = process.env.secret;

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
};
