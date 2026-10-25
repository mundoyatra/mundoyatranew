const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.on("error", (err) => {
  console.error("MySQL pool error:", err);
});

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS status_checks (
      id VARCHAR(36) PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      timestamp DATETIME NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      travel_date DATE NULL,
      message TEXT NULL,
      created_at DATETIME NOT NULL
    )
  `);
}

module.exports = { pool, initSchema };
