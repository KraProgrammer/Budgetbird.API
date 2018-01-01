// const { Pool } = require('pg');
const promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgresql://dbuser:dbuser@localhost:5432/mydb';
var db = pgp(connectionString);

module.exports = db;

