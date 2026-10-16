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
  phone: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/>',
  gift: '<rect x="3.5" y="8.5" width="17" height="12" rx="2"/><path d="M3.5 12.5h17M12 8.5v12M12 8.5S10.8 4 8 4.6c-2.2.5-1.6 3.9 4 3.9zM12 8.5s1.2-4.5 4-3.9c2.2.5 1.6 3.9-4 3.9z"/>',
  trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9.5 18h5"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>'
};
const ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;

/* ---------- Durum ---------- */
const DEFAULT = {
  fair: 'ankara',
  saved: ['e2', 'e20', 'e22', 'e7', 'e8', 'e11', 'e23', 'e25', 'e28', 'e31', 'k3', 'k5', 'k8', 'k12'],
  stamps: { ankara: ['alfa', 'everest'], cocuk: ['masal'] },
  quizBest: null,
  quizPts: 0,
  soloDone: {},
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
const org = id => KID_ORGS.find(o => o.id === id);
const zone = id => KID_ZONES.find(z => z.id === id);
const evPlace = e => e.publisher ? `${pub(e.publisher).name} · ${pub(e.publisher).stand}` : e.zone ? `${zone(e.zone).name} · ${org(e.org).name}` : e.place;
const evStand = e => e.publisher ? pub(e.publisher).stand : e.zone ? e.zone : e.place === 'Söyleşi Salonu' ? 'SOYLESI' : e.place === 'Çocuk Atölyesi' ? 'COCUK' : null;
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
  { id: 'cocukpt', label: '★', x: 430, y: 612, icon: 'shield', name: 'Kayıp çocuk noktası' },
  { id: 'mescit', label: '☾', x: 905, y: 276, icon: 'moon', name: 'Mescit' },
  { id: 'atm', label: '₺', x: 490, y: 612, icon: 'card', name: 'ATM' },
  { id: 'bebek', label: '♡', x: 550, y: 612, icon: 'kid', name: 'Bebek bakım odası' }
];
// Krokinin altındaki hizmet noktası kartları
const FAC_CARDS = [
  { id: 'wc', icon: 'wc', name: 'WC', where: 'Sol koridor · 2 nokta', c: '#2f6ee5', bg: '#e6efff' },
  { id: 'kafe', icon: 'cup', name: 'Kafe', where: 'Sol koridor, A-3 yanı', c: '#a0522d', bg: '#f8e9dc' },
  { id: 'danisma', icon: 'info', name: 'Danışma', where: 'Girişin sağı', c: '#0b8e78', bg: '#dcf3ec' },
  { id: 'ilkyardim', icon: 'plus', name: 'İlk yardım', where: 'Girişin solu', c: '#e2493b', bg: '#fde4e1' },
  { id: 'mescit', icon: 'moon', name: 'Mescit', where: 'Sağ kanat, A-5 sonu', c: '#5a57d6', bg: '#ecebff' },
  { id: 'asansor', icon: 'layers', name: 'Asansör', where: 'Sol koridor', c: '#4b443a', bg: '#efe8dc' },
  { id: 'cocukpt', icon: 'shield', name: 'Kayıp çocuk', where: 'Danışma yanı', c: '#c26f05', bg: '#fff1db' },
  { id: 'atm', icon: 'card', name: 'ATM', where: 'Giriş holü', c: '#1f9d55', bg: '#dff3e6' },
  { id: 'bebek', icon: 'kid', name: 'Bebek bakım', where: 'Giriş holü, B koridoru', c: '#c2185b', bg: '#fde6ee' }
];
const facCard = (f, on) => `<button class="fac-card${on ? ' on' : ''}" data-fac="${f.id}" style="--fc:${f.c};--fb:${f.bg}"><span class="fc-ico">${ic(f.icon)}</span><strong>${f.name}</strong><small>${f.where}</small></button>`;
const facSheet = f => `<div class="card map-sheet" id="map-card"><span class="fc-ico sm" style="--fc:${f.c};--fb:${f.bg}">${ic(f.icon, 'sm')}</span><div style="flex:1"><strong style="display:block">${esc(f.name)}</strong><small class="muted">${esc(f.where)} · krokide turuncu ile gösterildi</small></div></div>`;
// Hizmet noktası seçimi: ekranı yeniden çizmeden krokiyi günceller, kaydırma yerinde kalır.
function selectFacility(id) {
  const f = FAC_CARDS.find(x => x.id === id); if (!f) return;
  history.replaceState(null, '', '#/harita?yer=' + id);
  route.q = new URLSearchParams('yer=' + id); currentHash = location.hash;
  $('#mapcanvas').innerHTML = floorSVG({ facSel: id });
  const card = $('#map-card');
  if (card) card.outerHTML = facSheet(f);
  document.querySelectorAll('.fac-card').forEach(b => b.classList.toggle('on', b.dataset.fac === id));
  centerMap(id, true);
}
const BADGE = { w: 78, h: 34 };
(function placeExtraPublishers() {
  const boxes = Object.keys(STAND_OWNERS).map(id => badgeBox(STANDS[id]));
  const free = Object.values(STANDS).filter(st => st.id.startsWith('A-') && !STAND_OWNERS[st.id]);
  // Satırları dolaşarak, logoları birbirine değmeyecek şekilde yerleştir.
  const order = free.sort((a, b) => ((a.x * 7 + a.y * 13) % 97) - ((b.x * 7 + b.y * 13) % 97));
  PUBLISHERS.filter(p => !p.stand).forEach(p => {
    const st = order.find(c => !STAND_OWNERS[c.id] && boxes.every(b => !overlap(b, badgeBox(c), 10)));
    if (!st) return;
    p.stand = st.id; STAND_OWNERS[st.id] = p.id; boxes.push(badgeBox(st));
  });
  function overlap(a, b, m) { return a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m; }
})();
function badgeBox(st) { return { x: st.x + st.w / 2 - BADGE.w / 2, y: st.y + st.h / 2 - BADGE.h / 2, w: BADGE.w, h: BADGE.h }; }
const logoHTML = p => p.logo ? `<img src="${A}${p.logo}" alt="${esc(p.name)}">` : `<span class="wordmark" style="color:${p.color}">${esc(p.short)}</span>`;
// Krokiyi bir standın, alanın ya da hizmet noktasının üstüne ortalamak için koordinat.
function targetPoint(id) {
  if (ZONES[id]) return { end: ZONES[id].door };
  const f = FACILITIES.find(f => f.id === id);
  if (f) return { end: { x: f.x, y: f.y } };
  const st = STANDS[id]; if (!st) return null;
  return { end: { x: st.x + st.w / 2, y: st.y + st.h / 2 } };
}
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
    const { x, y, w, h } = badgeBox(st);
    const inner = p.logo
      ? `<image href="${A}${p.logo}" x="${(x + 6).toFixed(1)}" y="${(y + 4).toFixed(1)}" width="${w - 12}" height="${h - 8}" preserveAspectRatio="xMidYMid meet"/>`
      : `<text class="wm" x="${(x + w / 2).toFixed(1)}" y="${(y + h / 2 + .5).toFixed(1)}" fill="${p.color}" style="font-size:${p.short.length > 7 ? 9.5 : 11.5}px">${esc(p.short)}</text>`;
    s += `<g class="logo-pin${sel === id ? ' on' : ''}" data-stand="${id}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w}" height="${h}" rx="9"/>${inner}</g>`;
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
  { id: 'hediyeler', label: 'Hediyeler', icon: 'gift' },
  { id: 'harita', label: 'Kroki', icon: 'map' },
  { id: 'planim', label: 'Planım', icon: 'heart' }
];
const TAB_OF = { quiz: 'hediyeler', etkinlik: 'program', ara: 'home', yazar: 'home', yayinevi: 'home', firma: 'home', bildirimler: 'home', katilimcilar: 'home', konum: 'harita', yarisma: 'hediyeler' };
const isTab = name => TABS.some(t => t.id === name);
function parse(hash) {
  const h = (hash || '').replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  return { name: parts[0] || 'home', args: parts.slice(1).map(decodeURIComponent), q: new URLSearchParams(qs || '') };
}
function go(hash) { if (location.hash === hash) render('none'); else location.hash = hash; }
let navBack = false;
window.addEventListener('hashchange', () => {
  closeBook();
  const next = parse(location.hash);
  const top = history_[history_.length - 1];
  // Geri: uygulamanın geri tuşu ya da tarayıcının geri hareketi (yığının tepesine dönüş).
  const isBack = navBack || (history_.length && (top === location.hash || (top === '#/' && !location.hash)));
  navBack = false;
  if (isBack) history_.pop();
  else if (isTab(next.name)) history_ = [];
  else history_.push(currentHash);
  route = next; currentHash = location.hash || '#/';
  render(isBack ? 'back' : isTab(next.name) ? 'fade' : 'fwd');
});
let currentHash = location.hash || '#/';
function back() {
  if (history_.length) { navBack = true; location.hash = history_[history_.length - 1]; }
  else location.hash = '#/' + (TAB_OF[route.name] === 'home' ? '' : TAB_OF[route.name] || '');
}

