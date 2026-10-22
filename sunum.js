/* Eylül Fuar Rehberi — tanıtım sunumu */

const $ = s => document.querySelector(s);
// Uygulama turu: her adım soldaki anlatımı ve telefonun açacağı ekranı birlikte taşır.
const ICONS = {
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/> <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  search: '<circle cx="11" cy="11" r="8"/> <path d="m21 21-4.3-4.3"/>',
  cal: '<path d="M8 2v4"/> <path d="M16 2v4"/> <rect width="18" height="18" x="3" y="4" rx="2"/> <path d="M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="10"/> <polyline points="12 6 12 12 16 14"/>',
  book: '<path d="M12 7v14"/> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  pen: '<path d="M12 20h9"/> <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>',
  map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/> <path d="M15 5.764v15"/> <path d="M9 3.236v15"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/> <circle cx="12" cy="10" r="3"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/> <path d="M12 8v13"/> <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/> <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  qr: '<rect width="5" height="5" x="3" y="3" rx="1"/> <rect width="5" height="5" x="16" y="3" rx="1"/> <rect width="5" height="5" x="3" y="16" rx="1"/> <path d="M21 16h-3a2 2 0 0 0-2 2v3"/> <path d="M21 21v.01"/> <path d="M12 7v3a2 2 0 0 1-2 2H7"/> <path d="M3 12h.01"/> <path d="M12 3h.01"/> <path d="M12 16v.01"/> <path d="M16 12h1"/> <path d="M21 12v.01"/> <path d="M12 21v-1"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/> <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/> <path d="M4 22h16"/> <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/> <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/> <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/> <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/> <circle cx="9" cy="7" r="4"/> <path d="M22 21v-2a4 4 0 0 0-3-3.87"/> <path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/> <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/> <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  info: '<circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/>',
  kid: '<circle cx="12" cy="12" r="10"/> <path d="M8 14s1.5 2 4 2 4-2 4-2"/> <line x1="9" x2="9.01" y1="9" y2="9"/> <line x1="15" x2="15.01" y1="9" y2="9"/>',
  play: '<circle cx="12" cy="12" r="10"/> <polygon points="10 8 16 12 10 16 10 8"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/> <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/> <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>'
};
const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const TOUR_TOTAL = 12;
// Buton: [başlık, telefona gidecek mesaj, ikon]
const actions = list => list.length ? `<div class="acts">${list.map(([t, msg, ic], k) => `<button class="act${k ? ' ghost' : ''}" data-msg='${JSON.stringify(msg)}'><span class="a-ico">${icon(ic)}</span><b>${t}</b><span class="a-go">${icon('play')}</span></button>`).join('')}</div>` : '';
// Adım: başlık, tek cümle, üç kısa özellik, en fazla iki canlı gösterim
const step = (n, name, title, lead, feats, acts = []) => `
      <div class="stepbar"><span class="sb-n">Adım ${String(n).padStart(2, '0')}<em>/ ${TOUR_TOTAL}</em></span><span class="sb-name">${name}</span><span class="sb-track"><b style="width:${n / TOUR_TOTAL * 100}%"></b></span></div>
      <h1 class="title tour">${title}</h1>
      <p class="lead">${lead}</p>
      <ul class="feats">${feats.map(([ic, t]) => `<li><span class="f-ico">${icon(ic)}</span>${t}</li>`).join('')}</ul>
      ${actions(acts)}`;
const go = (hash, fair = 'ankara') => ({ msg: { type: 'go', fair, hash } });
const m = (hash, fair = 'ankara') => ({ type: 'go', fair, hash });

