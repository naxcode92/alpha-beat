const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcryptjs');
const path = require('path');
const { pool, initDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new pgSession({ pool, createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET || 'hindi-flashcards-secret-key-change-in-prod',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: !!process.env.RAILWAY_ENVIRONMENT,
    sameSite: 'lax',
  },
  proxy: !!process.env.RAILWAY_ENVIRONMENT
}));

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

// --- Auth Routes ---

app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (username.length < 3 || username.length > 50) {
    return res.status(400).json({ error: 'Username must be 3-50 characters' });
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, hash]
    );
    req.session.userId = result.rows[0].id;
    req.session.username = result.rows[0].username;
    res.json({ id: result.rows[0].id, username: result.rows[0].username });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Username already taken' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

app.get('/api/auth/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ id: req.session.userId, username: req.session.username });
});

// --- Card Routes ---

app.get('/api/cards', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM cards WHERE user_id = $1 ORDER BY created_at DESC',
      [req.session.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/cards', requireAuth, async (req, res) => {
  const { hindi, english, phonetic } = req.body;
  if (!hindi || !english) {
    return res.status(400).json({ error: 'Hindi and English text are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO cards (user_id, hindi, english, phonetic) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.session.userId, hindi.trim(), english.trim(), (phonetic || '').trim()]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/cards/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM cards WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.id, req.session.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/cards/:id', requireAuth, async (req, res) => {
  const { phonetic } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cards SET phonetic = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [(phonetic || '').trim(), req.params.id, req.session.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/cards/bulk', requireAuth, async (req, res) => {
  const { cards: newCards } = req.body;
  if (!Array.isArray(newCards) || newCards.length === 0) {
    return res.status(400).json({ error: 'Cards array is required' });
  }
  try {
    const values = [];
    const placeholders = [];
    let idx = 1;
    for (const card of newCards) {
      if (!card.hindi || !card.english) continue;
      placeholders.push(`($${idx}, $${idx + 1}, $${idx + 2}, $${idx + 3})`);
      values.push(req.session.userId, card.hindi.trim(), card.english.trim(), (card.phonetic || '').trim());
      idx += 4;
    }
    if (placeholders.length === 0) {
      return res.status(400).json({ error: 'No valid cards provided' });
    }
    const result = await pool.query(
      `INSERT INTO cards (user_id, hindi, english, phonetic) VALUES ${placeholders.join(', ')} RETURNING *`,
      values
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Study Routes ---

app.post('/api/study/session', requireAuth, async (req, res) => {
  const { cardsStudied } = req.body;
  if (!cardsStudied || cardsStudied < 1) {
    return res.status(400).json({ error: 'Must study at least 1 card' });
  }
  try {
    // Upsert: if already studied today, add to the count
    const result = await pool.query(`
      INSERT INTO study_sessions (user_id, cards_studied, studied_at)
      VALUES ($1, $2, CURRENT_DATE)
      ON CONFLICT ON CONSTRAINT study_sessions_user_date_unique
      DO UPDATE SET cards_studied = study_sessions.cards_studied + $2
      RETURNING *
    `, [req.session.userId, cardsStudied]);
    res.json(result.rows[0]);
  } catch (err) {
    // If unique constraint doesn't exist yet, just insert
    if (err.code === '42P10' || err.code === '42704') {
      const result = await pool.query(
        'INSERT INTO study_sessions (user_id, cards_studied) VALUES ($1, $2) RETURNING *',
        [req.session.userId, cardsStudied]
      );
      return res.json(result.rows[0]);
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/study/stats', requireAuth, async (req, res) => {
  try {
    // Get all study dates for this user, ordered
    const result = await pool.query(
      'SELECT DISTINCT studied_at FROM study_sessions WHERE user_id = $1 ORDER BY studied_at DESC',
      [req.session.userId]
    );

    const dates = result.rows.map(r => r.studied_at.toISOString().split('T')[0]);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Calculate current streak
    let currentStreak = 0;
    let checkDate = dates.includes(today) ? today : yesterday;

    if (dates.includes(today) || dates.includes(yesterday)) {
      for (const date of dates) {
        if (date === checkDate) {
          currentStreak++;
          checkDate = new Date(new Date(checkDate).getTime() - 86400000).toISOString().split('T')[0];
        } else if (date < checkDate) {
          break;
        }
      }
    }

    // Calculate best streak
    let bestStreak = 0;
    let tempStreak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
      const curr = new Date(dates[i]);
      const next = new Date(dates[i + 1]);
      const diff = (curr - next) / 86400000;
      if (diff === 1) {
        tempStreak++;
      } else {
        bestStreak = Math.max(bestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    bestStreak = Math.max(bestStreak, tempStreak);
    if (dates.length === 0) bestStreak = 0;

    // Total cards studied
    const totalResult = await pool.query(
      'SELECT COALESCE(SUM(cards_studied), 0) as total FROM study_sessions WHERE user_id = $1',
      [req.session.userId]
    );

    // Total days studied
    const totalDays = dates.length;

    res.json({
      currentStreak,
      bestStreak,
      totalCardsStudied: parseInt(totalResult.rows[0].total),
      totalDays
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start HTTP server immediately so Railway sees a healthy process
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Then initialize DB in the background (with retries)
initDB().catch(err => {
  console.error('Database initialization failed:', err.message);
});
