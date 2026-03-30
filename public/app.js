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

// === WORD OF THE DAY ===
const WORD_OF_THE_DAY_POOL = [
  { hindi: 'pyaar', english: 'love' },
  { hindi: 'dost', english: 'friend' },
  { hindi: 'paani', english: 'water' },
  { hindi: 'khana', english: 'food' },
  { hindi: 'ghar', english: 'home' },
  { hindi: 'kitaab', english: 'book' },
  { hindi: 'sapna', english: 'dream' },
  { hindi: 'raat', english: 'night' },
  { hindi: 'din', english: 'day' },
  { hindi: 'suraj', english: 'sun' },
  { hindi: 'chaand', english: 'moon' },
  { hindi: 'taara', english: 'star' },
  { hindi: 'baarish', english: 'rain' },
  { hindi: 'hawa', english: 'wind' },
  { hindi: 'phool', english: 'flower' },
  { hindi: 'ped', english: 'tree' },
  { hindi: 'nadi', english: 'river' },
  { hindi: 'pahad', english: 'mountain' },
  { hindi: 'samundar', english: 'ocean' },
  { hindi: 'aasmaan', english: 'sky' },
  { hindi: 'zameen', english: 'earth / ground' },
  { hindi: 'aag', english: 'fire' },
  { hindi: 'khushi', english: 'happiness' },
  { hindi: 'umeed', english: 'hope' },
  { hindi: 'shakti', english: 'power / strength' },
  { hindi: 'shanti', english: 'peace' },
  { hindi: 'samay', english: 'time' },
  { hindi: 'safar', english: 'journey' },
  { hindi: 'zindagi', english: 'life' },
  { hindi: 'rang', english: 'color' },
  { hindi: 'awaaz', english: 'voice / sound' },
];

function getTodaysWord() {
  // Deterministic pick based on date so everyone sees the same word each day
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / 86400000) % WORD_OF_THE_DAY_POOL.length;
  return WORD_OF_THE_DAY_POOL[dayIndex];
}

// === STATE ===
let cards = [];
let studyDeck = []; // shuffled or ordered copy for study mode
let currentIndex = 0;
let showHindiFirst = true;
let shuffleMode = false;
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
    showWordOfTheDay();
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
    showWordOfTheDay();
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

// Shuffle toggle
$('#shuffle-toggle').addEventListener('click', () => {
  shuffleMode = !shuffleMode;
  $('#shuffle-toggle').classList.toggle('active', shuffleMode);
});

// Start studying
$('#start-study').addEventListener('click', () => {
  if (cards.length === 0) return;
  studyDeck = shuffleMode ? shuffleArray(cards) : [...cards];
  $('#study-setup').hidden = true;
  $('#study-area').hidden = false;
  currentIndex = 0;
  renderStudyCard();
});

$('#go-create-from-study').addEventListener('click', () => showView('create'));

function renderStudyCard() {
  const card = studyDeck[currentIndex];
  if (!card) return;

  const flashcard = $('#flashcard');
  flashcard.classList.remove('flipped');

  if (showHindiFirst) {
    $('#front-label').textContent = 'HINDI';
    $('#front-text').textContent = card.hindi;
    $('#back-label').textContent = 'ENGLISH';
    $('#back-text').textContent = card.english;
  } else {
    $('#front-label').textContent = 'ENGLISH';
    $('#front-text').textContent = card.english;
    $('#back-label').textContent = 'HINDI';
    $('#back-text').textContent = card.hindi;
  }

  $('#current-card-num').textContent = currentIndex + 1;
  $('#total-cards-num').textContent = studyDeck.length;
}

// === SWIPE & TAP GESTURES ===
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let isSwiping = false;

const flashcardContainer = $('#flashcard-container');

flashcardContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchStartTime = Date.now();
  isSwiping = false;
}, { passive: true });

flashcardContainer.addEventListener('touchmove', (e) => {
  const dx = e.touches[0].clientX - touchStartX;
  const dy = e.touches[0].clientY - touchStartY;
  if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy)) {
    isSwiping = true;
  }
}, { passive: true });