/* ---------- Render ---------- */
const SCREENS = {};
function render(dir = 'fade') {
  clearInterval(bannerTimer);
  if (!['yarisma', 'quiz'].includes(route.name)) clearInterval(quizTimer);
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
  app.classList.toggle('no-tabs', !isTab(route.name));
  $('#tabbar').innerHTML = TABS.map(t => `<button type="button" class="${t.id === tab ? 'on' : ''}" data-go="#/${t.id === 'home' ? '' : t.id}">${ic(t.icon)}<span>${t.label}</span>${t.id === 'planim' && savedHere().length ? `<span class="badge">${savedHere().length}</span>` : ''}</button>`).join('');
  out.after && out.after();
  enhanceScrollers();
}
const savedHere = () => EVENTS.filter(e => e.fair === S.fair && has('saved', e.id));
const fairNotices = () => [...S.extraNotices.filter(n => (n.fair || 'ankara') === S.fair), ...NOTICES.filter(n => n.fair === S.fair)];
const unread = () => fairNotices().filter(n => !S.read.includes(n.id)).length;
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
let bannerTimer = null;
SCREENS.home = () => {
  const day = kids() ? 1 : DEMO_NOW.day;
  const today = fairEvents().filter(e => e.day === day).sort((a, b) => tmin(a.start) - tmin(b.start));
  const now = !kids() && (today.find(e => evStatus(e) === 'live' && e.kind === 'imza') || today.find(e => evStatus(e) === 'soon'));
  const slides = kids() ? [
    { img: 'children-workshop.jpg', tag: 'ÇOCUK ŞENLİĞİ', title: 'Atölyeler, masallar, oyunlar', sub: '24–25 Nisan 2027 · aileler için', link: '#/program' },
    { img: 'eylul-galeri-2.jpg', tag: 'KİTAP KÖŞESİ', title: 'Yazarlarla okuma saatleri', sub: 'Can Çocuk, Tudem ve Günışığı', link: '#/konum/kitap' },
    { img: 'children-workshop.jpg', tag: 'BİLİM ALANI', title: 'Robotlar ve deneyler', sub: 'Minik Mucitler · Bilim Kâşifleri', link: '#/konum/bilim', pos: 'center 70%' }
  ] : [
    { img: 'ankara-fuar-arsiv.jpg', tag: '24. ANKARA KİTAP FUARI', title: 'Kitap fuarı başladı', sub: '4–13 Aralık · ATO Congresium', link: '#/program' },
    ...(now ? [{ img: author(now.author).photo, tag: (evStatus(now) === 'live' ? 'ŞİMDİ İMZADA' : 'SIRADAKİ İMZA') + ' · ' + now.start, title: now.title, sub: evPlace(now), link: '#/etkinlik/' + now.id, pos: 'center 25%' }] : []),
    { img: 'eylul-galeri-2.jpg', tag: 'KROKİ', title: `${PUBLISHERS.length} yayınevi, logolarıyla`, sub: 'Aradığın standı krokide bul', link: '#/harita' },
    { img: 'children-workshop.jpg', tag: 'ÇOCUKLAR İÇİN', title: 'Her gün masal ve atölye', sub: 'Çocuk Atölyesi · ücretsiz', link: '#/program?tur=cocuk' }
  ];
  const signers = today.filter(e => e.kind === 'imza');
  const card = e => {
    const st = evStatus(e);
    return `<button class="author-card" data-go="#/etkinlik/${e.id}">
      <div class="ph"><img src="${evImg(e)}" alt="" loading="lazy"><span class="t ${st === 'live' ? 'live' : ''}">${st === 'live' ? '● ŞİMDİ' : st === 'past' ? 'Bitti' : e.start}</span></div>
      <strong>${esc(e.title)}</strong><small>${esc(pub(e.publisher).name)}</small>
    </button>`;
  };
  return { html: `
    <div class="greet">
      <h1>${kids() ? 'Bugün ne <em>keşfedelim?</em>' : 'Bugün fuarda<br><em>neler</em> var?'}</h1>
    </div>
    <button class="search" data-go="#/ara" style="width:calc(100% - 36px)">${ic('search', 'sm')}<span style="flex:1">${kids() ? 'Etkinlik ara…' : 'Yazar ya da yayınevi ara…'}</span></button>

    <div class="banner" id="banner">
      <div class="banner-track" id="banner-track">${slides.map(b => `<button class="banner-slide" data-go="${b.link}">
        <img src="${A}${b.img}" alt="" style="object-position:${b.pos || 'center'}">
        <span class="banner-txt"><span class="tag dark">${esc(b.tag)}</span><strong>${esc(b.title)}</strong><small>${esc(b.sub)}</small></span>
      </button>`).join('')}</div>
      <div class="banner-dots">${slides.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>
    </div>

    <div class="quick">
      <button data-go="#/program"><span class="q-ico brand">${ic('cal')}</span>Program</button>
      <button data-go="#/harita"><span class="q-ico">${ic('map')}</span>Kroki</button>
      <button data-go="#/hediyeler"><span class="q-ico">${ic('gift')}</span>Hediyeler</button>
      ${kids() ? `<button data-go="#/katilimcilar"><span class="q-ico">${ic('users')}</span>Katılımcılar</button>` : `<button data-go="#/bildirimler"><span class="q-ico">${ic('bell')}</span>Duyurular</button>`}
    </div>
    ${passportCard()}

    <div class="section">
      <div class="section-head"><h2>${kids() ? 'Bugünün etkinlikleri' : 'Bugün imzada'}</h2><button class="more" data-go="#/program">Tümü →</button></div>
      ${kids() ? `<div class="list">${today.map(e => eventRow(e)).join('')}</div>`
        : `<div class="marquee"><div class="marquee-track">${signers.map(card).join('')}${signers.map(card).join('')}</div></div>`}
    </div>
    ${kids() ? '' : `<div class="section">
      <div class="section-head"><h2>Popüler yayınevleri</h2><button class="more" data-go="#/ara?tur=yayinevi">Tümü →</button></div>
      <div class="hscroll">${['alfa', 'everest', 'can', 'iletisim', 'dogan', 'yky', 'bilgi', 'kirmizi', 'iskultur', 'timas'].map(pub).filter(Boolean).map(p => `<button class="pop-pub" data-go="#/yayinevi/${p.id}"><span class="pl">${logoHTML(p)}</span><strong>${esc(p.name)}</strong><small>Stant ${p.stand || '—'}</small></button>`).join('')}</div>
    </div>`}
  `, after: startBanner };
};
function startBanner() {
  const track = $('#banner-track'); if (!track) return;
  const n = track.children.length; let i = 0;
  bannerTimer = setInterval(() => {
    if (!document.body.contains(track)) return clearInterval(bannerTimer);
    i = (i + 1) % n;
    track.style.transform = `translateX(-${i * 100}%)`;
    document.querySelectorAll('.banner-dots i').forEach((d, k) => d.classList.toggle('on', k === i));
  }, 3500);
}
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
  const q = route.q.get('q') || '';
  const kinds = kids() ? [['tum', 'Tümü'], ['cocuk', 'Sahne'], ['atolye', 'Atölye']] : [['tum', 'Tümü'], ['imza', 'İmza'], ['soylesi', 'Söyleşi'], ['cocuk', 'Çocuk']];
  return {
    top: topTitle('Program', F.name),
    html: `
    <label class="search" style="margin-bottom:14px">${ic('search', 'sm')}<input id="pq" type="search" placeholder="${kids() ? 'Etkinlik ara…' : 'Programda yazar ya da etkinlik ara…'}" autocomplete="off" value="${esc(q)}"></label>
    <div id="prog-filters" ${q ? 'hidden' : ''}>
      <div class="days">${F.days.map(d => `<button class="day ${d.n === day ? 'on' : ''} ${!kids() && d.n === DEMO_NOW.day ? 'today' : ''}" data-go="#/program?gun=${d.n}&tur=${kind}"><small>${d.label.slice(0, 3)}</small><b>${d.date.split(' ')[0]}</b></button>`).join('')}</div>
      <div class="chips" style="margin-top:16px">${kinds.map(([k, l]) => `<button class="chip ${k === kind ? 'on' : ''}" data-go="#/program?gun=${day}&tur=${k}">${k !== 'tum' ? `<span class="sw" style="background:${KCOL[k]}"></span>` : ''}${l}</button>`).join('')}</div>
    </div>
    <div id="prog-list">${programBody(day, kind, q)}</div>`
  };
};
function programBody(day, kind, q) {
  q = (q || '').trim();
  if (q) {
    const n = norm(q), m = s => norm(s || '').includes(n);
    const hits = fairEvents().filter(e => m(e.title) || m(e.speakers) || m(e.publisher && pub(e.publisher).name) || m(e.org && org(e.org).name))
      .sort((a, b) => a.day - b.day || tmin(a.start) - tmin(b.start));
    return hits.length ? `<p class="muted" style="margin:0 22px 10px;font-size:12.5px;font-weight:700">${hits.length} etkinlik</p><div class="list">${hits.map(eventRow).join('')}</div>`
      : `<div class="empty"><strong>“${esc(q)}” programda yok</strong><p>Başka bir isim deneyebilirsin.</p></div>`;
  }
  const list = fairEvents().filter(e => e.day === day && (kind === 'tum' || e.kind === kind)).sort((a, b) => tmin(a.start) - tmin(b.start));
  const isToday = !kids() && day === DEMO_NOW.day;
  let nowShown = false;
  const items = list.map(e => {
    const st = isToday ? evStatus(e) : (!kids() && day < DEMO_NOW.day) ? 'past' : 'future';
    let line = '';
    if (isToday && !nowShown && tmin(e.start) > nowMin()) { nowShown = true; line = `<div class="now-line"><span>${fmtNow()}</span><i></i></div>`; }
    return line + programItem(e, st);
  }).join('');
  return `<div class="timeline" style="margin-top:14px">${items || `<div class="empty"><strong>Bu günde etkinlik yok</strong><p>Başka bir gün seçebilirsin.</p></div>`}
    ${isToday && !nowShown && list.length ? `<div class="now-line"><span>${fmtNow()}</span><i></i></div>` : ''}</div>`;
}
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
      <button class="save-btn ${has('saved', e.id) ? 'on' : ''}" data-save="${e.id}" aria-label="Planıma ekle">${ic('bookmark', 'sm')}</button>
    </div>
  </div>`;
}

/* ---------- Etkinlik detayı ---------- */
SCREENS.etkinlik = id => {
  const e = ev(id); if (!e) return SCREENS.program();
  const st = evStatus(e);
  const d = FAIRS[e.fair].days.find(d => d.n === e.day);
  const stand = evStand(e);
  const a = e.author && author(e.author), p = e.publisher && pub(e.publisher), o = e.org && org(e.org);
  const books = a ? BOOKS.filter(b => b.author === a.id) : [];
  const heroImg = a ? A + a.photo : o ? A + (e.zone === 'kitap' ? 'eylul-galeri-2.jpg' : 'children-workshop.jpg') : null;
  return {
    top: topBack(KIND[e.kind], FAIRS[e.fair].short),
    html: `
    <div class="hero ${heroImg ? '' : 'flat k-' + e.kind}" style="${heroImg ? '' : 'min-height:210px'}">
      ${heroImg ? `<img class="bg" src="${heroImg}" alt="">` : ''}
      <div class="inner">
        <span class="tag ${st === 'live' ? 'hot' : 'dark'}">${st === 'live' ? '● ŞİMDİ' : KIND[e.kind].toLocaleUpperCase('tr-TR')} · ${d.label} ${d.date}</span>
        <h1>${esc(e.title)}</h1>
        <p>${a ? esc(a.bio) : esc(e.speakers || '')}</p>
      </div>
    </div>
    <div class="facts">
      <div class="fact">${ic('clock', 'sm')}<div><small>Saat</small><b>${e.start} – ${e.end}</b></div></div>
      <div class="fact">${ic('pin', 'sm')}<div><small>${p ? 'Stant' : 'Yer'}</small><b>${esc(p ? p.stand + ' · ' + p.name.split(' ')[0] : e.zone ? zone(e.zone).name : e.place)}</b></div></div>
      <div class="fact">${ic('layers', 'sm')}<div><small>Süre</small><b>${tmin(e.end) - tmin(e.start)} dakika</b></div></div>
      <div class="fact">${ic('ticket', 'sm')}<div><small>Giriş</small><b>${e.kind === 'imza' ? 'Kitapla imza' : 'Ücretsiz'}</b></div></div>
    </div>
    <div class="cta-bar">
      <button class="btn ${has('saved', e.id) ? 'done' : 'dark'}" data-save="${e.id}">${has('saved', e.id) ? ic('check', 'sm') + ' Planımda' : ic('plus', 'sm') + ' Planıma ekle'}</button>
      ${p ? `<button class="btn ghost" data-go="#/konum/${stand}">${ic('map', 'sm')} Krokide göster</button>` : e.zone ? `<button class="btn ghost" data-go="#/konum/${e.zone}">${ic('map', 'sm')} Haritada göster</button>` : ''}
    </div>
    ${e.kind !== 'imza' ? ((S.attended || []).includes(e.id)
      ? `<div class="attend ok"><span class="at-ico">${ic('check')}</span><div><strong>Katılımın onaylandı</strong><small>+20 puan pasaportuna eklendi</small></div></div>`
      : `<div class="attend"><span class="at-ico">${ic('qr')}</span><div><strong>Katıldığını onayla</strong><small>${e.place || (e.zone ? zone(e.zone).name : 'Salon')} girişindeki QR’ı okut · +20 puan</small></div><button class="btn sm primary" data-attend="${e.id}">QR okut</button></div>`) : ''}
    <div class="section"><div class="section-head"><h2>Etkinlik hakkında</h2></div><p class="prose" style="margin:0">${esc(eventAbout(e))}</p></div>
    ${speakerAuthors(e).length ? `<div class="section"><div class="section-head"><h2>Konuşmacılar</h2></div><div class="list">${speakerAuthors(e).map(x => `<button class="row" data-go="#/yazar/${x.id}"><img class="avatar" src="${A}${x.photo}" alt=""><span class="txt"><strong>${esc(x.name)}</strong><small>${esc(pub(x.publisher).name)}</small></span>${ic('chev', 'sm')}</button>`).join('')}</div></div>` : ''}
    ${o ? `<div class="section"><div class="section-head"><h2>Düzenleyen</h2></div><div class="list">${orgRow(o)}</div></div>` : ''}
    ${books.length ? `<div class="section">
      <div class="section-head"><h2>Yazarın kitapları</h2><button class="more" data-go="#/yazar/${a.id}">Profil →</button></div>
      <div class="hscroll">${books.map(bookTile).join('')}</div>
    </div>` : ''}`
  };
};
const atLoc = name => name + (/[uıoa]$/i.test(name) ? '’nda' : '’nde');
const speakerAuthors = e => e.kind === 'imza' ? [] : AUTHORS.filter(a => (e.speakers || '').includes(a.name));
function eventAbout(e) {
  if (e.kind === 'imza') {
    const a = author(e.author), p = pub(e.publisher);
    return `${a.name}, ${p.name} standında okurlarıyla buluşuyor ve kitaplarını imzalayacak. Kitabını stanttan alabilir ya da yanında getirebilirsin. İmza süresince stant önünde sıra oluşturulur; özellikle hafta sonu biraz erken gelmeni öneririz.`;
  }
  if (e.org) return `${org(e.org).name} tarafından düzenlenen bu etkinlik ${atLoc(zone(e.zone).name)} yapılıyor ve ${e.speakers.toLocaleLowerCase('tr-TR')} çocuklar için uygun. Malzemeler ücretsiz sağlanır. Yer sınırlı olduğu için 10 dakika önce alanda olmanızı öneririz; veliler alanın yanındaki oturma bölümünde bekleyebilir.`;
  if (e.kind === 'soylesi') return `“${e.title}” başlıklı söyleşi ${atLoc(e.place)} yapılacak. Konuşmacılar: ${e.speakers}. Söyleşi ücretsizdir; salon kapasitesi sınırlı olduğu için 10 dakika önce gelmeni öneririz. Söyleşinin sonunda kısa bir soru-cevap bölümü var.`;
  return `${e.title}, ${atLoc(e.place)} ${e.speakers ? e.speakers.split('·')[0].trim() + ' çocuklar için' : 'çocuklar için'} düzenleniyor. Çocuklar etkinlik boyunca görevlilerle birlikte olur; veliler alanın yanında bekleyebilir. Malzemeler Eylül Fuarcılık tarafından sağlanır.`;
}
function bookTile(b) {
  return `<button class="book-tile" data-book="${b.id}"><div class="cv"><img src="${A}${b.cover}" alt="${esc(b.title)}" loading="lazy"></div><strong>${esc(b.title)}</strong></button>`;
}
function openBook(id) {
  const b = book(id); if (!b) return;
  const a = author(b.author), p = pub(a.publisher);
  const others = BOOKS.filter(x => x.author === a.id && x.id !== id);
  const el = $('#bookview');
  el.innerHTML = `
    <div class="bv-head" style="--cover:url('${A}${b.cover}')">
      <button class="bv-close" data-close-book aria-label="Kapat">${ic('x', 'sm')}</button>
      <img class="bv-cover" src="${A}${b.cover}" alt="${esc(b.title)}">
    </div>
    <div class="bv-body">
      <h1>${esc(b.title)}</h1>
      <p class="bv-by">${esc(a.name)} · ${esc(p.name)}</p>
      <p class="bv-about">${esc(b.about)}</p>
      <div class="bv-meta">
        <div><small>Yazar</small><b>${esc(a.name)}</b></div>
        <div><small>Yayınevi</small><b>${esc(p.name)}</b></div>
        <div><small>Stant</small><b>${p.stand}</b></div>
      </div>
      <button class="btn dark block" data-close-book data-go="#/konum/${p.stand}">${ic('map', 'sm')} Yayınevini krokide gör</button>
      ${others.length ? `<h3>Yazarın diğer kitapları</h3><div class="hscroll" style="padding-left:0">${others.map(bookTile).join('')}</div>` : ''}
    </div>`;
  el.scrollTop = 0;
  el.classList.add('show');
  $('#app').classList.add('book-open');
}
function closeBook() { $('#bookview').classList.remove('show'); $('#app').classList.remove('book-open'); }

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
  const info = PUB_INFO[id] || {};
  const evs = EVENTS.filter(e => e.publisher === id).sort((a, b) => a.day - b.day || tmin(a.start) - tmin(b.start));
  const auths = AUTHORS.filter(a => a.publisher === id);
  const books = BOOKS.filter(b => auths.some(a => a.id === b.author));
  const genres = info.genres || [];
  return {
    top: topBack('Yayınevi'),
    html: `
    <div class="profile-head">
      <div class="big-logo">${logoHTML(p)}</div>
      <h1>${esc(p.name)}</h1><p>Stant ${p.stand}${genres.length ? ' · ' + genres.join(', ') : ''}</p>
    </div>
    ${evs.length ? `<div class="stat-row" style="margin-top:16px">
      <div><b>${p.stand}</b><small>Stant</small></div>
      <div><b>${evs.length}</b><small>İmza / etkinlik</small></div>
      <div><b>${books.length}</b><small>Kitap</small></div>
    </div>` : ''}
    <div class="cta-bar" style="margin-top:16px">
      <button class="btn dark" data-go="#/konum/${p.stand}">${ic('map', 'sm')} Krokide gör</button>
      ${info.web ? `<a class="btn ghost" href="${info.web}" target="_blank" rel="noopener">${ic('share', 'sm')} Web sitesi</a>` : ''}
    </div>
    <div class="section"><div class="section-head"><h2>Hakkında</h2></div>
      <p class="prose" style="margin:0">${esc(p.about || `${p.name}, ${genres.length ? genres.join(', ').toLocaleLowerCase('tr-TR') + ' alanlarındaki' : ''} kitaplarıyla fuarda okurlarını bekliyor.`)}</p>
      <p class="prose" style="margin:10px 0 0">${esc(info.fair || `Fuar boyunca ${p.stand} numaralı standda yeni çıkan kitaplar ve fuara özel seçkiler sergileniyor. Güncel katalog ve kampanyalar için yayınevinin web sitesine bakabilirsin.`)}</p>
      ${genres.length ? `<div class="tags" style="display:flex;gap:6px;flex-wrap:wrap;margin:12px 18px 0">${genres.map(g => `<span class="tag imza">${esc(g)}</span>`).join('')}</div>` : ''}
    </div>
    ${evs.length ? `<div class="section"><div class="section-head"><h2>Standdaki imzalar</h2></div><div class="list">${evs.map(eventRow).join('')}</div></div>` : ''}
    ${auths.length ? `<div class="section"><div class="section-head"><h2>Fuardaki yazarları</h2></div><div class="list">${auths.map(a => authorRow(a)).join('')}</div></div>` : ''}
    ${books.length ? `<div class="section"><div class="section-head"><h2>Öne çıkan kitaplar</h2></div><div class="hscroll">${books.map(bookTile).join('')}</div></div>` : ''}
    <div class="section"><button class="mini-map" data-go="#/konum/${p.stand}" style="display:block;width:calc(100% - 36px)">${floorSVG({ sel: p.stand, fac: false })}<div class="cap"><div style="text-align:left"><b>Stant ${p.stand}</b><small>Krokide büyüt</small></div>${ic('chev', 'sm')}</div></button></div>`
  };
};

/* ---------- Yazarlar ve yayınevleri ---------- */
const orgRow = o => `<button class="row" data-go="#/firma/${o.id}"><span class="logo-tile">${logoHTML(o)}</span><span class="txt"><strong>${esc(o.name)}</strong><small>${o.kind} · ${zone(o.zone).name}</small></span>${ic('chev', 'sm')}</button>`;
const orgTile = o => `<button class="pub-tile" data-go="#/firma/${o.id}"><span class="pl">${logoHTML(o)}</span><strong>${esc(o.name)}</strong><small>${o.kind} · ${zone(o.zone).name}</small></button>`;
SCREENS.katilimcilar = () => {
  if (kids()) return {
    top: topBack('Katılımcılar', fair().short),
    html: `<p class="prose" style="margin:0 0 4px">Şenlikte atölye, gösteri ve buluşma düzenleyen ${KID_ORGS.length} katılımcı.</p><div class="pub-grid">${KID_ORGS.map(orgTile).join('')}</div>`
  };
  const tab = route.q.get('tab') === 'yayinevi' ? 'yayinevi' : 'yazar';
  return {
    top: topBack(tab === 'yazar' ? 'Yazarlar' : 'Yayınevleri', fair().short),
    html: `
    <div class="seg">
      <button class="${tab === 'yazar' ? 'on' : ''}" data-go="#/katilimcilar?tab=yazar">Yazarlar <span class="c">${AUTHORS.length}</span></button>
      <button class="${tab === 'yayinevi' ? 'on' : ''}" data-go="#/katilimcilar?tab=yayinevi">Yayınevleri <span class="c">${PUBLISHERS.length}</span></button>
    </div>
    ${tab === 'yazar' ? `<div class="people-grid">${AUTHORS.map(a => {
      const next = EVENTS.filter(e => e.author === a.id && e.day >= DEMO_NOW.day).sort((x, y) => x.day - y.day || tmin(x.start) - tmin(y.start))[0];
      const d = next && FAIRS.ankara.days.find(x => x.n === next.day);
      return `<button class="person" data-go="#/yazar/${a.id}"><img src="${A}${a.photo}" alt="" loading="lazy"><strong>${esc(a.name)}</strong><small>${next ? `İmza · ${d.label} ${next.start}` : esc(pub(a.publisher).name)}</small></button>`;
    }).join('')}</div>`
    : `<div class="pub-grid">${[...PUBLISHERS].sort((a, b) => a.name.localeCompare(b.name, 'tr')).map(p => `<button class="pub-tile" data-go="#/yayinevi/${p.id}"><span class="pl">${logoHTML(p)}</span><strong>${esc(p.name)}</strong><small>Stant ${p.stand || '—'}</small></button>`).join('')}</div>`}`
  };
};

SCREENS.firma = id => {
  const o = org(id); if (!o) return SCREENS.katilimcilar();
  const z = zone(o.zone);
  const evs = EVENTS.filter(e => e.org === id).sort((a, b) => a.day - b.day || tmin(a.start) - tmin(b.start));
  return {
    top: topBack(o.kind, fair().short),
    html: `
    <div class="profile-head">
      <div class="big-logo">${logoHTML(o)}</div>
      <h1>${esc(o.name)}</h1><p>${o.kind} · ${z.name}</p>
    </div>
    <p class="prose" style="margin-top:12px;text-align:center">${esc(o.about)}</p>
    <div class="cta-bar"><button class="btn dark" data-go="#/konum/${z.id}">${ic('map', 'sm')} Haritada gör</button></div>
    ${evs.length ? `<div class="section"><div class="section-head"><h2>Etkinlikleri</h2></div><div class="list">${evs.map(eventRow).join('')}</div></div>` : ''}`
  };
};

/* ---------- Kroki ---------- */
SCREENS.konum = id => {
  if (zone(id)) return kidsZone(id);
  const p = STAND_OWNERS[id] && pub(STAND_OWNERS[id]);
  return {
    top: topBack(p ? p.name : 'Kroki', 'KROKİDE'),
    html: `
    <div class="map-wrap" id="mapwrap">
      <div class="map-tools"><button data-zoom="1" aria-label="Yakınlaş">+</button><button data-zoom="-1" aria-label="Uzaklaş">−</button></div>
      <div class="map-scroll" id="mapscroll"><div class="map-canvas" id="mapcanvas" style="width:${mapW}px">${floorSVG({ sel: id })}</div></div>
    </div>
    ${p ? `<div class="card map-sheet"><span class="logo-tile" style="width:64px;height:48px">${logoHTML(p)}</span>
      <div style="flex:1;min-width:0"><strong style="display:block">${esc(p.name)}</strong><small class="muted">Stant ${id}</small></div>
      <button class="btn sm dark" data-go="#/yayinevi/${p.id}">Profil</button></div>` : ''}`,
    after: () => requestAnimationFrame(() => centerMap(id))
  };
};
SCREENS.harita = () => {
  if (kids()) return kidsMap();
  const stand = route.q.get('stand'), yer = route.q.get('yer');
  const p = stand && STAND_OWNERS[stand] && pub(STAND_OWNERS[stand]);
  const f = yer && FACILITIES.find(x => x.id === yer);
  const card = p ? `<div class="card map-sheet" id="map-card"><span class="logo-tile" style="width:64px;height:48px">${logoHTML(p)}</span>
      <div style="flex:1;min-width:0"><strong style="display:block">${esc(p.name)}</strong><small class="muted">Stant ${stand}</small></div>
      <button class="btn sm dark" data-go="#/yayinevi/${p.id}">Profil</button></div>`
    : f ? facSheet(FAC_CARDS.find(x => x.id === yer) || { ...f, where: '', c: 'var(--brand-deep)', bg: 'var(--brand-soft)' }) : '';
  return {
    top: topTitle('Fuar krokisi', 'ATO CONGRESIUM'),
    html: `
    <button class="search" data-go="#/ara?tur=yayinevi" style="width:calc(100% - 36px);margin-bottom:12px">${ic('search', 'sm')}<span style="flex:1">${p ? esc(p.name) : 'Yayınevi ara…'}</span></button>
    <div class="map-wrap" id="mapwrap">
      <div class="map-tools"><button data-zoom="1" aria-label="Yakınlaş">+</button><button data-zoom="-1" aria-label="Uzaklaş">−</button></div>
      <div class="map-scroll" id="mapscroll"><div class="map-canvas" id="mapcanvas" style="width:${mapW}px">${floorSVG({ sel: stand, facSel: yer })}</div></div>
    </div>
    ${card || `<p class="muted" id="map-card" style="font-size:13px;margin:12px 22px 0">Bir yayınevi logosuna dokun ya da yukarıdan ara.</p>`}
    <div class="section" style="margin-top:16px"><div class="section-head"><h2 style="font-size:18px">Hizmet noktaları</h2><span class="sponsor-note">${FAC_CARDS.length} nokta</span></div><div class="fac-scroll">${FAC_CARDS.map(x => facCard(x, yer === x.id)).join('')}</div></div>`,
    after: () => requestAnimationFrame(() => centerMap(stand || yer || 'A-404'))
  };
};
let mapW = 640;
function centerMap(id, smooth = false) {
  const sc = $('#mapscroll'), t = targetPoint(id); if (!sc || !t) return;
  sc.scrollTo({ left: t.end.x / 1000 * mapW - sc.clientWidth / 2, top: t.end.y / 640 * mapW * .64 - sc.clientHeight / 2, behavior: smooth ? 'smooth' : 'instant' });
}
function kidsFloor(sel) {
  let s = `<svg class="floor kids-floor" viewBox="0 0 400 320">
    <rect x="6" y="6" width="388" height="308" rx="18" fill="#eef7f2" stroke="#cfe5da"/>`;
  KID_ZONES.forEach((z, i) => {
    const x = 18 + (i % 3) * 124, y = 18 + Math.floor(i / 3) * 124, on = sel === z.id;
    const orgs = KID_ORGS.filter(o => o.zone === z.id);
    s += `<g class="kzone${on ? ' on' : ''}" data-zone="${z.id}"><rect x="${x}" y="${y}" width="116" height="114" rx="16" fill="${z.bg}" stroke="${on ? z.color : 'rgba(0,0,0,.06)'}" stroke-width="${on ? 4 : 1}"/>
      <text x="${x + 58}" y="${y + 50}" class="kz-name" fill="${z.color}">${z.name.toLocaleUpperCase('tr-TR').split(' ').join('</text><text x="' + (x + 58) + '" y="' + (y + 64) + '" class="kz-name" fill="' + z.color + '">')}</text>
      <text x="${x + 58}" y="${y + 92}" class="kz-count">${orgs.length} katılımcı</text></g>`;
  });
  s += `<g class="fac"><circle cx="200" cy="292" r="13" style="fill:#0b8e78;stroke:#fff;stroke-width:2"/><text x="200" y="292" style="fill:#fff">i</text></g>
    <text class="zlabel kids" x="246" y="295" style="font-size:9px">DANIŞMA</text>
    <g class="fac"><circle cx="40" cy="292" r="11"/><text x="40" y="292">WC</text></g>
    <text class="zlabel" x="350" y="295" style="font-size:9px">GİRİŞ</text>`;
  return s + '</svg>';
}
function kidsMap() {
  return {
    top: topTitle('Şenlik haritası', 'ÇOCUK ŞENLİĞİ'),
    html: `<div class="map-wrap" style="height:auto">${kidsFloor()}</div>
      <p class="muted" style="font-size:13px;margin:12px 22px 0">Bir alana dokun; oradaki katılımcıları ve etkinlikleri gör.</p>
      <div class="list" style="margin-top:12px">${KID_ZONES.map(z => `<button class="row" data-go="#/konum/${z.id}"><span class="ico-tile" style="background:${z.bg};color:${z.color}">${ic(z.icon, 'sm')}</span><span class="txt"><strong>${z.name}</strong><small>${KID_ORGS.filter(o => o.zone === z.id).map(o => o.name).join(' · ')}</small></span>${ic('chev', 'sm')}</button>`).join('')}</div>`
  };
}
function kidsZone(id) {
  const z = zone(id);
  const orgs = KID_ORGS.filter(o => o.zone === id);
  const evs = EVENTS.filter(e => e.zone === id).sort((a, b) => a.day - b.day || tmin(a.start) - tmin(b.start));
  return {
    top: topBack(z.name, 'ŞENLİK HARİTASI'),
    html: `<div class="map-wrap" style="height:auto">${kidsFloor(id)}</div>
      <div class="section"><div class="section-head"><h2>Bu alanda</h2></div><div class="list">${orgs.map(orgRow).join('')}</div></div>
      <div class="section"><div class="section-head"><h2>Etkinlikler</h2></div><div class="list">${evs.map(eventRow).join('')}</div></div>`
  };
}

/* ---------- Ara ---------- */
let searchKind = 'tum';
SCREENS.ara = () => {
  const kinds = kids() ? [['tum', 'Tümü'], ['etkinlik', 'Etkinlikler'], ['firma', 'Katılımcılar']] : [['tum', 'Tümü'], ['yazar', 'Yazarlar'], ['yayinevi', 'Yayınevleri']];
  searchKind = kinds.some(([k]) => k === route.q.get('tur')) ? route.q.get('tur') : 'tum';
  return {
    top: topBack('Ara', kids() ? 'ETKİNLİK · KATILIMCI' : 'YAZAR · YAYINEVİ'),
    html: `
    <label class="search big">${ic('search', 'sm')}<input id="q" type="search" placeholder="${kids() ? 'Etkinlik ya da katılımcı ara…' : 'Yazar ya da yayınevi adı yaz…'}" autocomplete="off" value="${esc(route.q.get('q') || '')}"></label>
    <div class="chips" style="margin-top:12px" id="search-kinds">
      ${kinds.map(([k, l]) => `<button class="chip ${k === searchKind ? 'on' : ''}" data-kind="${k}">${l}</button>`).join('')}
    </div>
    <div id="results"></div>`,
    after: () => { const i = $('#q'); runSearch(i.value); if (!EMBED) i.focus({ preventScroll: true }); }
  };
};
function kidsSearch(box, q) {
  const wantE = searchKind !== 'firma', wantO = searchKind !== 'etkinlik';
  const evs = fairEvents().sort((a, b) => a.day - b.day || tmin(a.start) - tmin(b.start));
  const n = norm(q), m = s => norm(s).includes(n);
  const es = wantE ? (q ? evs.filter(e => m(e.title) || m(org(e.org).name) || m(zone(e.zone).name)) : evs.filter(e => e.day === 1)) : [];
  const os = wantO ? (q ? KID_ORGS.filter(o => m(o.name) || m(o.kind)) : KID_ORGS) : [];
  if (!es.length && !os.length) { box.innerHTML = `<div class="empty" style="margin-top:20px"><strong>“${esc(q)}” bulunamadı</strong><p>Başka bir kelime deneyebilirsin.</p></div>`; return; }
  box.innerHTML = `
    ${q ? `<p class="muted" style="margin:14px 22px 0;font-size:12.5px;font-weight:700">${es.length + os.length} sonuç</p>` : ''}
    ${os.length ? `<div class="res-group"><h3>Katılımcılar · ${os.length}</h3>${q ? `<div class="list">${os.map(orgRow).join('')}</div>` : `<div class="pub-grid" style="padding-top:0">${os.map(orgTile).join('')}</div>`}</div>` : ''}
    ${es.length ? `<div class="res-group"><h3>${q ? 'Etkinlikler' : 'Bugünün etkinlikleri'}</h3><div class="list">${es.map(eventRow).join('')}</div></div>` : ''}`;
}
const authorRow = (a, q = '') => `<button class="row" data-go="#/yazar/${a.id}"><img class="avatar" src="${A}${a.photo}" alt=""><span class="txt"><strong>${hl(a.name, q)}</strong><small>${esc(pub(a.publisher).name)}</small></span>${ic('chev', 'sm')}</button>`;
const pubTile = p => `<button class="pub-tile" data-go="#/yayinevi/${p.id}"><span class="pl">${logoHTML(p)}</span><strong>${esc(p.name)}</strong><small>Stant ${p.stand || '—'}</small></button>`;
function runSearch(q) {
  const box = $('#results'); if (!box) return;
  q = q.trim();
  if (kids()) return kidsSearch(box, q);
  const wantA = searchKind !== 'yayinevi', wantP = searchKind !== 'yazar';
  const sortedPubs = [...PUBLISHERS].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  if (!q) {
    box.innerHTML = `
      ${wantA ? `<div class="res-group"><h3>Yazarlar · ${AUTHORS.length}</h3>${searchKind === 'yazar'
        ? `<div class="list">${AUTHORS.map(a => authorRow(a)).join('')}</div>`
        : `<div class="hscroll">${AUTHORS.map(a => `<button class="author-card" style="width:104px" data-go="#/yazar/${a.id}"><div class="ph" style="width:104px;height:120px"><img src="${A}${a.photo}" alt="" loading="lazy"></div><strong>${esc(a.name)}</strong></button>`).join('')}</div>`}</div>` : ''}
      ${wantP ? `<div class="res-group"><h3>Yayınevleri · ${PUBLISHERS.length}</h3><div class="pub-grid" style="padding-top:0">${sortedPubs.map(pubTile).join('')}</div></div>` : ''}`;
    return;
  }
  const n = norm(q), m = s => norm(s).includes(n);
  const as = wantA ? AUTHORS.filter(a => m(a.name)) : [];
  const ps = wantP ? sortedPubs.filter(p => m(p.name) || m(p.short || '')) : [];
  const total = as.length + ps.length;
  box.innerHTML = total ? `
    <p class="muted" style="margin:14px 22px 0;font-size:12.5px;font-weight:700">${total} sonuç</p>
    ${as.length ? `<div class="res-group"><h3>Yazarlar</h3><div class="list">${as.map(a => authorRow(a, q)).join('')}</div></div>` : ''}
    ${ps.length ? `<div class="res-group"><h3>Yayınevleri</h3><div class="list">${ps.map(p => pubRow(p, q)).join('')}</div></div>` : ''}
  ` : `<div class="empty" style="margin-top:20px"><strong>“${esc(q)}” bulunamadı</strong><p>Yazımı kontrol edebilir ya da tüm listeye bakabilirsin.</p></div>`;
}
function pubRow(p, q = '') {
  return `<button class="row" data-go="#/yayinevi/${p.id}"><span class="logo-tile">${logoHTML(p)}</span><span class="txt"><strong>${hl(p.name, q)}</strong><small>Stant ${hl(p.stand, q)}</small></span>${ic('chev', 'sm')}</button>`;
}

/* ---------- Planım ---------- */
SCREENS.planim = () => {
  const saved = savedHere().sort((a, b) => a.fair.localeCompare(b.fair) || a.day - b.day || tmin(a.start) - tmin(b.start));
  const byDay = {};
  saved.forEach(e => (byDay[e.fair + '-' + e.day] = byDay[e.fair + '-' + e.day] || []).push(e));
  return {
    top: topTitle('Planım', 'KAYDETTİĞİN ETKİNLİKLER'),
    html: planSummary(saved) + passportCard() + (saved.length ? Object.values(byDay).map(list => {
      const e0 = list[0], d = FAIRS[e0.fair].days.find(x => x.n === e0.day);
      const today = e0.fair === 'ankara' && e0.day === DEMO_NOW.day;
      return `<div class="section" style="margin-top:8px"><div class="section-head"><h2 style="font-size:18px">${d.label}, ${d.date}${today ? ' <span class="tag imza" style="vertical-align:middle">Bugün</span>' : ''}</h2></div>
        <div class="timeline" style="padding-top:0">${list.map(e => programItem(e, today ? evStatus(e) : 'future')).join('')}</div></div>`;
    }).join('') + `<p class="muted" style="font-size:12.5px;margin:6px 22px 0">Kaydettiğin etkinlikler başlamadan 15 dakika önce hatırlatılır.</p>`
      : `<div class="empty"><strong>Planın boş</strong><p>Programda beğendiğin etkinliği kaydet.</p><button class="btn sm dark" data-go="#/program">Programa git</button></div>`)
  };
};
function planSummary(saved) {
  if (!saved.length) return '';
  const day = kids() ? 1 : DEMO_NOW.day;
  const today = saved.filter(e => e.day === day);
  const next = today.find(e => kids() || evStatus(e) !== 'past');
  return `<div class="plan-sum">
    <div><b>${saved.length}</b><small>kayıtlı etkinlik</small></div>
    <div><b>${today.length}</b><small>bugün</small></div>
    <div><b>${new Set(saved.map(e => e.day)).size}</b><small>gün</small></div>
  </div>
  ${next ? `<button class="next-strip" data-go="#/etkinlik/${next.id}"><span class="eyebrow">SIRADAKİ</span><strong>${next.start} · ${esc(next.title)}</strong><small>${esc(evPlace(next))}</small></button>` : ''}`;
}

/* ---------- Hediyeler: QR pasaportu, hediyeler, quiz'ler, sıralama ---------- */
const STAMP_PUBS = ['alfa', 'everest', 'bilgi', 'can', 'dogan', 'kirmizi'];
const stampsAll = () => kids() ? KID_ZONES.map(z => z.id) : STAMP_PUBS;
const stampsMine = () => (S.stamps[S.fair] || []).filter(x => stampsAll().includes(x));

// Hediye görselleri: markalı çanta ve ayraç çizimleri, kitaplarda gerçek kapaklar.
const giftArt = {
  canta: () => `<svg viewBox="0 0 120 120"><path d="M42 34c0-12 8-20 18-20s18 8 18 20" fill="none" stroke="#c9b48f" stroke-width="5" stroke-linecap="round"/><path d="M22 36h76l-6 74H28z" fill="#f4ead8" stroke="#e1d2b6" stroke-width="2"/><image href="${A}eylul-fuarcilik-logo.png" x="34" y="62" width="52" height="15"/><text x="60" y="94" text-anchor="middle" font-size="7" font-weight="800" fill="#a08a63" font-family="Montserrat">24. ANKARA KİTAP FUARI</text></svg>`,
  ayrac: () => `<svg viewBox="0 0 120 120"><rect x="44" y="10" width="32" height="96" rx="5" fill="#f19a1b"/><rect x="48" y="14" width="24" height="88" rx="3" fill="none" stroke="#fff" stroke-opacity=".6"/><text x="60" y="64" text-anchor="middle" font-size="9" font-weight="800" fill="#1a1100" font-family="Montserrat" transform="rotate(-90 60 60)">AKF24 · OKU</text><path d="M60 106v8M56 114l4-4 4 4" stroke="#c26f05" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  kitap: () => `<img src="${A}book-murat-korkma-portrait.jpg" alt="">`,
  set: () => `<span class="fan"><img src="${A}book-buket.jpg" alt=""><img src="${A}book-timur.jpg" alt=""><img src="${A}book-murat.jpg" alt=""></span>`,
  cikartma: () => `<svg viewBox="0 0 120 120"><circle cx="44" cy="46" r="24" fill="#ffb21f"/><path d="M44 30l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill="#fff"/><circle cx="80" cy="76" r="22" fill="#0b8e78"/><circle cx="74" cy="72" r="3" fill="#fff"/><circle cx="86" cy="72" r="3" fill="#fff"/><path d="M72 82q8 7 16 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="24" y="78" width="30" height="22" rx="6" fill="#e2497a"/></svg>`,
  boyama: () => `<img src="${A}book-nehir.jpg" alt="">`
};
const GIFTS = {
  ankara: [
    { art: 'canta', title: 'Eylül bez çanta', need: 3, how: '3 QR okut', where: 'Danışma noktasından alınır', stock: 214 },
    { art: 'ayrac', title: 'Kitap ayracı', quiz: true, how: 'Bir quiz’i bitir', where: 'Danışma noktasından alınır', stock: 640 },
    { art: 'kitap', title: 'Alfa’dan roman hediye', need: 6, how: '6 QR okut', where: 'A-504 standından seçilir', stock: 48 },
    { art: 'set', title: 'İmzalı kitap seti', live: true, how: 'Canlı yarışmada 5/5', where: 'Çekilişle · 13 Aralık', stock: 10 }
  ],
  cocuk: [
    { art: 'cikartma', title: 'Çıkartma seti', need: 3, how: '3 alanın QR’ını okut', where: 'Danışma noktasından alınır', stock: 300 },
    { art: 'boyama', title: 'Boyama kitabı', need: 6, how: '6 alanın QR’ını okut', where: 'Kitap Köşesi’nden alınır', stock: 120 }
  ]
};
const giftDone = g => g.need ? stampsMine().length >= g.need : g.quiz ? (S.quizPts || 0) > 0 : (S.quizBest === 5);
function passportCard() {
  const mine = stampsMine().length, all = stampsAll().length;
  const next = GIFTS[S.fair].find(g => g.need && g.need > mine);
  return `<button class="passport-mini" data-go="#/hediyeler">
    <span class="pm-ico">${ic('gift', 'sm')}</span>
    <span class="pm-txt"><strong>${mine}/${all} QR okuttun</strong><small>${next ? `${next.need - mine} QR daha: ${next.title}` : 'Tüm QR’ları topladın!'}</small><i><b style="width:${Math.round(mine / all * 100)}%"></b></i></span>
    ${ic('chev', 'sm')}
  </button>`;
}
function stampItem(id) {
  const got = stampsMine().includes(id);
  if (kids()) {
    const z = zone(id);
    return `<div class="stamp ${got ? 'got' : ''}" style="--c:${z.color}"><span class="st-face" style="background:${got ? z.bg : ''}">${ic(z.icon)}</span><small>${z.name}</small></div>`;
  }
  const p = pub(id);
  return `<div class="stamp ${got ? 'got' : ''}"><span class="st-face">${logoHTML(p)}</span><small>${got ? 'Okutuldu' : 'Stant ' + p.stand}</small></div>`;
}
function giftCard(g) {
  const ok = giftDone(g);
  const left = g.need ? Math.max(0, g.need - stampsMine().length) : 0;
  return `<div class="gift ${ok ? 'ok' : ''}">
    <div class="g-art">${giftArt[g.art]()}${ok ? `<span class="g-badge">${ic('check', 'xs')} Kazandın</span>` : ''}</div>
    <strong>${esc(g.title)}</strong>
    <small>${esc(g.how)}</small>
    <div class="g-foot"><span>${ok ? esc(g.where) : g.need ? `${left} QR kaldı` : esc(g.where)}</span><em>${g.stock} adet</em></div>
  </div>`;
}

