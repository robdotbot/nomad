// NOMAD launcher: icons, docs lookup, search and status checks shared by every page.
const KIWIX = 'http://127.0.0.1';          // Mac: Kiwix app → Hotspot. Windows: kiwix-serve. Both on port 80
const OLLAMA = 'http://127.0.0.1:11434';
const KOLIBRI = 'http://127.0.0.1:8092';
const TILES = 'http://127.0.0.1:8091';

// Lucide-style line icons (24×24, stroke).
const ICONS = {
  plugOff: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8zM2 2l20 20"/>',
  dropletOff: '<path d="M12 2.7 17.7 8.4a8 8 0 0 1 1.9 8.3M7 7.6A8 8 0 0 0 17.3 19.7M2 2l20 20"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  heartPulse: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.2 12h6.3l.5-1 2 4.5 2-7 1.5 3.5h5.3"/>',
  child: '<circle cx="12" cy="5" r="2.5"/><path d="M9 21v-6l-3-3 2.5-3.5h7L18 12l-3 3v6M9 21h6"/>',
  bleed: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/><path d="M12 12v6M9 15h6"/>',
  heartPlus: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 8v6M9 11h6"/>',
  fuel: '<path d="M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  shelter: '<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 13h8M8 17h8"/>',
  dots: '<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>',
  siren: '<path d="M7 18v-6a5 5 0 1 1 10 0v6M5 21a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1zM21 12h1M18.5 4.5 18 5M2 12h1M12 2v1M4.9 4.9l.7.7"/>',
  map: '<path d="M14.1 4.6 9.9 3.2a2 2 0 0 0-1.3 0L3.4 5a1 1 0 0 0-.4.8v13.3a1 1 0 0 0 1.4.9l4.2-1.7a2 2 0 0 1 1.3 0l4.2 1.4a2 2 0 0 0 1.3 0l5.2-1.7a1 1 0 0 0 .7-.9V4.6a1 1 0 0 0-1.4-.9l-4.2 1.7a2 2 0 0 1-1.3 0zM9 3.2v15M15 5.8v15"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4"/>',
  home: '<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/>',
  water: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  food: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M10 13h4"/>',
  medical: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  radio: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5M19.1 4.9C23 8.8 23 15.1 19.1 19"/><circle cx="12" cy="12" r="2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  cross: '<path d="M12 2v20M6 8h12"/>',
  folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>',
  sparkles: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/>',
  flask: '<path d="M9 3h6M10 3v6.5L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9.5V3M7 15h10"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  heat: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M12 14V8"/>',
  storm: '<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="M13 11l-4 6h6l-4 6"/>',
  flood: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  snow: '<path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>',
  phoneOff: '<path d="M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9M22 2 2 22"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  life: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.9 4.9 4.3 4.3M14.8 14.8l4.3 4.3M14.8 9.2l4.3-4.3M4.9 19.1l4.3-4.3"/>',
  film: '<rect x="2" y="2" width="20" height="20" rx="2.2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  wifi: '<path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 20 0M12 20h.01"/>',
};
const icon = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.doc}</svg>`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (s, el = document) => el.querySelector(s);
const params = new URLSearchParams(location.search);
const grad = (c1, c2) => `--c1:${c1};--c2:${c2}`;

// Docs: generated index (data/docs.js) plus friendly titles.
const DOC_TITLES = {
  'guides/religion/Lotus-Sutra-Kern-1884.pdf': 'Lotus Sutra (Kinh Pháp Hoa), Kern 1884',
  'guides/religion/Pure-Land-Diamond-and-Heart-Sutras-1894.pdf': 'Amitābha, Diamond and Heart Sutras (Kinh A Di Đà, Kim Cang, Bát Nhã), 1894',
  'guides/religion/Dhammapada-Muller.html': 'The Dhammapada (Kinh Pháp Cú), Müller',
  'guides/religion/Gospel-of-Buddha-Carus.html': 'The Gospel of Buddha, Carus',
  'guides/religion/Tao-Te-Ching-Legge.html': 'Tao Te Ching (Đạo Đức Kinh), Legge',
  'guides/religion/Confucian-Analects-Legge.html': 'The Analects of Confucius (Luận Ngữ), Legge',
  'guides/religion/Baltimore-Catechism-No1.html': 'Baltimore Catechism No. 1 (Catholic, 1885)',
  'guides/military/ATP-4-02.11-First-Aid-2026.pdf': 'Army ATP 4-02.11: Casualty Response and First Aid (2026)',
  'guides/military/Multi-Service-Survival-Manual.pdf': 'Multi-Service Survival Manual',
  'guides/fema/FEMA-Are-You-Ready-Guide.pdf': 'FEMA: Are You Ready? Citizen Preparedness Guide',
  'guides/las-vegas/Clark-County-Preparedness-Resources-Handbook.pdf': 'Clark County Preparedness Resources Handbook',
  'guides/las-vegas/Clark-County-Stay-Cool-Tips.pdf': 'Clark County: Stay Cool Tips',
  'guides/las-vegas/SNHD-preparing-for-extreme-heat-conditions.html': 'SNHD: Preparing for Extreme Heat',
  'guides/las-vegas/SNHD-safety-precautions-during-and-after-floods.html': 'SNHD: Flood Safety',
  'guides/san-antonio/SA-Winter-Weather-Preparedness-Guide.pdf': 'San Antonio Winter Weather Preparedness Guide',
  'guides/radio/BTECH-UV-PRO-Manual-Rev3.pdf': 'BTECH UV-PRO User Manual (Rev 3)',
  'guides/radio/BTECH-App-Manual-UV-PRO-2025.pdf': 'BTECH App Manual: UV-PRO (2025)',
  'guides/radio/Baofeng-UV-5R-Mini-Manual.pdf': 'Baofeng UV-5R Mini User Manual',
  'guides/radio/Baofeng-UV-5R-Mini-FCC-Certificate.pdf': 'Baofeng UV-5R Mini FCC Certificate',
  'guides/radio/Miklor-UV-5R-Mini-Review.html': 'Miklor: UV-5R Mini Review and CHIRP Notes',
  'guides/radio/CISA-NIFOG-2.02.pdf': 'CISA NIFOG 2.02: Interoperability Field Guide',
  'guides/radio/ARRL-ARES-Field-Resources-Manual-2019.pdf': 'ARRL ARES Field Resources Manual',
  'guides/radio/ARRL-US-Amateur-Bands-Chart.pdf': 'ARRL US Amateur Bands Chart',
  'guides/radio/FAA-Chart-Supplement-Southwest-2026-10-29.pdf': 'FAA Chart Supplement: Southwest (airband)',
  'guides/radio/FAA-Chart-Supplement-South-Central-2026-10-29.pdf': 'FAA Chart Supplement: South Central (airband)',
};
const BIBLES = [
  ['guides/bible/eng-kjv2006/index.htm', 'King James Version', 'Protestant classic, with Apocrypha'],
  ['guides/bible/eng-web/index.htm', 'World English Bible', 'Modern English, with Deuterocanon'],
  ['guides/bible/eng-asv/index.htm', 'American Standard Version', 'Literal, 1901'],
  ['guides/bible/engDRA/index.htm', 'Douay-Rheims', 'Catholic'],
  ['guides/bible/eng-Brenton/index.htm', 'Brenton Septuagint', 'Orthodox Old Testament'],
  ['guides/bible/vie1934/index.htm', 'Kinh Thánh (Vietnamese Bible)', 'Bản Truyền Thống 1925, Protestant'],
];
const docTitle = p => DOC_TITLES[p] || p.split('/').pop().replace(/\.(pdf|html?)$/, '').replace(/[-_]+/g, ' ');
const fmtSize = b => b >= 1e6 ? (b / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1e3)) + ' KB';
const allDocs = () => (window.DOCS || []).map(d => ({ ...d, title: docTitle(d.path) }));

function docCard(d, c = ['#48484a', '#2c2c2e']) {
  const isPdf = d.path.endsWith('.pdf');
  const meta = [d.pages ? d.pages + ' pages' : 'Web page', fmtSize(d.bytes)].join(' · ');
  return `<a class="doc" href="${esc(d.path)}" target="_blank" style="${grad(...c)}">
    <div class="thumb">${d.thumb ? `<img loading="lazy" src="${esc(d.thumb)}" alt="">` : icon(isPdf ? 'doc' : 'book')}<span class="kind">${isPdf ? 'PDF' : 'WEB'}</span></div>
    <b>${esc(d.title)}</b><small>${meta}</small></a>`;
}

// Live status dot for a server.
async function checkUp(url) {
  try { await fetch(url, { mode: 'no-cors', cache: 'no-store', signal: AbortSignal.timeout(2500) }); return true; }
  catch { return false; }
}
function wireStatus(root = document) {
  root.querySelectorAll('[data-check]').forEach(async el => {
    const s = el.querySelector('.status'); if (!s) return;
    const ok = await checkUp(el.dataset.check);
    s.textContent = ok ? '● on' : '○ off'; s.className = 'status ' + (ok ? 'ok' : 'bad');
    if (!ok && el.dataset.off) s.title = el.dataset.off;
  });
}

const kiwixSearch = q => `${KIWIX}/search?pattern=${encodeURIComponent(q)}`;

// Search box: instant matches from emergencies, topics, family pages, docs and Bibles, then
// "search the library" (Kiwix full text) and "ask the AI".
function searchIndex() {
  const out = [];
  (window.EMERGENCIES || []).forEach(e => out.push({ t: e.title, k: 'Emergency', href: 'emergency.html?id=' + e.id, ic: e.icon,
    text: [e.title, e.sub, ...(e.phases || []).flatMap(p => p.items.map(i => i.t + ' ' + i.d))].join(' ') }));
  (window.TOPICS || []).forEach(t => out.push({ t: t.title, k: 'Topic', href: 'topic.html?id=' + t.id, ic: t.icon, text: [t.title, t.sub, t.blurb, ...(t.keywords || [])].join(' ') }));
  (window.FAMILY_PAGES || []).forEach(f => out.push({ t: f.title, k: 'Family', href: f.href || 'family.html?id=' + f.id, ic: f.icon, text: f.title + ' ' + f.sub }));
  allDocs().forEach(d => out.push({ t: d.title, k: d.path.endsWith('.pdf') ? 'PDF' : 'Web page', href: d.path, ic: 'doc', text: d.title + ' ' + d.path, blank: true }));
  BIBLES.forEach(([p, t, s]) => out.push({ t, k: 'Bible', href: p, ic: 'cross', text: t + ' ' + s + ' bible scripture', blank: true }));
  (window.VIDEOS || []).forEach(v => out.push({ t: v.t, k: 'Video', href: videoHref(v), ic: 'film', text: v.t + ' video ' + VIDEO_COLLECTIONS[v.c].channel }));
  return out;
}
function wireSearch(input, opts = {}) {
  const box = document.createElement('div'); box.className = 'results'; input.parentNode.appendChild(box);
  const index = searchIndex(); let sel = -1;
  const render = () => {
    const q = input.value.trim(); sel = -1;
    if (!q) { box.classList.remove('open'); return; }
    const words = q.toLowerCase().split(/\s+/);
    const pool = opts.filter ? index.filter(opts.filter) : index;
    const hits = pool.map(r => {
      const tl = r.t.toLowerCase(), all = r.text.toLowerCase();
      if (!words.every(w => all.includes(w))) return null;
      return { ...r, score: words.reduce((s, w) => s + (tl.includes(w) ? 3 : 1), 0) + (tl.startsWith(words[0]) ? 2 : 0) };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8);
    const extra = [
      { t: `Search the library for “${q}”`, k: 'Wikipedia, medical, iFixit…', href: kiwixSearch(opts.prefix ? opts.prefix + ' ' + q : q), ic: 'book', blank: true },
      { t: `Ask the AI: “${q}”`, k: 'Offline', href: 'chat.html?q=' + encodeURIComponent(q), ic: 'sparkles' },
    ];
    box.innerHTML = [...hits, ...extra].map(r => `<a href="${esc(r.href)}"${r.blank ? ' target="_blank"' : ''}>${icon(r.ic)}<b>${esc(r.t)}</b><span>${esc(r.k)}</span></a>`).join('');
    box.classList.add('open');
  };
  input.addEventListener('input', render);
  input.addEventListener('focus', render);
  input.addEventListener('keydown', e => {
    const links = [...box.querySelectorAll('a')]; if (!links.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
      links.forEach((a, i) => a.classList.toggle('sel', i === sel));
    } else if (e.key === 'Enter') { (links[sel] || links[0]).click(); }
    else if (e.key === 'Escape') { input.value = ''; render(); }
  });
  document.addEventListener('click', e => { if (!input.parentNode.contains(e.target)) box.classList.remove('open'); });
}

// ---- Videos (data/videos.js, from scripts/videos-index.sh). They play inside the Kiwix library.
const VIDEO_TOPICS = {
  water: /\bwater|\bfilters?\b|purif|\bwells?\b|\brain(water)?\b/i,
  food: /food|meals?\b|\bmres?\b|canning|freeze.?dr|\brice\b|\bbeans?\b|pantry|stockpil|garden|\bcook|\brations?\b|calorie/i,
  medical: /first aid|ifak|medic|trauma|wound|tourniquet|bleed|med kit|antibiotic|injur/i,
  kids: /\bkids?\b|child|family/i,
  power: /solar|generator|\bpower\b|batter|electric|blackout|\bgrid\b/i,
  comms: /radio|\bham\b|gmrs|comms|communicat|baofeng|frequenc/i,
  home: /winter|\bheat|shelter|stove|\bhouse|\bhome\b|blackout|earthquake|\bcold\b|freez|\bstorms?\b/i,
  security: /security|defen[cs]e|\blocks?\b|gr[ae]y man|safe room|opsec/i,
  repair: /repair|\bfix|tool|maintenan|sharpen/i,
  survival: /surviv|bushcraft|knife|knives|\bknots?\b|\bfire\b|navigat|compass|bug.?out|\bedc\b|\bkits?\b|\bcamp|\btarps?\b/i,
};
const fmtDur = s => s >= 3600 ? `${Math.floor(s / 3600)}:${String(Math.floor(s % 3600 / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
// Videos play in play.html, streamed from the ZIM on the drive by serve.py (no Kiwix needed).
const videoHref = v => 'play.html?b=' + encodeURIComponent(VIDEO_COLLECTIONS[v.c].book) + '&s=' + encodeURIComponent(v.s);
function videoCard(v) {
  const c = VIDEO_COLLECTIONS[v.c];
  return `<a class="vid" href="${esc(videoHref(v))}">
    <div class="vthumb">${v.th ? `<img loading="lazy" src="${esc(v.th)}" alt="">` : icon('film')}${v.d ? `<span>${fmtDur(v.d)}</span>` : ''}</div>
    <b>${esc(v.t)}</b><small>${esc(c.channel)}${v.y ? ' · ' + v.y : ''}</small></a>`;
}
const VIDEO_SKIP = /channel update|patreon|giveaway|livestream|\blive\b|announcement|merch/i;   // not how-to
const videosFor = (topicId, n = 12) => (window.VIDEOS || []).filter(v => VIDEO_TOPICS[topicId]?.test(v.t) && !VIDEO_SKIP.test(v.t)).slice(0, n);
function fixVideoLinks() {}   // kept for older pages; video links no longer depend on Kiwix