flashcardContainer.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const elapsed = Date.now() - touchStartTime;

  if (isSwiping && Math.abs(dx) > 50 && elapsed < 500) {
    if (dx < 0) {
      // Swipe left → next card
      if (studyDeck.length === 0) return;
      cardsStudiedThisSession++;
      currentIndex = (currentIndex + 1) % studyDeck.length;
      flashcardContainer.classList.add('swipe-left');
      setTimeout(() => {
        renderStudyCard();
        flashcardContainer.classList.remove('swipe-left');
        flashcardContainer.classList.add('swipe-enter-right');
        setTimeout(() => flashcardContainer.classList.remove('swipe-enter-right'), 200);
      }, 150);
    } else {
      // Swipe right → prev card
      if (studyDeck.length === 0) return;
      currentIndex = (currentIndex - 1 + studyDeck.length) % studyDeck.length;
      flashcardContainer.classList.add('swipe-right');
      setTimeout(() => {
        renderStudyCard();
        flashcardContainer.classList.remove('swipe-right');
        flashcardContainer.classList.add('swipe-enter-left');
        setTimeout(() => flashcardContainer.classList.remove('swipe-enter-left'), 200);
      }, 150);
    }
    isSwiping = false;
    return;
  }

  // Tap (not a swipe) → flip
  if (!isSwiping) {
    $('#flashcard').classList.toggle('flipped');
  }
  isSwiping = false;
});

// Navigation
$('#prev-card').addEventListener('click', () => {
  if (studyDeck.length === 0) return;
  currentIndex = (currentIndex - 1 + studyDeck.length) % studyDeck.length;
  renderStudyCard();
});

$('#next-card').addEventListener('click', () => {
  if (studyDeck.length === 0) return;
  cardsStudiedThisSession++;
  currentIndex = (currentIndex + 1) % studyDeck.length;
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

// === WORD OF THE DAY MODAL ===
function showWordOfTheDay() {
  const word = getTodaysWord();
  const todayStr = new Date().toISOString().split('T')[0];
  const lastShown = localStorage.getItem('wotd_last_shown');

  // Only show once per day
  if (lastShown === todayStr) return;
  localStorage.setItem('wotd_last_shown', todayStr);

  const modal = $('#wotd-modal');
  $('#wotd-hindi').textContent = word.hindi;
  $('#wotd-english').textContent = word.english;
  modal.hidden = false;

  // Check if already in cards
  const alreadyHas = cards.some(c => c.hindi.toLowerCase() === word.hindi.toLowerCase());
  const addBtn = $('#wotd-add-btn');
  if (alreadyHas) {
    addBtn.textContent = 'Already in your cards';
    addBtn.disabled = true;
    addBtn.classList.add('btn-wotd-done');
  } else {
    addBtn.textContent = '+ Add to My Cards';
    addBtn.disabled = false;
    addBtn.classList.remove('btn-wotd-done');
  }
}

$('#wotd-close').addEventListener('click', () => {
  $('#wotd-modal').hidden = true;
});

$('#wotd-add-btn').addEventListener('click', async () => {
  const word = getTodaysWord();
  const btn = $('#wotd-add-btn');
  btn.disabled = true;
  btn.textContent = '...';
  try {
    await api('/api/cards', { method: 'POST', body: { hindi: word.hindi, english: word.english } });
    btn.textContent = 'Added!';
    btn.classList.add('btn-wotd-done');
    // Refresh cards
    cards = await api('/api/cards');
    $('#total-card-count').textContent = cards.length;
    renderPresetPacks();
  } catch (err) {
    btn.textContent = 'Failed';
    setTimeout(() => {
      btn.textContent = '+ Add to My Cards';
      btn.disabled = false;
    }, 1500);
  }
});

// Close modal on backdrop click
$('#wotd-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    $('#wotd-modal').hidden = true;
  }
});

// === UTILS ===
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// === INIT ===
checkAuth();
