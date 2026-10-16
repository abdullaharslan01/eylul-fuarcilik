/* Eylül Fuar Rehberi — mobil uygulama prototipi */

const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const params = new URLSearchParams(location.search);
const EMBED = params.has('embed');
const STORE_KEY = 'eylul-rehber-v2';

/* ---------- İkonlar ---------- */
const P = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  cal: '<rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18"/>',
  map: '<path d="m9 4-6 2.5v14L9 18l6 2.5 6-2.5v-14L15 6.5z"/><path d="M9 4v14M15 6.5v14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  heart: '<path d="M12 20.5s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8c0 6.3-8 11-8 11z"/>',
  bell: '<path d="M18 9a6 6 0 0 0-12 0c0 6.5-2.5 8-2.5 8h17S18 15.5 18 9M10 20.5a2.2 2.2 0 0 0 4 0"/>',
  pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2.5"/>',
  bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 18v2.5M16 18v2.5"/><circle cx="8" cy="14.5" r=".6"/><circle cx="16" cy="14.5" r=".6"/>',
  tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  kid: '<circle cx="12" cy="6" r="3"/><path d="M8 21v-5l-2-4 6-2 6 2-2 4v5M10 21v-4h4v4"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5V14M12 17.2v.1"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5"/>',
  share: '<path d="M12 15V3M7.5 7.5 12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  chev: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H11v17H5.5A1.5 1.5 0 0 0 4 21.5zM20 4.5A1.5 1.5 0 0 0 18.5 3H13v17h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
  bookmark: '<path d="M6 3h12v18l-6-4.5L6 21z"/>',
  alert: '<path d="M12 3 2 20h20zM12 10v4M12 17v.1"/>',
  star: '<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5l-5.5 2.9 1-6.3L3 9.7l6.2-.9z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5"/>',
  wc: '<circle cx="7" cy="4.5" r="1.8"/><circle cx="17" cy="4.5" r="1.8"/><path d="M5 9h4l.5 6H8.5v6h-3v-6h-1zM15 9h4l2 7h-2.5v5h-3v-5H13z"/>',
  cup: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.1"/>',
  car: '<path d="M5 17h14M4 17v-5l2.5-5h11L20 12v5M4 17v2.5M20 17v2.5"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
  train: '<rect x="5" y="3" width="14" height="14" rx="4"/><path d="M5 11h14M8 21l2-4M16 21l-2-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/>',
  school: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.1M17 21h4v-4M14 21v-3"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  stage: '<path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-5h6v5"/>',
  brush: '<path d="M14 4l6 6-8.5 8.5a3 3 0 0 1-2 .9H5v-4.5a3 3 0 0 1 .9-2z"/><path d="m11 7 6 6"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/>',
  flame: '<path d="M12 21c-4 0-7-2.7-7-6.5 0-4 3.5-6 3.5-10 2.5 1.5 4 3.5 4.5 6 1-1 1.5-2 1.5-3.5C17 9 19 11.5 19 14.5c0 3.8-3 6.5-7 6.5z"/>',
  walk: '<circle cx="13" cy="4" r="2"/><path d="M9 21l2-6 3 3v3M7.5 12.5 10 8.5l4 1 2 3.5h3M10 8.5 9 14"/>',
  phone: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/>'
};
const ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;

/* ---------- Durum ---------- */
const DEFAULT = {
  fair: 'ankara',
  read: [],
  extraNotices: []
};
let S = load();
function load() {
  if (params.has('reset')) { try { localStorage.removeItem(STORE_KEY); } catch {} }
  try { return Object.assign(structuredClone(DEFAULT), JSON.parse(localStorage.getItem(STORE_KEY) || '{}')); }
  catch { return structuredClone(DEFAULT); }
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch {} }
function resetState() { S = structuredClone(DEFAULT); save(); }
const has = (k, v) => S[k].includes(v);
function toggle(k, v) { S[k] = has(k, v) ? S[k].filter(x => x !== v) : [...S[k], v]; save(); return has(k, v); }