// Puan: her QR 20, her quiz doğrusu 10 puan.
const myPoints = () => stampsMine().length * 20 + (S.attended || []).length * 20 + (S.quizPts || 0);
const maskName = n => { const [a, b = ''] = n.split(' '); return `${a[0]}*** ${b}`.trim(); };
const PODIUM_PRIZES = [{ art: 'set', title: 'İmzalı kitap seti' }, { art: 'kitap', title: 'Alfa’dan roman' }, { art: 'canta', title: 'Eylül çanta' }];
const LEADERS = [['Elif K.', 540], ['Mert A.', 510], ['Zeynep T.', 495], ['Deniz A.', 470], ['Ayşe Y.', 455], ['Can D.', 430], ['Selin E.', 410], ['Burak K.', 390]];
const myRank = () => Math.max(9, 160 - Math.round(myPoints() / 3));

SCREENS.hediyeler = () => {
  const tab = kids() ? 'qr' : (route.q.get('sekme') || 'qr');
  const mine = stampsMine().length, all = stampsAll().length;
  const seg = kids() ? '' : `<div class="seg" style="margin-bottom:14px">
      <button class="${tab === 'qr' ? 'on' : ''}" data-go="#/hediyeler?sekme=qr">QR & Hediyeler</button>
      <button class="${tab === 'quiz' ? 'on' : ''}" data-go="#/hediyeler?sekme=quiz">Quiz’ler</button>
      <button class="${tab === 'sira' ? 'on' : ''}" data-go="#/hediyeler?sekme=sira">Sıralama</button>
    </div>`;
  let body = '';
  if (tab === 'qr') {
    const missions = kids() ? [
      { done: stampsMine().includes('masal'), title: 'Masal Sahnesi’ne uğra', sub: 'Sahne girişindeki QR’ı okut', link: '#/konum/masal' },
      { done: stampsMine().includes('bilim'), title: 'Bir bilim deneyine katıl', sub: 'Bilim Alanı · Minik Mucitler', link: '#/konum/bilim' },
      { done: false, title: 'Kitap Köşesi’nde bir kitap oku', sub: 'Okuma saatine katıl', link: '#/konum/kitap' }
    ] : [
      { done: stampsMine().includes('alfa'), title: 'Alfa Yayınları standına uğra', sub: 'A-504 · standdaki QR’ı okut', link: '#/konum/A-504' },
      { done: (S.attended || []).some(id => ev(id) && ev(id).kind === 'soylesi'), title: 'Bir söyleşiye katıl', sub: 'Salon girişindeki QR’ı okut · bugün 15.00', link: '#/etkinlik/e8' },
      { done: (S.quizPts || 0) > 0, title: 'Bir quiz bitir', sub: 'Kitap ayracı kazandırır', link: '#/hediyeler?sekme=quiz' }
    ];
    body = `
    <div class="passport">
      <div class="pp-top"><span class="eyebrow" style="color:var(--brand)">NASIL ÇALIŞIR?</span><span class="pp-count"><b>${mine}</b>/${all} QR</span></div>
      <h3>${kids() ? 'Alanlardaki QR’ları<br>okut, hediyeni al.' : 'Stantlardaki QR’ları<br>okut, hediyeni al.'}</h3>
      <ol class="pp-steps"><li>${kids() ? 'Her alanın girişinde' : 'Katılımcı stantlarında'} bir QR kod var.</li><li>Telefonunla okut, pasaportuna eklensin.</li><li>Yeterli QR’da hediyeni Danışma’dan al.</li></ol>
      <div class="pp-bar"><b style="width:${Math.round(mine / all * 100)}%"></b></div>
      <button class="btn primary block" data-scan>${ic('scan', 'sm')} QR okut</button>
    </div>
    <div class="section"><div class="section-head"><h2>Hediyeler</h2><span class="sponsor-note">Stokla sınırlı</span></div>
      <div class="hscroll">${GIFTS[S.fair].map(giftCard).join('')}</div></div>
    <div class="section"><div class="section-head"><h2>QR noktaları</h2><span class="sponsor-note">${mine}/${all}</span></div>
      <div class="stamps" style="padding-top:0">${stampsAll().map(stampItem).join('')}</div></div>
    <div class="section"><div class="section-head"><h2>Görevler</h2></div><div class="list">
      ${missions.map(m => `<button class="row mission ${m.done ? 'done' : ''}" data-go="${m.link}"><span class="check ${m.done ? 'on' : ''}">${ic('check', 'xs')}</span><span class="txt"><strong>${esc(m.title)}</strong><small>${esc(m.sub)}</small></span>${ic('chev', 'sm')}</button>`).join('')}
    </div></div>`;
  } else if (tab === 'quiz') {
    body = `
    <button class="quiz-card" data-go="#/yarisma">
      <span class="qc-ico">${ic('trophy')}</span>
      <span class="txt"><span class="eyebrow" style="color:#ffcf7a">● CANLI YARIŞMA · ÖDÜLLÜ</span><strong>Sıradaki tur 15.00</strong><small>${untilClock('15.00')} sonra · herkese aynı anda 5 soru</small></span>
      ${ic('chev')}
    </button>
    <div class="section"><div class="section-head"><h2>Her zaman açık quiz’ler</h2></div>
      <p class="prose" style="margin:-4px 0 12px;font-size:13px">Dokun, hemen başla. Her oyuncuya sorular havuzdan karışık gelir; her doğru 10 puan.</p>
      <div class="list">${SOLO.map(qz => { const done = (S.soloDone || {})[qz.id]; return `<button class="row quiz-row" data-solo="${qz.id}"><span class="logo-tile">${qz.pub ? logoHTML(pub(qz.pub)) : qz.author ? `<img src="${A}${author(qz.author).photo}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px">` : `<img src="${A}eylul-fuarcilik-logo.png" alt="">`}</span><span class="txt"><strong>${esc(qz.title)}</strong><small>${qz.pool.length} soruluk havuzdan 4 soru · ${done != null ? `Skorun ${done}/4` : '+40 puana kadar'}</small></span><span class="btn sm ${done != null ? 'ghost' : 'primary'}">${done != null ? 'Tekrar' : 'Başla'}</span></button>`; }).join('')}</div>
    </div>`;
  } else {
    const me = myPoints(), rank = myRank();
    body = `
    <div class="me-rank">
      <div><span class="eyebrow" style="color:var(--brand)">SENİN SIRAN</span><b>${rank}.</b><small>${(3184).toLocaleString('tr-TR')} oyuncu arasında</small></div>
      <div class="pts"><b>${me}</b><small>puan</small></div>
    </div>
    <div class="section"><div class="section-head"><h2>Bugünün liderleri</h2><span class="sponsor-note">Gün sonu ödülleri</span></div>
      <div class="podium">${[1, 0, 2].map(k => { const [n, p] = LEADERS[k]; const prize = PODIUM_PRIZES[k]; return `<div class="pd pd-${k + 1}">
        <span class="pd-av">${n[0]}${k === 0 ? '<i class="crown">♛</i>' : ''}</span>
        <strong>${maskName(n)}</strong><small>${p} puan</small>
        <div class="pd-step"><span class="pd-n">${k + 1}</span><span class="pd-gift">${giftArt[prize.art]()}</span><em>${esc(prize.title)}</em></div>
      </div>`; }).join('')}</div>
    </div>
    <div class="list" style="margin-top:12px">
      ${LEADERS.slice(3).map(([n, p], k) => `<div class="lb-row"><span class="lb-n">${k + 4}</span><span class="lb-av">${n[0]}</span><strong>${maskName(n)}</strong><em>${p} puan</em></div>`).join('')}
      <div class="lb-row me"><span class="lb-n">${rank}</span><span class="lb-av">S</span><strong>Sen</strong><em>${me} puan</em></div>
    </div>
    <p class="prose" style="margin:12px 0 0;font-size:13px">Her QR 20, her doğru cevap 10 puan. İsimler gizlilik için kısaltılarak gösterilir.</p>`;
  }
  return {
    top: topTitle('Hediyeler', kids() ? 'ŞENLİK PASAPORTU' : 'FUAR PASAPORTU'),
    html: seg + body + `<p class="muted" style="font-size:11.5px;margin:16px 22px 0">Hediyeler, puanlar ve sıralama örnektir; yayınevleri ve sponsorlarla birlikte belirlenir.</p>`
  };
};