const SLIDES = [
  {
    id: 'kapak', label: 'Kapak', theme: 'dark', phone: { msg: { type: 'reset', hash: '#/' } },
    html: `
      <span class="kicker">24. Ankara Kitap Fuarı · 4–13 Aralık 2026</span>
      <h1 class="title">Kitap fuarı<br>artık <em>cebinde.</em></h1>
      <p class="lead">Program, kroki, hediyeler ve Eylül’ün duyuruları tek uygulamada. Şimdi baştan sona birlikte gezelim.</p>
      <div class="stats">
        <div><b>500 bin</b><small>ziyaretçi hedefi · fuar başına</small></div>
        <div><b>500+</b><small>yayınevi</small></div>
        <div><b>850</b><small>yazar ve çizer</small></div>
      </div>
      <p class="src">Kaynak: Anadolu Ajansı, Yeni Ankara, TRT Avaz haberleri (2025–2026 fuarları).</p>`,
    notes: `<p>Açılış: <b>“Fuarınız yılda iki kez yarım milyon okuru ağırlıyor. Bu okurlar için bir uygulama hazırladık; şimdi baştan sona gezelim.”</b></p><p>Sağdaki telefon gerçek ve tıklanabilir. Telefonun üstündeki <b>“Bildirim gönder”</b> ile istediğin an bildirim gösterebilirsin.</p>`
  },
  {
    id: 'sorun', label: 'Okurun soruları', theme: 'dark', layout: 'full',
    html: `
      <span class="kicker">Ziyaretçinin gözünden</span>
      <h1 class="title">Okurun üç<br><em>basit sorusu.</em></h1>
      <div class="pains">
        ${[
          ['Kim, ne zaman, nerede?', 'Hangi yazar hangi gün imzada? Ziyaretçiler soruyor, cevap bulamıyor; “program kötü yayınlandı” yorumları var.', 'FestTR ziyaretçi yorumları'],
          ['Stant nerede?', 'Kroki tek bir görsel. 500 yayınevi arasında aradığını bulmak zor.', 'ankarakitapfuari.org.tr'],
          ['Değişiklikten nasıl haberim olur?', 'Saat ya da salon değişikliği bugün Instagram’dan duyuruluyor; okurun çoğuna ulaşmıyor.', 'Fuar sitesi SSS sayfası']
        ].map(([t, p, s], i) => `<div class="pain"><span class="n">0${i + 1}</span><h3>${t}</h3><p>${p}</p><small>Kaynak: ${s}</small></div>`).join('')}
      </div>`,
    notes: `<p>Üç soru, uygulamada üç cevap: <b>program, kroki, duyuru.</b> “Şimdi uygulamayı ana sayfadan başlayarak gezelim.”</p>`
  },
  {
    id: 'ana', label: 'Ana sayfa', theme: 'light', phone: go('#/'),
    html: step(1, 'Ana sayfa', 'Ana sayfa', 'Uygulama açılınca ziyaretçi o günün özetini görür: öne çıkan etkinlikler, o an imza veren yazarlar ve popüler yayınevleri. Duyurular da tek dokunuş uzakta.',
      [['cal', 'Ziyaretçi gününü önceden planlar'], ['pen', 'İmza saatleri kaçırılmaz'], ['book', 'Katılımcılar daha çok görünür']],
      [['Duyuruları aç', m('#/bildirimler'), 'bell']]),
    notes: `<p>Banner’ın kendi kendine döndüğünü ve “Bugün imzada” şeridinin kaydığını göster. Aşağı kaydırıp popüler yayınevlerini göster.</p>`
  },
  {
    id: 'ara', label: 'Arama', theme: 'light', phone: go('#/ara'),
    html: step(2, 'Arama', 'Arama', 'Ziyaretçi bir yazarın ya da yayınevinin adını yazar, sonuç anında gelir. Türkçe karakter ya da tam yazım gerekmez; aramak istemeyen tüm listeyi görebilir.',
      [['info', 'Danışmaya gelen soru azalır'], ['users', 'Her katılımcı aranabilir'], ['search', 'Yazım hatasında bile sonuç verir']],
      [['“Menteş” ara', m('#/ara?q=mentes'), 'search']]),
    notes: `<p>“mentes” diye ş olmadan yazıldığında bile Murat Menteş’in çıktığını göster.</p>`
  },
  {
    id: 'program', label: 'Program', theme: 'light', phone: go('#/program'),
    html: step(3, 'Program', 'Program', 'Beş günün bütün imza, söyleşi ve çocuk etkinlikleri saat sırasıyla bu ekranda. Ziyaretçi günü ve türü seçer, o an süren etkinliği hemen görür.',
      [['book', 'Basılı programa gerek kalmaz'], ['bell', 'Değişiklik anında herkese ulaşır'], ['heart', 'Ziyaretçi ilgisine göre seçer']],
      [['Söyleşileri göster', m('#/program?tur=soylesi'), 'cal']]),
    notes: `<p>Kırmızı “şimdi” çizgisini göster, başka bir güne dokun. Sonra söyleşileri süz.</p>`
  },
  {
    id: 'etkinlik', label: 'Etkinlik detayı', theme: 'light', phone: go('#/etkinlik/e8'),
    html: step(4, 'Etkinlik detayı', 'Etkinlik detayı', 'Bir etkinliğe dokununca saati, yeri, süresi ve konuşmacıları açılır. Ziyaretçi etkinliği planına ekler ya da salonun krokideki yerine gider.',
      [['users', 'Söyleşi salonları daha dolu'], ['qr', 'Katılım QR ile ölçülür'], ['pen', 'Konuşmacılar öne çıkar']],
      [['Krokide göster', m('#/konum/A-504'), 'map']]),
    notes: `<p>Söyleşi detayında “Etkinlik hakkında” ve “Konuşmacılar”ı göster. “Krokide göster” ayrı bir ekranda açılır; geri tuşu etkinliğe döndürür.</p>`
  },
  {
    id: 'yazar', label: 'Yazar ve kitaplar', theme: 'light', phone: go('#/yazar/murat'),
    html: step(5, 'Yazar', 'Yazar ve kitapları', 'Yazarın sayfasında biyografisi, fuardaki imza günleri ve kitapları yer alır. Bir kapağa dokununca kitap tam ekran açılır, tanıtımı okunur.',
      [['pen', 'İmza günlerine katılım artar'], ['book', 'Kitaplar standa yönlendirilir'], ['star', 'Yazarlar uygulamada görünür']],
      [['Kitabı aç', { type: 'book', id: 'korkma' }, 'book']]),
    notes: `<p>“Kitabı aç”: büyük kapak, tanıtım yazısı ve yazarın diğer kitapları.</p>`
  },
  {
    id: 'yayinevi', label: 'Yayınevi sayfası', theme: 'light', phone: go('#/yayinevi/alfa'),
    html: step(6, 'Yayınevi', 'Yayınevi sayfası', 'Her yayınevinin logosu, stant numarası, tanıtımı, standdaki imza günleri ve öne çıkan kitapları bu sayfada. Ziyaretçi tek dokunuşla standa yol bulur ya da yayınevinin web sitesine geçer.',
      [['tag', 'Katılımcıya ek görünürlük'], ['pin', 'Ziyaretçi standa yönlendirilir'], ['star', 'Satılabilir vitrin alanı']]),
    notes: `<p>Yayınevleri için mesaj: “Okur standa gelmeden yayınevini tanıyor.” Web sitesi butonu yayınevinin kendi sitesini açar.</p>`
  },
  {
    id: 'kroki', label: 'Kroki', theme: 'light', phone: go('#/harita'),
    html: step(7, 'Kroki', 'Fuar krokisi', 'Fuar alanı yayınevlerinin logolarıyla çizilidir; ziyaretçi logoya dokunur, yayınevinin kartı açılır. Altta WC, kafe, danışma gibi hizmet noktaları yer alır.',
      [['map', 'Yayınevleri logolarıyla görünür'], ['info', '“Nerede?” soruları azalır'], ['pin', 'WC, kafe, danışma tek dokunuşta']],
      [['Everest’i bul', m('#/harita?stand=A-410'), 'pin'], ['WC’yi göster', m('#/harita?yer=wc'), 'info']]),
    notes: `<p>“Krokiyi sıfırdan çizmedik, sizin 23. fuar krokinizden yaptık.” Hizmet noktalarını göster.</p>`
  },
  {
    id: 'hediyeler', label: 'Hediyeler', theme: 'light', phone: go('#/hediyeler'),
    html: step(8, 'Hediyeler', 'QR ile hediye', 'Her standda bir QR kod bulunur. Ziyaretçi okuttukça pasaportu dolar, belirli sayıya ulaşınca hediyesini Danışma’dan alır.',
      [['users', 'Her stant daha çok ziyaret alır'], ['gift', 'Sponsorlar hediyeyle görünür'], ['qr', 'Ziyaretler ölçülür']],
      [['QR okut', { type: 'scan' }, 'qr']]),
    notes: `<p>“QR okut”: kamera açılır, QR pasaporta eklenir; 3. QR’da “Hediye kazandın: Eylül bez çanta” çıkar.</p>`
  },
  {
    id: 'quiz', label: 'Yarışmalar ve sıralama', theme: 'light', phone: go('#/hediyeler?sekme=quiz'),
    html: step(9, 'Yarışmalar', 'Yarışmalar ve sıralama', 'Yazarlar, yayınevleri ve fuar hakkında kısa yarışmalar her an açık. Doğru cevaplar puan kazandırır; günün sıralamasında ilk üç hediye alır.',
      [['book', 'Yazar ve yayınevlerini tanıtır'], ['trophy', 'Sıralama ile rekabet'], ['gift', 'Sponsorlu ödüller']],
      [['Yarışma başlat', m('#/quiz/menetes'), 'star'], ['Sıralama', m('#/hediyeler?sekme=sira'), 'trophy']]),
    notes: `<p>Bir yarışma başlat, birkaç soru cevapla, sonra podyumu göster. Ödüllü canlı yarışma bir sonraki adımda.</p>`
  },
  {
    id: 'duyuru', label: 'Eylül paneli', theme: 'light', layout: 'panel', phone: go('#/'), cls: 'panel-slide',
    html: `
      <div class="stepbar"><span class="sb-n">Adım 10<em>/ ${TOUR_TOTAL}</em></span><span class="sb-name">Eylül paneli</span><span class="sb-track"><b style="width:${10 / TOUR_TOTAL * 100}%"></b></span></div>
      <h1 class="title" style="font-size:46px;margin:14px 0 10px">Eylül yönetir, <em>okurun telefonuna düşer.</em></h1>
      <p class="lead" style="font-size:20px;max-width:900px">Duyuru gönderir, canlı yarışmayı başlatır. Panelde <b>“Yarışmayı başlat”</b>a basın.</p>`,
    notes: `<p>Önce <b>“Yarışmayı başlat”</b>: telefona bildirim düşer, 3-2-1 sayacından sonra soru gelir; süre bitince doğru cevap ve oyuncuların yüzdeleri görünür. Herkes aynı anda oynadığı için adil.</p><p>Sonra bir duyuru şablonu seçip <b>“Gönder”</b>. Mesaj: <b>“Instagram’a koyup görülmesini ummak yerine, fuardaki herkesin telefonuna doğrudan.”</b></p>`
  },
  {
    id: 'planim', label: 'Planım', theme: 'light', phone: go('#/planim'),
    html: step(11, 'Planım', 'Planım', 'Ziyaretçinin kaydettiği etkinlikler gün gün burada toplanır. Sıradaki etkinlik en üstte durur, başlamadan önce hatırlatma gelir.',
      [['bell', 'Hatırlatmayla katılım artar'], ['heart', 'Hangi etkinliğe ilgi var, görülür'], ['clock', 'Sıradaki etkinlik hep elinde']]),
    notes: `<p>Sıradaki etkinliği ve gün gün planı göster.</p>`
  },
  {
    id: 'cocuk', label: 'Çocuk Şenliği', theme: 'light', extra: 'teal', phone: go('#/', 'cocuk'),
    html: step(12, '2027 · Çocuk Şenliği', 'Çocuk Şenliği', 'Fuar seçici değişince aynı uygulama Çocuk Şenliği’ne döner. Atölye ve gösteri programı, katılımcılar ve şenlik haritası ona göre açılır.',
      [['layers', 'Her etkinlik için yeni uygulama gerekmez'], ['users', 'Ziyaretçi kitlesi büyür'], ['kid', 'Atölye ve alanlar tek yerde']],
      [['Programı göster', m('#/program', 'cocuk'), 'cal'], ['Haritayı göster', m('#/harita', 'cocuk'), 'map']]),
    notes: `<p>Aynı uygulama, fuar değişince içerik de değişiyor. Bir kez indirilen uygulama Eylül’ün bütün etkinliklerinde kullanılır.</p>`
  },
  {
    id: 'kapanis', label: 'Kapanış', theme: 'dark', layout: 'center', plain: true, phone: go('#/'),
    html: `<div class="closing"><span class="cl-l">Fuar artık</span><span class="cl-r"><em>cebinizde.</em></span></div>`,
    notes: `<p>Telefonu bırak; istedikleri ekranı birlikte açabilirsiniz.</p>`
  }
];

