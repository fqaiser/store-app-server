const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.STORE_APP_DB_HOST,
  user: process.env.STORE_APP_DB_USERNAME,
  password: process.env.STORE_APP_DB_PASSWORD,
  database: process.env.STORE_APP_DB_NAME
});

const query = async (sqlQuery, params) => {
  try {
    const [rows, fields] = await pool.execute(sqlQuery, params);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = { query };
