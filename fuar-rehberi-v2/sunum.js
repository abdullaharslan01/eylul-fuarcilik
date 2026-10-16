/* Eylül Fuar Rehberi — tanıtım sunumu */

const $ = s => document.querySelector(s);
// Uygulama turu: her adım soldaki anlatımı ve telefonun açacağı ekranı birlikte taşır.
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  cal: '<rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H11v17H5.5A1.5 1.5 0 0 0 4 21.5zM20 4.5A1.5 1.5 0 0 0 18.5 3H13v17h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
  pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  map: '<path d="m9 4-6 2.5v14L9 18l6 2.5 6-2.5v-14L15 6.5z"/><path d="M9 4v14M15 6.5v14"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  gift: '<rect x="3.5" y="8.5" width="17" height="12" rx="2"/><path d="M3.5 12.5h17M12 8.5v12M12 8.5S10.8 4 8 4.6c-2.2.5-1.6 3.9 4 3.9zM12 8.5s1.2-4.5 4-3.9c2.2.5 1.6 3.9-4 3.9z"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.1M17 21h4v-4M14 21v-3"/>',
  trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9.5 18h5"/>',
  star: '<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5l-5.5 2.9 1-6.3L3 9.7l6.2-.9z"/>',
  bell: '<path d="M18 9a6 6 0 0 0-12 0c0 6.5-2.5 8-2.5 8h17S18 15.5 18 9M10 20.5a2.2 2.2 0 0 0 4 0"/>',
  heart: '<path d="M12 20.5s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8c0 6.3-8 11-8 11z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.1"/>',
  kid: '<circle cx="12" cy="6" r="3"/><path d="M8 21v-5l-2-4 6-2 6 2-2 4v5M10 21v-4h4v4"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5"/>'
};
const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const TOUR_TOTAL = 12;
// Buton: [başlık, ne olacağı, telefona gidecek mesaj, ikon]
const actions = list => list.length ? `<div class="acts">${list.map(([t, sub, msg, ic], k) => `<button class="act${k ? ' ghost' : ''}" data-msg='${JSON.stringify(msg)}'><span class="a-ico">${icon(ic)}</span><span class="a-txt"><b>${t}</b><small>${sub}</small></span><span class="a-go">${icon('play')}</span></button>`).join('')}</div>` : '';
const step = (n, name, title, lead, cards, acts) => `
      <div class="stepbar"><span class="sb-n">Adım ${String(n).padStart(2, '0')}<em>/ ${TOUR_TOTAL}</em></span><span class="sb-name">${name}</span><span class="sb-track"><b style="width:${n / TOUR_TOTAL * 100}%"></b></span></div>
      <h1 class="title">${title}</h1>
      <p class="lead">${lead}</p>
      <div class="fcards">${cards.map(([ic, t, d]) => `<div class="fcard"><span class="f-ico">${icon(ic)}</span><b>${t}</b><small>${d}</small></div>`).join('')}</div>
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
    html: step(1, 'Ana sayfa', 'Fuar günü<br><em>tek ekranda.</em>',
      'Okur uygulamayı açınca bugünü görür.',
      [['layers', 'Dönen vitrin', 'Fuarın öne çıkanları'], ['pen', 'Bugün imzada', 'Kendi kendine kayar'], ['book', 'Popüler yayınevleri', 'Tek dokunuşla vitrin']],
      [['Duyuruları aç', 'Eylül’ün son duyuruları', m('#/bildirimler'), 'bell'], ['Ana sayfaya dön', 'Baştan göster', m('#/'), 'home']]),
    notes: `<p>Banner’ın kendi kendine döndüğünü, “Bugün imzada” şeridinin kaydığını göster. Aşağı kaydırıp <b>Popüler yayınevleri</b>ni göster.</p>`
  },
  {
    id: 'ara', label: 'Arama', theme: 'light', phone: go('#/ara'),
    html: step(2, 'Arama', 'Yaz,<br><em>hemen bul.</em>',
      'Yazar ya da yayınevi adını yazmak yeter.',
      [['search', 'Akıllı arama', 'Türkçe karakter şart değil'], ['users', 'Filtreler', 'Yazar · Yayınevi'], ['tag', '27 yayınevi', 'Tam liste tek ekranda']],
      [['“mentes” ara', 'ş yazmadan bile bulur', m('#/ara?q=mentes'), 'search'], ['Tüm yayınevleri', 'Logolu liste', m('#/ara?tur=yayinevi'), 'book']]),
    notes: `<p>“mentes” diye <b>ş</b> olmadan yazıldığında bile Murat Menteş’in çıktığını göster.</p>`
  },
  {
    id: 'program', label: 'Program', theme: 'light', phone: go('#/program'),
    html: step(3, 'Program', 'Kim, ne zaman,<br><em>nerede.</em>',
      'Beş günün tüm imza, söyleşi ve çocuk etkinlikleri.',
      [['cal', 'Gün gün program', 'İmza · Söyleşi · Çocuk'], ['clock', '“Şimdi” çizgisi', 'Canlı etkinlik görünür'], ['search', 'Programda ara', 'Yazara göre süz']],
      [['Programda ara', 'Buket Uzuner’in etkinlikleri', m('#/program?q=Buket'), 'search'], ['Söyleşiler', 'Sadece söyleşileri göster', m('#/program?tur=soylesi'), 'cal']]),
    notes: `<p>Kırmızı “şimdi” çizgisini göster. Başka bir güne dokun; sonra “Programda ara” ile Buket Uzuner’in tüm etkinliklerini listele.</p>`
  },
  {
    id: 'etkinlik', label: 'Etkinlik detayı', theme: 'light', phone: go('#/etkinlik/e8'),
    html: step(4, 'Etkinlik detayı', 'Her etkinliğin<br><em>tüm bilgisi.</em>',
      'Detay açılınca alt menü gizlenir, geri tuşuyla dönülür.',
      [['info', 'Hakkında', 'Süre, giriş, yer'], ['users', 'Konuşmacılar', 'Yazar sayfalarına geçiş'], ['qr', 'Katılım QR’ı', 'Salonda okut, puan kazan']],
      [['Bir imzayı aç', 'Murat Menteş · 14.00', m('#/etkinlik/e7'), 'pen'], ['Krokide göster', 'Ayrı ekranda açılır', m('#/konum/A-504'), 'map']]),
    notes: `<p>Söyleşi detayında <b>Etkinlik hakkında</b>, <b>Konuşmacılar</b> ve <b>Katılım QR’ı</b>nı göster. “Krokide göster” ayrı bir ekran açar; geri tuşu etkinliğe döndürür.</p>`
  },
  {
    id: 'yazar', label: 'Yazar ve kitaplar', theme: 'light', phone: go('#/yazar/murat'),
    html: step(5, 'Yazar ve kitaplar', 'Kapağa dokun,<br><em>kitabı tanı.</em>',
      'Kapağa dokununca tam ekran kitap sayfası açılır.',
      [['pen', 'Biyografi', 'Fuardaki imzalarıyla'], ['book', 'Kitap sayfası', 'Kapak ve tanıtım'], ['map', 'Yayınevine git', 'Krokide göster']],
      [['Kitabı aç', 'Korkma Ben Varım', { type: 'book', id: 'korkma' }, 'book'], ['Başka yazar', 'Buket Uzuner', m('#/yazar/buket'), 'pen']]),
    notes: `<p>“Kitabı aç”a bas: büyük kapak, tanıtım yazısı ve yazarın diğer kitapları. Alttaki kitaplara dokunarak kitaplar arasında gezebilirsin.</p>`
  },
  {
    id: 'yayinevi', label: 'Yayınevi sayfası', theme: 'light', phone: go('#/yayinevi/alfa'),
    html: step(6, 'Yayınevi sayfası', 'Her yayınevinin<br><em>vitrini.</em>',
      'Okur standa gelmeden yayınevini tanır.',
      [['tag', 'Tanıtım', 'Türler ve hakkında'], ['pen', 'İmzalar', 'Standdaki etkinlikler'], ['link', 'Web sitesi', 'Tek dokunuşla']],
      [['Everest', 'Yayınevi sayfası', m('#/yayinevi/everest'), 'book'], ['İletişim', 'Logosu olmayan yayınevi', m('#/yayinevi/iletisim'), 'book']]),
    notes: `<p>Yayınevleri için mesaj: <b>“Her katılımcının uygulamada kendi vitrini var.”</b> Web sitesi butonu yayınevinin kendi sitesini açar.</p>`
  },
  {
    id: 'kroki', label: 'Kroki', theme: 'light', phone: go('#/harita'),
    html: step(7, 'Kroki', 'Stant numarası değil,<br><em>logo.</em>',
      'Ziyaretçi “A-504”ü bilmez, Alfa’yı bilir.',
      [['map', 'Logolu kroki', '27 yayınevi'], ['pin', 'Dokun, bul', 'Yayınevi kartı açılır'], ['info', 'Hizmet noktaları', 'WC, kafe, mescit…']],
      [['Everest nerede?', 'Logo seçili gelir', m('#/harita?stand=A-410'), 'pin'], ['WC nerede?', 'Hizmet noktası', m('#/harita?yer=wc'), 'info']]),
    notes: `<p>Vurgula: <b>“Krokiyi sıfırdan çizmedik, sizin 23. fuar krokinizden yaptık.”</b> Alttaki hizmet noktalarını yana kaydırarak göster.</p>`
  },
  {
    id: 'hediyeler', label: 'Hediyeler', theme: 'light', phone: go('#/hediyeler'),
    html: step(8, 'Hediyeler', 'Stantları gez,<br><em>hediyeni al.</em>',
      'Okur fuarı gezer, yayınevleri ziyaret alır.',
      [['qr', 'QR okut', 'Her stantta bir QR'], ['gift', '3 QR’da çanta', '6 QR’da kitap'], ['star', 'Görevler', '“Alfa standına uğra”']],
      [['QR okut', 'Kamera açılır, QR eklenir', { type: 'scan' }, 'qr'], ['Hediyeler', 'Görseller ve stok', m('#/hediyeler'), 'gift']]),
    notes: `<p>“QR okut”a bas: kamera açılır, QR pasaporta eklenir; 3. QR’da <b>“Hediye kazandın: Eylül bez çanta”</b> çıkar. Hediyeleri yana kaydırarak göster.</p>`
  },
  {
    id: 'quiz', label: 'Quiz ve sıralama', theme: 'light', phone: go('#/hediyeler?sekme=quiz'),
    html: step(9, 'Quiz ve sıralama', 'Bil, puan topla,<br><em>öne geç.</em>',
      'Sorular her oyuncuya karışık gelir; cevap paylaşmak işe yaramaz.',
      [['star', 'Her zaman açık', 'Yazar ve yayınevi quiz’leri'], ['trophy', 'Puan', 'QR 20 · doğru cevap 10'], ['users', 'Podyum', 'İlk 3’e hediye']],
      [['Quiz başlat', 'Murat Menteş quizi', m('#/quiz/menetes'), 'star'], ['Sıralama', 'Podyum ve liderler', m('#/hediyeler?sekme=sira'), 'trophy']]),
    notes: `<p>Bir quiz başlat, iki üç soru cevapla. Sonra Sıralama’da podyumu göster. Ödüllü olan ise bir sonraki adımdaki canlı yarışma.</p>`
  },
  {
    id: 'duyuru', label: 'Eylül paneli', theme: 'light', layout: 'panel', phone: go('#/'), cls: 'panel-slide',
    html: `
      <div class="stepbar"><span class="sb-n">Adım 10<em>/ ${TOUR_TOTAL}</em></span><span class="sb-name">Eylül paneli</span><span class="sb-track"><b style="width:${10 / TOUR_TOTAL * 100}%"></b></span></div>
      <h1 class="title" style="font-size:52px;margin:14px 0 10px">Eylül yönetir, <em>okurun telefonuna düşer.</em></h1>
      <p class="lead" style="font-size:20px;max-width:900px">Duyuru gönderir, canlı yarışmayı başlatır. Panelde <b>“Yarışmayı başlat”</b>a basın.</p>`,
    notes: `<p>Önce <b>“Yarışmayı başlat”</b>: telefona bildirim düşer, 3-2-1 sayacından sonra soru gelir; süre bitince doğru cevap ve oyuncuların yüzdeleri görünür. Herkes aynı anda oynadığı için adil.</p><p>Sonra bir duyuru şablonu seçip <b>“Gönder”</b>. Mesaj: <b>“Instagram’a koyup görülmesini ummak yerine, fuardaki herkesin telefonuna doğrudan.”</b></p>`
  },
  {
    id: 'planim', label: 'Planım', theme: 'light', phone: go('#/planim'),
    html: step(11, 'Planım', 'Okurun<br><em>kişisel fuarı.</em>',
      'Kaydedilen etkinlikler gün gün, sıradaki en üstte.',
      [['heart', 'Kayıtlı etkinlikler', 'Gün gün plan'], ['clock', 'Sıradaki', 'Ne zaman, nerede'], ['bell', 'Hatırlatma', '15 dakika önce']],
      [['Planım', 'Kişisel akış', m('#/planim'), 'heart'], ['Programa ekle', 'Pazar programı', m('#/program?gun=3'), 'cal']]),
    notes: `<p>Planım’da sıradaki etkinliği ve gün gün planı göster. Programdan bir etkinliğe kaydet işareti koyunca buraya eklendiğini göster.</p>`
  },
  {
    id: 'cocuk', label: 'Çocuk Şenliği', theme: 'light', extra: 'teal', phone: go('#/', 'cocuk'),
    html: step(12, '2027 · Çocuk Şenliği', 'Aynı uygulama,<br><em>her fuarda.</em>',
      'Fuar değişince program, katılımcılar ve harita da değişir.',
      [['kid', 'Atölyeler', 'Yaşa göre etkinlik'], ['users', '11 katılımcı', 'Atölye, tiyatro, yayınevi'], ['map', 'Şenlik haritası', '6 renkli alan']],
      [['Şenlik programı', 'Çocuk etkinlikleri', m('#/program', 'cocuk'), 'cal'], ['Şenlik haritası', 'Alanlara dokun', m('#/harita', 'cocuk'), 'map']]),
    notes: `<p>Telefon tema değiştirdi: aynı uygulama, Çocuk Şenliği. Bir kez indirilen uygulama Eylül’ün bütün etkinliklerinde kullanılır.</p>`
  },
  {
    id: 'birlikte', label: 'Önerimiz', theme: 'dark', layout: 'full', plain: true,
    html: `
      <span class="kicker">Önerimiz</span>
      <h1 class="title">Basit bir <em>kazan-kazan.</em></h1>
      <div class="deal">
        <div class="side b"><div class="who"><img src="assets/bulbi-logo.png" alt="Bulbi"><span>üstlenir</span></div>
          <ul><li>Uygulamayı tasarlar ve geliştirir</li><li>iOS, Android ve web’de yayınlar</li><li>Fuar boyunca teknik destek verir</li></ul></div>
        <div class="side e"><div class="who"><img src="assets/eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"><span>katkısı</span></div>
          <ul><li>Program ve katılımcı listesini paylaşır</li><li>Fuarlarda Bulbi’ye tanıtım standı verir</li><li>Uygulamada “Bulbi ile” görünürlüğü sağlar</li></ul></div>
      </div>
      <p class="win">İlk adım: <b>4–13 Aralık 2026, 24. Ankara Kitap Fuarı.</b></p>`,
    notes: `<p>Teklifi sade söyle: <b>“Uygulamayı biz yapıyoruz. Karşılığında fuarlarınızda yer almak ve kendimizi tanıtmak istiyoruz.”</b></p>`
  },
  {
    id: 'kapanis', label: 'Teşekkürler', theme: 'dark', phone: go('#/'),
    html: `
      <span class="kicker">Teşekkürler</span>
      <h1 class="title">Fuar artık<br><em>cebinizde.</em></h1>
      <div class="qr-box" id="qr-box"></div>`,
    notes: `<p>Sorulara geçerken telefonu bırak; istedikleri ekranı birlikte açabilirsiniz.</p>`
  }
];

/* ---------- Kurulum ---------- */
const stage = $('#stage'), slidesEl = $('#slides'), phone = $('#phone'), device = $('#device'), browser = $('#browser');
slidesEl.innerHTML = SLIDES.map((s, i) => `<section class="slide ${s.layout === 'full' ? 'wide' : ''} ${s.cls || ''}" data-i="${i}"><div class="col">${s.html}</div></section>`).join('');
$('#dots').innerHTML = SLIDES.map((s, i) => `<button data-dot="${i}" aria-label="${i + 1}. ${s.label}" title="${s.label}"></button>`).join('');

// Kapanış QR: sunum herkese açık bir adresteyse o adrese, değilse ?url= ile verilen adrese gider.
(function closingQR() {
  const given = new URLSearchParams(location.search).get('url');
  const local = /^(localhost|127\.|\[::1\]|0\.0\.0\.0)/.test(location.hostname) || location.protocol === 'file:';
  const target = given || (!local ? new URL('app/', location.href).href : null);
  const box = $('#qr-box');
  if (target) {
    const q = qrcode(0, 'M'); q.addData(target); q.make();
    box.innerHTML = `<div class="qr">${q.createSvgTag({ cellSize: 6, margin: 0, scalable: true })}</div><p><b>Şimdi telefonunuzda deneyin.</b>Kamerayı QR’a tutun, uygulama tarayıcıda açılır. Kurulum gerekmez.</p>`;
  } else {
    box.innerHTML = `<p style="max-width:600px"><b>Sorularınızı alalım.</b>Uygulama sağdaki telefonda çalışıyor; dilediğiniz ekranı birlikte açabiliriz.</p>`;
  }
})();

/* ---------- Ölçek ---------- */
function fit() {
  const s = Math.min(innerWidth / 1600, innerHeight / 900);
  stage.style.transform = `translate(-50%, -50%) scale(${s})`;
}
addEventListener('resize', fit); fit();

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
  if (b) { sendPhone(JSON.parse(b.dataset.msg)); b.classList.remove('pulse'); }
  const d = e.target.closest('[data-dot]');
  if (d) show(Number(d.dataset.dot));
});

/* ---------- Gezinme ---------- */
let cur = -1;
function show(i) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i));
  if (i === cur) return;
  const s = SLIDES[i];
  document.querySelectorAll('.slide').forEach((el, k) => { el.classList.toggle('on', k === i); el.classList.toggle('leave', k === cur && k !== i); });
  stage.className = 'stage ' + (s.theme === 'dark' ? 'dark ' : '') + (s.layout === 'full' ? 'full ' : '') + (s.plain ? 'plain ' : '') + (s.extra || '');
  document.body.classList.toggle('light', s.theme !== 'dark');
  device.classList.toggle('away', s.layout === 'full');
  device.classList.toggle('side', s.layout === 'panel');
  browser.classList.toggle('on', s.layout === 'panel');
  if (s.layout === 'panel') { const p = $('#panel'); if (!p.src) p.src = p.dataset.src; }
  if (s.phone && s.phone.msg) sendPhone(s.phone.msg);
  document.querySelectorAll('[data-dot]').forEach((d, k) => d.classList.toggle('on', k === i));
  const nx = SLIDES[i + 1];
  $('#nowbar').innerHTML = `<span>Şimdi: <b>${s.label}</b></span>${nx ? `<button data-dot="${i + 1}">Sıradaki: ${nx.label} →</button>` : ''}`;
  $('#count').textContent = String(i + 1).padStart(2, '0') + ' / ' + SLIDES.length;
  $('#bar').style.width = ((i + 1) / SLIDES.length * 100) + '%';
  $('#notes-body').innerHTML = s.notes || '';
  $('#notes-step').textContent = (i + 1) + '. slayt';
  cur = i;
  history.replaceState(null, '', '#' + (i + 1));
}
function key(k) {
  if (['ArrowRight', 'PageDown', ' '].includes(k)) show(cur + 1);
  if (['ArrowLeft', 'PageUp'].includes(k)) show(cur - 1);
  if (k === 'Home') show(0);
  if (k === 'End') show(SLIDES.length - 1);
  if (k === 'n' || k === 'N') $('#notes').hidden = !$('#notes').hidden;
  if (k === 'f' || k === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.(); }
}
document.addEventListener('keydown', e => { if (e.metaKey || e.ctrlKey || e.altKey) return; if (e.key === ' ') e.preventDefault(); key(e.key); });
$('#next').onclick = () => show(cur + 1);
$('#demo-push').onclick = () => { sendPhone({ type: 'push' }); const b = $('#demo-push'); b.classList.remove('sent'); void b.offsetWidth; b.classList.add('sent'); };
$('#prev').onclick = () => show(cur - 1);
$('#notes-close').onclick = () => { $('#notes').hidden = true; };
$('#help-chip').onclick = () => { $('#notes').hidden = false; };

const start = parseInt(location.hash.slice(1), 10);
show(Number.isFinite(start) ? start - 1 : 0);
if (new URLSearchParams(location.search).has('notlar')) $('#notes').hidden = false;