/* ---------- Kurulum ---------- */
const stage = $('#stage'), slidesEl = $('#slides'), phone = $('#phone'), device = $('#device'), browser = $('#browser');
slidesEl.innerHTML = SLIDES.map((s, i) => `<section class="slide ${s.layout === 'full' ? 'wide' : ''} ${s.cls || ''}" data-i="${i}"><div class="col">${s.html}</div></section>`).join('');
$('#dots').innerHTML = SLIDES.map((s, i) => `<button data-dot="${i}" aria-label="${i + 1}. ${s.label}" title="${s.label}"></button>`).join('');

/* ---------- Ölçek ---------- */
function fit() {
  const s = Math.min(innerWidth / 1600, innerHeight / 900);
  stage.style.transform = `translate(-50%, -50%) scale(${s})`;
}
addEventListener('resize', fit); addEventListener('orientationchange', () => setTimeout(fit, 200)); fit();
// Dokunmatik ekranlar: sol taraftaki anlatım alanında yatay kaydırma slayt değiştirir.
let swipe = null;
slidesEl.addEventListener('touchstart', e => { const t = e.touches[0]; swipe = { x: t.clientX, y: t.clientY }; }, { passive: true });
slidesEl.addEventListener('touchend', e => {
  if (!swipe) return; const t = e.changedTouches[0]; const dx = t.clientX - swipe.x, dy = t.clientY - swipe.y; swipe = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
}, { passive: true });

