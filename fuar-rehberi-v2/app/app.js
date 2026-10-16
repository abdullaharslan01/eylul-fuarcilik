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
  saved: ['e7', 'e8', 'e11'],
  wish: ['dublor', 'susamuru', 'badeci', 'veda'],
  got: [],
  follows: ['murat', 'timur'],
  interests: ['Roman', 'Araştırma', 'Çocuk'],
  queues: {},
  read: [],
  extraNotices: [],
  prefs: { change: true, queue: true, eylul: true, deal: false },
  booked: [],
  child: null,
  age: 'all'
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
const fmtTL = n => n.toLocaleString('tr-TR') + ' ₺';
const norm = s => s.toLocaleLowerCase('tr-TR').replace(/[ıi]/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[’']/g, '');
function hl(text, q) {
  if (!q) return esc(text);
  const n = norm(text), i = n.indexOf(norm(q));
  if (i < 0) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}
function qrSVG(text, cell = 4) {
  try { const q = qrcode(0, 'M'); q.addData(text); q.make(); return q.createSvgTag({ cellSize: cell, margin: 0, scalable: true }); }
  catch { return ''; }
}

/* ---------- Kroki geometrisi (resmî ATO Congresium krokisinden sadeleştirildi) ---------- */
const STANDS = {};
const ENTRANCE = { x: 296, y: 628 };
const SPINE = 250;
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
const M_PER_UNIT = 0.14;
function targetPoint(id) {
  if (ZONES[id]) return { x: ZONES[id].door.x, y: ZONES[id].aisle, end: ZONES[id].door, aisle: ZONES[id].aisle };
  const f = FACILITIES.find(f => f.id === id);
  if (f) return { x: f.x, y: f.y > 560 ? 553 : f.y, end: { x: f.x, y: f.y }, aisle: f.y > 560 ? 553 : 304 };
  const s = STANDS[id]; if (!s) return null;
  const cx = s.x + s.w / 2;
  return { x: cx, y: s.aisle, end: { x: cx, y: s.above ? s.y : s.y + s.h }, aisle: s.aisle };
}
function routeTo(ids) {
  let pts = [ENTRANCE, { x: ENTRANCE.x, y: 553 }];
  let cur = { x: ENTRANCE.x, y: 553 };
  ids.forEach(id => {
    const t = targetPoint(id); if (!t) return;
    if (t.aisle !== cur.y) { pts.push({ x: SPINE, y: cur.y }, { x: SPINE, y: t.aisle }); }
    pts.push({ x: t.x, y: t.aisle }, t.end, { x: t.x, y: t.aisle });
    cur = { x: t.x, y: t.aisle };
  });
  pts.pop();
  let len = 0; for (let i = 1; i < pts.length; i++) len += Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y);
  const m = Math.round(len * M_PER_UNIT);
  return { pts, meters: m, minutes: Math.max(1, Math.round(m / 70)) };
}
function orderStops(ids) {
  return [...ids].sort((a, b) => (targetPoint(b).aisle - targetPoint(a).aisle) || (targetPoint(a).x - targetPoint(b).x));
}

function floorSVG(o = {}) {
  const sel = o.sel ? [].concat(o.sel) : [];
  const list = o.list || [];
  const owned = new Set(Object.keys(STAND_OWNERS));
  let s = `<svg class="floor" viewBox="${o.viewBox || '0 0 1000 640'}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">`;
  s += `<path class="wall" d="M4 4H996V636H340M250 636H4z"/>`;
  Object.values(ZONES).forEach(z => {
    s += `<rect class="zone ${z.cls}${sel.includes(z.id) ? ' sel' : ''}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="8" data-stand="${z.id}"/>`;
    s += `<text class="zlabel ${z.cls}" x="${z.x + z.w / 2}" y="${z.y + z.h / 2 + 4}">${z.name.toLocaleUpperCase('tr-TR')}</text>`;
  });
  if (o.heat) {
    const groups = [[553, 640], [432, 553], [304, 432], [154, 304], [0, 154]];
    groups.forEach(([y1, y2], i) => {
      const l = CROWD[i].level;
      const col = l > .85 ? '226,73,59' : l > .6 ? '241,154,27' : '31,157,85';
      s += `<rect class="heat" x="8" y="${y1}" width="984" height="${y2 - y1}" fill="rgba(${col},${0.10 + l * 0.22})"/>`;
    });
  }
  Object.values(STANDS).forEach(st => {
    const cls = ['stand', owned.has(st.id) ? 'has' : '', sel.includes(st.id) ? 'sel' : '', list.includes(st.id) ? 'list' : '', (o.dim && !sel.includes(st.id) && !list.includes(st.id)) ? 'dim' : ''].join(' ');
    s += `<rect class="${cls}" x="${st.x.toFixed(1)}" y="${st.y}" width="${st.w.toFixed(1)}" height="${st.h}" rx="3" data-stand="${st.id}"/>`;
    if (!st.small || sel.includes(st.id)) {
      const lab = st.id.replace('A-', '');
      const big = owned.has(st.id);
      s += `<text class="slabel${big ? ' big' : ''}${sel.includes(st.id) ? ' sel' : ''}" x="${(st.x + st.w / 2).toFixed(1)}" y="${st.y + st.h / 2}">${lab}</text>`;
    }
  });
  if (o.fac !== false) FACILITIES.forEach(f => {
    const on = o.facSel === f.id;
    s += `<g class="fac"><circle cx="${f.x}" cy="${f.y}" r="${on ? 15 : 11}" ${on ? 'style="fill:var(--brand);stroke:#fff;stroke-width:2"' : ''}/><text x="${f.x}" y="${f.y + .5}">${f.label}</text></g>`;
  });
  s += `<text class="zlabel" x="295" y="${ENTRANCE.y - 4}" style="font-size:10px">GİRİŞ</text>`;
  if (o.route) {
    const d = 'M' + o.route.pts.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L');
    s += `<path class="route-glow" d="${d}"/><path class="route draw" d="${d}"/>`;
  }
  if (o.pins) o.pins.forEach((id, i) => {
    const t = targetPoint(id); if (!t) return;
    const { x, y } = t.end;
    s += `<g class="pin" transform="translate(${x} ${y - 4})"><path d="M0 0c-8-10-14-14-14-21a14 14 0 0 1 28 0c0 7-6 11-14 21z"/><text y="-21">${o.numbered ? i + 1 : '★'}</text></g>`;
  });
  if (o.you !== false) s += `<g class="you"><circle class="halo" cx="${ENTRANCE.x}" cy="${ENTRANCE.y - 8}" r="22"/><circle class="p" cx="${ENTRANCE.x}" cy="${ENTRANCE.y - 8}" r="8"/></g>`;
  return s + '</svg>';
}
function standName(id) {
  if (ZONES[id]) return ZONES[id].name;
  const f = FACILITIES.find(f => f.id === id); if (f) return f.name;
  const o = STAND_OWNERS[id];
  if (o === 'iletisim') return 'İletişim Yayınları';
  if (o === 'cumhuriyet') return 'Cumhuriyet Kitapları';
  return o ? pub(o).name : 'Katılımcı standı';
}

/* ---------- Router ---------- */
let route = { name: 'home', args: [], q: new URLSearchParams() };
let history_ = [];
let lastTab = 'home';
const TABS = [
  { id: 'home', label: 'Bugün', icon: 'home' },
  { id: 'program', label: 'Program', icon: 'cal' },
  { id: 'harita', label: 'Kroki', icon: 'map' },
  { id: 'ara', label: 'Ara', icon: 'search' },
  { id: 'planim', label: 'Planım', icon: 'heart' }
];
const TAB_OF = { etkinlik: 'program', yazar: 'ara', yayinevi: 'ara', kitap: 'ara', sira: 'program', bilet: 'planim', ulasim: 'home', bildirimler: 'home', firsatlar: 'home', bileklik: 'home', okul: 'home', yogunluk: 'home', hosgeldin: 'home' };
function parse(hash) {
  const h = (hash || '').replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  return { name: parts[0] || 'home', args: parts.slice(1).map(decodeURIComponent), q: new URLSearchParams(qs || '') };
}
function go(hash) { if (location.hash === hash) render('none'); else location.hash = hash; }
window.addEventListener('hashchange', () => {
  const next = parse(location.hash);
  const isTab = TABS.some(t => t.id === next.name);
  const dir = isTab ? 'fade' : (history_.length && history_[history_.length - 1] === location.hash) ? 'back' : 'fwd';
  if (dir === 'back') history_.pop(); else if (!isTab) history_.push(currentHash); else history_ = [];
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
  $('#topbar').style.display = out.noTop ? 'none' : '';
  const view = $('#view');
  view.innerHTML = out.html;
  view.className = 'view ' + (dir === 'fwd' ? 'enter' : dir === 'back' ? 'enter-back' : dir === 'none' ? '' : 'fade');
  if (dir !== 'none') view.scrollTop = 0;
  app.classList.toggle('dark-top', !!out.darkTop);
  const tab = TABS.some(t => t.id === route.name) ? route.name : (TAB_OF[route.name] || lastTab);
  lastTab = tab;
  $('#tabbar').style.display = out.noTabs ? 'none' : '';
  $('#tabbar').innerHTML = TABS.map(t => `<button type="button" class="${t.id === tab ? 'on' : ''}" data-go="#/${t.id === 'home' ? '' : t.id}">${ic(t.icon)}<span>${kids() && t.id === 'program' ? 'Etkinlik' : t.label}</span>${t.id === 'planim' && planCount() ? `<span class="badge">${planCount()}</span>` : ''}</button>`).join('');
  out.after && out.after();
  parent.postMessage({ type: 'eylul-route', name: route.name, hash: location.hash }, '*');
}
const planCount = () => kids() ? S.booked.length : S.saved.length;
const unread = () => [...S.extraNotices, ...NOTICES].filter(n => !S.read.includes(n.id)).length;

function topMain() {
  return `<img class="logo" src="${A}eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık">
    <div class="title"></div>
    <button class="fair-pill" data-sheet="fair"><span class="live"></span><span>${esc(fair().short)}</span>${ic('down', 'xs')}</button>
    <button class="icon-btn" data-go="#/bildirimler" aria-label="Bildirimler">${ic('bell', 'sm')}${unread() ? '<span class="dot"></span>' : ''}</button>`;
}
function topBack(title, eyebrow = '', right = '') {
  return `<button class="back-btn" data-back aria-label="Geri">${ic('back', 'sm')}</button>
    <div class="title">${eyebrow ? `<small>${esc(eyebrow)}</small>` : ''}<strong>${esc(title)}</strong></div>${right}`;
}
function topTitle(title, eyebrow) {
  return `<div class="title"><small>${esc(eyebrow)}</small><strong style="font-size:26px">${esc(title)}</strong></div>
    <button class="icon-btn" data-go="#/bildirimler" aria-label="Bildirimler">${ic('bell', 'sm')}${unread() ? '<span class="dot"></span>' : ''}</button>`;
}

/* ---------- Ekran: Bugün ---------- */
SCREENS.home = () => kids() ? kidsHome() : bookHome();

function bookHome() {
  const today = fairEvents().filter(e => e.day === DEMO_NOW.day);
  const signings = today.filter(e => e.kind === 'imza' && evStatus(e) !== 'past');
  const hero = today.find(e => e.id === 'e7');
  const q = queueState(hero.id);
  const next = today.filter(e => has('saved', e.id) && evStatus(e) !== 'past').sort((a, b) => tmin(a.start) - tmin(b.start));
  const avg = CROWD.reduce((s, c) => s + c.level, 0) / CROWD.length;
  const hourIdx = Math.min(10, Math.max(0, Math.floor(nowMin() / 60) - 10));
  const notice = NOTICES[0];
  return { html: `
    <div class="greet">
      <div class="date"><span>${DEMO_NOW.label} · ${DEMO_NOW.day}. gün</span><span class="open">Açık · 20.00’ye kadar</span></div>
      <h1>Bugün fuarda<br><em>neler</em> var?</h1>
    </div>
    <button class="search" data-go="#/ara" style="width:calc(100% - 36px)">${ic('search', 'sm')}<span style="flex:1">Yazar, kitap, yayınevi ya da stant…</span><kbd>A-504</kbd></button>

    <div class="now-card">
      <div class="bg" style="background-image:url('${A}${author(hero.author).photo}')"></div>
      <div class="inner">
        <div class="top"><span class="tag dark">${ic('pen', 'xs')} İMZA · ${hero.start}</span><span class="timer">${untilText(hero)}</span></div>
        <h3>${esc(hero.title)}</h3>
        <div class="meta">${ic('pin', 'xs')} ${esc(evPlace(hero))}</div>
        <div class="queue-meter">
          <div><div class="big">${q.mine ? '#' + q.mine.no : q.length}</div><small>${q.mine ? 'sıra numaran' : 'kişi sırada'}</small></div>
          <div class="bar"><small>${q.mine ? `Önünde ${q.mine.ahead} kişi · ~${Math.max(1, Math.round(q.mine.ahead * 0.7))} dk` : `Tahmini bekleme ~${Math.round(q.length * 0.7)} dk`}</small><i><b style="width:${q.mine ? 100 - q.mine.ahead / q.mine.start * 100 : Math.min(100, q.length * 1.6)}%"></b></i></div>
        </div>
        <div class="actions">
          ${q.mine ? `<button class="btn primary" data-go="#/sira/${hero.id}">${ic('ticket', 'sm')} Sıramı gör</button>` : `<button class="btn primary" data-queue="${hero.id}">${ic('ticket', 'sm')} Dijital sıra al</button>`}
          <button class="btn light" data-go="#/harita?stand=${pub(hero.publisher).stand}">${ic('route', 'sm')} Yol tarifi</button>
        </div>
      </div>
    </div>

    <div class="quick">
      <button data-go="#/program?tur=imza"><span class="q-ico brand">${ic('pen')}<span class="n">${signings.length}</span></span>İmzalar</button>
      <button data-go="#/program?tur=soylesi"><span class="q-ico">${ic('mic')}</span>Söyleşiler</button>
      <button data-go="#/bilet"><span class="q-ico">${ic('ticket')}</span>E-biletim</button>
      <button data-go="#/ulasim"><span class="q-ico">${ic('bus')}</span>Ulaşım</button>
      <button data-go="#/firsatlar"><span class="q-ico">${ic('tag')}</span>Fırsatlar</button>
      <button data-go="#/harita?yer=wc"><span class="q-ico">${ic('wc')}</span>WC & Kafe</button>
      <button data-go="#/okul"><span class="q-ico">${ic('school')}</span>Okul grubu</button>
      <button data-sheet="help"><span class="q-ico">${ic('help')}</span>Yardım</button>
    </div>

    <div class="section">
      <button class="notice-card" data-go="${notice.link}" style="width:calc(100% - 36px);text-align:left">
        <span class="ico-tile">${ic('alert', 'sm')}</span>
        <span style="flex:1"><span class="eyebrow" style="color:#a85a00">EYLÜL DUYURUSU · ${notice.time}</span><strong>${esc(notice.title)}</strong><p>${esc(notice.body)}</p></span>
      </button>
    </div>

    ${next.length ? `<div class="section">
      <div class="section-head"><h2>Planındaki sıradaki</h2><button class="more" data-go="#/planim">Planım →</button></div>
      <button class="card next-up" data-go="#/etkinlik/${next[0].id}" style="width:calc(100% - 36px);text-align:left">
        <div class="clock"><b>${next[0].start}</b><small>${untilText(next[0])}</small></div>
        <span class="div"></span>
        ${evImg(next[0]) ? `<img class="avatar" src="${evImg(next[0])}" alt="">` : `<span class="ico-tile">${ic('mic', 'sm')}</span>`}
        <span style="flex:1;min-width:0"><strong style="display:block">${esc(next[0].title)}</strong><small class="muted">${esc(evPlace(next[0]))}</small></span>
        ${ic('chev', 'sm')}
      </button>
    </div>` : ''}

    <div class="section">
      <div class="section-head"><h2>Bugün imzada</h2><button class="more" data-go="#/program?tur=imza">Tümü →</button></div>
      <div class="hscroll">
        ${today.filter(e => e.kind === 'imza').map(e => {
          const st = evStatus(e);
          return `<button class="author-card" data-go="#/etkinlik/${e.id}">
            <div class="ph"><img src="${evImg(e)}" alt="" loading="lazy"><span class="t ${st === 'live' ? 'live' : ''}">${st === 'live' ? '● ŞİMDİ' : st === 'past' ? 'Bitti' : e.start}</span></div>
            <strong>${esc(e.title)}</strong><small>${esc(pub(e.publisher).name)} · ${pub(e.publisher).stand}</small>
          </button>`;
        }).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Fuar ne kadar kalabalık?</h2><button class="more" data-go="#/harita?katman=yogunluk">Isı haritası →</button></div>
      <button class="card crowd-card" data-go="#/harita?katman=yogunluk" style="width:calc(100% - 36px);text-align:left;display:block">
        <div class="head">
          <div><span class="eyebrow">ŞU AN</span><div class="level">${avg > .75 ? 'Yoğun' : avg > .55 ? 'Orta yoğunlukta' : 'Sakin'}</div><div class="hint">Girişte bekleme ~4 dk · A-7 / A-8 sıraları sakin</div></div>
          <span class="tag ok">${ic('clock', 'xs')} En sakin: 10–12</span>
        </div>
        <div class="spark">${CROWD_HOURS.map((v, i) => `<span class="${i === hourIdx ? 'now' : v < .4 ? 'calm' : ''}" style="height:${Math.round(v * 100)}%"></span>`).join('')}</div>
        <div class="spark-labels"><span>10.00</span><span>13.00</span><span>16.00</span><span>20.00</span></div>
      </button>
    </div>

    <div class="section">
      <div class="section-head"><h2>Fuar fırsatları</h2><span class="sponsor-note">Sponsorlu</span></div>
      <div class="hscroll">
        ${DEALS.map(d => { const p = pub(d.publisher); return `<button class="card deal-card" data-go="#/yayinevi/${p.id}">
          <span class="logo-tile"><img src="${A}${p.logo}" alt="${esc(p.name)}"></span>
          <span class="amount">${esc(d.title)}</span><small>${esc(d.note)}</small>
          <span class="st">${ic('pin', 'xs')} ${p.stand} · ${esc(p.name)}</span>
        </button>`; }).join('')}
      </div>
    </div>
    <div class="footer-credit">Eylül Fuarcılık için <img src="${A}bulbi-logo.png" alt="Bulbi"> tarafından geliştirildi</div>
  ` };
}

/* ---------- Dijital imza sırası ---------- */
let queueTimer = null;
function queueState(id) {
  const base = QUEUES[id] ?? 0;
  const mine = S.queues[id];
  return { length: base, mine };
}
function takeQueue(id) {
  const base = QUEUES[id] ?? 0;
  S.queues[id] = { no: 47, ahead: base, start: base || 1, notified: false, ready: base === 0 };
  if (!has('saved', id)) S.saved.push(id);
  save();
  toast('Sıra numaran alındı · bildirimle haber vereceğiz', 'ticket');
  go('#/sira/' + id);
  startQueueSim();
}
function advanceQueue(id, by) {
  const q = S.queues[id]; if (!q || q.ready) return;
  q.ahead = Math.max(0, q.ahead - by);
  const e = ev(id), p = pub(e.publisher);
  if (q.ahead <= 5 && !q.notified) {
    q.notified = true;
    push({ type: 'queue', title: 'Sıran yaklaşıyor', body: `${e.title} imzası · önünde ${q.ahead} kişi kaldı. ${p.stand}’e doğru yürüyebilirsin.`, link: '#/sira/' + id });
  }
  if (q.ahead === 0) {
    q.ready = true;
    push({ type: 'queue', title: 'Sıra sende! ✍️', body: `${e.title} seni bekliyor. ${p.name} · ${p.stand}. 5 dakika içinde standa gel.`, link: '#/sira/' + id });
  }
  save();
  if (route.name === 'sira' || route.name === 'home') render('none');
}
function startQueueSim() {
  clearInterval(queueTimer);
  queueTimer = setInterval(() => {
    const active = Object.keys(S.queues).filter(k => !S.queues[k].ready);
    if (!active.length) return clearInterval(queueTimer);
    active.forEach(id => advanceQueue(id, 1 + Math.floor(Math.random() * 3)));
  }, 1800);
}

SCREENS.sira = id => {
  const e = ev(id); const q = S.queues[id];
  if (!e || !q) return SCREENS.etkinlik(id);
  const a = author(e.author), p = pub(e.publisher);
  const pct = q.ready ? 100 : Math.round(100 - q.ahead / q.start * 100);
  const mins = Math.max(1, Math.round(q.ahead * 0.7));
  const stage = q.ready ? 3 : q.ahead <= 5 ? 2 : 1;
  const r = routeTo([p.stand]);
  return {
    top: topBack('İmza sıram', 'DİJİTAL SIRA'),
    html: `
    <div class="ticket ${q.ready ? 'ready' : ''}">
      <div class="t-top">
        <div class="who"><img src="${A}${a.photo}" alt=""><div><strong>${esc(a.name)}</strong><small>${esc(p.name)} · ${p.stand} · ${e.start}</small></div></div>
        <div class="num-wrap">
          <div><div class="label">Sıra no</div><div class="no">#${q.no}</div></div>
          <div class="ahead"><div class="label">${q.ready ? 'Durum' : 'Önünde'}</div><b>${q.ready ? 'Sıra sende' : q.ahead + ' kişi'}</b></div>
        </div>
      </div>
      <div class="perf"></div>
      <div class="t-bottom">
        <div class="progress"><b style="width:${pct}%"></b></div>
        <div class="eta"><span>${q.ready ? 'Standa 5 dk içinde gel' : `Tahmini <b>~${mins} dk</b>`}</span><span>${q.ready ? `<b>${r.minutes} dk</b> yürüme` : `Bildirim: <b>5 kişi kala</b>`}</span></div>
      </div>
    </div>
    <div class="steps">
      <div class="step done"><span class="b">${ic('check', 'xs')}</span><div><strong>Sıran alındı</strong><small>Beklerken fuarı gezebilirsin, yerini kaybetmezsin.</small></div></div>
      <div class="step ${stage > 2 ? 'done' : stage === 2 ? 'cur' : ''}"><span class="b">${stage > 2 ? ic('check', 'xs') : '2'}</span><div><strong>Sıran yaklaşınca haber veririz</strong><small>5 kişi kala telefonuna bildirim gelir.</small></div></div>
      <div class="step ${stage === 3 ? 'cur' : ''}"><span class="b">3</span><div><strong>Standa gel, imzanı al</strong><small>Görevli numaranı kontrol eder, sıran korunur.</small></div></div>
    </div>
    <div class="mini-map" style="margin-top:4px">${floorSVG({ sel: p.stand, route: r, viewBox: '200 180 800 460', fac: false })}
      <div class="cap"><div><b>${p.stand} · ${esc(p.name)}</b><small>Girişten ${r.meters} m · ${r.minutes} dk</small></div><button class="btn sm dark" data-go="#/harita?stand=${p.stand}">Kroki</button></div>
    </div>
    <div class="cta-bar" style="margin-top:14px">
      <button class="btn ghost" data-go="#/yazar/${a.id}">${ic('book', 'sm')} Kitaplarına bak</button>
      <button class="btn ghost" data-leave-queue="${id}">Sıradan çık</button>
    </div>
    <p class="muted" style="text-align:center;font-size:12px;margin:14px 30px 0">Sıra, yayınevi görevlisinin tabletinden yönetilir. Kişi başı ortalama 40 sn varsayılmıştır.</p>`
  };
};

/* ---------- Ekran: Program ---------- */
SCREENS.program = () => {
  const day = Number(route.q.get('gun') || DEMO_NOW.day);
  const kind = route.q.get('tur') || 'tum';
  const F = fair();
  let list = fairEvents().filter(e => e.day === day && (kind === 'tum' || e.kind === kind || (kind === 'cocuk' && e.kind === 'atolye')));
  if (kids() && S.age !== 'all') list = list.filter(e => e.age && e.age[0] <= Number(S.age) + 2 && e.age[1] >= Number(S.age));
  list.sort((a, b) => tmin(a.start) - tmin(b.start));
  const kinds = kids() ? [['tum', 'Tümü'], ['cocuk', 'Sahne'], ['atolye', 'Atölye']] : [['tum', 'Tümü'], ['imza', 'İmza'], ['soylesi', 'Söyleşi'], ['cocuk', 'Çocuk']];
  const counts = k => fairEvents().filter(e => e.day === day && (k === 'tum' || e.kind === k || (k === 'cocuk' && e.kind === 'atolye'))).length;
  let nowShown = false;
  const items = list.map(e => {
    const st = day === DEMO_NOW.day ? evStatus(e) : day < DEMO_NOW.day ? 'past' : 'future';
    let line = '';
    if (!nowShown && day === DEMO_NOW.day && tmin(e.start) > nowMin()) { nowShown = true; line = `<div class="now-line"><span>${fmtNow()}</span><i></i></div>`; }
    return line + programItem(e, st);
  }).join('');
  return {
    top: topTitle(kids() ? 'Etkinlikler' : 'Program', F.name),
    html: `
    <div class="days">${F.days.map(d => `<button class="day ${d.n === day ? 'on' : ''} ${d.n === DEMO_NOW.day && !kids() ? 'today' : ''}" data-go="#/program?gun=${d.n}&tur=${kind}"><small>${d.label.slice(0, 3)}</small><b>${d.date.split(' ')[0]}</b></button>`).join('')}</div>
    <div class="chips" style="margin-top:16px">${kinds.map(([k, l]) => `<button class="chip ${k === kind ? 'on' : ''}" data-go="#/program?gun=${day}&tur=${k}">${k !== 'tum' ? `<span class="sw" style="background:${KCOL[k]}"></span>` : ''}${l} <span style="opacity:.55">${counts(k)}</span></button>`).join('')}</div>
    ${kids() ? ageFilter() : ''}
    <div class="timeline" style="margin-top:14px">${items || `<div class="empty"><strong>Bu filtrede etkinlik yok</strong><p>Başka bir gün ya da tür seçebilirsin.</p></div>`}
    ${!nowShown && day === DEMO_NOW.day && list.length ? `<div class="now-line"><span>${fmtNow()}</span><i></i></div>` : ''}</div>`
  };
};
function fmtNow() { const n = nowMin(); return `${String(Math.floor(n / 60)).padStart(2, '0')}.${String(n % 60).padStart(2, '0')}`; }
function programItem(e, st) {
  const q = QUEUES[e.id];
  const tags = [];
  tags.push(`<span class="tag ${e.kind}">${KIND[e.kind]}</span>`);
  if (st === 'live') tags.push('<span class="tag hot">● Şimdi</span>');
  if (e.kind === 'imza' && q != null && st !== 'past') tags.push(`<span class="tag ${q > 30 ? 'hot' : 'ok'}">${ic('users', 'xs')} ${q} kişi sırada</span>`);
  if (S.queues[e.id]) tags.push(`<span class="tag imza">${ic('ticket', 'xs')} #${S.queues[e.id].no}</span>`);
  if (e.seats != null) tags.push(e.left ? `<span class="tag ${e.left < 6 ? 'hot' : 'ok'}">${e.left} yer kaldı</span>` : '<span class="tag hot">Dolu</span>');
  if (has('booked', e.id)) tags.push(`<span class="tag ok">${ic('check', 'xs')} Rezerve</span>`);
  return `<div class="t-item ${st}">
    <div class="t-time"><b>${e.start}</b><small>${e.end}</small></div>
    <div class="t-card" style="--k:${KCOL[e.kind]}" data-go="#/etkinlik/${e.id}" role="button" tabindex="0">
      ${evImg(e) ? `<img class="avatar" src="${evImg(e)}" alt="" loading="lazy">` : ''}
      <div class="txt"><strong>${esc(e.title)}</strong><small>${esc(evPlace(e))}${e.speakers ? ' · ' + esc(e.speakers) : ''}</small><div class="tags">${tags.join('')}</div></div>
      ${kids() ? '' : `<button class="save-btn ${has('saved', e.id) ? 'on' : ''}" data-save="${e.id}" aria-label="Planıma ekle">${ic('bookmark', 'sm')}</button>`}
    </div>
  </div>`;
}

/* ---------- Ekran: Etkinlik detayı ---------- */
SCREENS.etkinlik = id => {
  const e = ev(id); if (!e) return SCREENS.program();
  const st = evStatus(e);
  const saved = has('saved', e.id);
  const d = fair().days.find(d => d.n === e.day);
  const stand = evStand(e);
  const r = stand ? routeTo([stand]) : null;
  if (e.fair === 'cocuk') return kidEvent(e, d);
  const a = e.author && author(e.author), p = e.publisher && pub(e.publisher);
  const books = a ? BOOKS.filter(b => b.author === a.id) : [];
  const q = queueState(e.id);
  return {
    top: topBack(KIND[e.kind], fair().short, `<button class="icon-btn" data-share aria-label="Paylaş">${ic('share', 'sm')}</button>`),
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
      <button class="fact" data-go="#/harita?stand=${stand}">${ic('pin', 'sm')}<div><small>${p ? 'Stant' : 'Yer'}</small><b>${esc(p ? p.stand + ' · ' + p.name.split(' ')[0] : e.place)}</b></div></button>
    </div>
    ${e.kind === 'imza' && st !== 'past' ? (q.mine ? `
      <button class="queue-cta" data-go="#/sira/${e.id}" style="width:calc(100% - 36px);text-align:left">
        <div class="row2"><span class="num">#${q.mine.no}</span><div style="flex:1"><strong>Sıran alındı</strong><br><small>${q.mine.ready ? 'Sıra sende! Standa gel.' : `Önünde ${q.mine.ahead} kişi · ~${Math.max(1, Math.round(q.mine.ahead * .7))} dk`}</small></div>${ic('chev')}</div>
      </button>` : `
      <div class="queue-cta">
        <div class="row2"><span class="num">${q.length}</span><div style="flex:1"><strong>kişi şu an sırada</strong><br><small>Tahmini bekleme ~${Math.round(q.length * .7)} dk</small></div><span class="tag ${q.length > 30 ? 'hot' : 'ok'}">${q.length > 30 ? ic('flame', 'xs') + ' Yoğun' : 'Normal'}</span></div>
        <button class="btn primary block" data-queue="${e.id}">${ic('ticket', 'sm')} Dijital sıra al — kuyrukta bekleme</button>
        <div class="why">${ic('info', 'xs')}<span>Sıran gelince bildirim alırsın; o sırada söyleşiye girebilir, alışveriş yapabilirsin.</span></div>
      </div>`) : ''}
    <div class="cta-bar">
      <button class="btn ${saved ? 'done' : 'dark'}" data-save="${e.id}">${saved ? ic('check', 'sm') + ' Planımda' : ic('plus', 'sm') + ' Planıma ekle'}</button>
      <button class="btn ghost" data-remind="${e.id}">${ic('bell', 'sm')} 15 dk önce</button>
    </div>
    ${books.length ? `<div class="section">
      <div class="section-head"><h2>İmzalanacak kitaplar</h2><button class="more" data-go="#/yazar/${a.id}">Yazar profili →</button></div>
      <div class="hscroll">${books.map(bookTile).join('')}</div>
    </div>` : ''}
    ${r ? `<div class="section"><div class="section-head"><h2>Nasıl giderim?</h2></div>
      <button class="mini-map" data-go="#/harita?stand=${stand}" style="display:block;width:calc(100% - 36px)">${floorSVG({ sel: stand, route: r, fac: false })}
        <div class="cap"><div style="text-align:left"><b>${esc(standName(stand))}</b><small>Girişten ${r.meters} m · yürüyerek ${r.minutes} dk</small></div>${ic('chev', 'sm')}</div>
      </button></div>` : ''}
    `
  };
};
function bookTile(b) {
  const on = has('wish', b.id);
  return `<div class="book-tile">
    <div class="cv"><button class="cover" data-go="#/kitap/${b.id}"><img src="${A}${b.cover}" alt="${esc(b.title)}" loading="lazy"></button>
      <button class="wl ${on ? 'on' : ''}" data-wish="${b.id}" aria-label="Alınacaklar listesine ekle">${ic(on ? 'check' : 'plus', 'xs')}</button></div>
    <strong>${esc(b.title)}</strong>
    <div class="price"><s>${fmtTL(b.price)}</s><b>${fmtTL(b.fairPrice)}</b></div>
  </div>`;
}

/* ---------- Ekran: Yazar / Yayınevi / Kitap ---------- */
SCREENS.yazar = id => {
  const a = author(id); if (!a) return SCREENS.ara();
  const p = pub(a.publisher);
  const evs = EVENTS.filter(e => e.author === id || (e.speakers || '').includes(a.name));
  const f = has('follows', id);
  return {
    top: topBack('Yazar', 'PROFİL'),
    html: `
    <div class="profile-head">
      <img class="big-avatar" src="${A}${a.photo}" alt="">
      <h1>${esc(a.name)}</h1><p>${esc(p.name)} · Stant ${p.stand}</p>
      <div class="stat-row"><div><b>${evs.length}</b><small>Etkinlik</small></div><div><b>${BOOKS.filter(b => b.author === id).length}</b><small>Kitap</small></div><div><b>${a.followers}</b><small>Takipçi</small></div></div>
    </div>
    <div class="cta-bar"><button class="btn ${f ? 'done' : 'primary'}" data-follow="${id}">${f ? ic('check', 'sm') + ' Takip ediliyor' : ic('bell', 'sm') + ' Fuara gelince haber ver'}</button></div>
    <p class="prose" style="margin-top:16px">${esc(a.bio)}</p>
    <div class="section"><div class="section-head"><h2>Fuardaki programı</h2></div>
      <div class="list">${evs.map(e => { const d = fair().days.find(x => x.n === e.day) || FAIRS.ankara.days.find(x => x.n === e.day); return `<button class="row" data-go="#/etkinlik/${e.id}"><span class="ico-tile" style="background:${e.kind === 'imza' ? 'var(--brand-soft)' : '#ecebff'};color:${KCOL[e.kind]}">${ic(e.kind === 'imza' ? 'pen' : 'mic', 'sm')}</span><span class="txt"><strong>${d.label} ${d.date} · ${e.start}</strong><small>${KIND[e.kind]} · ${esc(evPlace(e))}</small></span>${evStatus(e) === 'live' ? '<span class="tag hot">● Şimdi</span>' : ''}${ic('chev', 'sm')}</button>`; }).join('')}</div>
    </div>
    <div class="section"><div class="section-head"><h2>Kitapları</h2><span class="sponsor-note">Fuar fiyatı</span></div>
      <div class="hscroll">${BOOKS.filter(b => b.author === id).map(bookTile).join('')}</div>
    </div>`
  };
};
SCREENS.yayinevi = id => {
  const p = pub(id); if (!p) return SCREENS.ara();
  const auths = AUTHORS.filter(a => a.publisher === id);
  const books = BOOKS.filter(b => auths.some(a => a.id === b.author));
  const evs = EVENTS.filter(e => e.publisher === id);
  const r = routeTo([p.stand]);
  return {
    top: topBack('Yayınevi', 'KATILIMCI'),
    html: `
    <div class="profile-head">
      <div class="big-logo"><img src="${A}${p.logo}" alt="${esc(p.name)}"></div>
      <h1>${esc(p.name)}</h1><p>Stant ${p.stand} · ${esc(p.about)}</p>
    </div>
    <div class="section" style="margin-top:18px">
      <div class="notice-card" style="background:linear-gradient(120deg,#e7f7f1,#d3f0e6);box-shadow:inset 0 0 0 1px #b5e3d6"><span class="ico-tile" style="background:var(--cocuk);color:#fff">${ic('tag', 'sm')}</span><div><span class="eyebrow" style="color:#087a67">FUAR FIRSATI</span><strong>${esc(p.deal)}</strong><p>Bu kampanya yalnızca fuar standında geçerlidir.</p></div></div>
    </div>
    <div class="section"><button class="mini-map" data-go="#/harita?stand=${p.stand}" style="display:block;width:calc(100% - 36px)">${floorSVG({ sel: p.stand, route: r, fac: false })}<div class="cap"><div style="text-align:left"><b>Stant ${p.stand}</b><small>Girişten ${r.meters} m · ${r.minutes} dk</small></div><span class="btn sm dark">Yol tarifi</span></div></button></div>
    ${evs.length ? `<div class="section"><div class="section-head"><h2>Standdaki etkinlikler</h2></div><div class="list">${evs.map(e => { const d = FAIRS.ankara.days.find(x => x.n === e.day); return `<button class="row" data-go="#/etkinlik/${e.id}"><img class="avatar" src="${evImg(e)}" alt=""><span class="txt"><strong>${esc(e.title)}</strong><small>${d.label} ${d.date} · ${e.start}</small></span>${ic('chev', 'sm')}</button>`; }).join('')}</div></div>` : ''}
    ${books.length ? `<div class="section"><div class="section-head"><h2>Öne çıkan kitaplar</h2></div><div class="hscroll">${books.map(bookTile).join('')}</div></div>` : ''}`
  };
};
SCREENS.kitap = id => {
  const b = book(id); if (!b) return SCREENS.ara();
  const a = author(b.author), p = pub(a.publisher);
  const on = has('wish', id);
  const sign = EVENTS.find(e => e.author === a.id && e.kind === 'imza' && (e.day > DEMO_NOW.day || (e.day === DEMO_NOW.day && evStatus(e) !== 'past')));
  return {
    top: topBack('Kitap', esc(a.name)),
    html: `
    <div style="display:grid;place-items:center;padding:10px 0 4px">
      <img src="${A}${b.cover}" alt="" style="width:170px;border-radius:6px 14px 14px 6px;box-shadow:0 24px 40px rgba(40,28,10,.3), inset 3px 0 0 rgba(0,0,0,.1)">
    </div>
    <div class="profile-head"><h1 style="font-size:27px">${esc(b.title)}</h1><p>${esc(a.name)} · ${esc(p.name)}</p></div>
    <div class="facts">
      <div class="fact">${ic('tag', 'sm')}<div><small>Fuar fiyatı</small><b><s class="muted" style="font-weight:600;font-size:12px">${fmtTL(b.price)}</s> ${fmtTL(b.fairPrice)}</b></div></div>
      <button class="fact" data-go="#/harita?stand=${p.stand}">${ic('pin', 'sm')}<div><small>Nerede?</small><b>${p.stand}</b></div></button>
    </div>
    <div class="cta-bar"><button class="btn ${on ? 'done' : 'primary'}" data-wish="${id}">${on ? ic('check', 'sm') + ' Listemde' : ic('plus', 'sm') + ' Alınacaklar listeme ekle'}</button></div>
    <p class="prose" style="margin-top:16px">${esc(b.about)}</p>
    ${sign ? `<div class="section"><button class="notice-card" data-go="#/etkinlik/${sign.id}" style="width:calc(100% - 36px);text-align:left"><span class="ico-tile">${ic('pen', 'sm')}</span><span><span class="eyebrow" style="color:#a85a00">İMZALI ALABİLİRSİN</span><strong>${esc(a.name)} · ${FAIRS.ankara.days.find(d => d.n === sign.day).label} ${sign.start}</strong><p>${esc(p.name)} standında imza günü var.</p></span></button></div>` : ''}`
  };
};

/* ---------- Ekran: Kroki ---------- */
SCREENS.harita = () => {
  if (kids()) return kidsMap();
  const stand = route.q.get('stand');
  const yer = route.q.get('yer');
  const heat = route.q.get('katman') === 'yogunluk';
  const rota = route.q.get('rota');
  let svg, sheet = '';
  if (rota) {
    const stops = orderStops(wishStands());
    const r = routeTo(stops);
    svg = floorSVG({ list: stops, pins: stops, numbered: true, route: r, dim: true });
    sheet = `<div class="card map-sheet"><div class="walk"><b>${r.minutes}</b><small>dk</small></div><div style="flex:1"><strong>${stops.length} stantlık alışveriş rotan</strong><br><small class="muted">${stops.join(' → ')} · ${r.meters} m</small></div></div>
      <div class="list" style="margin-top:10px">${stops.map((s, i) => `<button class="row" data-go="#/harita?stand=${s}"><span class="ico-tile" style="font-weight:800">${i + 1}</span><span class="txt"><strong>${esc(standName(s))}</strong><small>${s} · ${wishAt(s).map(b => esc(b.title)).join(', ')}</small></span>${ic('chev', 'sm')}</button>`).join('')}</div>`;
  } else if (stand || yer) {
    const id = stand || yer;
    const r = routeTo([id]);
    svg = floorSVG({ sel: id, route: r, pins: [id], facSel: yer });
    const owner = STAND_OWNERS[id];
    const p = owner && pub(owner);
    sheet = `<div class="card map-sheet"><div class="walk"><b>${r.minutes}</b><small>dk yürüme</small></div>
      <div style="flex:1;min-width:0"><strong style="display:block">${esc(standName(id))}</strong><small class="muted">${ZONES[id] || FACILITIES.find(f => f.id === id) ? '' : 'Stant ' + id + ' · '}${r.meters} m · Girişten itibaren</small></div>
      ${p ? `<button class="btn sm dark" data-go="#/yayinevi/${p.id}">Profil</button>` : ''}</div>`;
  } else {
    svg = floorSVG({ heat });
    sheet = heat ? `<div class="list" style="margin-top:12px">${CROWD.map(c => `<div class="row"><span class="ico-tile" style="background:${c.level > .85 ? '#fde4e1' : c.level > .6 ? 'var(--brand-soft)' : '#dff3e6'};color:${c.level > .85 ? 'var(--hot)' : c.level > .6 ? 'var(--brand-deep)' : 'var(--ok)'}">${ic('users', 'sm')}</span><span class="txt"><strong>${c.zone}</strong><small>${c.level > .85 ? 'Çok yoğun' : c.level > .6 ? 'Orta' : 'Sakin'} · %${Math.round(c.level * 100)} doluluk</small></span></div>`).join('')}</div>` : '';
  }
  const facs = [['wc', 'wc', 'WC'], ['kafe', 'cup', 'Kafe'], ['danisma', 'info', 'Danışma'], ['cocukpt', 'shield', 'Kayıp çocuk']];
  return {
    top: topTitle('Fuar krokisi', 'ATO CONGRESIUM · ZEMİN KAT'),
    html: `
    <button class="search" data-go="#/ara?mod=stant" style="width:calc(100% - 36px);margin-bottom:12px">${ic('search', 'sm')}<span style="flex:1">${stand ? esc(stand + ' · ' + standName(stand)) : 'Stant ya da yayınevi ara…'}</span></button>
    <div class="chips" style="margin-bottom:12px">
      <button class="chip ${!heat && !rota && !stand && !yer ? 'on' : ''}" data-go="#/harita">${ic('map', 'xs')} Kroki</button>
      <button class="chip ${heat ? 'on' : ''}" data-go="#/harita?katman=yogunluk">${ic('flame', 'xs')} Yoğunluk</button>
      <button class="chip ${rota ? 'on' : ''}" data-go="#/harita?rota=1">${ic('route', 'xs')} Alışveriş rotam</button>
    </div>
    <div class="map-wrap" id="mapwrap">
      ${heat ? `<div class="map-legend"><span><i style="background:#1f9d55"></i>Sakin</span><span><i style="background:#f19a1b"></i>Orta</span><span><i style="background:#e2493b"></i>Yoğun</span></div>` : ''}
      <div class="map-tools"><button data-zoom="1" aria-label="Yakınlaş">+</button><button data-zoom="-1" aria-label="Uzaklaş">−</button></div>
      <div class="map-scroll" id="mapscroll"><div class="map-canvas" id="mapcanvas" style="width:${mapW}px">${svg}</div></div>
    </div>
    ${sheet}
    ${!stand && !yer && !rota && !heat ? `<div class="section" style="margin-top:16px"><div class="section-head"><h2>Hizmet noktaları</h2></div><div class="fac-grid">${facs.map(([id, icn, l]) => `<button data-go="#/harita?yer=${id}">${ic(icn, 'sm')}${l}</button>`).join('')}</div></div>
      <p class="muted" style="font-size:11.5px;margin:14px 22px 0">Stant yerleşimi, organizatörün 23. fuar krokisinden sadeleştirilmiştir. 24. fuar krokisi geldiğinde güncellenir.</p>` : ''}
    `,
    after: () => {
      const target = stand || yer || (rota ? orderStops(wishStands())[0] : null);
      requestAnimationFrame(() => centerMap(target || 'A-404'));
    }
  };
};
let mapW = 820;
function centerMap(id, smooth = false) {
  const sc = $('#mapscroll'), t = targetPoint(id); if (!sc || !t) return;
  const W = mapW, H = W * .64;
  sc.scrollTo({ left: t.end.x / 1000 * W - sc.clientWidth / 2, top: t.end.y / 640 * H - sc.clientHeight / 2, behavior: smooth ? 'smooth' : 'instant' });
}
const wishStands = () => [...new Set(S.wish.filter(id => !has('got', id)).map(id => pub(author(book(id).author).publisher).stand))];
const wishAt = stand => S.wish.map(book).filter(b => pub(author(b.author).publisher).stand === stand);

/* ---------- Ekran: Ara ---------- */
SCREENS.ara = () => ({
  top: topTitle('Ara', 'YAZAR · KİTAP · YAYINEVİ · STANT'),
  html: `
  <label class="search">${ic('search', 'sm')}<input id="q" type="search" placeholder="Örn. Menteş, susamuru, A-305…" autocomplete="off" value="${esc(route.q.get('q') || '')}"></label>
  <div id="results"></div>`,
  after: () => { const i = $('#q'); runSearch(i.value); if (!EMBED) i.focus({ preventScroll: true }); }
});
function runSearch(q) {
  const box = $('#results'); if (!box) return;
  q = q.trim();
  if (!q) {
    box.innerHTML = `
      <div class="res-group"><h3>Şu an en çok arananlar</h3><div class="trend">
        ${['Murat Menteş', 'Timur Soykan', 'Çocuk kitapları', 'Buket Uzuner', 'WC', 'Söyleşi Salonu'].map((t, i) => `<button data-search="${t}"><i>${i + 1}</i>${t}</button>`).join('')}
      </div></div>
      <div class="res-group"><h3>Yazarlar</h3><div class="hscroll">${AUTHORS.map(a => `<button class="author-card" style="width:104px" data-go="#/yazar/${a.id}"><div class="ph" style="width:104px;height:120px"><img src="${A}${a.photo}" alt="" loading="lazy"></div><strong>${esc(a.name)}</strong></button>`).join('')}</div></div>
      <div class="res-group"><h3>Yayınevleri</h3><div class="list">${PUBLISHERS.slice(0, 6).map(pubRow).join('')}</div></div>`;
    return;
  }
  const n = norm(q);
  const m = s => norm(s).includes(n);
  const as = AUTHORS.filter(a => m(a.name));
  const bs = BOOKS.filter(b => m(b.title) || m(author(b.author).name));
  const ps = PUBLISHERS.filter(p => m(p.name) || m(p.stand) || m(p.stand.replace('-', '')));
  const es = EVENTS.filter(e => e.fair === S.fair && (m(e.title) || m(e.speakers || '') || m(e.place || '')));
  const ss = Object.keys(STANDS).filter(id => !STAND_OWNERS[id] && norm(id).replace('-', '') === n.replace('-', '').replace(' ', '')).slice(0, 1);
  const fs = FACILITIES.filter(f => m(f.name) || m(f.label)).concat(Object.values(ZONES).filter(z => m(z.name)));
  const total = as.length + bs.length + ps.length + es.length + ss.length + fs.length;
  box.innerHTML = total ? `
    <p class="muted" style="margin:14px 22px 0;font-size:12.5px;font-weight:700">${total} sonuç</p>
    ${as.length ? `<div class="res-group"><h3>Yazarlar</h3><div class="list">${as.map(a => `<button class="row" data-go="#/yazar/${a.id}"><img class="avatar" src="${A}${a.photo}" alt=""><span class="txt"><strong>${hl(a.name, q)}</strong><small>${esc(pub(a.publisher).name)} · ${pub(a.publisher).stand}</small></span>${ic('chev', 'sm')}</button>`).join('')}</div></div>` : ''}
    ${ps.length ? `<div class="res-group"><h3>Yayınevleri & stantlar</h3><div class="list">${ps.map(p => pubRow(p, q)).join('')}</div></div>` : ''}
    ${ss.length ? `<div class="res-group"><h3>Stant</h3><div class="list">${ss.map(id => `<button class="row" data-go="#/harita?stand=${id}"><span class="ico-tile">${ic('pin', 'sm')}</span><span class="txt"><strong>${id}</strong><small>Krokide göster</small></span>${ic('chev', 'sm')}</button>`).join('')}</div></div>` : ''}
    ${bs.length ? `<div class="res-group"><h3>Kitaplar</h3><div class="list">${bs.map(b => `<button class="row" data-go="#/kitap/${b.id}"><img src="${A}${b.cover}" alt="" style="width:38px;height:56px;border-radius:3px 6px 6px 3px;object-fit:cover"><span class="txt"><strong>${hl(b.title, q)}</strong><small>${esc(author(b.author).name)} · ${pub(author(b.author).publisher).stand} · <b style="color:var(--hot)">${fmtTL(b.fairPrice)}</b></small></span>${ic('chev', 'sm')}</button>`).join('')}</div></div>` : ''}
    ${es.length ? `<div class="res-group"><h3>Etkinlikler</h3><div class="list">${es.map(e => { const d = fair().days.find(x => x.n === e.day); return `<button class="row" data-go="#/etkinlik/${e.id}"><span class="ico-tile" style="color:${KCOL[e.kind]}">${ic(e.kind === 'imza' ? 'pen' : e.kind === 'soylesi' ? 'mic' : 'kid', 'sm')}</span><span class="txt"><strong>${hl(e.title, q)}</strong><small>${KIND[e.kind]} · ${d.label} ${e.start}</small></span>${ic('chev', 'sm')}</button>`; }).join('')}</div></div>` : ''}
    ${fs.length ? `<div class="res-group"><h3>Hizmet noktaları</h3><div class="list">${fs.map(f => `<button class="row" data-go="#/harita?${FACILITIES.includes(f) ? 'yer' : 'stand'}=${f.id}"><span class="ico-tile">${ic(f.icon || 'pin', 'sm')}</span><span class="txt"><strong>${hl(f.name, q)}</strong><small>Krokide göster</small></span>${ic('chev', 'sm')}</button>`).join('')}</div></div>` : ''}
  ` : `<div class="empty" style="margin-top:20px"><strong>“${esc(q)}” bulunamadı</strong><p>Yazım farklı olabilir. Danışma noktası da yardımcı olur.</p><button class="btn sm dark" data-go="#/harita?yer=danisma">Danışmayı göster</button></div>`;
}
function pubRow(p, q = '') {
  return `<button class="row" data-go="#/yayinevi/${p.id}"><span class="logo-tile"><img src="${A}${p.logo}" alt=""></span><span class="txt"><strong>${hl(p.name, q)}</strong><small>Stant ${hl(p.stand, q)} · ${esc(p.deal)}</small></span>${ic('chev', 'sm')}</button>`;
}

/* ---------- Ekran: Planım ---------- */
SCREENS.planim = () => {
  if (kids()) return kidsPlan();
  const tab = route.q.get('sekme') || 'program';
  const saved = EVENTS.filter(e => has('saved', e.id)).sort((a, b) => a.day - b.day || tmin(a.start) - tmin(b.start));
  const wish = S.wish.map(book);
  const left = wish.filter(b => !has('got', b.id));
  const saving = left.reduce((s, b) => s + b.price - b.fairPrice, 0);
  let body = '';
  if (tab === 'program') {
    const byDay = {};
    saved.forEach(e => (byDay[e.day] = byDay[e.day] || []).push(e));
    body = saved.length ? Object.entries(byDay).map(([d, list]) => {
      const day = FAIRS.ankara.days.find(x => x.n === Number(d));
      return `<div class="section" style="margin-top:18px"><div class="section-head"><h2 style="font-size:18px">${day.label}, ${day.date}${Number(d) === DEMO_NOW.day ? ' <span class="tag imza" style="vertical-align:middle">Bugün</span>' : ''}</h2></div>
        <div class="timeline" style="padding-top:0">${list.map(e => programItem(e, evStatus(e))).join('')}</div></div>`;
    }).join('') : `<div class="empty" style="margin-top:18px"><strong>Planın boş</strong><p>Programdaki etkinliklere ${ic('bookmark', 'xs')} dokunarak ekle.</p><button class="btn sm dark" data-go="#/program">Programa git</button></div>`;
  } else {
    body = `
    <div class="route-banner">
      <span class="ico-tile">${ic('route', 'sm')}</span>
      <div style="flex:1"><strong>${wishStands().length} stant · tek rota</strong><small>Listendeki kitapları en kısa yoldan topla. Fuar indirimiyle ${fmtTL(saving)} kazancın var.</small></div>
    </div>
    <div class="cta-bar"><button class="btn primary" data-go="#/harita?rota=1">${ic('map', 'sm')} Rotamı krokide çiz</button></div>
    <div class="list" style="margin-top:16px">${wish.map(b => { const a = author(b.author), p = pub(a.publisher); const g = has('got', b.id); return `
      <div class="wish ${g ? 'got' : ''}">
        <button data-go="#/kitap/${b.id}"><img src="${A}${b.cover}" alt=""></button>
        <div class="txt"><strong>${esc(b.title)}</strong><small>${esc(a.name)}</small><span class="st"><span class="tag imza">${ic('pin', 'xs')} ${p.stand}</span><span class="tag ok">${fmtTL(b.fairPrice)}</span></span></div>
        <button class="check ${g ? 'on' : ''}" data-got="${b.id}" aria-label="Aldım">${ic('check', 'xs')}</button>
      </div>`; }).join('')}</div>
    <p class="muted" style="font-size:12px;margin:12px 22px 0">Kitap ve yazar sayfalarındaki ＋ ile listene ekleyebilirsin.</p>`;
  }
  return {
    top: topTitle('Planım', 'KİŞİSEL FUAR AKIŞIN'),
    html: `
    <div class="seg">
      <button class="${tab === 'program' ? 'on' : ''}" data-go="#/planim?sekme=program">Programım <span class="c">${saved.length}</span></button>
      <button class="${tab === 'liste' ? 'on' : ''}" data-go="#/planim?sekme=liste">Alınacaklar <span class="c">${left.length}</span></button>
    </div>
    <button class="row" data-go="#/bilet" style="width:calc(100% - 36px);margin:14px 18px 0;background:var(--night);color:#fff">
      <span class="ico-tile" style="background:var(--brand);color:#1a1100">${ic('qr', 'sm')}</span>
      <span class="txt"><strong>E-biletim</strong><small style="color:rgba(255,255,255,.65)">Cumartesi · Girişte QR’ı okut</small></span>${ic('chev', 'sm')}
    </button>
    ${body}`
  };
};

/* ---------- Ekran: Bilet / Ulaşım / Okul / Fırsatlar / Bildirimler ---------- */
SCREENS.bilet = () => ({
  top: topBack('E-biletim', fair().short),
  html: `
  <div class="entry-ticket">
    <div class="band"><img src="${A}eylul-fuarcilik-logo.png" alt=""><span class="tag dark">GÜNLÜK BİLET</span></div>
    <div class="qr">${qrSVG('EYLUL-AKF24-0512-4471-DEMO', 5)}</div>
    <div class="meta">
      <div><small>Ziyaretçi</small><b>Misafir okur</b></div>
      <div><small>Geçerli gün</small><b>Cmt, 5 Aralık</b></div>
      <div><small>Kapı</small><b>Ana giriş</b></div>
      <div><small>Bilet no</small><b>AKF24-4471</b></div>
    </div>
  </div>
  <div class="section"><div class="list">
    <div class="row"><span class="ico-tile">${ic('clock', 'sm')}</span><span class="txt"><strong>Girişte şu an ~4 dk bekleme</strong><small>QR’lı biletle turnikeden doğrudan geç.</small></span></div>
    <div class="row"><span class="ico-tile">${ic('school', 'sm')}</span><span class="txt"><strong>Öğrenci, öğretmen ve engelliler</strong><small>Hafta içi ücretsiz · kimliğini girişte göster</small></span></div>
    <div class="row"><span class="ico-tile">${ic('ticket', 'sm')}</span><span class="txt"><strong>Günlük e-bilet: 50 ₺</strong><small>Her gün için ayrı bilet · iade yok</small></span></div>
  </div></div>
  <p class="muted" style="font-size:12px;margin:14px 22px 0">Ücret bilgisi 2026 Nisan fuarına aittir. Demo bilet satışı yapmaz.</p>`
});
SCREENS.ulasim = () => ({
  top: topBack('Ulaşım', fair().venue),
  html: `
  <div class="mini-map" style="height:170px;background:linear-gradient(135deg,#e7efe9,#efe9dc)">
    <svg viewBox="0 0 400 170" style="width:100%;height:100%"><path d="M0 120 C120 110 160 60 400 40" stroke="#d14b4b" stroke-width="6" fill="none" opacity=".75"/><path d="M60 0 L140 170" stroke="#fff" stroke-width="14"/><path d="M0 70 L400 95" stroke="#fff" stroke-width="10"/><circle cx="220" cy="78" r="9" fill="#d14b4b" stroke="#fff" stroke-width="3"/><text x="220" y="62" text-anchor="middle" font-size="11" font-weight="800" fill="#7a2a2a">M2 Söğütözü</text><rect x="268" y="100" width="70" height="40" rx="8" fill="#15171c"/><text x="303" y="124" text-anchor="middle" font-size="10" font-weight="800" fill="#f19a1b">CONGRESIUM</text><path d="M228 84 Q250 110 268 116" stroke="#2f6ee5" stroke-width="3" stroke-dasharray="4 5" fill="none"/></svg>
    <div class="cap"><div><b>${fair().venue}</b><small>${esc(fair().address)}</small></div></div>
  </div>
  <div class="section"><div class="list">
    <div class="row"><span class="ico-tile" style="background:#fde4e1;color:#c03a3a">${ic('train', 'sm')}</span><span class="txt"><strong>Metro · M2 Söğütözü</strong><small>Önerilen · istasyondan yaklaşık 8 dk yürüme</small></span><span class="tag ok">Önerilen</span></div>
    <div class="row"><span class="ico-tile">${ic('car', 'sm')}</span><span class="txt"><strong>Kapalı otopark</strong><small>Şu an %85 dolu · çıkışta 18.00 sonrası yoğunluk</small></span><span class="tag hot">%85</span></div>
    <div class="row"><span class="ico-tile">${ic('bus', 'sm')}</span><span class="txt"><strong>Okul servisleri</strong><small>Belediye destekli otobüsler B kapısına yanaşır</small></span></div>
  </div></div>
  <div class="section"><div class="notice-card"><span class="ico-tile">${ic('sparkle', 'sm')}</span><div><strong>Rahat ziyaret önerisi</strong><p>Hafta sonu en sakin saatler 10.00–12.00. Çıkış trafiğine takılmamak için 17.30’dan önce ayrılmayı dene.</p></div></div></div>
  <p class="muted" style="font-size:11.5px;margin:14px 22px 0">Doluluk ve bekleme değerleri sunum için örnektir; canlı sistemde otopark ve turnike verisinden beslenir.</p>`
});
SCREENS.okul = () => ({
  top: topBack('Okul grubu', 'ÖĞRETMENLER İÇİN'),
  html: `
  <div class="hero flat" style="min-height:190px"><div class="inner"><span class="tag dark">${ic('school', 'xs')} OKUL ZİYARETİ</span><h1>Sınıfınla fuara<br>planlı gel.</h1><p>Ziyaret saati al, servis bilgisini gör, öğrencilere uygun etkinlikleri seç.</p></div></div>
  <div class="section"><div class="section-head"><h2>Uygun ziyaret saatleri</h2><span class="sponsor-note">Pazartesi · 7 Ara</span></div>
    <div class="list">
      ${[['10.00 – 12.00', 'Sakin', 3, 'ok'], ['12.30 – 14.30', 'Orta', 1, 'imza'], ['15.00 – 17.00', 'Dolu', 0, 'hot']].map(([t, l, n, c]) => `<div class="row"><span class="ico-tile">${ic('clock', 'sm')}</span><span class="txt"><strong>${t}</strong><small>${n ? n + ' sınıflık kontenjan kaldı' : 'Kontenjan doldu'}</small></span><span class="tag ${c}">${l}</span></div>`).join('')}
    </div>
  </div>
  <div class="section"><div class="list">
    <div class="row"><span class="ico-tile">${ic('bus', 'sm')}</span><span class="txt"><strong>Belediye servisi</strong><small>Okul adresinden alış · B kapısı</small></span></div>
    <div class="row"><span class="ico-tile">${ic('kid', 'sm')}</span><span class="txt"><strong>Çocuk Atölyesi</strong><small>“Kendi kitabını tasarla” · 20 kişilik grup</small></span></div>
  </div></div>
  <div class="cta-bar" style="margin-top:16px"><button class="btn primary" data-toast="Ziyaret talebi alındı · Eylül ekibi onaylayınca bildirim gelir">${ic('check', 'sm')} Ziyaret saati talep et</button></div>`
});
SCREENS.firsatlar = () => ({
  top: topBack('Fuar fırsatları', 'YAYINEVİ KAMPANYALARI'),
  html: `
  <p class="prose" style="margin:0 0 14px">Fuara özel indirimler tek listede. İnternet fiyatıyla karşılaştırmak için kitap sayfasına bak.</p>
  <div class="list">${PUBLISHERS.map(p => `<button class="row" data-go="#/yayinevi/${p.id}"><span class="logo-tile"><img src="${A}${p.logo}" alt=""></span><span class="txt"><strong>${esc(p.deal)}</strong><small>${esc(p.name)} · ${p.stand}</small></span>${ic('chev', 'sm')}</button>`).join('')}</div>`
});
SCREENS.bildirimler = () => {
  const all = [...S.extraNotices, ...NOTICES];
  const tag = { change: 'Program değişikliği', queue: 'İmza sırası', eylul: 'Eylül duyurusu', deal: 'Fırsat' };
  const icn = { change: 'alert', queue: 'ticket', eylul: 'info', deal: 'tag' };
  const html = `
  <div class="list">${all.map(n => `<button class="notice ${S.read.includes(n.id) ? '' : 'new'}" data-notice="${n.id}" data-go="${n.link}">
    <span class="ico-tile ${n.type}">${ic(icn[n.type], 'sm')}</span>
    <span class="txt"><span class="h"><strong>${esc(n.title)}</strong><time>${n.time}</time></span><p>${esc(n.body)}</p><span class="tag" style="margin-top:8px;padding:0;color:var(--muted)">${tag[n.type]}</span></span>
  </button>`).join('')}</div>
  <div class="section"><div class="section-head"><h2>Bildirim tercihlerin</h2></div><div class="list">
    ${[['change', 'Program değişiklikleri', 'İptal, saat ve salon değişikliği'], ['queue', 'İmza sırası', 'Sıran yaklaşınca haber ver'], ['eylul', 'Eylül duyuruları', 'Yoğunluk, kayıp eşya, güvenlik'], ['deal', 'Fırsatlar', 'Takip ettiğin yayınevlerinden']].map(([k, t, d]) => `<div class="pref"><div class="txt"><strong>${t}</strong><small>${d}</small></div><button class="switch ${S.prefs[k] ? 'on' : ''}" data-pref="${k}" aria-label="${t}"></button></div>`).join('')}
  </div></div>`;
  setTimeout(() => { S.read = all.map(n => n.id); save(); }, 1500);
  return { top: topBack('Bildirimler', 'FUARIN NABZI'), html };
};
SCREENS.hosgeldin = () => ({
  noTop: true, noTabs: true, darkTop: true,
  html: `<div class="onboard" style="position:fixed;max-width:inherit">
    <div class="ph"><img src="${A}ankara-fuar-arsiv.jpg" alt=""><img class="logo" src="${A}eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"></div>
    <div class="body">
      <span class="eyebrow" style="color:var(--brand)">24. ANKARA KİTAP FUARI · 4–13 ARALIK</span>
      <h1>Fuar artık<br><em>cebinde.</em></h1>
      <p>İmza sırası, program, kroki ve duyurular tek uygulamada. Neleri seversin?</p>
      <div class="interests">${['Roman', 'Araştırma', 'Tarih', 'Çocuk', 'Şiir', 'Çizgi roman', 'Bilim', 'Felsefe'].map(t => `<button class="${has('interests', t) ? 'on' : ''}" data-interest="${t}">${t}</button>`).join('')}</div>
      <button class="btn primary block" data-go="#/">Fuara başla ${ic('chev', 'sm')}</button>
    </div>
  </div>`
});

/* ---------- Çocuk Şenliği ---------- */
function ageFilter() {
  const ages = [['all', 'Tüm yaşlar'], ['4', '3–5 yaş'], ['7', '6–8 yaş'], ['10', '9–12 yaş']];
  return `<div class="ages" style="margin-top:12px">${ages.map(([v, l]) => `<button class="${S.age === v ? 'on' : ''}" data-age="${v}">${l}</button>`).join('')}</div>`;
}
function kidsHome() {
  const today = fairEvents().filter(e => e.day === 1).sort((a, b) => tmin(a.start) - tmin(b.start));
  return { html: `
    <div class="greet">
      <div class="date"><span>Nisan 2027 · konsept</span><span class="open">Aileler için</span></div>
      <h1>Bugün ne <em>keşfedelim?</em></h1>
    </div>
    <div class="kid-hero"><img src="${A}children-workshop.jpg" alt=""><div class="inner"><span class="tag dark">ÇOCUK ŞENLİĞİ</span><h3>Atölyeler dolmadan<br>yerini ayır.</h3><p>Yaşa göre etkinlik, kontenjan ve güvenli bileklik tek yerde.</p></div></div>
    ${ageFilter()}
    <div class="section"><div class="section-head"><h2>Bugünün atölyeleri</h2><button class="more" data-go="#/program?gun=1">Tümü →</button></div>
      <div class="list">${today.slice(0, 4).map(kidRow).join('')}</div>
    </div>
    <div class="section">
      <div class="wristband">
        <span class="tag dark">${ic('shield', 'xs')} GÜVENLİ BİLEKLİK</span>
        <h3>Kalabalıkta içiniz<br>rahat olsun.</h3>
        <p>Çocuğunuzun bilekliğindeki QR okutulduğunda telefon numaranız görünmeden size anında haber gelir.</p>
        <button class="btn primary" data-go="#/bileklik">${S.child ? 'Bilekliği gör' : 'Bileklik oluştur'} ${ic('chev', 'sm')}</button>
      </div>
    </div>
    <div class="section"><div class="section-head"><h2>Şenlik alanları</h2></div>
      <div class="fac-grid">${KID_ZONES.map(z => `<button data-go="#/harita">${ic(z.icon, 'sm')}${z.name.split(' ')[0]}</button>`).join('')}</div>
    </div>
    <div class="footer-credit">Eylül Fuarcılık için <img src="${A}bulbi-logo.png" alt="Bulbi"> tarafından geliştirildi</div>
  ` };
}
function kidRow(e) {
  const pct = e.seats ? Math.round((e.seats - e.left) / e.seats * 100) : 0;
  const b = has('booked', e.id);
  return `<div class="row" data-go="#/etkinlik/${e.id}" role="button" tabindex="0">
    <span class="ico-tile" style="background:${e.kind === 'atolye' ? '#fde6ee' : '#dcf5ef'};color:${KCOL[e.kind]}">${ic(e.kind === 'atolye' ? 'brush' : 'stage', 'sm')}</span>
    <span class="txt"><strong>${esc(e.title)}</strong><small>${e.start} · ${esc(e.place)} · ${esc(e.speakers)}</small>
      <span class="seat ${e.left < 6 ? 'low' : ''}" style="margin-top:6px"><i><b style="width:${pct}%"></b></i>${e.left ? e.left + ' yer kaldı' : 'Dolu · bekleme listesi'}</span></span>
    ${b ? `<span class="tag ok">${ic('check', 'xs')}</span>` : e.left ? `<button class="btn sm primary" data-book="${e.id}">Ayır</button>` : `<button class="btn sm ghost" data-toast="Bekleme listesine eklendin · yer açılırsa haber vereceğiz">Liste</button>`}
  </div>`;
}
function kidEvent(e, d) {
  const b = has('booked', e.id);
  return {
    top: topBack(KIND[e.kind], fair().short),
    html: `
    <div class="kid-hero" style="min-height:250px"><img src="${A}children-workshop.jpg" alt=""><div class="inner"><span class="tag dark">${esc(e.speakers)} · ${d.label} ${e.start}</span><h3>${esc(e.title)}</h3><p>${esc(e.place)}</p></div></div>
    <div class="facts">
      <div class="fact">${ic('clock', 'sm')}<div><small>Saat</small><b>${e.start} – ${e.end}</b></div></div>
      <div class="fact">${ic('users', 'sm')}<div><small>Kontenjan</small><b>${e.left ? e.left + ' / ' + e.seats + ' boş' : 'Dolu'}</b></div></div>
    </div>
    <div class="cta-bar">${b ? `<button class="btn done">${ic('check', 'sm')} Yeriniz ayrıldı</button>` : e.left ? `<button class="btn primary" data-book="${e.id}">${ic('ticket', 'sm')} Yer ayır · ücretsiz</button>` : `<button class="btn ghost" data-toast="Bekleme listesine eklendin">Bekleme listesine gir</button>`}</div>
    ${b ? `<div class="section"><div class="entry-ticket"><div class="band"><strong>Atölye bileti</strong><span class="tag dark">${e.start}</span></div><div class="qr">${qrSVG('EYLUL-SENLIK-' + e.id, 4)}</div></div></div>` : ''}
    <p class="prose" style="margin-top:16px">Etkinlik başlamadan 15 dakika önce hatırlatma gönderilir. Gelemeyecekseniz yerinizi bırakın; bekleme listesindeki aileye otomatik geçer.</p>`
  };
}
function kidsPlan() {
  const list = EVENTS.filter(e => has('booked', e.id));
  return {
    top: topTitle('Planım', 'REZERVASYONLAR'),
    html: list.length ? `<div class="list">${list.map(kidRow).join('')}</div>` : `<div class="empty"><strong>Henüz yer ayırmadın</strong><p>Atölyeler hızlı doluyor.</p><button class="btn sm dark" data-go="#/program">Etkinliklere bak</button></div>`
  };
}
SCREENS.bileklik = () => {
  const c = S.child;
  return {
    top: topBack('Güvenli bileklik', 'ÇOCUK ŞENLİĞİ'),
    html: c ? `
    <div class="wristband">
      <span class="tag dark">${ic('shield', 'xs')} AKTİF</span>
      <div class="band-vis"><span class="strap"></span><span class="face">${qrSVG('EYLUL-BILEKLIK-' + c.code, 3)}</span><span class="strap r"></span></div>
      <h3>${esc(c.name)}’nın bilekliği hazır</h3>
      <p>Bileklik girişte teslim edilir. Görevli QR’ı okuttuğunda size bildirim gelir, numaranız görünmez.</p>
    </div>
    <div class="section"><div class="list">
      <div class="child-card"><span class="av">${esc(c.name[0])}</span><div style="flex:1"><strong>${esc(c.name)}</strong><br><small class="muted">${c.age} yaş · Kod ${c.code}</small></div><span class="tag ok">Güvende</span></div>
      <button class="row" data-go="#/harita"><span class="ico-tile">${ic('pin', 'sm')}</span><span class="txt"><strong>Buluşma noktası</strong><small>Danışma · ana girişin sağı</small></span>${ic('chev', 'sm')}</button>
    </div></div>
    <div class="cta-bar" style="margin-top:14px"><button class="btn dark" data-scan-child>${ic('qr', 'sm')} Demo: görevli QR’ı okuttu</button></div>
    ` : `
    <div class="wristband"><span class="tag dark">${ic('shield', 'xs')} 30 SANİYEDE</span><h3>Bilekliği şimdi<br>oluşturun.</h3><p>Girişte QR’lı bileklik takılır. Kaybolma durumunda görevli okuttuğu an size haber gider.</p>
      <div class="band-vis"><span class="strap"></span><span class="face">${ic('qr')}</span><span class="strap r"></span></div></div>
    <div class="section"><div class="list">
      <label class="pref"><div class="txt"><strong>Çocuğun adı</strong><small>Sadece görevli görür</small></div><input id="child-name" value="Ela" style="border:0;background:var(--paper-2);border-radius:10px;height:38px;padding:0 12px;font:inherit;font-weight:700;width:110px"></label>
      <label class="pref"><div class="txt"><strong>Yaşı</strong></div><input id="child-age" value="6" inputmode="numeric" style="border:0;background:var(--paper-2);border-radius:10px;height:38px;padding:0 12px;font:inherit;font-weight:700;width:60px"></label>
    </div></div>
    <div class="cta-bar" style="margin-top:14px"><button class="btn primary" data-make-child>${ic('shield', 'sm')} Bilekliği oluştur</button></div>`
  };
};
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
        <g class="fac"><circle cx="200" cy="268" r="14" style="fill:#0b8e78;stroke:#fff;stroke-width:2"/><text x="200" y="268" style="fill:#fff">★</text></g>
        <text class="zlabel kids" x="200" y="292" style="font-size:9px">BULUŞMA · DANIŞMA</text>
        <g class="fac"><circle cx="40" cy="268" r="11"/><text x="40" y="268">WC</text></g>
        <g class="fac"><circle cx="360" cy="268" r="11"/><text x="360" y="268">🍼</text></g>
      </svg></div>
      <div class="list" style="margin-top:14px">${KID_ZONES.map(z => `<div class="row"><span class="ico-tile">${ic(z.icon, 'sm')}</span><span class="txt"><strong>${z.name}</strong><small>${fairEvents().filter(e => e.place === z.name).length} etkinlik</small></span></div>`).join('')}</div>`
  };
}

/* ---------- Sheet, toast, push ---------- */
function openSheet(html) { $('#sheet').innerHTML = '<div class="grab"></div>' + html; $('#sheet').classList.add('show'); $('#backdrop').classList.add('show'); }
function closeSheet() { $('#sheet').classList.remove('show'); $('#backdrop').classList.remove('show'); }
const SHEETS = {
  fair: () => `<h2>Fuarını seç</h2><p>Her fuarın programı, krokisi ve duyuruları kendi içinde açılır.</p>
    ${[['ankara', 'ankara-fuar-arsiv.jpg'], ['cocuk', 'children-workshop.jpg']].map(([id, img]) => `<button class="fair-opt ${S.fair === id ? 'on' : ''}" data-fair="${id}"><span class="th" style="background-image:url('${A}${img}')"></span><span style="flex:1"><strong>${FAIRS[id].name}</strong><small>${FAIRS[id].dates} · ${FAIRS[id].venue}</small></span>${S.fair === id ? ic('check') : ic('chev', 'sm')}</button>`).join('')}`,
  help: () => `<h2>Nasıl yardımcı olalım?</h2><p>Fuar alanında en çok sorulanlar.</p><div class="list" style="padding:0">
    <button class="row" data-go="#/harita?yer=danisma">${ic('info')}<span class="txt"><strong>Danışma & kayıp eşya</strong><small>Ana girişin sağı</small></span></button>
    <button class="row" data-go="#/harita?yer=cocukpt">${ic('shield')}<span class="txt"><strong>Kayıp çocuk noktası</strong><small>Görevliler 7/24 telsizle bağlı</small></span></button>
    <button class="row" data-go="#/harita?yer=ilkyardim">${ic('plus')}<span class="txt"><strong>İlk yardım</strong><small>Sol koridor, asansör yanı</small></span></button>
    <button class="row" data-toast="Eylül ekibine bağlanılıyor… (demo)">${ic('phone')}<span class="txt"><strong>Eylül’e yaz</strong><small>Ortalama yanıt 3 dk</small></span></button></div>`
};
let toastT;
function toast(msg, icon = 'check') { const t = $('#toast'); t.innerHTML = ic(icon, 'sm') + esc(msg); t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400); }
let pushT, pushCursor = 0, noticeSeq = 0;
function push(n) {
  const id = 'live' + (++noticeSeq) + Date.now();
  S.extraNotices.unshift({ ...n, id, time: 'şimdi' }); save();
  const icn = { change: 'alert', queue: 'ticket', eylul: 'info', deal: 'tag' };
  const el = $('#push');
  el.innerHTML = `<span class="app-ico"><img src="${A}eylul-fuarcilik-logo.png" alt=""></span><span class="txt"><span class="h"><span>EYLÜL FUAR REHBERİ</span><span>şimdi</span></span><strong>${esc(n.title)}</strong><p>${esc(n.body)}</p></span>`;
  el.dataset.link = n.link || '#/bildirimler';
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(pushT); pushT = setTimeout(() => el.classList.remove('show'), 6500);
  if (!['ara', 'bileklik'].includes(route.name)) render('none');
  if (navigator.vibrate) navigator.vibrate(60);
}

/* ---------- Etkileşimler ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-go],[data-back],[data-save],[data-queue],[data-wish],[data-got],[data-follow],[data-remind],[data-sheet],[data-fair],[data-pref],[data-search],[data-age],[data-book],[data-toast],[data-zoom],[data-interest],[data-leave-queue],[data-make-child],[data-scan-child],[data-share],[data-stand],#push,#backdrop');
  if (!el) return;
  const d = el.dataset;
  if (el.id === 'push') { el.classList.remove('show'); return go(d.link); }
  if (el.id === 'backdrop') return closeSheet();
  if (d.save) { e.stopPropagation(); const on = toggle('saved', d.save); toast(on ? 'Planına eklendi · 15 dk önce hatırlatırız' : 'Plandan çıkarıldı', on ? 'bookmark' : 'x'); return render('none'); }
  if (d.queue) { e.stopPropagation(); return takeQueue(d.queue); }
  if (d.wish) { e.stopPropagation(); const on = toggle('wish', d.wish); toast(on ? 'Alınacaklar listene eklendi' : 'Listeden çıkarıldı', on ? 'book' : 'x'); return render('none'); }
  if (d.got) { toggle('got', d.got); return render('none'); }
  if (d.follow) { const on = toggle('follows', d.follow); toast(on ? 'Takiptesin · fuara gelince haber vereceğiz' : 'Takipten çıkıldı', 'bell'); return render('none'); }
  if (d.remind) return toast('15 dk önce hatırlatılacak', 'bell');
  if (d.sheet) return openSheet(SHEETS[d.sheet]());
  if (d.fair) { S.fair = d.fair; save(); closeSheet(); toast(FAIRS[d.fair].name + ' açıldı', 'sparkle'); return go('#/'); }
  if (d.pref) { S.prefs[d.pref] = !S.prefs[d.pref]; save(); return el.classList.toggle('on'); }
  if (d.search != null) { const i = $('#q'); i.value = d.search; return runSearch(d.search); }
  if (d.age) { S.age = d.age; save(); return render('none'); }
  if (d.book) { e.stopPropagation(); const x = ev(d.book); if (!has('booked', d.book)) { S.booked.push(d.book); x.left = Math.max(0, x.left - 1); save(); } toast('Yeriniz ayrıldı · 15 dk önce hatırlatacağız', 'ticket'); return render('none'); }
  if (d.toast) { closeSheet(); return toast(d.toast, 'check'); }
  if (d.zoom) {
    const sc = $('#mapscroll'), c = $('#mapcanvas'); if (!sc || !c) return;
    const cx = (sc.scrollLeft + sc.clientWidth / 2) / mapW, cy = (sc.scrollTop + sc.clientHeight / 2) / (mapW * .64);
    mapW = Math.min(1600, Math.max(sc.clientWidth, mapW * (Number(d.zoom) > 0 ? 1.35 : 1 / 1.35)));
    c.style.width = mapW + 'px';
    sc.scrollTo({ left: cx * mapW - sc.clientWidth / 2, top: cy * mapW * .64 - sc.clientHeight / 2 });
    return;
  }
  if (d.interest) { toggle('interests', d.interest); return el.classList.toggle('on'); }
  if (d.leaveQueue) { delete S.queues[d.leaveQueue]; save(); toast('Sıradan çıktın', 'x'); return go('#/etkinlik/' + d.leaveQueue); }
  if (d.makeChild != null) { S.child = { name: ($('#child-name').value || 'Ela').trim(), age: ($('#child-age').value || '6').trim(), code: 'EL-' + (4200 + Math.floor(Math.random() * 99)) }; save(); toast('Bileklik hazır · girişte teslim alın', 'shield'); return render('none'); }
  if (d.scanChild != null) return push({ type: 'eylul', title: `${S.child.name} güvende 💚`, body: `Görevli Ayşe, ${S.child.name}’yı Danışma noktasında bekliyor. Haritada yolunu gösterelim mi?`, link: '#/harita' });
  if (d.share != null) return toast('Paylaşım bağlantısı kopyalandı', 'share');
  if (d.stand && e.target.closest('.floor') && route.name === 'harita' && !kids()) { const id = d.stand; return go('#/harita?stand=' + id); }
  if (d.back != null) { closeSheet(); return back(); }
  if (d.go) { closeSheet(); return go(d.go); }
});
document.addEventListener('input', e => {
  if (e.target.id === 'q') runSearch(e.target.value);
});
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
  if (m.type === 'child-scan') {
    if (S.fair !== 'cocuk') S.fair = 'cocuk';
    if (!S.child) S.child = { name: 'Ela', age: '6', code: 'EL-4217' };
    save(); go('#/bileklik');
    setTimeout(() => onDemoMessage({ type: 'push', notice: { type: 'eylul', title: `${S.child.name} güvende 💚`, body: `Görevli Ayşe, ${S.child.name}’yı Danışma noktasında bekliyor. Haritada yolunu gösterelim mi?`, link: '#/harita' } }), 900);
  }
  if (m.type === 'queue-advance') Object.keys(S.queues).forEach(id => {
    const q = S.queues[id]; if (!q || q.ready) return;
    // Sunum adımı: önce 5 kişiye (yaklaşıyor bildirimi), sonra sıfıra (sıra sende).
    const by = m.by === 'step' ? (q.ahead > 17 ? 12 : q.ahead > 5 ? q.ahead - 5 : q.ahead) : (m.by || 8);
    advanceQueue(id, by);
    if (route.name !== 'sira') go('#/sira/' + id);
  });
  if (m.type === 'queue-take') { if (!S.queues[m.id]) takeQueue(m.id); else go('#/sira/' + m.id); }
  if (m.type === 'reset') { resetState(); clearInterval(queueTimer); history_ = []; go(m.hash || '#/'); }
  if (m.type === 'sheet') openSheet(SHEETS[m.name]());
}
window.addEventListener('message', e => { if (e.source === parent || e.source === window) onDemoMessage(e.data); });
try { new BroadcastChannel('eylul-demo').onmessage = e => onDemoMessage(e.data); } catch {}
window.EylulApp = { go, push, onDemoMessage };
if (EMBED) document.addEventListener('keydown', e => {
  if (e.target.matches('input, textarea')) return;
  if (['ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp', 'n', 'N', 'f', 'F'].includes(e.key)) parent.postMessage({ type: 'eylul-key', key: e.key }, '*');
});

/* ---------- Başlat ---------- */
if (EMBED) $('#app').classList.add('embed');
if (params.has('still')) document.documentElement.classList.add('still');
setInterval(() => { const c = $('#clock'); if (c) c.textContent = fmtNow().replace('.', ':'); }, 10000);
$('#clock').textContent = fmtNow().replace('.', ':');
if (params.get('demo') === 'sira') S.queues.e7 = { no: 47, ahead: 12, start: 38, notified: false, ready: false };
if (params.get('demo') === 'cocuk') S.fair = 'cocuk';
if (Object.values(S.queues).some(q => !q.ready) && !params.has('still')) startQueueSim();
route = parse(location.hash);
currentHash = location.hash || '#/';
render('fade');