/* QR okuyucu (demo): kamera görünümü, ardından pasaporta eklenir */
function startAttendScan(id) {
  const e = ev(id);
  const el = $('#scanner');
  el.innerHTML = `<div class="sc-cam"><div class="sc-frame"><i></i><i></i><i></i><i></i><span class="sc-line"></span></div><p>${esc(e.place || zone(e.zone).name)} girişindeki QR’ı hizala</p><button class="btn light" data-scan-close>Vazgeç</button></div>`;
  el.classList.add('show');
  clearTimeout(scanT);
  scanT = setTimeout(() => {
    S.attended = [...new Set([...(S.attended || []), id])]; save();
    el.innerHTML = `<div class="sc-ok"><span class="sc-stamp">${ic('check')}</span><h2>Katılım onaylandı!</h2>
      <p>“${esc(e.title)}” etkinliğine katıldın · +20 puan</p>
      <button class="btn primary block" data-scan-close>Tamam</button></div>`;
  }, 1600);
}
function startScan() {
  const el = $('#scanner');
  el.innerHTML = `<div class="sc-cam"><div class="sc-frame"><i></i><i></i><i></i><i></i><span class="sc-line"></span></div><p>Stanttaki QR kodu çerçeveye hizala</p><button class="btn light" data-scan-close>Vazgeç</button></div>`;
  el.classList.add('show');
  clearTimeout(scanT);
  scanT = setTimeout(() => {
    const left = stampsAll().filter(x => !stampsMine().includes(x));
    const id = left[0];
    if (id) { S.stamps[S.fair] = [...stampsMine(), id]; save(); }
    const mine = stampsMine().length, all = stampsAll().length;
    const won = GIFTS[S.fair].find(g => g.need === mine);
    const face = !id ? ic('trophy') : kids() ? ic(zone(id).icon) : logoHTML(pub(id));
    el.innerHTML = `<div class="sc-ok">
      <span class="sc-stamp">${face}</span>
      <h2>${id ? 'QR okutuldu!' : 'Hepsi tamam!'}</h2>
      <p>${id ? `${kids() ? zone(id).name : pub(id).name} pasaportuna eklendi · ${mine}/${all} QR · +20 puan` : 'Tüm QR’ları zaten topladın.'}</p>
      ${won ? `<div class="sc-gift"><span class="g-art">${giftArt[won.art]()}</span><span><small>HEDİYE KAZANDIN</small><b>${esc(won.title)}</b><em>${esc(won.where)}</em></span></div>` : ''}
      <button class="btn primary block" data-scan-close>Tamam</button>
    </div>`;
  }, 1800);
}
let scanT = null;
function closeScan() { clearTimeout(scanT); $('#scanner').classList.remove('show'); render('none'); }

