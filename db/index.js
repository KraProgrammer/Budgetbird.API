const { Pool } = require('pg');

const pool = new Pool({
    user: 'dbuser',
    host: 'localhost',
    database: 'mydb',
    password: 'dbuser',
    port: 3211,
  });

// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

// const pool = new Pool({
//   connectionString: connectionString,
// })

module.exports = {
    query: (text, params, callback) => {
      const start = Date.now()
      return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start
        console.log('executed query', { text, duration, rows: res.rowCount })
        callback(err, res)
      });
    }
  }
