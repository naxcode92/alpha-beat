// === PRESET CARD PACKS ===
const PRESETS = [
  {
    id: 'sentences',
    name: 'Simple Sentences',
    icon: '\u{1F4AC}',
    desc: '10 everyday phrases',
    cards: [
      { hindi: 'namaste', english: 'hello', phonetic: '/nuh-MUS-tay/' },
      { hindi: 'dhanyavaad', english: 'thank you', phonetic: '/dhun-yuh-VAAD/' },
      { hindi: 'haan', english: 'yes', phonetic: '/haahn/' },
      { hindi: 'nahin', english: 'no', phonetic: '/nuh-HEEN/' },
      { hindi: 'maaf kijiye', english: 'excuse me / sorry', phonetic: '/maaf kee-JEE-yay/' },
      { hindi: 'aap kaise hain?', english: 'how are you?', phonetic: '/aap KAY-say hain/' },
      { hindi: 'main theek hoon', english: 'I am fine', phonetic: '/main theek hoon/' },
      { hindi: 'mera naam ... hai', english: 'my name is ...', phonetic: '/MAY-rah naam ... hai/' },
      { hindi: 'kripya', english: 'please', phonetic: '/KRIP-yah/' },
      { hindi: 'phir milenge', english: 'see you again', phonetic: '/phir MIL-en-gay/' },
    ],
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: '\u{1F42E}',
    desc: '10 common animals',
    cards: [
      { hindi: 'kutha', english: 'dog', phonetic: '/KUT-tah/' },
      { hindi: 'billi', english: 'cat', phonetic: '/BIL-lee/' },
      { hindi: 'gaay', english: 'cow', phonetic: '/gaay/' },
      { hindi: 'ghoda', english: 'horse', phonetic: '/GHO-dah/' },
      { hindi: 'haathi', english: 'elephant', phonetic: '/HAA-thee/' },
      { hindi: 'sher', english: 'lion', phonetic: '/share/' },
      { hindi: 'bandar', english: 'monkey', phonetic: '/BUN-dur/' },
      { hindi: 'chidiya', english: 'bird', phonetic: '/CHID-ee-yah/' },
      { hindi: 'machli', english: 'fish', phonetic: '/MUCH-lee/' },
      { hindi: 'saanp', english: 'snake', phonetic: '/saanp/' },
    ],
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: '\u{1F34E}',
    desc: '10 popular fruits',
    cards: [
      { hindi: 'seb', english: 'apple', phonetic: '/sayb/' },
      { hindi: 'kela', english: 'banana', phonetic: '/KAY-lah/' },
      { hindi: 'aam', english: 'mango', phonetic: '/aam/' },
      { hindi: 'angoor', english: 'grapes', phonetic: '/un-GOOR/' },
      { hindi: 'santara', english: 'orange', phonetic: '/sun-TUH-rah/' },
      { hindi: 'tarbooz', english: 'watermelon', phonetic: '/tur-BOOZ/' },
      { hindi: 'ananas', english: 'pineapple', phonetic: '/UH-nuh-naas/' },
      { hindi: 'amrood', english: 'guava', phonetic: '/um-ROOD/' },
      { hindi: 'nashpati', english: 'pear', phonetic: '/NASH-puh-tee/' },
      { hindi: 'papita', english: 'papaya', phonetic: '/puh-PEE-tah/' },
    ],
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '\u{1F966}',
    desc: '10 common vegetables',
    cards: [
      { hindi: 'aloo', english: 'potato', phonetic: '/ah-LOO/' },
      { hindi: 'pyaaz', english: 'onion', phonetic: '/pyaaz/' },
      { hindi: 'tamatar', english: 'tomato', phonetic: '/tuh-MAA-tur/' },
      { hindi: 'gobhi', english: 'cauliflower', phonetic: '/GO-bhee/' },
      { hindi: 'palak', english: 'spinach', phonetic: '/PAA-luk/' },
      { hindi: 'gajar', english: 'carrot', phonetic: '/GAH-jur/' },
      { hindi: 'matar', english: 'peas', phonetic: '/MUH-tur/' },
      { hindi: 'bhindi', english: 'okra', phonetic: '/BHIN-dee/' },
      { hindi: 'baigan', english: 'eggplant', phonetic: '/BAY-gun/' },
      { hindi: 'mirch', english: 'chili pepper', phonetic: '/mirch/' },
    ],
  },
  {
    id: 'numbers',
    name: 'Numbers',
    icon: '\u{1F522}',
    desc: 'Numbers 1 to 10',
    cards: [
      { hindi: 'ek', english: 'one (1)', phonetic: '/ek/' },
      { hindi: 'do', english: 'two (2)', phonetic: '/doh/' },
      { hindi: 'teen', english: 'three (3)', phonetic: '/teen/' },
      { hindi: 'chaar', english: 'four (4)', phonetic: '/chaar/' },
      { hindi: 'paanch', english: 'five (5)', phonetic: '/paanch/' },
      { hindi: 'chhah', english: 'six (6)', phonetic: '/chhuh/' },
      { hindi: 'saat', english: 'seven (7)', phonetic: '/saat/' },
      { hindi: 'aath', english: 'eight (8)', phonetic: '/aath/' },
      { hindi: 'nau', english: 'nine (9)', phonetic: '/now/' },
      { hindi: 'das', english: 'ten (10)', phonetic: '/dus/' },
    ],
  },
];