/* ---------- Yardımcılar ---------- */
const fair = () => FAIRS[S.fair];
const kids = () => S.fair === 'cocuk';
const tmin = t => { const [h, m] = t.split('.').map(Number); return h * 60 + m; };
const nowMin = () => DEMO_NOW.minutes + Math.floor((Date.now() - BOOT) / 60000);
const BOOT = Date.now();
const author = id => AUTHORS.find(a => a.id === id);
const pub = id => PUBLISHERS.find(p => p.id === id);
const book = id => BOOKS.find(b => b.id === id);
const ev = id => EVENTS.find(e => e.id === id);
const fairEvents = () => EVENTS.filter(e => e.fair === S.fair);
const KIND = { imza: 'İmza', soylesi: 'Söyleşi', cocuk: 'Çocuk', atolye: 'Atölye' };
const KCOL = { imza: 'var(--imza)', soylesi: 'var(--soylesi)', cocuk: 'var(--cocuk)', atolye: 'var(--atolye)' };
const evPlace = e => e.publisher ? `${pub(e.publisher).name} · ${pub(e.publisher).stand}` : e.place;
const evStand = e => e.publisher ? pub(e.publisher).stand : e.place === 'Söyleşi Salonu' ? 'SOYLESI' : e.place === 'Çocuk Atölyesi' ? 'COCUK' : null;
const evImg = e => e.author ? A + author(e.author).photo : null;
function evStatus(e) {
  if (e.day !== DEMO_NOW.day) return e.day < DEMO_NOW.day ? 'past' : 'future';
  const n = nowMin(); if (n >= tmin(e.end)) return 'past'; if (n >= tmin(e.start)) return 'live'; return 'soon';
}
function untilText(e) {
  const d = tmin(e.start) - nowMin();
  if (d <= 0) return 'şimdi';
  if (d < 60) return `${d} dk sonra`;
  return `${Math.floor(d / 60)} sa ${d % 60 ? (d % 60) + ' dk ' : ''}sonra`;
}
const norm = s => s.toLocaleLowerCase('tr-TR').replace(/[ıi]/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[’']/g, '');
function hl(text, q) {
  if (!q) return esc(text);
  const n = norm(text), i = n.indexOf(norm(q));
  if (i < 0) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}

/* ---------- Kroki geometrisi (resmî ATO Congresium krokisinden sadeleştirildi) ---------- */
const STANDS = {};
const ENTRANCE = { x: 296, y: 628 };
(function buildFloor() {
  const rows = [
    { p: 'C-', from: 21, to: 33, y: 10, h: 16, blocks: [[30, 590]], aisle: 35, small: true },
    { p: 'A-', from: 801, to: 817, y: 44, h: 40, blocks: [[40, 236], [264, 590]], aisle: 95 },
    { p: 'A-', from: 701, to: 713, y: 106, h: 38, blocks: [[40, 236], [264, 590]], aisle: 154 },
    { p: 'A-', from: 601, to: 612, y: 164, h: 38, blocks: [[40, 236], [264, 590]], aisle: 212 },
    { p: 'C-', from: 1, to: 9, y: 221, h: 16, blocks: [[20, 236]], aisle: 212, small: true },
    { p: 'A-', from: 501, to: 513, y: 228, h: 62, blocks: [[270, 870]], aisle: 304 },
    { p: 'A-', from: 401, to: 412, y: 318, h: 40, blocks: [[300, 800]], aisle: 369 },
    { p: 'A-', from: 301, to: 312, y: 380, h: 44, blocks: [[264, 990]], aisle: 432 },
    { p: 'A-', from: 201, to: 213, y: 440, h: 44, blocks: [[264, 990]], aisle: 492 },
    { p: 'A-', from: 101, to: 111, y: 500, h: 44, blocks: [[264, 990]], aisle: 553 },
    { p: 'B-', from: 1, to: 11, y: 562, h: 22, blocks: [[400, 990]], aisle: 553, small: true, above: true }
  ];
  rows.forEach(r => {
    const n = r.to - r.from + 1;
    const total = r.blocks.reduce((s, [a, b]) => s + (b - a), 0);
    let idx = 0;
    r.blocks.forEach(([a, b]) => {
      const count = r.blocks.length === 1 ? n : Math.round(n * (b - a) / total);
      const take = Math.min(count, n - idx);
      const w = (b - a) / take;
      for (let k = 0; k < take; k++) {
        const id = r.p + (r.from + idx);
        STANDS[id] = { id, x: a + k * w + 2, y: r.y, w: w - 4, h: r.h, aisle: r.aisle, small: r.small, above: r.above };
        idx++;
      }
    });
  });
})();
const ZONES = {
  SOYLESI: { id: 'SOYLESI', name: 'Söyleşi Salonu', x: 612, y: 8, w: 378, h: 92, cls: 'talk', aisle: 154, door: { x: 700, y: 100 } },
  COCUK: { id: 'COCUK', name: 'Çocuk Atölyesi', x: 612, y: 108, w: 378, h: 94, cls: 'kids', aisle: 212, door: { x: 700, y: 202 } },
  MESCIT: { id: 'MESCIT', name: 'Mescit', x: 884, y: 228, w: 106, h: 62, cls: '', aisle: 304, door: { x: 937, y: 290 } }
};
const FACILITIES = [
  { id: 'wc', label: 'WC', x: 52, y: 276, icon: 'wc', name: 'Tuvaletler' },
  { id: 'wc2', label: 'WC', x: 950, y: 610, icon: 'wc', name: 'Tuvaletler' },
  { id: 'kafe', label: '☕', x: 118, y: 350, icon: 'cup', name: 'Kafe' },
  { id: 'asansor', label: '⇅', x: 206, y: 330, icon: 'layers', name: 'Asansör' },
  { id: 'danisma', label: 'i', x: 372, y: 612, icon: 'info', name: 'Danışma & kayıp eşya' },
  { id: 'ilkyardim', label: '+', x: 178, y: 560, icon: 'plus', name: 'İlk yardım' },
  { id: 'cocukpt', label: '★', x: 430, y: 612, icon: 'shield', name: 'Kayıp çocuk noktası' }
];
function floorSVG(o = {}) {
  const sel = o.sel || null;
  let s = `<svg class="floor" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">`;
  s += `<path class="wall" d="M4 4H996V636H340M250 636H4z"/>`;
  Object.values(ZONES).forEach(z => {
    s += `<rect class="zone ${z.cls}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="8"/>`;
    s += `<text class="zlabel ${z.cls}" x="${z.x + z.w / 2}" y="${z.y + z.h / 2 + 4}">${z.name.toLocaleUpperCase('tr-TR')}</text>`;
  });
  Object.values(STANDS).forEach(st => {
    s += `<rect class="stand${STAND_OWNERS[st.id] ? ' has' : ''}${sel === st.id ? ' sel' : ''}" x="${st.x.toFixed(1)}" y="${st.y}" width="${st.w.toFixed(1)}" height="${st.h}" rx="3"/>`;
  });
  if (o.fac !== false) FACILITIES.forEach(f => {
    const on = o.facSel === f.id;
    s += `<g class="fac"><circle cx="${f.x}" cy="${f.y}" r="${on ? 16 : 11}" ${on ? 'style="fill:var(--brand);stroke:#fff;stroke-width:2"' : ''}/><text x="${f.x}" y="${f.y + .5}">${f.label}</text></g>`;
  });
  s += `<text class="zlabel" x="295" y="${ENTRANCE.y - 4}" style="font-size:11px">GİRİŞ</text>`;
  // Yayınevi logoları: ziyaretçi stant numarasını değil yayınevini tanır.
  Object.entries(STAND_OWNERS).forEach(([id, pid]) => {
    const st = STANDS[id], p = pub(pid); if (!st || !p) return;
    const w = 84, h = 40, x = st.x + st.w / 2 - w / 2, y = st.y + st.h / 2 - h / 2;
    const on = sel === id;
    s += `<g class="logo-pin${on ? ' on' : ''}" data-stand="${id}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w}" height="${h}" rx="10"/><image href="${A}${p.logo}" x="${(x + 7).toFixed(1)}" y="${(y + 5).toFixed(1)}" width="${w - 14}" height="${h - 10}" preserveAspectRatio="xMidYMid meet"/></g>`;
  });
  return s + '</svg>';
}
function standName(id) {
  if (ZONES[id]) return ZONES[id].name;
  const f = FACILITIES.find(f => f.id === id); if (f) return f.name;
  const o = STAND_OWNERS[id];
  return o ? pub(o).name : 'Katılımcı standı';
}

/* ---------- Router ---------- */
let route = { name: 'home', args: [], q: new URLSearchParams() };
let history_ = [];
let lastTab = 'home';
const TABS = [
  { id: 'home', label: 'Ana sayfa', icon: 'home' },
  { id: 'program', label: 'Program', icon: 'cal' },
  { id: 'harita', label: 'Kroki', icon: 'map' },
  { id: 'bildir', label: 'Bildirim gönder', icon: 'bell', action: true }
];
const TAB_OF = { etkinlik: 'program', yazar: 'program', yayinevi: 'harita', ara: 'home', bildirimler: 'home' };
const isTab = name => TABS.some(t => t.id === name && !t.action);
function parse(hash) {
  const h = (hash || '').replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  return { name: parts[0] || 'home', args: parts.slice(1).map(decodeURIComponent), q: new URLSearchParams(qs || '') };
}
function go(hash) { if (location.hash === hash) render('none'); else location.hash = hash; }
window.addEventListener('hashchange', () => {
  const next = parse(location.hash);
  const isTabRoute = isTab(next.name);
  const dir = isTabRoute ? 'fade' : (history_.length && history_[history_.length - 1] === location.hash) ? 'back' : 'fwd';
  if (dir === 'back') history_.pop(); else if (!isTabRoute) history_.push(currentHash); else history_ = [];
  route = next; currentHash = location.hash; render(dir);
});
let currentHash = location.hash || '#/';
function back() {
  if (history_.length) { const h = history_.pop(); location.hash = h; }
  else location.hash = '#/' + (TAB_OF[route.name] === 'home' ? '' : TAB_OF[route.name] || '');
}

/* ---------- Render ---------- */
const SCREENS = {};
function render(dir = 'fade') {
  const app = $('#app');
  app.classList.toggle('kids', kids());
  const screen = SCREENS[route.name] || SCREENS.home;
  const out = screen(...route.args);
  $('#topbar').innerHTML = out.top || topMain();
  const view = $('#view');
  view.innerHTML = out.html;
  view.className = 'view ' + (dir === 'fwd' ? 'enter' : dir === 'back' ? 'enter-back' : dir === 'none' ? '' : 'fade');
  if (dir !== 'none') view.scrollTop = 0;
  const tab = isTab(route.name) ? route.name : (TAB_OF[route.name] || lastTab);
  lastTab = tab;
  $('#tabbar').innerHTML = TABS.map(t => t.action
    ? `<button type="button" class="send-tab" data-demo-push>${ic(t.icon)}<span>${t.label}</span></button>`
    : `<button type="button" class="${t.id === tab ? 'on' : ''}" data-go="#/${t.id === 'home' ? '' : t.id}">${ic(t.icon)}<span>${t.label}</span></button>`).join('');
  out.after && out.after();
}
const unread = () => [...S.extraNotices, ...NOTICES].filter(n => !S.read.includes(n.id)).length;
const bell = () => `<button class="icon-btn" data-go="#/bildirimler" aria-label="Duyurular">${ic('bell', 'sm')}${unread() ? '<span class="dot"></span>' : ''}</button>`;
function topMain() {
  return `<img class="logo" src="${A}eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık">
    <div class="title"></div>
    <button class="fair-pill" data-sheet="fair"><span class="live"></span><span>${esc(fair().short)}</span>${ic('down', 'xs')}</button>${bell()}`;
}
function topBack(title, eyebrow = '') {
  return `<button class="back-btn" data-back aria-label="Geri">${ic('back', 'sm')}</button>
    <div class="title">${eyebrow ? `<small>${esc(eyebrow)}</small>` : ''}<strong>${esc(title)}</strong></div>`;
}
function topTitle(title, eyebrow) {
  return `<div class="title"><small>${esc(eyebrow)}</small><strong style="font-size:26px">${esc(title)}</strong></div>${bell()}`;
}

/* ---------- Ana sayfa ---------- */
SCREENS.home = () => {
  const F = fair();
  const day = kids() ? 1 : DEMO_NOW.day;
  const today = fairEvents().filter(e => e.day === day).sort((a, b) => tmin(a.start) - tmin(b.start));
  const next = kids() ? today[0] : (today.find(e => evStatus(e) === 'live' && e.kind === 'imza') || today.find(e => evStatus(e) === 'soon'));
  const notice = kids() ? null : [...S.extraNotices, ...NOTICES][0];
  const nextImg = next && evImg(next);
  return { html: `
    <div class="greet">
      <div class="date"><span>${kids() ? F.dates : DEMO_NOW.label + ' · ' + DEMO_NOW.day + '. gün'}</span><span class="open">${kids() ? 'Aileler için' : 'Açık · 20.00’ye kadar'}</span></div>
      <h1>${kids() ? 'Bugün ne <em>keşfedelim?</em>' : 'Bugün fuarda<br><em>neler</em> var?'}</h1>
    </div>
    <button class="search" data-go="#/ara" style="width:calc(100% - 36px)">${ic('search', 'sm')}<span style="flex:1">${kids() ? 'Etkinlik ya da alan ara…' : 'Yazar ya da yayınevi ara…'}</span></button>

    ${next ? `<button class="now-card" data-go="#/etkinlik/${next.id}" style="display:block;width:calc(100% - 36px);text-align:left">
      <div class="bg" style="background-image:url('${nextImg || A + 'children-workshop.jpg'}')"></div>
      <div class="inner">
        <div class="top"><span class="tag dark">${ic(next.kind === 'imza' ? 'pen' : 'mic', 'xs')} ${KIND[next.kind].toLocaleUpperCase('tr-TR')} · ${next.start}</span><span class="timer">${kids() ? '' : untilText(next)}</span></div>
        <h3>${esc(next.title)}</h3>
        <div class="meta">${ic('pin', 'xs')} ${esc(evPlace(next))}</div>
      </div>
    </button>` : ''}

    <div class="quick three">
      <button data-go="#/program"><span class="q-ico brand">${ic('cal')}</span>Program</button>
      <button data-go="#/harita"><span class="q-ico">${ic('map')}</span>Kroki</button>
      <button data-go="#/bildirimler"><span class="q-ico">${ic('bell')}</span>Duyurular</button>
    </div>

    ${notice ? `<div class="section">
      <button class="notice-card" data-go="${notice.link}" style="width:calc(100% - 36px);text-align:left">
        <span class="ico-tile">${ic('alert', 'sm')}</span>
        <span style="flex:1"><span class="eyebrow" style="color:#a85a00">EYLÜL DUYURUSU · ${notice.time}</span><strong>${esc(notice.title)}</strong><p>${esc(notice.body)}</p></span>
      </button>
    </div>` : ''}

    <div class="section">
      <div class="section-head"><h2>${kids() ? 'Bugünün etkinlikleri' : 'Bugün imzada'}</h2><button class="more" data-go="#/program">Tümü →</button></div>
      ${kids() ? `<div class="list">${today.map(e => eventRow(e)).join('')}</div>` : `<div class="hscroll">
        ${today.filter(e => e.kind === 'imza').map(e => {
          const st = evStatus(e);
          return `<button class="author-card" data-go="#/etkinlik/${e.id}">
            <div class="ph"><img src="${evImg(e)}" alt="" loading="lazy"><span class="t ${st === 'live' ? 'live' : ''}">${st === 'live' ? '● ŞİMDİ' : st === 'past' ? 'Bitti' : e.start}</span></div>
            <strong>${esc(e.title)}</strong><small>${esc(pub(e.publisher).name)} · ${pub(e.publisher).stand}</small>
          </button>`;
        }).join('')}
      </div>`}
    </div>
    <div class="footer-credit">Eylül Fuarcılık için <img src="${A}bulbi-logo.png" alt="Bulbi"> tarafından geliştirildi</div>
  ` };
};
function eventRow(e) {
  const d = fair().days.find(x => x.n === e.day);
  return `<button class="row" data-go="#/etkinlik/${e.id}">
    ${evImg(e) ? `<img class="avatar" src="${evImg(e)}" alt="">` : `<span class="ico-tile" style="color:${KCOL[e.kind]}">${ic(e.kind === 'imza' ? 'pen' : e.kind === 'soylesi' ? 'mic' : 'kid', 'sm')}</span>`}
    <span class="txt"><strong>${esc(e.title)}</strong><small>${d.label} ${e.start} · ${esc(evPlace(e))}</small></span>${ic('chev', 'sm')}
  </button>`;
}

/* ---------- Program ---------- */
SCREENS.program = () => {
  const F = fair();
  const day = Number(route.q.get('gun') || (kids() ? 1 : DEMO_NOW.day));
  const kind = route.q.get('tur') || 'tum';
  const list = fairEvents().filter(e => e.day === day && (kind === 'tum' || e.kind === kind)).sort((a, b) => tmin(a.start) - tmin(b.start));
  const kinds = kids() ? [['tum', 'Tümü'], ['cocuk', 'Sahne'], ['atolye', 'Atölye']] : [['tum', 'Tümü'], ['imza', 'İmza'], ['soylesi', 'Söyleşi'], ['cocuk', 'Çocuk']];
  const isToday = !kids() && day === DEMO_NOW.day;
  let nowShown = false;
  const items = list.map(e => {
    const st = isToday ? evStatus(e) : (!kids() && day < DEMO_NOW.day) ? 'past' : 'future';
    let line = '';
    if (isToday && !nowShown && tmin(e.start) > nowMin()) { nowShown = true; line = `<div class="now-line"><span>${fmtNow()}</span><i></i></div>`; }
    return line + programItem(e, st);
  }).join('');
  return {
    top: topTitle('Program', F.name),
    html: `
    <div class="days">${F.days.map(d => `<button class="day ${d.n === day ? 'on' : ''} ${!kids() && d.n === DEMO_NOW.day ? 'today' : ''}" data-go="#/program?gun=${d.n}&tur=${kind}"><small>${d.label.slice(0, 3)}</small><b>${d.date.split(' ')[0]}</b></button>`).join('')}</div>
    <div class="chips" style="margin-top:16px">${kinds.map(([k, l]) => `<button class="chip ${k === kind ? 'on' : ''}" data-go="#/program?gun=${day}&tur=${k}">${k !== 'tum' ? `<span class="sw" style="background:${KCOL[k]}"></span>` : ''}${l}</button>`).join('')}</div>
    <div class="timeline" style="margin-top:14px">${items || `<div class="empty"><strong>Bu günde etkinlik yok</strong><p>Başka bir gün seçebilirsin.</p></div>`}
    ${isToday && !nowShown && list.length ? `<div class="now-line"><span>${fmtNow()}</span><i></i></div>` : ''}</div>`
  };
};
function fmtNow() { const n = nowMin(); return `${String(Math.floor(n / 60)).padStart(2, '0')}.${String(n % 60).padStart(2, '0')}`; }
function programItem(e, st) {
  const tags = [`<span class="tag ${e.kind}">${KIND[e.kind]}</span>`];
  if (st === 'live') tags.push('<span class="tag hot">● Şimdi</span>');
  if (e.speakers && kids()) tags.push(`<span class="tag ok">${esc(e.speakers)}</span>`);
  return `<div class="t-item ${st}">
    <div class="t-time"><b>${e.start}</b><small>${e.end}</small></div>
    <div class="t-card" style="--k:${KCOL[e.kind]}" data-go="#/etkinlik/${e.id}" role="button" tabindex="0">
      ${evImg(e) ? `<img class="avatar" src="${evImg(e)}" alt="" loading="lazy">` : ''}
      <div class="txt"><strong>${esc(e.title)}</strong><small>${esc(evPlace(e))}${e.speakers && !kids() ? ' · ' + esc(e.speakers) : ''}</small><div class="tags">${tags.join('')}</div></div>
    </div>
  </div>`;
}

/* ---------- Etkinlik detayı ---------- */
SCREENS.etkinlik = id => {
  const e = ev(id); if (!e) return SCREENS.program();
  const st = evStatus(e);
  const d = FAIRS[e.fair].days.find(d => d.n === e.day);
  const stand = evStand(e);
  const a = e.author && author(e.author), p = e.publisher && pub(e.publisher);
  const books = a ? BOOKS.filter(b => b.author === a.id) : [];
  return {
    top: topBack(KIND[e.kind], FAIRS[e.fair].short),
    html: `
    <div class="hero ${a ? '' : 'flat k-' + e.kind}" style="${a ? '' : 'min-height:210px'}">
      ${a ? `<img class="bg" src="${A}${a.photo}" alt="">` : ''}
      <div class="inner">
        <span class="tag ${st === 'live' ? 'hot' : 'dark'}">${st === 'live' ? '● ŞİMDİ' : KIND[e.kind].toLocaleUpperCase('tr-TR')} · ${d.label} ${d.date}</span>
        <h1>${esc(e.title)}</h1>
        <p>${a ? esc(a.bio) : esc(e.speakers || '')}</p>
      </div>
    </div>
    <div class="facts">
      <div class="fact">${ic('clock', 'sm')}<div><small>Saat</small><b>${e.start} – ${e.end}</b></div></div>
      <div class="fact">${ic('pin', 'sm')}<div><small>${p ? 'Stant' : 'Yer'}</small><b>${esc(p ? p.stand + ' · ' + p.name.split(' ')[0] : e.place)}</b></div></div>
    </div>
    <div class="cta-bar">
      ${p ? `<button class="btn dark" data-go="#/harita?stand=${stand}">${ic('map', 'sm')} Krokide göster</button>` : ''}
    </div>
    ${books.length ? `<div class="section">
      <div class="section-head"><h2>Yazarın kitapları</h2><button class="more" data-go="#/yazar/${a.id}">Profil →</button></div>
      <div class="hscroll">${books.map(bookTile).join('')}</div>
    </div>` : ''}`
  };
};
function bookTile(b) {
  return `<div class="book-tile"><div class="cv"><img src="${A}${b.cover}" alt="${esc(b.title)}" loading="lazy"></div><strong>${esc(b.title)}</strong></div>`;
}

/* ---------- Yazar / Yayınevi ---------- */
SCREENS.yazar = id => {
  const a = author(id); if (!a) return SCREENS.program();
  const p = pub(a.publisher);
  const evs = EVENTS.filter(e => e.author === id);
  return {
    top: topBack('Yazar'),
    html: `
    <div class="profile-head">
      <img class="big-avatar" src="${A}${a.photo}" alt="">
      <h1>${esc(a.name)}</h1><p>${esc(p.name)} · Stant ${p.stand}</p>
    </div>
    <p class="prose" style="margin-top:16px;text-align:center">${esc(a.bio)}</p>
    <div class="section"><div class="section-head"><h2>Fuardaki imzaları</h2></div><div class="list">${evs.map(eventRow).join('')}</div></div>
    <div class="section"><div class="section-head"><h2>Kitapları</h2></div><div class="hscroll">${BOOKS.filter(b => b.author === id).map(bookTile).join('')}</div></div>`
  };
};
SCREENS.yayinevi = id => {
  const p = pub(id); if (!p) return SCREENS.harita();
  const evs = EVENTS.filter(e => e.publisher === id);
  return {
    top: topBack('Yayınevi'),
    html: `
    <div class="profile-head">
      <div class="big-logo"><img src="${A}${p.logo}" alt="${esc(p.name)}"></div>
      <h1>${esc(p.name)}</h1><p>Stant ${p.stand}</p>
    </div>
    <p class="prose" style="margin-top:12px;text-align:center">${esc(p.about)}</p>
    <div class="section"><button class="mini-map" data-go="#/harita?stand=${p.stand}" style="display:block;width:calc(100% - 36px)">${floorSVG({ sel: p.stand, fac: false })}<div class="cap"><div style="text-align:left"><b>Krokide gör</b><small>${esc(p.name)} standı</small></div>${ic('chev', 'sm')}</div></button></div>
    ${evs.length ? `<div class="section"><div class="section-head"><h2>Standdaki imzalar</h2></div><div class="list">${evs.map(eventRow).join('')}</div></div>` : ''}`
  };
};

/* ---------- Kroki ---------- */
SCREENS.harita = () => {
  if (kids()) return kidsMap();
  const stand = route.q.get('stand'), yer = route.q.get('yer');
  const p = stand && STAND_OWNERS[stand] && pub(STAND_OWNERS[stand]);
  const f = yer && FACILITIES.find(x => x.id === yer);
  const card = p ? `<div class="card map-sheet"><span class="logo-tile" style="width:64px;height:48px">${`<img src="${A}${p.logo}" alt="">`}</span>
      <div style="flex:1;min-width:0"><strong style="display:block">${esc(p.name)}</strong><small class="muted">Stant ${stand}</small></div>
      <button class="btn sm dark" data-go="#/yayinevi/${p.id}">Profil</button></div>`
    : f ? `<div class="card map-sheet"><span class="ico-tile">${ic(f.icon, 'sm')}</span><div style="flex:1"><strong style="display:block">${esc(f.name)}</strong><small class="muted">Krokide turuncu ile gösterildi</small></div></div>` : '';
  const facs = [['wc', 'wc', 'WC'], ['kafe', 'cup', 'Kafe'], ['danisma', 'info', 'Danışma']];
  return {
    top: topTitle('Fuar krokisi', 'ATO CONGRESIUM'),
    html: `
    <button class="search" data-go="#/ara" style="width:calc(100% - 36px);margin-bottom:12px">${ic('search', 'sm')}<span style="flex:1">${p ? esc(p.name) : 'Yayınevi ara…'}</span></button>
    <div class="map-wrap" id="mapwrap">
      <div class="map-tools"><button data-zoom="1" aria-label="Yakınlaş">+</button><button data-zoom="-1" aria-label="Uzaklaş">−</button></div>
      <div class="map-scroll" id="mapscroll"><div class="map-canvas" id="mapcanvas" style="width:${mapW}px">${floorSVG({ sel: stand, facSel: yer })}</div></div>
    </div>
    ${card || `<p class="muted" style="font-size:13px;margin:12px 22px 0">Bir yayınevi logosuna dokun ya da yukarıdan ara.</p>`}
    <div class="section" style="margin-top:16px"><div class="fac-grid three">${facs.map(([fid, icn, l]) => `<button class="${yer === fid ? 'on' : ''}" data-go="#/harita?yer=${fid}">${ic(icn, 'sm')}${l}</button>`).join('')}</div></div>`,
    after: () => requestAnimationFrame(() => centerMap(stand || yer || 'A-404'))
  };
};
let mapW = 640;
function centerMap(id) {
  const sc = $('#mapscroll'), t = targetPoint(id); if (!sc || !t) return;
  sc.scrollTo({ left: t.end.x / 1000 * mapW - sc.clientWidth / 2, top: t.end.y / 640 * mapW * .64 - sc.clientHeight / 2, behavior: 'instant' });
}
function kidsMap() {
  return {
    top: topTitle('Şenlik haritası', 'ÇOCUK ŞENLİĞİ'),
    html: `<div class="map-wrap" style="height:auto">
      <svg class="floor" viewBox="0 0 400 300">
        <rect x="6" y="6" width="388" height="288" rx="16" fill="#eef7f2" stroke="#cfe5da"/>
        <rect x="20" y="20" width="170" height="110" rx="14" fill="#dcf3ec" stroke="#b5e3d6"/><text class="zlabel kids" x="105" y="80">MASAL SAHNESİ</text>
        <rect x="210" y="20" width="170" height="110" rx="14" fill="#fde6ee" stroke="#f5c3d4"/><text class="zlabel" x="295" y="80" style="fill:#b52b59">RENK ATÖLYESİ</text>
        <rect x="20" y="146" width="170" height="90" rx="14" fill="#fff1db" stroke="#f6d9a8"/><text class="zlabel" x="105" y="195" style="fill:#a85a00">OYUN ALANI</text>
        <rect x="210" y="146" width="170" height="90" rx="14" fill="#ecebff" stroke="#c9c7f0"/><text class="zlabel talk" x="295" y="195">KİTAP KÖŞESİ</text>
        <g class="fac"><circle cx="200" cy="268" r="14" style="fill:#0b8e78;stroke:#fff;stroke-width:2"/><text x="200" y="268" style="fill:#fff">i</text></g>
        <text class="zlabel kids" x="200" y="292" style="font-size:9px">DANIŞMA</text>
        <g class="fac"><circle cx="40" cy="268" r="11"/><text x="40" y="268">WC</text></g>
      </svg></div>
      <p class="muted" style="font-size:11.5px;margin:14px 22px 0">Çocuk Şenliği haritası konsepttir; mekân belli olunca çizilir.</p>`
  };
}

/* ---------- Ara ---------- */
SCREENS.ara = () => ({
  top: topBack('Ara'),
  html: `<label class="search">${ic('search', 'sm')}<input id="q" type="search" placeholder="Örn. Menteş, Everest…" autocomplete="off" value="${esc(route.q.get('q') || '')}"></label><div id="results"></div>`,
  after: () => { const i = $('#q'); runSearch(i.value); if (!EMBED) i.focus({ preventScroll: true }); }
});
function runSearch(q) {
  const box = $('#results'); if (!box) return;
  q = q.trim();
  if (!q) {
    box.innerHTML = `<div class="res-group"><h3>Yazarlar</h3><div class="hscroll">${AUTHORS.map(a => `<button class="author-card" style="width:104px" data-go="#/yazar/${a.id}"><div class="ph" style="width:104px;height:120px"><img src="${A}${a.photo}" alt="" loading="lazy"></div><strong>${esc(a.name)}</strong></button>`).join('')}</div></div>
      <div class="res-group"><h3>Yayınevleri</h3><div class="list">${PUBLISHERS.map(p => pubRow(p)).join('')}</div></div>`;
    return;
  }
  const n = norm(q), m = s => norm(s).includes(n);
  const as = AUTHORS.filter(a => m(a.name));
  const ps = PUBLISHERS.filter(p => m(p.name) || m(p.stand) || m(p.stand.replace('-', '')));
  const es = fairEvents().filter(e => m(e.title) || m(e.speakers || '') || m(e.place || ''));
  const total = as.length + ps.length + es.length;
  box.innerHTML = total ? `
    ${as.length ? `<div class="res-group"><h3>Yazarlar</h3><div class="list">${as.map(a => `<button class="row" data-go="#/yazar/${a.id}"><img class="avatar" src="${A}${a.photo}" alt=""><span class="txt"><strong>${hl(a.name, q)}</strong><small>${esc(pub(a.publisher).name)} · ${pub(a.publisher).stand}</small></span>${ic('chev', 'sm')}</button>`).join('')}</div></div>` : ''}
    ${ps.length ? `<div class="res-group"><h3>Yayınevleri</h3><div class="list">${ps.map(p => pubRow(p, q)).join('')}</div></div>` : ''}
    ${es.length ? `<div class="res-group"><h3>Etkinlikler</h3><div class="list">${es.map(eventRow).join('')}</div></div>` : ''}
  ` : `<div class="empty" style="margin-top:20px"><strong>“${esc(q)}” bulunamadı</strong><p>Yazımı kontrol edebilirsin.</p></div>`;
}
function pubRow(p, q = '') {
  return `<button class="row" data-go="#/yayinevi/${p.id}"><span class="logo-tile"><img src="${A}${p.logo}" alt=""></span><span class="txt"><strong>${hl(p.name, q)}</strong><small>Stant ${hl(p.stand, q)}</small></span>${ic('chev', 'sm')}</button>`;
}

/* ---------- Duyurular ---------- */
SCREENS.bildirimler = () => {
  const all = [...S.extraNotices, ...NOTICES];
  setTimeout(() => { S.read = all.map(n => n.id); save(); }, 1500);
  return {
    top: topBack('Duyurular', 'EYLÜL FUARCILIK'),
    html: `<div class="list">${all.map(n => `<button class="notice ${S.read.includes(n.id) ? '' : 'new'}" data-go="${n.link}">
      <span class="ico-tile ${n.type}">${ic(n.type === 'change' ? 'alert' : 'info', 'sm')}</span>
      <span class="txt"><span class="h"><strong>${esc(n.title)}</strong><time>${n.time}</time></span><p>${esc(n.body)}</p></span>
    </button>`).join('')}</div>`
  };
};

/* ---------- Sheet, toast, duyuru ---------- */
function openSheet(html) { $('#sheet').innerHTML = '<div class="grab"></div>' + html; $('#sheet').classList.add('show'); $('#backdrop').classList.add('show'); }
function closeSheet() { $('#sheet').classList.remove('show'); $('#backdrop').classList.remove('show'); }
const SHEETS = {
  fair: () => `<h2>Fuarını seç</h2><p>Aynı uygulama, Eylül’ün tüm fuarları.</p>
    ${[['ankara', 'ankara-fuar-arsiv.jpg'], ['cocuk', 'children-workshop.jpg']].map(([id, img]) => `<button class="fair-opt ${S.fair === id ? 'on' : ''}" data-fair="${id}"><span class="th" style="background-image:url('${A}${img}')"></span><span style="flex:1"><strong>${FAIRS[id].name}</strong><small>${FAIRS[id].dates} · ${FAIRS[id].venue}</small></span>${S.fair === id ? ic('check') : ic('chev', 'sm')}</button>`).join('')}`
};
let toastT;
function toast(msg, icon = 'check') { const t = $('#toast'); t.innerHTML = ic(icon, 'sm') + esc(msg); t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400); }
let pushT, pushCursor = 0, noticeSeq = 0;
function push(n) {
  const id = 'live' + (++noticeSeq) + Date.now();
  S.extraNotices.unshift({ ...n, id, time: 'şimdi' }); save();
  const el = $('#push');
  el.innerHTML = `<span class="app-ico"><img src="${A}eylul-fuarcilik-logo.png" alt=""></span><span class="txt"><span class="h"><span>EYLÜL FUAR REHBERİ</span><span>şimdi</span></span><strong>${esc(n.title)}</strong><p>${esc(n.body)}</p></span>`;
  el.dataset.link = n.link || '#/bildirimler';
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(pushT); pushT = setTimeout(() => el.classList.remove('show'), 6500);
  if (route.name !== 'ara') render('none');
}

/* ---------- Etkileşimler ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-go],[data-back],[data-demo-push],[data-sheet],[data-fair],[data-zoom],[data-stand],#push,#backdrop');
  if (!el) return;
  const d = el.dataset;
  if (el.id === 'push') { el.classList.remove('show'); return go(d.link); }
  if (el.id === 'backdrop') return closeSheet();
  if (d.demoPush != null) return push(LIVE_PUSHES[(pushCursor++) % LIVE_PUSHES.length]);
  if (d.sheet) return openSheet(SHEETS[d.sheet]());
  if (d.fair) { S.fair = d.fair; save(); closeSheet(); return go('#/'); }
  if (d.zoom) {
    const sc = $('#mapscroll'), c = $('#mapcanvas'); if (!sc || !c) return;
    const cx = (sc.scrollLeft + sc.clientWidth / 2) / mapW, cy = (sc.scrollTop + sc.clientHeight / 2) / (mapW * .64);
    mapW = Math.min(1600, Math.max(sc.clientWidth, mapW * (Number(d.zoom) > 0 ? 1.35 : 1 / 1.35)));
    c.style.width = mapW + 'px';
    sc.scrollTo({ left: cx * mapW - sc.clientWidth / 2, top: cy * mapW * .64 - sc.clientHeight / 2 });
    return;
  }
  if (d.stand && route.name === 'harita') return go('#/harita?stand=' + d.stand);
  if (d.back != null) { closeSheet(); return back(); }
  if (d.go) { closeSheet(); return go(d.go); }
});
document.addEventListener('input', e => { if (e.target.id === 'q') runSearch(e.target.value); });
$('#view').addEventListener('scroll', () => $('#topbar').classList.toggle('scrolled', $('#view').scrollTop > 6), { passive: true });

/* ---------- Sunum / panel bağlantısı ---------- */
const seenPush = new Set();
function onDemoMessage(m) {
  if (!m || typeof m !== 'object') return;
  if (m.type === 'go') { closeSheet(); if (m.fair && S.fair !== m.fair) { S.fair = m.fair; save(); } go(m.hash); }
  if (m.type === 'push') {
    if (m.notice && m.notice.nid) { if (seenPush.has(m.notice.nid)) return; seenPush.add(m.notice.nid); }
    push(m.notice || LIVE_PUSHES[(pushCursor++) % LIVE_PUSHES.length]);
  }
  if (m.type === 'reset') { resetState(); history_ = []; go(m.hash || '#/'); }
}
window.addEventListener('message', e => { if (e.source === parent || e.source === window) onDemoMessage(e.data); });
try { new BroadcastChannel('eylul-demo').onmessage = e => onDemoMessage(e.data); } catch {}
if (EMBED) document.addEventListener('keydown', e => {
  if (e.target.matches('input, textarea')) return;
  if (['ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp', 'n', 'N', 'f', 'F'].includes(e.key)) parent.postMessage({ type: 'eylul-key', key: e.key }, '*');
});

/* ---------- Başlat ---------- */
if (EMBED) $('#app').classList.add('embed');
if (params.has('still')) document.documentElement.classList.add('still');
if (params.get('demo') === 'cocuk') S.fair = 'cocuk';
setInterval(() => { const c = $('#clock'); if (c) c.textContent = fmtNow().replace('.', ':'); }, 10000);
$('#clock').textContent = fmtNow().replace('.', ':');
route = parse(location.hash);
currentHash = location.hash || '#/';
render('fade');