/* ---------- Telefonla konuşma ---------- */
let phoneReady = false; const queue = [];
phone.addEventListener('load', () => { phoneReady = true; queue.splice(0).forEach(sendPhone); });
function sendPhone(msg) { if (!phoneReady) return queue.push(msg); phone.contentWindow.postMessage(msg, '*'); }
addEventListener('message', e => {
  const m = e.data || {};
  if (m.type === 'eylul-key') key(m.key);
  if (m.type === 'panel-push' && e.source === $('#panel').contentWindow) sendPhone({ type: 'push', notice: m.notice });
  if (m.type === 'panel-quiz' && e.source === $('#panel').contentWindow) sendPhone({ type: 'quiz-live', nid: m.nid });
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-msg]');
  if (b) { sendPhone(JSON.parse(b.dataset.msg)); b.classList.remove('pulse'); const acts = slideActs(); const k = acts.indexOf(b); if (k >= 0) { sub = k + 1; markActs(); } }
  if (e.target.closest('[data-next]')) return next();
  const d = e.target.closest('[data-dot]');
  if (d) show(Number(d.dataset.dot));
});

/* ---------- Gezinme ---------- */
let cur = -1, sub = 0;
// Her slayttaki "canlı göster" butonları → tuşuyla sırayla oynatılır.
const slideActs = () => [...document.querySelectorAll('.slide.on .act')];
function markActs() {
  slideActs().forEach((a, k) => { a.classList.toggle('done', k < sub); a.classList.toggle('upnext', k === sub); });
}
function next() {
  const acts = slideActs();
  if (sub < acts.length) { const a = acts[sub]; sendPhone(JSON.parse(a.dataset.msg)); sub++; markActs(); return; }
  show(cur + 1);
}
function prev() {
  if (sub > 0) {
    sub--;
    const acts = slideActs(), s = SLIDES[cur];
    if (sub > 0) sendPhone(JSON.parse(acts[sub - 1].dataset.msg)); else if (s.phone && s.phone.msg) sendPhone(s.phone.msg);
    markActs(); return;
  }
  show(cur - 1);
}
function show(i) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i));
  if (i === cur) return;
  const s = SLIDES[i];
  document.querySelectorAll('.slide').forEach((el, k) => { el.classList.toggle('on', k === i); el.classList.toggle('leave', k === cur && k !== i); });
  stage.className = 'stage ' + (s.theme === 'dark' ? 'dark ' : '') + (s.layout === 'full' ? 'full ' : '') + (s.plain ? 'plain ' : '') + (s.extra || '');
  document.body.classList.toggle('light', s.theme !== 'dark');
  device.classList.toggle('away', s.layout === 'full');
  device.classList.toggle('side', s.layout === 'panel');
  device.classList.toggle('center', s.layout === 'center');
  browser.classList.toggle('on', s.layout === 'panel');
  if (s.layout === 'panel') { const p = $('#panel'); if (!p.src) p.src = p.dataset.src; }
  if (s.phone && s.phone.msg) sendPhone(s.phone.msg);
  document.querySelectorAll('[data-dot]').forEach((d, k) => d.classList.toggle('on', k === i));
  $('#count').textContent = String(i + 1).padStart(2, '0') + ' / ' + SLIDES.length;
  $('#bar').style.width = ((i + 1) / SLIDES.length * 100) + '%';
  $('#notes-body').innerHTML = s.notes || '';
  $('#notes-step').textContent = (i + 1) + '. slayt';
  cur = i; sub = 0; markActs();
  history.replaceState(null, '', '#' + (i + 1));
}
function key(k) {
  if (['ArrowRight', 'PageDown', ' '].includes(k)) next();
  if (['ArrowLeft', 'PageUp'].includes(k)) prev();
  if (k === 'Home') show(0);
  if (k === 'End') show(SLIDES.length - 1);
  if (k === 'n' || k === 'N') $('#notes').hidden = !$('#notes').hidden;
  if (k === 'f' || k === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.(); }
}
document.addEventListener('keydown', e => { if (e.metaKey || e.ctrlKey || e.altKey) return; if (e.key === ' ') e.preventDefault(); key(e.key); });
$('#next').onclick = next;
$('#demo-push').onclick = () => { sendPhone({ type: 'push' }); const b = $('#demo-push'); b.classList.remove('sent'); void b.offsetWidth; b.classList.add('sent'); };
$('#prev').onclick = prev;
$('#notes-close').onclick = () => { $('#notes').hidden = true; };

const start = parseInt(location.hash.slice(1), 10);
show(Number.isFinite(start) ? start - 1 : 0);
if (new URLSearchParams(location.search).has('notlar')) $('#notes').hidden = false;
