const { Pool } = require('pg');
const dbConfig = require("../config/db.config.js");

var dbConnectionString = `postgres://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

var connection = new Pool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
  connectionString: dbConnectionString
});

module.exports = connection;