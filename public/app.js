// === STATE ===
let cards = [];
let currentIndex = 0;
let showHindiFirst = true;
let cardsStudiedThisSession = 0;
let authMode = 'login'; // 'login' or 'register'

// === DOM REFS ===
const $ = (sel) => document.querySelector(sel);
const views = {
  auth: $('#auth-view'),
  home: $('#home-view'),
  create: $('#create-view'),
  study: $('#study-view'),
};

// === VIEW SWITCHING ===
function showView(name) {
  Object.values(views).forEach(v => v.hidden = true);
  views[name].hidden = false;
  if (name === 'home') loadHome();
  if (name === 'create') loadCards();
  if (name === 'study') setupStudy();
}

// === API HELPERS ===
async function api(path, opts = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// === AUTH ===
async function checkAuth() {
  try {
    const user = await api('/api/auth/me');
    showView('home');
    $('#home-username').textContent = user.username;
  } catch {
    showView('auth');
  }
}

// Auth tabs
document.querySelectorAll('.auth-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    authMode = tab.dataset.tab;
    $('#auth-submit').textContent = authMode === 'login' ? 'Log In' : 'Sign Up';
    $('#auth-error').hidden = true;
  });
});

// Auth form submit
$('#auth-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = $('#auth-username').value.trim();
  const password = $('#auth-password').value;
  const errEl = $('#auth-error');
  errEl.hidden = true;

  try {
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const user = await api(endpoint, { method: 'POST', body: { username, password } });
    $('#home-username').textContent = user.username;
    $('#auth-form').reset();
    showView('home');
  } catch (err) {
    errEl.textContent = err.message;
    errEl.hidden = false;
  }
});

// Logout
$('#logout-btn').addEventListener('click', async () => {
  await api('/api/auth/logout', { method: 'POST' });
  showView('auth');
});

// === HOME ===
async function loadHome() {
  try {
    const [stats, cardData] = await Promise.all([
      api('/api/study/stats'),
      api('/api/cards'),
    ]);
    cards = cardData;
    $('#stat-streak').textContent = stats.currentStreak;
    $('#stat-best').textContent = stats.bestStreak;
    $('#stat-total').textContent = stats.totalCardsStudied;
    $('#stat-days').textContent = stats.totalDays;
    $('#total-card-count').textContent = cards.length;
  } catch (err) {
    console.error('Failed to load home:', err);
  }
}

$('#go-create').addEventListener('click', () => showView('create'));
$('#go-study').addEventListener('click', () => showView('study'));

// === CREATE CARDS ===
async function loadCards() {
  try {
    cards = await api('/api/cards');
    renderCardList();
  } catch (err) {
    console.error('Failed to load cards:', err);
  }
}

function renderCardList() {
  const list = $('#card-list');
  const empty = $('#no-cards-create');

  if (cards.length === 0) {
    list.innerHTML = '';
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  list.innerHTML = cards.map(card => `
    <div class="card-item" data-id="${card.id}">
      <div class="card-item-text">
        <div class="card-item-hindi">${escapeHtml(card.hindi)}</div>
        <div class="card-item-english">${escapeHtml(card.english)}</div>
      </div>
      <button class="btn-delete" onclick="deleteCard(${card.id})" title="Delete">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');
}

$('#card-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const hindi = $('#hindi-input').value.trim();
  const english = $('#english-input').value.trim();
  if (!hindi || !english) return;

  try {
    await api('/api/cards', { method: 'POST', body: { hindi, english } });
    $('#hindi-input').value = '';
    $('#english-input').value = '';
    $('#hindi-input').focus();
    await loadCards();
  } catch (err) {
    alert(err.message);
  }
});

async function deleteCard(id) {
  try {
    await api(`/api/cards/${id}`, { method: 'DELETE' });
    await loadCards();
  } catch (err) {
    alert(err.message);
  }
}
// Make deleteCard available globally for onclick
window.deleteCard = deleteCard;

$('#create-back').addEventListener('click', () => showView('home'));

// === STUDY ===
function setupStudy() {
  cardsStudiedThisSession = 0;
  currentIndex = 0;
  const setup = $('#study-setup');
  const area = $('#study-area');
  const noCards = $('#no-cards-study');
  const startBtn = $('#start-study');

  setup.hidden = false;
  area.hidden = true;

  if (cards.length === 0) {
    noCards.hidden = false;
    startBtn.hidden = true;
    document.querySelector('.side-toggle').style.display = 'none';
    $('h3', setup)?.style && ($('h3').style.display = 'none');
  } else {
    noCards.hidden = true;
    startBtn.hidden = false;
    document.querySelector('.side-toggle').style.display = 'flex';
  }
}

// Side toggle
document.querySelectorAll('.btn-side').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-side').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showHindiFirst = btn.dataset.side === 'hindi';
  });
});

// Start studying
$('#start-study').addEventListener('click', () => {
  if (cards.length === 0) return;
  $('#study-setup').hidden = true;
  $('#study-area').hidden = false;
  currentIndex = 0;
  renderStudyCard();
});

$('#go-create-from-study').addEventListener('click', () => showView('create'));

function renderStudyCard() {
  const card = cards[currentIndex];
  if (!card) return;

  const flashcard = $('#flashcard');
  flashcard.classList.remove('flipped');

  const frontLabel = $('#front-label');
  const frontText = $('#front-text');
  const backLabel = $('#back-label');
  const backText = $('#back-text');

  if (showHindiFirst) {
    frontLabel.textContent = 'HINDI';
    frontText.textContent = card.hindi;
    backLabel.textContent = 'ENGLISH';
    backText.textContent = card.english;
  } else {
    frontLabel.textContent = 'ENGLISH';
    frontText.textContent = card.english;
    backLabel.textContent = 'HINDI';
    backText.textContent = card.hindi;
  }

  $('#current-card-num').textContent = currentIndex + 1;
  $('#total-cards-num').textContent = cards.length;
}

// Flip on tap
$('#flashcard-container').addEventListener('click', () => {
  $('#flashcard').classList.toggle('flipped');
});

// Navigation
$('#prev-card').addEventListener('click', () => {
  if (cards.length === 0) return;
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  renderStudyCard();
});

$('#next-card').addEventListener('click', () => {
  if (cards.length === 0) return;
  cardsStudiedThisSession++;
  currentIndex = (currentIndex + 1) % cards.length;
  renderStudyCard();
});

// Back from study — log session
$('#study-back').addEventListener('click', async () => {
  if (cardsStudiedThisSession > 0) {
    try {
      await api('/api/study/session', {
        method: 'POST',
        body: { cardsStudied: cardsStudiedThisSession },
      });
    } catch (err) {
      console.error('Failed to log study session:', err);
    }
  }
  showView('home');
});

// === UTILS ===
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// === INIT ===
checkAuth();
