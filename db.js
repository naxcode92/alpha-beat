const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL is not set. Database connections will fail.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

async function initDB(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
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

          DO $$
          BEGIN
            IF NOT EXISTS (
              SELECT 1 FROM pg_constraint WHERE conname = 'study_sessions_user_date_unique'
            ) THEN
              ALTER TABLE study_sessions
                ADD CONSTRAINT study_sessions_user_date_unique UNIQUE (user_id, studied_at);
            END IF;
          END $$;
        `);
        console.log('Database tables initialized');
        return;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error(`DB init attempt ${i + 1}/${retries} failed:`, err.message);
      if (i < retries - 1) {
        const delay = Math.pow(2, i) * 1000;
        console.log(`Retrying in ${delay / 1000}s...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  console.error('Could not initialize database after retries. App will serve but DB calls will fail.');
}

module.exports = { pool, initDB };
