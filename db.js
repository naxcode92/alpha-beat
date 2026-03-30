const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'flashuser',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'flashcards',
  password: process.env.DB_PASSWORD || 'flashpass123',
  port: process.env.DB_PORT || 5432,
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cards (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        hindi VARCHAR(500) NOT NULL,
        english VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS study_sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        cards_studied INTEGER DEFAULT 0,
        studied_at DATE DEFAULT CURRENT_DATE
      );
    `);
    console.log('Database tables initialized');
  } finally {
    client.release();
  }
}

module.exports = { pool, initDB };