/* Canlı bilgi yarışması: belirli saatlerde herkese aynı anda açılır */
const QUIZ = [
  { q: '“Bozkırdaki Işıklar” kitabının yazarı kim?', a: ['Mustafa Gazalcı', 'Timur Soykan', 'Murat Menteş', 'Saygı Öztürk'], c: 0, pct: [71, 9, 12, 8] },
  { q: '“İki Yeşil Susamuru” hangi yazarın romanı?', a: ['Nehir Yarar', 'Buket Uzuner', 'Mustafa Balbay', 'Murat Menteş'], c: 1, pct: [14, 64, 7, 15] },
  { q: '24. Ankara Kitap Fuarı nerede yapılıyor?', a: ['CerModern', 'Atakule', 'ATO Congresium', 'Kızılay Meydanı'], c: 2, pct: [6, 4, 86, 4] },
  { q: '“Dublörün Dilemması” kimin kitabı?', a: ['Timur Soykan', 'Saygı Öztürk', 'Buket Uzuner', 'Murat Menteş'], c: 3, pct: [11, 9, 18, 62] },
  { q: '“Veda Turtası”nın yazarı kim?', a: ['Nehir Yarar', 'Buket Uzuner', 'Mustafa Gazalcı', 'Mustafa Balbay'], c: 0, pct: [48, 27, 13, 12] }
];
const QUIZ_SEC = 10;
const QUIZ_SESSIONS = [{ t: '12.00', done: true, players: 942 }, { t: '15.00', next: true }, { t: '18.00' }];
let quiz = null, quizTimer = null;
SCREENS.yarisma = () => ({
  top: topBack('Canlı yarışma', 'HEDİYELER'),
  html: `<div id="quiz">${quizLobby()}</div>`,
  after: () => { if (quiz && quiz.autostart) { quiz.autostart = false; quizCountdown(); } }
});
function untilClock(t) { const d = tmin(t) - nowMin(); return d <= 0 ? 'şimdi' : d < 60 ? `${d} dk` : `${Math.floor(d / 60)} sa ${d % 60} dk`; }
function quizLobby() {
  return `<div class="quiz-hero">
    <span class="live-pill">● CANLI YARIŞMA</span>
    <h2>Herkese aynı anda,<br>aynı soru.</h2>
    <p>Yarışma her gün belirli saatlerde açılır. Sorular tüm oyunculara aynı anda gelir; her soru için 10 saniye. 5/5 yapanlar arasından imzalı kitap çekilişi.</p>
    <div class="sessions">${QUIZ_SESSIONS.map(x => `<div class="sess ${x.done ? 'done' : ''} ${x.next ? 'next' : ''}"><b>${x.t}</b><small>${x.done ? `Bitti · ${x.players} kişi` : x.next ? `${untilClock(x.t)} sonra` : 'Akşam turu'}</small></div>`).join('')}</div>
    <button class="btn primary block" data-quiz-remind>${ic('bell', 'sm')} 15.00 için hatırlat</button>
    <button class="btn light block" style="margin-top:10px" data-quiz-live>Demo: yarışmayı şimdi başlat</button>
  </div>
  ${S.quizBest != null ? `<p class="muted" style="text-align:center;font-size:13px;margin:14px 0 0">Önceki turdaki skorun: ${S.quizBest}/5</p>` : ''}`;
}
function quizLive() {
  quiz = { i: 0, score: 0, players: 1284, autostart: true };
  push({ type: 'eylul', title: 'Canlı yarışma başladı! 🏆', body: '1.284 kişi bekliyor. İlk soru 3 saniye içinde geliyor.', link: '#/yarisma' });
  if (route.name === 'yarisma') { quiz.autostart = false; quizCountdown(); } else go('#/yarisma');
}
function quizCountdown() {
  clearInterval(quizTimer);
  let n = 3;
  const draw = () => { const box = $('#quiz'); if (box) box.innerHTML = `<div class="qz-count"><span class="live-pill">● CANLI · ${quiz.players.toLocaleString('tr-TR')} oyuncu</span><b>${n}</b><p>İlk soru geliyor…</p></div>`; };
  draw();
  quizTimer = setInterval(() => { n--; if (n <= 0) { clearInterval(quizTimer); quizQuestion(); } else draw(); }, 900);
}
function quizQuestion() {
  clearInterval(quizTimer);
  const box = $('#quiz'); if (!box) return;
  const item = QUIZ[quiz.i];
  quiz.pick = null; quiz.left = QUIZ_SEC;
  box.innerHTML = `<div class="qz">
    <div class="qz-head"><span class="live-pill">● CANLI · ${quiz.players.toLocaleString('tr-TR')}</span><span>Soru ${quiz.i + 1}/${QUIZ.length}</span><span class="qz-sec" id="qz-sec">${quiz.left}</span></div>
    <div class="qz-bar"><b id="qz-bar" style="width:100%"></b></div>
    <h2>${esc(item.q)}</h2>
    <div class="qz-opts">${item.a.map((t, k) => `<button class="qz-opt" data-answer="${k}"><span>${'ABCD'[k]}</span><em>${esc(t)}</em><i class="pct"></i></button>`).join('')}</div>
    <p class="qz-score" id="qz-note">Süre bitince doğru cevap herkese aynı anda gösterilir.</p>
  </div>`;
  quizTimer = setInterval(() => {
    quiz.left -= 1;
    const sec = $('#qz-sec'), bar = $('#qz-bar'); if (!sec) return clearInterval(quizTimer);
    sec.textContent = Math.max(0, quiz.left); bar.style.width = (Math.max(0, quiz.left) / QUIZ_SEC * 100) + '%';
    sec.classList.toggle('hot', quiz.left <= 3);
    if (quiz.left <= 0) quizReveal();
  }, 1000);
}
function quizAnswer(k) {
  if (!quiz || quiz.pick != null || quiz.left <= 0) return;
  quiz.pick = k;
  document.querySelectorAll('.qz-opt').forEach((b, idx) => b.classList.toggle('picked', idx === k));
  const note = $('#qz-note'); if (note) note.textContent = 'Cevabın kilitlendi. Diğer oyuncular bekleniyor…';
  // Demo: herkes cevap verdi varsayımıyla kalan süre kısalır.
  quiz.left = Math.min(quiz.left, 2);
}
function quizReveal() {
  clearInterval(quizTimer);
  const item = QUIZ[quiz.i];
  const ok = quiz.pick === item.c;
  if (ok) quiz.score++;
  document.querySelectorAll('.qz-opt').forEach((b, idx) => {
    b.classList.add(idx === item.c ? 'right' : idx === quiz.pick ? 'wrong' : 'dim');
    b.style.setProperty('--p', item.pct[idx] + '%');
    b.querySelector('.pct').textContent = '%' + item.pct[idx];
  });
  const note = $('#qz-note');
  if (note) note.innerHTML = quiz.pick == null ? 'Süre doldu, bu soruyu kaçırdın.' : ok ? `<b style="color:var(--ok)">Doğru!</b> Oyuncuların %${item.pct[item.c]}’i bildi.` : `<b style="color:var(--hot)">Yanlış.</b> Doğru cevap: ${esc(item.a[item.c])}`;
  setTimeout(() => {
    quiz.i++;
    if (quiz.i < QUIZ.length) return quizQuestion();
    S.quizBest = quiz.score; S.quizPts = (S.quizPts || 0) + quiz.score * 10; save();
    const perfect = quiz.score === QUIZ.length, won = quiz.score >= 3;
    $('#quiz').innerHTML = `<div class="quiz-hero">${ic(won ? 'trophy' : 'book')}<h2>${quiz.score}/${QUIZ.length} doğru!</h2>
      <p>${perfect ? '5/5 yapan 86 oyuncu arasındasın. İmzalı kitap seti çekilişi 18.30’da; kazananlara bildirimle haber vereceğiz.' : won ? 'Tebrikler! Kitap ayracın Danışma noktasında seni bekliyor. Bu kodu görevliye göster.' : 'Bu tur olmadı. 18.00’deki turda yeniden şansını dene!'}</p>
      ${won ? `<div class="coupon">AKF24-${perfect ? 'CEKILIS' : 'AYRAC'}-${4800 + quiz.score * 37}</div>` : ''}
      <div class="qz-rank"><b>${quiz.players.toLocaleString('tr-TR')}</b> oyuncu katıldı · bir sonraki tur 18.00</div>
      <button class="btn primary block" data-go="#/hediyeler">Hediyelere dön</button></div>`;
    quiz = null;
  }, 2600);
}

