/* Eylül Fuar Rehberi — tanıtım sunumu */

const $ = s => document.querySelector(s);
// Uygulama turu: her adım soldaki anlatımı ve telefonun açacağı ekranı birlikte taşır.
const tryBtn = (label, msg, sym = '▶', ghost = false) => `<button${ghost ? ' class="ghost"' : ''} data-msg='${JSON.stringify(msg)}'><i>${sym}</i>${label}</button>`;
const step = (n, name, title, lead, points, tries) => `
      <span class="kicker"><span class="num">${String(n).padStart(2, '0')}</span>${name}</span>
      <h1 class="title">${title}</h1>
      <p class="lead">${lead}</p>
      <ul class="points">${points.map(p => `<li>${p}</li>`).join('')}</ul>
      ${tries.length ? `<div class="try"><span>Canlı dene</span>${tries.join('')}</div>` : ''}`;
const go = (hash, fair = 'ankara') => ({ msg: { type: 'go', fair, hash } });

const SLIDES = [
  {
    id: 'kapak', theme: 'dark', phone: { msg: { type: 'reset', hash: '#/' } },
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
    id: 'sorun', theme: 'dark', layout: 'full',
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
    id: 'ana', theme: 'light', phone: go('#/'),
    html: step(1, 'Ana sayfa', 'Fuar günü<br><em>tek ekranda.</em>',
      'Okur uygulamayı açınca bugünü görür: dönen vitrin, kısayollar, şu an imzada olan yazarlar.',
      ['Kendi kendine dönen banner', 'Program · Kroki · Hediyeler · Duyurular', 'Sağa kayan “Bugün imzada” ve popüler yayınevleri'],
      [tryBtn('Duyurular', { type: 'go', hash: '#/bildirimler' }, '🔔'), tryBtn('Ana sayfa', { type: 'go', fair: 'ankara', hash: '#/' }, '⌂', true)]),
    notes: `<p>Banner’ın kendi kendine döndüğünü, “Bugün imzada” şeridinin kaydığını göster. Aşağı kaydırıp <b>Popüler yayınevleri</b>ni göster.</p>`
  },
  {
    id: 'ara', theme: 'light', phone: go('#/ara'),
    html: step(2, 'Arama', 'Yaz,<br><em>hemen bul.</em>',
      'Yazar ya da yayınevi adını yazmak yeter; Türkçe karakter yazmasan da bulur.',
      ['Yazar ve yayınevi araması', 'Tümü · Yazarlar · Yayınevleri filtresi', 'Boşken 27 yayınevinin tam listesi'],
      [tryBtn('“mentes” ara', { type: 'go', hash: '#/ara?q=mentes' }, '⌕'), tryBtn('Tüm yayınevleri', { type: 'go', hash: '#/ara?tur=yayinevi' }, '▤', true)]),
    notes: `<p>“mentes” diye <b>ş</b> olmadan yazıldığında bile Murat Menteş’in çıktığını göster.</p>`
  },
  {
    id: 'program', theme: 'light', phone: go('#/program'),
    html: step(3, 'Program', 'Kim, ne zaman,<br><em>nerede.</em>',
      'Beş günün bütün imzaları, söyleşileri ve çocuk etkinlikleri. Programın içinde de arama var.',
      ['Gün ve türe göre filtre', '“Şimdi” çizgisi ve canlı etkinlik', 'Programda yazar ya da etkinlik ara'],
      [tryBtn('Programda ara', { type: 'go', hash: '#/program?q=Buket' }, '⌕'), tryBtn('Söyleşiler', { type: 'go', hash: '#/program?tur=soylesi' }, '♪', true)]),
    notes: `<p>Kırmızı “şimdi” çizgisini göster. Başka bir güne dokun; sonra “Programda ara” ile Buket Uzuner’in tüm etkinliklerini listele.</p>`
  },
  {
    id: 'etkinlik', theme: 'light', phone: go('#/etkinlik/e8'),
    html: step(4, 'Etkinlik detayı', 'Her etkinliğin<br><em>tüm bilgisi.</em>',
      'Saat, yer, süre ve giriş bilgisi; etkinlik hakkında yazı ve konuşmacılar. Detayda alt menü gizlenir, geri tuşuyla dönülür.',
      ['Süre, giriş ve yer', 'Konuşmacılar ve yazar sayfaları', 'Planıma ekle · Krokide göster'],
      [tryBtn('Bir imzayı aç', { type: 'go', hash: '#/etkinlik/e7' }, '✎'), tryBtn('Krokide göster', { type: 'go', hash: '#/konum/A-504' }, '⌖', true)]),
    notes: `<p>Söyleşi detayında <b>Etkinlik hakkında</b> ve <b>Konuşmacılar</b>ı göster. Sonra “Krokide göster”: kroki ayrı bir ekran olarak açılır, geri tuşu seni etkinliğe döndürür.</p>`
  },
  {
    id: 'yazar', theme: 'light', phone: go('#/yazar/murat'),
    html: step(5, 'Yazar ve kitaplar', 'Kapağa dokun,<br><em>kitabı tanı.</em>',
      'Yazar sayfasında biyografi, fuardaki imzalar ve kitaplar var. Kapağa dokununca tam ekran kitap sayfası açılır.',
      ['Biyografi ve fuardaki imzalar', 'Tam ekran kitap sayfası', 'Yayınevini krokide gör'],
      [tryBtn('Kitabı aç', { type: 'book', id: 'korkma' }, '▤'), tryBtn('Buket Uzuner', { type: 'go', hash: '#/yazar/buket' }, '✎', true)]),
    notes: `<p>“Kitabı aç”a bas: büyük kapak, tanıtım yazısı ve yazarın diğer kitapları. Alttaki diğer kitaplara dokunarak kitaplar arasında gezebilirsin.</p>`
  },
  {
    id: 'yayinevi', theme: 'light', phone: go('#/yayinevi/alfa'),
    html: step(6, 'Yayınevi sayfası', 'Her yayınevinin<br><em>vitrini.</em>',
      'Tanıtım yazısı, standdaki imzalar, yazarlar, öne çıkan kitaplar ve yayınevinin web sitesine bağlantı.',
      ['Tür etiketleri ve tanıtım', 'Standdaki imzalar ve kitaplar', 'Web sitesi ve kroki bağlantısı'],
      [tryBtn('Everest', { type: 'go', hash: '#/yayinevi/everest' }, '▶'), tryBtn('İletişim', { type: 'go', hash: '#/yayinevi/iletisim' }, '▶', true)]),
    notes: `<p>Yayınevleri için mesaj: <b>“Her katılımcının uygulamada kendi vitrini var; okur standa gelmeden onu tanıyor.”</b> Web sitesi butonu yayınevinin kendi sitesini açar.</p>`
  },
  {
    id: 'kroki', theme: 'light', phone: go('#/harita'),
    html: step(7, 'Kroki', 'Stant numarası değil,<br><em>logo.</em>',
      'Ziyaretçi “A-504”ü bilmez, Alfa’yı bilir. Krokide yayınevlerinin logoları görünür; logoya dokunmak yeter.',
      ['27 yayınevi logolarıyla', 'Logoya dokun, yayınevi kartını aç', 'WC, kafe, mescit, ilk yardım ve daha fazlası'],
      [tryBtn('Everest nerede?', { type: 'go', hash: '#/harita?stand=A-410' }, '⌖'), tryBtn('WC nerede?', { type: 'go', hash: '#/harita?yer=wc' }, 'i', true)]),
    notes: `<p>Vurgula: <b>“Krokiyi sıfırdan çizmedik, sizin 23. fuar krokinizden yaptık.”</b> Alttaki hizmet noktalarını yana kaydırarak göster.</p>`
  },
  {
    id: 'hediyeler', theme: 'light', phone: go('#/hediyeler'),
    html: step(8, 'Hediyeler', 'Stantları gez,<br><em>hediyeni al.</em>',
      'Okur stantlardaki QR’ları okutur; yeterli QR’da hediyesini Danışma’dan alır. Okur bütün fuarı gezer, yayınevleri ziyaret alır.',
      ['3 QR’da bez çanta, 6 QR’da kitap', 'Görevler: “Alfa standına uğra”', 'Hediyeler görselleriyle, stok bilgisiyle'],
      [tryBtn('QR okut', { type: 'scan' }, '▦'), tryBtn('Hediyeler', { type: 'go', hash: '#/hediyeler' }, '🎁', true)]),
    notes: `<p>“QR okut”a bas: kamera açılır, bir saniye sonra QR pasaporta eklenir; 3. QR’da <b>“Hediye kazandın: Eylül bez çanta”</b> çıkar. Hediyeleri yana kaydırarak göster.</p>`
  },
  {
    id: 'quiz', theme: 'light', phone: go('#/hediyeler?sekme=quiz'),
    html: step(9, 'Quiz ve sıralama', 'Bil, puan topla,<br><em>öne geç.</em>',
      'Her zaman açık quiz’lerde sorular her oyuncuya karışık gelir. Puanlar sıralamaya yazılır; gün sonunda ilk 10’a imzalı kitap.',
      ['Yazar, yayınevi ve fuar quiz’leri', 'Her doğru 10, her QR 20 puan', 'Senin sıran ve günün liderleri'],
      [tryBtn('Quiz başlat', { type: 'go', hash: '#/quiz/menetes' }, '★'), tryBtn('Sıralama', { type: 'go', hash: '#/hediyeler?sekme=sira' }, '≡', true)]),
    notes: `<p>Bir quiz başlat, iki üç soru cevapla. Adalet için: <b>“Sorular havuzdan karışık geliyor; cevapları paylaşmak işe yaramıyor.”</b> Ödüllü olan ise bir sonraki slayttaki canlı yarışma.</p>`
  },
  {
    id: 'duyuru', theme: 'light', layout: 'panel', phone: go('#/'), cls: 'panel-slide',
    html: `
      <span class="kicker"><span class="num">10</span>Eylül paneli</span>
      <h1 class="title" style="font-size:52px;margin:16px 0 12px">Eylül yönetir, <em>okurun telefonuna düşer.</em></h1>
      <p class="lead" style="font-size:20px;max-width:900px">Duyuru gönderir, canlı yarışmayı başlatır. Panelde <b>“Yarışmayı başlat”</b>a basın.</p>`,
    notes: `<p>Önce <b>“Yarışmayı başlat”</b>: telefona bildirim düşer, 3-2-1 sayacından sonra soru gelir; süre bitince doğru cevap ve oyuncuların yüzdeleri görünür. Herkes aynı anda oynadığı için adil.</p><p>Sonra bir duyuru şablonu seçip <b>“Gönder”</b>. Mesaj: <b>“Instagram’a koyup görülmesini ummak yerine, fuardaki herkesin telefonuna doğrudan.”</b></p>`
  },
  {
    id: 'planim', theme: 'light', phone: go('#/planim'),
    html: step(11, 'Planım', 'Okurun<br><em>kişisel fuarı.</em>',
      'Kaydedilen etkinlikler gün gün; sıradaki etkinlik ve QR ilerlemesi en üstte.',
      ['Kayıtlı etkinlik özeti', 'Sıradaki etkinlik', 'Başlamadan 15 dakika önce hatırlatma'],
      [tryBtn('Planım', { type: 'go', hash: '#/planim' }, '♥'), tryBtn('Programa ekle', { type: 'go', hash: '#/program?gun=3' }, '+', true)]),
    notes: `<p>Planım’da sıradaki etkinliği ve gün gün planı göster. Programdan bir etkinliğe kaydet işareti koyunca buraya eklendiğini göster.</p>`
  },
  {
    id: 'cocuk', theme: 'light', extra: 'teal', phone: go('#/', 'cocuk'),
    html: `
      <span class="kicker" style="color:var(--teal)"><span class="num" style="background:#ffb21f">12</span>2027 · Çocuk Şenliği</span>
      <h1 class="title">Aynı uygulama,<br><em>her fuarda.</em></h1>
      <p class="lead">Önümüzdeki yıl çocuk etkinliklerinde de aynı uygulama kullanılır. Fuar değişince program, katılımcılar, harita ve hediyeler o etkinliğe göre açılır.</p>
      <ul class="points"><li>Atölye ve gösteri programı</li><li>11 katılımcı, 6 alanlı şenlik haritası</li><li>Alan QR’larıyla çocuk hediyeleri</li></ul>
      <div class="try"><span>Canlı dene</span>${tryBtn('Şenlik programı', { type: 'go', fair: 'cocuk', hash: '#/program' }, '▶')}${tryBtn('Şenlik haritası', { type: 'go', fair: 'cocuk', hash: '#/harita' }, '⌖', true)}${tryBtn('Katılımcılar', { type: 'go', fair: 'cocuk', hash: '#/katilimcilar' }, '☺', true)}</div>`,
    notes: `<p>Telefon tema değiştirdi: aynı uygulama, Çocuk Şenliği. Bir kez indirilen uygulama Eylül’ün bütün etkinliklerinde kullanılır.</p>`
  },
  {
    id: 'birlikte', theme: 'dark', layout: 'full', plain: true,
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
    id: 'kapanis', theme: 'dark', phone: go('#/'),
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
$('#dots').innerHTML = SLIDES.map((s, i) => `<button data-dot="${i}" aria-label="${i + 1}. slayt"></button>`).join('');

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
