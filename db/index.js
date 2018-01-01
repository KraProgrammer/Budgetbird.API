// const { Pool } = require('pg');
const promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

// const pool = new Pool({
//     user: 'dbuser',
//     host: 'localhost',
//     database: 'mydb',
//     password: 'dbuser',
//     port: 3211,
//   });
var connectionString = 'postgresql://dbuser:dbuser@localhost:5432/mydb';
var db = pgp(connectionString);

module.exports = db;


// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

// const pool = new Pool({
//   connectionString: connectionString,
// })

// module.exports = {
//     query: (text, params, callback) => {
//       const start = Date.now()
//       return pool.query(text, params, (err, res) => {
//         const duration = Date.now() - start
//         if (!err) {console.log('executed query', { text, duration, rows: res.rowCount }); }
//         callback(err, res);
//       });
//     }
//   }
