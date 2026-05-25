/* ═══════════════════════════════════════════════════════════════════
   Van's many-hats site — interaction logic

   Adding a new hat:
     1. Drop a new SVG into /hats/ (replace the file or add a new one).
     2. Add an entry to `hats` below.
     3. In index.html add a <section data-section="<id>" hidden>...</section>.
     4. In styles.css add a body[data-theme="<id>"] block with the
        --bg, --text, --accent, --heading-font etc. you want.
   ═══════════════════════════════════════════════════════════════════ */

const hats = [
  {
    id: 'home',
    label: 'Home',
    tagline: 'the many-hats overview',
    asset: 'hats/home.svg',
    alt: 'Home',
    isHome: true,
  },
  {
    id: 'scientist',
    label: 'PhDiva',
    tagline: 'computational scientist',
    asset: 'hats/phd.svg',
    alt: 'PhD cap',
  },
  {
    id: 'artist',
    label: 'Artsy',
    tagline: 'mixed media creative',
    asset: 'hats/beret.svg',
    alt: 'Artist beret',
  },
  {
    id: 'sporty',
    label: 'Sporty',
    tagline: 'multi-sport athlete',
    asset: 'hats/baseball.svg',
    alt: 'Baseball cap',
  },
  {
    id: 'traveler',
    label: 'Traveler',
    tagline: 'stories from the road',
    asset: 'hats/bucket-globe.svg',
    alt: 'Bucket hat with globe patch',
  },
  {
    id: 'online',
    label: 'Chronically<br>Online',
    tagline: 'currently scrolling',
    asset: 'hats/phone.svg',
    alt: 'Smartphone balanced on head',
  },
];

const HAT_LEAVE_MS = 500;

const dock          = document.getElementById('hat-dock');
const hatSlot       = document.getElementById('hat-slot');
const accessorySlot = document.getElementById('accessory-slot');
const body          = document.body;

let currentHatId = null;

/* ── Render the dock ──────────────────────────────────────────────── */
hats.forEach(hat => {
  const btn = document.createElement('button');
  btn.className = 'hat-button';
  btn.type = 'button';
  btn.dataset.hat = hat.id;
  btn.setAttribute('aria-pressed', 'false');
  btn.setAttribute('aria-label', `Wear the ${hat.label.toLowerCase()} hat`);
  btn.innerHTML = `
    <span class="hat-button-thumb"><img src="${hat.asset}" alt=""></span>
    <span class="hat-button-label">${hat.label}</span>
  `;
  btn.addEventListener('click', () => toggleHat(hat.id));
  dock.appendChild(btn);
});

/* ── Core toggle ──────────────────────────────────────────────────── */
function toggleHat(id) {
  // Home button always returns to the landing view, regardless of state
  if (id === 'home') {
    removeCurrentHat();
    showSection('home');
    setTheme('home');
    updateDockAria('home');
    setHash('');
    currentHatId = null;
    return;
  }
  if (currentHatId === id) {
    removeCurrentHat();
    showSection('home');
    setTheme('home');
    updateDockAria(null);
    setHash('');
    currentHatId = null;
    return;
  }
  applyHat(id);
}

function applyHat(id) {
  const hat = hats.find(h => h.id === id);
  if (!hat) return;
  if (hat.isHome) { toggleHat('home'); return; }

  removeCurrentHat();

  const img = document.createElement('img');
  img.src = hat.asset;
  img.alt = hat.alt;
  img.className = 'hat-svg';
  hatSlot.appendChild(img);

  // Force reflow so the transition picks up the initial → active change
  void img.offsetWidth;
  img.classList.add('active');

  if (hat.accessory) {
    const acc = document.createElement('img');
    acc.src = hat.accessory;
    acc.alt = hat.accessoryAlt || '';
    acc.className = 'accessory-svg';
    accessorySlot.appendChild(acc);
    void acc.offsetWidth;
    acc.classList.add('active');
  }

  setTheme(id);
  showSection(id);
  updateDockAria(id);
  setHash(id);
  currentHatId = id;

  // Lazy-init the traveler map after the section becomes visible.
  if (id === 'traveler' && typeof window.initTravelMap === 'function') {
    setTimeout(() => {
      window.initTravelMap();
      window._travelMap?.invalidateSize();
    }, 150);
  }
}

function removeCurrentHat() {
  const existing = hatSlot.querySelector('.hat-svg.active');
  if (existing) {
    existing.classList.remove('active');
    existing.classList.add('leaving');
    setTimeout(() => existing.remove(), HAT_LEAVE_MS);
  }
  const existingAcc = accessorySlot.querySelector('.accessory-svg.active');
  if (existingAcc) {
    existingAcc.classList.remove('active');
    existingAcc.classList.add('leaving');
    setTimeout(() => existingAcc.remove(), HAT_LEAVE_MS);
  }
}

/* ── Theme + content swap ─────────────────────────────────────────── */
function setTheme(id) {
  body.dataset.theme = id;
}

