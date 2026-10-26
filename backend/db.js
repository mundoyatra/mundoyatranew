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
      status VARCHAR(20) NOT NULL DEFAULT 'new',
      notes TEXT NULL,
      created_at DATETIME NOT NULL
    )
  `);

  // Backfill columns for databases created before status/notes existed
  const [leadCols] = await pool.query(`SHOW COLUMNS FROM leads`);
  const leadColNames = leadCols.map((c) => c.Field);
  if (!leadColNames.includes("status")) {
    await pool.query(
      `ALTER TABLE leads ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'new'`
    );
  }
  if (!leadColNames.includes("notes")) {
    await pool.query(`ALTER TABLE leads ADD COLUMN notes TEXT NULL`);
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id VARCHAR(36) PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at DATETIME NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS services (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      icon VARCHAR(100) NOT NULL,
      display_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `);

  const destinationColumns = `
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(500) NOT NULL,
      description VARCHAR(500) NOT NULL,
      price VARCHAR(100) NOT NULL,
      duration VARCHAR(100) NOT NULL,
      highlights JSON NOT NULL,
      itinerary JSON NOT NULL,
      includes JSON NOT NULL,
      display_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
  `;
  await pool.query(`CREATE TABLE IF NOT EXISTS domestic_destinations (${destinationColumns})`);
  await pool.query(`CREATE TABLE IF NOT EXISTS international_destinations (${destinationColumns})`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id VARCHAR(36) PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      meta_description VARCHAR(500) NOT NULL,
      keywords JSON NOT NULL,
      category VARCHAR(100) NOT NULL,
      cover_image VARCHAR(500) NOT NULL,
      cover_image_alt VARCHAR(255) NOT NULL,
      published_date DATE NOT NULL,
      read_time VARCHAR(50) NOT NULL,
      excerpt VARCHAR(500) NOT NULL,
      content JSON NOT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS faqs (
      id VARCHAR(36) PRIMARY KEY,
      question VARCHAR(500) NOT NULL,
      answer TEXT NOT NULL,
      display_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      rating INT NOT NULL DEFAULT 5,
      text TEXT NOT NULL,
      image VARCHAR(500) NOT NULL,
      display_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `);
}

module.exports = { pool, initSchema };