/* Her zaman açık quiz'ler: her oyuncuya havuzdan karışık 4 soru */
const SOLO = [
  { id: 'menetes', title: 'Murat Menteş’i ne kadar tanıyorsun?', author: 'murat', pool: [
    ['Hangisi Murat Menteş’in romanı?', ['Ruhi Mücerret', 'Menzil', 'Baron İstilası', 'Veda Turtası']],
    ['“Korkma Ben Varım” kimin kitabı?', ['Murat Menteş', 'Timur Soykan', 'Buket Uzuner', 'Saygı Öztürk']],
    ['Murat Menteş fuarda hangi yayınevinin standında?', ['Alfa Yayınları', 'Doğan Kitap', 'Can Çocuk', 'Bilgi Yayınevi']],
    ['“Dublörün Dilemması”nın yazarı kim?', ['Murat Menteş', 'Mustafa Balbay', 'Nehir Yarar', 'Mustafa Gazalcı']],
    ['Murat Menteş’in imzası bugün saat kaçta?', ['14.00', '10.30', '18.00', '16.30']],
    ['Hangisi Murat Menteş’in kitabı değildir?', ['İki Yeşil Susamuru', 'Ruhi Mücerret', 'Korkma Ben Varım', 'Dublörün Dilemması']]
  ] },
  { id: 'everest', title: 'Everest Yayınları quizi', pub: 'everest', pool: [
    ['“İki Yeşil Susamuru” kimin romanı?', ['Buket Uzuner', 'Murat Menteş', 'Nehir Yarar', 'Saygı Öztürk']],
    ['“Kumral Ada Mavi Tuna” hangi yazarın?', ['Buket Uzuner', 'Timur Soykan', 'Mustafa Balbay', 'Mustafa Gazalcı']],
    ['Everest Yayınları’nın standı nerede?', ['A-410', 'A-504', 'A-104', 'A-305']],
    ['Buket Uzuner’in söyleşisinin adı ne?', ['Bir roman nasıl doğar?', 'Yayıncılığın yarını', 'Haberden kitaba', 'Masal maratonu']],
    ['Buket Uzuner bugün saat kaçta imzada?', ['16.30', '13.00', '11.00', '19.00']]
  ] },
  { id: 'koy', title: 'Köy Enstitüleri quizi', pub: 'bilgi', pool: [
    ['“Bozkırdaki Işıklar”ın yazarı kim?', ['Mustafa Gazalcı', 'Mustafa Balbay', 'Timur Soykan', 'Murat Menteş']],
    ['“Çınarlar Anlatıyor” kaç Köy Enstitüsünü anlatıyor?', ['21', '12', '7', '40']],
    ['Mustafa Gazalcı’nın kitapları hangi yayınevinden?', ['Bilgi Yayınevi', 'Everest Yayınları', 'Alfa Yayınları', 'Can Çocuk']],
    ['“Köy Enstitüleri bugün ne söylüyor?” söyleşisi nerede?', ['Söyleşi Salonu', 'Çocuk Atölyesi', 'A-305', 'Danışma']],
    ['Bilgi Yayınevi’nin standı hangisi?', ['A-305', 'A-208', 'A-707', 'A-111']]
  ] },
  { id: 'cocukkitap', title: 'Çocuk kitapları quizi', pub: 'can', pool: [
    ['“Veda Turtası”nın yazarı kim?', ['Nehir Yarar', 'Buket Uzuner', 'Saygı Öztürk', 'Murat Menteş']],
    ['“Bir Problem Bin Çözüm” hangi yayınevinden?', ['Can Çocuk', 'Doğan Kitap', 'Ötüken Neşriyat', 'Timaş Yayınları']],
    ['Çocuk masal saati nerede yapılıyor?', ['Çocuk Atölyesi', 'Söyleşi Salonu', 'A-504', 'Mescit']],
    ['Nehir Yarar’ın “Çocuklarla birlikte okumak” söyleşisi hangi gün?', ['Pazartesi', 'Cuma', 'Salı', 'Pazar']],
    ['Can Çocuk’un standı nerede?', ['A-104', 'A-606', 'A-811', 'A-410']]
  ] },
  { id: 'fuar', title: 'Fuarı ne kadar tanıyorsun?', pool: [
    ['24. Ankara Kitap Fuarı nerede yapılıyor?', ['ATO Congresium', 'CerModern', 'Atakule', 'Kızılay Meydanı']],
    ['Fuar hangi tarihlerde?', ['4–13 Aralık', '1–10 Kasım', '3–12 Nisan', '20–29 Ekim']],
    ['Fuara en yakın metro durağı hangisi?', ['M2 Söğütözü', 'Kızılay', 'Ulus', 'AŞTİ']],
    ['Fuar her gün saat kaçta kapanıyor?', ['20.00', '18.00', '22.00', '17.00']],
    ['Kaybolan eşyalar nereye teslim ediliyor?', ['Danışma', 'Mescit', 'Kafe', 'Söyleşi Salonu']]
  ] }
];
const SOLO_SEC = 10;
let solo = null;
const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
SCREENS.quiz = id => {
  const qz = SOLO.find(x => x.id === id); if (!qz) return SCREENS.hediyeler();
  return { top: topBack(qz.title, 'QUIZ'), html: '<div id="quiz"></div>', after: () => soloStart(qz) };
};
function soloStart(qz) {
  // İlk şık doğru cevaptır; şıklar ve sorular her oyuncu için karıştırılır.
  const qs = shuffle(qz.pool).slice(0, 4).map(([q, a]) => { const opts = shuffle(a.map((t, k) => ({ t, ok: k === 0 }))); return { q, a: opts.map(o => o.t), c: opts.findIndex(o => o.ok) }; });
  solo = { qz, qs, i: 0, score: 0 };
  soloQuestion();
}
function soloQuestion() {
  clearInterval(quizTimer);
  const box = $('#quiz'); if (!box) return;
  const item = solo.qs[solo.i];
  solo.left = SOLO_SEC; solo.locked = false;
  box.innerHTML = `<div class="qz">
    <div class="qz-head"><span>Soru ${solo.i + 1}/${solo.qs.length}</span><span>Puan ${solo.score * 10}</span><span class="qz-sec" id="qz-sec">${solo.left}</span></div>
    <div class="qz-bar"><b id="qz-bar" style="width:100%"></b></div>
    <h2>${esc(item.q)}</h2>
    <div class="qz-opts">${item.a.map((t, k) => `<button class="qz-opt" data-solo-answer="${k}"><span>${'ABCD'[k]}</span><em>${esc(t)}</em></button>`).join('')}</div>
    <p class="qz-score">Sorular ve şıklar her oyuncuya karışık gelir.</p>
  </div>`;
  quizTimer = setInterval(() => {
    solo.left -= 1;
    const sec = $('#qz-sec'), bar = $('#qz-bar'); if (!sec) return clearInterval(quizTimer);
    sec.textContent = Math.max(0, solo.left); bar.style.width = (Math.max(0, solo.left) / SOLO_SEC * 100) + '%';
    sec.classList.toggle('hot', solo.left <= 3);
    if (solo.left <= 0) soloAnswer(-1);
  }, 1000);
}
function soloAnswer(k) {
  if (!solo || solo.locked) return;
  solo.locked = true; clearInterval(quizTimer);
  const item = solo.qs[solo.i];
  if (k === item.c) solo.score++;
  document.querySelectorAll('.qz-opt').forEach((b, idx) => b.classList.add(idx === item.c ? 'right' : idx === k ? 'wrong' : 'dim'));
  setTimeout(() => {
    solo.i++;
    if (solo.i < solo.qs.length) return soloQuestion();
    S.quizPts = (S.quizPts || 0) + solo.score * 10;
    S.soloDone = { ...(S.soloDone || {}), [solo.qz.id]: solo.score };
    save();
    $('#quiz').innerHTML = `<div class="quiz-hero">${ic(solo.score >= 3 ? 'trophy' : 'book')}<h2>${solo.score}/${solo.qs.length} doğru · +${solo.score * 10} puan</h2>
      <p>${solo.score > 0 ? 'Kitap ayracını Danışma’dan alabilirsin. Puanın sıralamaya eklendi.' : 'Bu sefer olmadı; tekrar denediğinde farklı sorular gelecek.'}</p>
      <div class="qz-rank">Toplam puanın <b>${myPoints()}</b> · sıran <b>${myRank()}.</b></div>
      <button class="btn primary block" data-go="#/hediyeler?sekme=sira">Sıralamaya bak</button>
      <button class="btn light block" style="margin-top:10px" data-go="#/hediyeler?sekme=quiz">Diğer quiz’ler</button></div>`;
    solo = null;
  }, 1100);
}