// === WORD OF THE DAY ===
const WORD_OF_THE_DAY_POOL = [
  { hindi: 'pyaar', english: 'love', phonetic: '/pyaar/' },
  { hindi: 'dost', english: 'friend', phonetic: '/dohst/' },
  { hindi: 'paani', english: 'water', phonetic: '/PAA-nee/' },
  { hindi: 'khana', english: 'food', phonetic: '/KHAH-nah/' },
  { hindi: 'ghar', english: 'home', phonetic: '/ghur/' },
  { hindi: 'kitaab', english: 'book', phonetic: '/ki-TAAB/' },
  { hindi: 'sapna', english: 'dream', phonetic: '/SUP-nah/' },
  { hindi: 'raat', english: 'night', phonetic: '/raat/' },
  { hindi: 'din', english: 'day', phonetic: '/din/' },
  { hindi: 'suraj', english: 'sun', phonetic: '/SOO-ruj/' },
  { hindi: 'chaand', english: 'moon', phonetic: '/chaand/' },
  { hindi: 'taara', english: 'star', phonetic: '/TAA-rah/' },
  { hindi: 'baarish', english: 'rain', phonetic: '/BAA-rish/' },
  { hindi: 'hawa', english: 'wind', phonetic: '/huh-VAH/' },
  { hindi: 'phool', english: 'flower', phonetic: '/phool/' },
  { hindi: 'ped', english: 'tree', phonetic: '/payd/' },
  { hindi: 'nadi', english: 'river', phonetic: '/NUH-dee/' },
  { hindi: 'pahad', english: 'mountain', phonetic: '/puh-HAAD/' },
  { hindi: 'samundar', english: 'ocean', phonetic: '/suh-MUN-dur/' },
  { hindi: 'aasmaan', english: 'sky', phonetic: '/aas-MAAN/' },
  { hindi: 'zameen', english: 'earth / ground', phonetic: '/zuh-MEEN/' },
  { hindi: 'aag', english: 'fire', phonetic: '/aag/' },
  { hindi: 'khushi', english: 'happiness', phonetic: '/KHOO-shee/' },
  { hindi: 'umeed', english: 'hope', phonetic: '/oo-MEED/' },
  { hindi: 'shakti', english: 'power / strength', phonetic: '/SHUK-tee/' },
  { hindi: 'shanti', english: 'peace', phonetic: '/SHAAN-tee/' },
  { hindi: 'samay', english: 'time', phonetic: '/suh-MAY/' },
  { hindi: 'safar', english: 'journey', phonetic: '/SUH-fur/' },
  { hindi: 'zindagi', english: 'life', phonetic: '/zin-DUH-gee/' },
  { hindi: 'rang', english: 'color', phonetic: '/rung/' },
  { hindi: 'awaaz', english: 'voice / sound', phonetic: '/uh-VAAZ/' },
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
// Build phonetic lookup from all known words
const PHONETIC_LOOKUP = {};
for (const pack of PRESETS) {
  for (const c of pack.cards) {
    PHONETIC_LOOKUP[c.hindi.toLowerCase()] = c.phonetic;
  }
}
for (const w of WORD_OF_THE_DAY_POOL) {
  PHONETIC_LOOKUP[w.hindi.toLowerCase()] = w.phonetic;
}

async function backfillPhonetics(cardData) {
  const toUpdate = cardData.filter(c => !c.phonetic && PHONETIC_LOOKUP[c.hindi.toLowerCase()]);
  if (toUpdate.length === 0) return;

  // Update in parallel, silently
  await Promise.all(toUpdate.map(async (card) => {
    const phonetic = PHONETIC_LOOKUP[card.hindi.toLowerCase()];
    try {
      const updated = await api(`/api/cards/${card.id}`, {
        method: 'PATCH',
        body: { phonetic },
      });
      card.phonetic = updated.phonetic;
    } catch (e) {
      // Silently ignore
    }
  }));
}

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
    // Backfill phonetics for cards added before this feature
    backfillPhonetics(cards);
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
        <div class="card-item-hindi">${escapeHtml(card.hindi)}${card.phonetic ? ' <span class="card-item-phonetic">' + escapeHtml(card.phonetic) + '</span>' : ''}</div>
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
  const phonetic = $('#phonetic-input').value.trim();
  if (!hindi || !english) return;

  try {
    await api('/api/cards', { method: 'POST', body: { hindi, english, phonetic } });
    $('#hindi-input').value = '';
    $('#english-input').value = '';
    $('#phonetic-input').value = '';
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

  const phonetic = card.phonetic || '';

  if (showHindiFirst) {
    $('#front-label').textContent = 'HINDI';
    $('#front-text').textContent = card.hindi;
    $('#front-phonetic').textContent = phonetic;
    $('#back-label').textContent = 'ENGLISH';
    $('#back-text').textContent = card.english;
    $('#back-phonetic').textContent = phonetic;
  } else {
    $('#front-label').textContent = 'ENGLISH';
    $('#front-text').textContent = card.english;
    $('#front-phonetic').textContent = phonetic;
    $('#back-label').textContent = 'HINDI';
    $('#back-text').textContent = card.hindi;
    $('#back-phonetic').textContent = phonetic;
  }

  $('#current-card-num').textContent = currentIndex + 1;
  $('#total-cards-num').textContent = studyDeck.length;
}

// === SWIPE & TAP GESTURES ===
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let isSwiping = false;
let handledByTouch = false; // prevent click firing after touch

const flashcardContainer = $('#flashcard-container');

flashcardContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchStartTime = Date.now();
  isSwiping = false;
  handledByTouch = true;
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

// Click handler for desktop — suppressed on touch devices
flashcardContainer.addEventListener('click', () => {
  if (handledByTouch) {
    handledByTouch = false;
    return;
  }
  $('#flashcard').classList.toggle('flipped');
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

// === HINDI SPEECH (Web Speech API) ===
function speakHindi(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN';
  utterance.rate = 0.85;

  // Try to find a Hindi voice
  const voices = window.speechSynthesis.getVoices();
  const hindiVoice = voices.find(v => v.lang.startsWith('hi'));
  if (hindiVoice) utterance.voice = hindiVoice;

  window.speechSynthesis.speak(utterance);
}

// Preload voices (some browsers load async)
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// Speak button in study mode
$('#speak-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  const card = studyDeck[currentIndex];
  if (card) speakHindi(card.hindi);
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
  $('#wotd-phonetic').textContent = word.phonetic || '';
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

$('#wotd-speak').addEventListener('click', (e) => {
  e.stopPropagation();
  const word = getTodaysWord();
  speakHindi(word.hindi);
});

$('#wotd-add-btn').addEventListener('click', async () => {
  const word = getTodaysWord();
  const btn = $('#wotd-add-btn');
  btn.disabled = true;
  btn.textContent = '...';
  try {
    await api('/api/cards', { method: 'POST', body: { hindi: word.hindi, english: word.english, phonetic: word.phonetic || '' } });
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