function showSection(id) {
  document.querySelectorAll('[data-section]').forEach(s => {
    s.hidden = (s.dataset.section !== id);
  });
  const target = document.querySelector(`[data-section="${id}"]`);
  if (!target) return;
  // Re-trigger the CSS entrance animation
  target.style.animation = 'none';
  void target.offsetHeight;
  target.style.animation = '';
}

function updateDockAria(activeId) {
  dock.querySelectorAll('.hat-button').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.hat === activeId ? 'true' : 'false');
  });
}

/* ── Deep links via URL hash ──────────────────────────────────────── */
function setHash(id) {
  const newHash = id ? `#${id}` : '';
  if (window.location.hash !== newHash) {
    history.replaceState(null, '', window.location.pathname + newHash);
  }
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === 'home') {
    if (currentHatId !== null) toggleHat(currentHatId);
    updateDockAria('home');
  } else {
    const hat = hats.find(h => h.id === hash);
    if (hat && !hat.isHome && hash !== currentHatId) applyHat(hash);
  }
});

/* ── Initial state ────────────────────────────────────────────────── */
(function init() {
  const hash = window.location.hash.slice(1);
  const hat = hats.find(h => h.id === hash);
  if (hat && !hat.isHome) {
    applyHat(hash);
  } else {
    updateDockAria('home');
  }
})();

/* ═══════════════════════════════════════════════════════════════════
   YouTube auto-fetch (Traveler section)

   ⚠️  Paste your YouTube channel ID below. It's the string that
   starts with "UC" (e.g. "UCabc123..."). To find it:
     1. Open https://www.youtube.com/account_advanced while signed
        into your YouTube account, OR
     2. Visit your channel page → view source → search for
        "channelId" or "externalId".
   Until you fill this in, the Traveler page shows a static fallback.
   ═══════════════════════════════════════════════════════════════════ */
const YT_CHANNEL_ID = ''; // ← paste your "UC..." channel ID here
const YT_CHANNEL_URL = 'https://www.youtube.com/@vansjoyfactory';
const YT_MAX_VIDEOS = 6;

async function loadLatestVideos() {
  const container = document.getElementById('latest-videos');
  if (!container) return;

  if (!YT_CHANNEL_ID) {
    container.innerHTML = `<p class="video-status">
      Drop your YouTube channel ID into <code>app.js</code> and your latest videos will show up here.
      In the meantime, head straight to <a href="${YT_CHANNEL_URL}" target="_blank" rel="noopener">the channel</a>.
    </p>`;
    return;
  }

  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`;
  const apiUrl  = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=${YT_MAX_VIDEOS}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.status !== 'ok' || !data.items?.length) throw new Error('feed empty or error');

    container.innerHTML = data.items.slice(0, YT_MAX_VIDEOS).map(v => {
      const videoId = (v.guid || '').split(':').pop();
      const thumb = v.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '');
      const date = new Date(v.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `
        <a class="video-card" href="${v.link}" target="_blank" rel="noopener">
          <div class="video-thumb">
            <img src="${thumb}" alt="" loading="lazy">
            <span class="video-play" aria-hidden="true">▶</span>
          </div>
          <div class="video-meta">
            <h4>${escapeHtml(v.title)}</h4>
            <p class="video-date">${date}</p>
          </div>
        </a>`;
    }).join('');
  } catch (err) {
    container.innerHTML = `<p class="video-status">
      Couldn't load the latest videos right now. Visit
      <a href="${YT_CHANNEL_URL}" target="_blank" rel="noopener">@vansjoyfactory</a> directly.
    </p>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

/* ── Latest blog posts (pulled from Jekyll's /feed.xml) ───────────── */
async function loadLatestPosts() {
  const container = document.getElementById('latest-posts');
  if (!container) return;

  try {
    const res = await fetch('feed.xml');
    if (!res.ok) throw new Error('no feed');
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, 'application/xml');
    const entries = [...xml.querySelectorAll('entry')].slice(0, 3);

    if (!entries.length) {
      container.innerHTML = '<p class="video-status">No posts yet — first one drops soon.</p>';
      return;
    }

    container.innerHTML = `<ul class="post-list">${entries.map(e => {
      const title = e.querySelector('title')?.textContent || '(untitled)';
      const link  = e.querySelector('link')?.getAttribute('href') || '#';
      const date  = e.querySelector('published')?.textContent;
      const dateStr = date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
      return `
        <li class="post-list-item">
          <a href="${link}">
            <time class="post-list-date">${dateStr}</time>
            <h2 class="post-list-title">${escapeHtml(title)}</h2>
          </a>
        </li>`;
    }).join('')}</ul>`;
  } catch (err) {
    container.innerHTML = '<p class="video-status">First post drops soon. <a href="blog.html">Check the blog →</a></p>';
  }
}

loadLatestVideos();
loadLatestPosts();