/* ---------- Duyurular ---------- */
SCREENS.bildirimler = () => {
  const all = fairNotices();
  setTimeout(() => { S.read = all.map(n => n.id); save(); }, 1500);
  return {
    top: topBack('Duyurular', 'EYLÜL FUARCILIK'),
    html: `<div class="list">${all.map(n => `<button class="notice ${S.read.includes(n.id) ? '' : 'new'}" data-go="${n.link}">
      <span class="ico-tile ${n.type}">${ic(n.type === 'change' ? 'alert' : 'info', 'sm')}</span>
      <span class="txt"><span class="h"><strong>${esc(n.title)}</strong><time>${n.time}</time></span><p>${esc(n.body)}</p></span>
    </button>`).join('')}</div>`
  };
};

/* Yatay şeritler: farede ok butonları + sürükleyerek kaydırma */
function enhanceScrollers() {
  document.querySelectorAll('#view .hscroll, #view .fac-scroll').forEach(sc => {
    if (sc.parentElement.classList.contains('hs-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'hs-wrap';
    sc.before(wrap); wrap.append(sc);
    const mk = (dir) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'hs-btn ' + dir; b.setAttribute('aria-label', dir === 'next' ? 'İleri' : 'Geri'); b.innerHTML = ic(dir === 'next' ? 'chev' : 'back', 'sm'); b.onclick = evt => { evt.stopPropagation(); const target = Math.max(0, Math.min(sc.scrollWidth - sc.clientWidth, sc.scrollLeft + (dir === 'next' ? 1 : -1) * sc.clientWidth * .8)); sc.scrollTo({ left: target, behavior: 'smooth' }); setTimeout(() => { if (Math.abs(sc.scrollLeft - target) > 4) sc.scrollLeft = target; sync(); }, 450); }; wrap.append(b); return b; };
    const prev = mk('prev'), next = mk('next');
    const sync = () => { prev.hidden = sc.scrollLeft < 24; next.hidden = sc.scrollLeft + sc.clientWidth > sc.scrollWidth - 24; };
    sc.addEventListener('scroll', sync, { passive: true }); requestAnimationFrame(sync); setTimeout(sync, 400);
    let down = null, moved = false;
    sc.addEventListener('pointerdown', evt => { if (evt.pointerType !== 'mouse') return; down = { x: evt.clientX, left: sc.scrollLeft }; moved = false; });
    sc.addEventListener('pointermove', evt => { if (!down) return; const dx = evt.clientX - down.x; if (Math.abs(dx) > 4) { moved = true; sc.classList.add('dragging'); } sc.scrollLeft = down.left - dx; });
    const end = () => { if (!down) return; down = null; setTimeout(() => sc.classList.remove('dragging'), 0); };
    sc.addEventListener('pointerup', end); sc.addEventListener('pointerleave', end);
    sc.addEventListener('click', evt => { if (moved) { evt.stopPropagation(); evt.preventDefault(); moved = false; } }, true);
  });
}

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
  S.extraNotices.unshift({ ...n, id, time: 'şimdi', fair: S.fair }); save();
  const el = $('#push');
  el.innerHTML = `<span class="app-ico"><img src="${A}eylul-fuarcilik-logo.png" alt=""></span><span class="txt"><span class="h"><span>EYLÜL FUAR REHBERİ</span><span>şimdi</span></span><strong>${esc(n.title)}</strong><p>${esc(n.body)}</p></span>`;
  el.dataset.link = n.link || '#/bildirimler';
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(pushT); pushT = setTimeout(() => el.classList.remove('show'), 6500);
  if (!['ara', 'yarisma', 'quiz'].includes(route.name)) render('none');
}

