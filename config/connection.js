const { Pool, Client } = require("pg");
require("dotenv").config();

const {
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD = null,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

const {
  HEROKU_DATABASE,
  HEROKU_DATABASE_USER,
  HEROKU_DATABASE_PASSWORD = null,
  HEROKU_DATABASE_HOST,
  HEROKU_DATABASE_PORT
} = process.env


// const connect = new Pool({
//   user: HEROKU_DATABASE_USER,
//   host: HEROKU_DATABASE_HOST,
//   database: HEROKU_DATABASE,
//   password: HEROKU_DATABASE_PASSWORD,
//   port: HEROKU_DATABASE_PORT,
// });

const connect = new Pool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
});

connect.connect((err) => {
  if (err) {
    console.log("connection error");
    throw new Error(err);
  }
  // connect.end();
});

module.exports = connect;
