const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST_APP,
  user: process.env.DB_USER_APP,
  password: process.env.DB_PASS_APP,
  database: process.env.DB_DB_APP
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
    throw new Error(err);
  }

  if (connection) connection.release();
});

module.exports = pool;
