// === PRESET CARD PACKS ===
const PRESETS = [
  {
    id: 'sentences',
    name: 'Simple Sentences',
    icon: '\u{1F4AC}',
    desc: '10 everyday phrases',
    cards: [
      { hindi: 'namaste', english: 'hello' },
      { hindi: 'dhanyavaad', english: 'thank you' },
      { hindi: 'haan', english: 'yes' },
      { hindi: 'nahin', english: 'no' },
      { hindi: 'maaf kijiye', english: 'excuse me / sorry' },
      { hindi: 'aap kaise hain?', english: 'how are you?' },
      { hindi: 'main theek hoon', english: 'I am fine' },
      { hindi: 'mera naam ... hai', english: 'my name is ...' },
      { hindi: 'kripya', english: 'please' },
      { hindi: 'phir milenge', english: 'see you again' },
    ],
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: '\u{1F42E}',
    desc: '10 common animals',
    cards: [
      { hindi: 'kutha', english: 'dog' },
      { hindi: 'billi', english: 'cat' },
      { hindi: 'gaay', english: 'cow' },
      { hindi: 'ghoda', english: 'horse' },
      { hindi: 'haathi', english: 'elephant' },
      { hindi: 'sher', english: 'lion' },
      { hindi: 'bandar', english: 'monkey' },
      { hindi: 'chidiya', english: 'bird' },
      { hindi: 'machli', english: 'fish' },
      { hindi: 'saanp', english: 'snake' },
    ],
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: '\u{1F34E}',
    desc: '10 popular fruits',
    cards: [
      { hindi: 'seb', english: 'apple' },
      { hindi: 'kela', english: 'banana' },
      { hindi: 'aam', english: 'mango' },
      { hindi: 'angoor', english: 'grapes' },
      { hindi: 'santara', english: 'orange' },
      { hindi: 'tarbooz', english: 'watermelon' },
      { hindi: 'ananas', english: 'pineapple' },
      { hindi: 'amrood', english: 'guava' },
      { hindi: 'nashpati', english: 'pear' },
      { hindi: 'papita', english: 'papaya' },
    ],
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '\u{1F966}',
    desc: '10 common vegetables',
    cards: [
      { hindi: 'aloo', english: 'potato' },
      { hindi: 'pyaaz', english: 'onion' },
      { hindi: 'tamatar', english: 'tomato' },
      { hindi: 'gobhi', english: 'cauliflower' },
      { hindi: 'palak', english: 'spinach' },
      { hindi: 'gajar', english: 'carrot' },
      { hindi: 'matar', english: 'peas' },
      { hindi: 'bhindi', english: 'okra' },
      { hindi: 'baigan', english: 'eggplant' },
      { hindi: 'mirch', english: 'chili pepper' },
    ],
  },
  {
    id: 'numbers',
    name: 'Numbers',
    icon: '\u{1F522}',
    desc: 'Numbers 1 to 10',
    cards: [
      { hindi: 'ek', english: 'one (1)' },
      { hindi: 'do', english: 'two (2)' },
      { hindi: 'teen', english: 'three (3)' },
      { hindi: 'chaar', english: 'four (4)' },
      { hindi: 'paanch', english: 'five (5)' },
      { hindi: 'chhah', english: 'six (6)' },
      { hindi: 'saat', english: 'seven (7)' },
      { hindi: 'aath', english: 'eight (8)' },
      { hindi: 'nau', english: 'nine (9)' },
      { hindi: 'das', english: 'ten (10)' },
    ],
  },
];

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
    renderPresetPacks();
  } catch (err) {
    console.error('Failed to load home:', err);
  }
}

$('#go-create').addEventListener('click', () => showView('create'));
$('#go-study').addEventListener('click', () => showView('study'));

// === PRESET PACKS ===
function renderPresetPacks() {
  const container = $('#preset-packs');
  if (!container) return;

  // Check which packs the user already has (by matching hindi text of first card)
  const existingHindi = new Set(cards.map(c => c.hindi.toLowerCase()));

  container.innerHTML = PRESETS.map(pack => {
    const alreadyAdded = pack.cards.every(c => existingHindi.has(c.hindi.toLowerCase()));
    return `
      <div class="pack-card ${alreadyAdded ? 'pack-added' : ''}" data-pack="${pack.id}">
        <div class="pack-icon">${pack.icon}</div>
        <div class="pack-info">
          <div class="pack-name">${pack.name}</div>
          <div class="pack-desc">${pack.desc}</div>
        </div>
        <button class="btn-pack ${alreadyAdded ? 'btn-pack-done' : ''}"
                onclick="addPack('${pack.id}')" ${alreadyAdded ? 'disabled' : ''}>
          ${alreadyAdded ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '+ Add'}
        </button>
      </div>
    `;
  }).join('');
}

async function addPack(packId) {
  const pack = PRESETS.find(p => p.id === packId);
  if (!pack) return;

  const btn = document.querySelector(`.pack-card[data-pack="${packId}"] .btn-pack`);
  if (btn) {
    btn.disabled = true;
    btn.textContent = '...';
  }

  try {
    const newCards = await api('/api/cards/bulk', {
      method: 'POST',
      body: { cards: pack.cards },
    });
    cards = cards.concat(newCards);
    $('#total-card-count').textContent = cards.length;
    renderPresetPacks();
  } catch (err) {
    alert('Failed to add pack: ' + err.message);
    if (btn) {
      btn.disabled = false;
      btn.textContent = '+ Add';
    }
  }
}
window.addPack = addPack;

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
