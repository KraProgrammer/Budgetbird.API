// const { Pool } = require('pg');
const promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = process.env.DBSTRING;
var db = pgp(connectionString);

module.exports = db;