/* ---------- Etkileşimler ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-fac],[data-attend],[data-solo],[data-solo-answer],[data-scan],[data-scan-close],[data-quiz-live],[data-quiz-remind],[data-answer],[data-zone],[data-close-book],[data-book],[data-go],[data-back],[data-save],[data-kind],[data-sheet],[data-fair],[data-zoom],[data-stand],#push,#backdrop');
  if (!el) return;
  const d = el.dataset;
  if (d.fac) return selectFacility(d.fac);
  if (d.attend) return startAttendScan(d.attend);
  if (d.solo) return go('#/quiz/' + d.solo);
  if (d.soloAnswer != null) return soloAnswer(Number(d.soloAnswer));
  if (d.scan != null) return startScan();
  if (d.scanClose != null) return closeScan();
  if (d.quizLive != null) return quizLive();
  if (d.quizRemind != null) return toast('15.00’te yarışma başlarken bildirim göndereceğiz', 'bell');
  if (d.answer != null) return quizAnswer(Number(d.answer));
  if (d.book) return openBook(d.book);
  if (d.closeBook != null) { closeBook(); if (!d.go) return; }
  if (el.id === 'push') { el.classList.remove('show'); if (d.link === location.hash || route.name === 'yarisma' || route.name === 'quiz') return; return go(d.link); }
  if (el.id === 'backdrop') return closeSheet();
  if (d.save) { e.stopPropagation(); const on = toggle('saved', d.save); toast(on ? 'Planına eklendi' : 'Plandan çıkarıldı', on ? 'bookmark' : 'x'); return render('none'); }
  if (d.kind) {
    searchKind = d.kind;
    document.querySelectorAll('#search-kinds .chip').forEach(c => c.classList.toggle('on', c.dataset.kind === d.kind));
    return runSearch($('#q').value);
  }
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
  if (d.stand && route.name === 'konum') return go('#/konum/' + d.stand);
  if (d.zone) return go('#/konum/' + d.zone);
  if (d.back != null) { closeSheet(); return back(); }
  if (d.go) { closeSheet(); return go(d.go); }
});
document.addEventListener('input', e => {
  if (e.target.id === 'q') runSearch(e.target.value);
  if (e.target.id === 'pq') {
    const v = e.target.value;
    $('#prog-filters').hidden = !!v.trim();
    $('#prog-list').innerHTML = programBody(Number(route.q.get('gun') || (kids() ? 1 : DEMO_NOW.day)), route.q.get('tur') || 'tum', v);
  }
});
$('#view').addEventListener('scroll', () => $('#topbar').classList.toggle('scrolled', $('#view').scrollTop > 6), { passive: true });

/* ---------- Sunum / panel bağlantısı ---------- */
const seenPush = new Set();
function onDemoMessage(m) {
  if (!m || typeof m !== 'object') return;
  if (m.nid) { if (seenPush.has(m.nid)) return; seenPush.add(m.nid); }
  if (m.type === 'go') { closeSheet(); closeBook(); if (m.fair && S.fair !== m.fair) { S.fair = m.fair; save(); } go(m.hash); }
  if (m.type === 'push') {
    if (m.notice && m.notice.nid) { if (seenPush.has(m.notice.nid)) return; seenPush.add(m.notice.nid); }
    const pool = kids() ? KID_PUSHES : LIVE_PUSHES;
    push(m.notice || pool[(pushCursor++) % pool.length]);
  }
  if (m.type === 'book') { if (route.name !== 'yazar') go('#/yazar/' + book(m.id).author); setTimeout(() => openBook(m.id), 350); }
  if (m.type === 'quiz-live') { closeSheet(); if (S.fair !== 'ankara') { S.fair = 'ankara'; save(); } quizLive(); }
  if (m.type === 'scan') { if (route.name !== 'hediyeler') go('#/hediyeler'); setTimeout(startScan, 350); }
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
if (params.get('kitap')) setTimeout(() => openBook(params.get('kitap')), 0);
setInterval(() => { const c = $('#clock'); if (c) c.textContent = fmtNow().replace('.', ':'); }, 10000);
$('#clock').textContent = fmtNow().replace('.', ':');
route = parse(location.hash);
currentHash = location.hash || '#/';
render('fade');
