/* Eylül Fuar Rehberi — tanıtım sunumu */

const $ = s => document.querySelector(s);
// Her slayt: görünüm, sol içerik, telefonun gideceği ekran ve konuşmacı notu.
const SLIDES = [
  {
    id: 'kapak', theme: 'dark', phone: { msg: { type: 'reset', hash: '#/' } },
    html: `
      <div class="cover-brand"><span class="pill"><img class="e" src="assets/eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"><span>×</span><img class="b" src="assets/bulbi-logo.png" alt="Bulbi"></span></div>
      <span class="kicker">24. Ankara Kitap Fuarı · 4–13 Aralık 2026</span>
      <h1 class="title">Kitap fuarı<br>artık <em>cebinde.</em></h1>
      <p class="lead">Ziyaretçinin programı, krokiyi ve Eylül’ün duyurularını tek yerde gördüğü sade bir fuar uygulaması.</p>
      <div class="stats">
        <div><b>500 bin</b><small>ziyaretçi hedefi · fuar başına</small></div>
        <div><b>500+</b><small>yayınevi</small></div>
        <div><b>850</b><small>yazar ve çizer</small></div>
      </div>
      <p class="src">Kaynak: Anadolu Ajansı, Yeni Ankara, TRT Avaz haberleri (2025–2026 fuarları).</p>`,
    notes: `<p>Açılış: <b>“Fuarınız yılda iki kez yarım milyon okuru ağırlıyor. Bu okurlar için basit bir uygulama hazırladık.”</b></p><p>Sağdaki telefon gerçek, tıklanabilir. Telefonun üstündeki turuncu <b>“Bildirim gönder”</b> ile istediğin an telefona örnek bildirim düşürebilirsin.</p>`
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
    notes: `<p>Üç sorun, üç çözüm. Sonraki üç slayt bunlara birebir cevap veriyor: <b>program, kroki, duyuru.</b></p>`
  },
  {
    id: 'program', theme: 'light', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/program' } },
    html: `
      <span class="kicker"><span class="num">01</span>Program</span>
      <h1 class="title">Kim, ne zaman,<br><em>nerede.</em></h1>
      <p class="lead">İmzalar ve söyleşiler gün gün, saat saat. Okur bir imzaya dokunur; yazarı, saati ve standı görür.</p>
      <ul class="points"><li>Gün ve türe göre program</li><li>Şu an süren etkinlik ve “şimdi” çizgisi</li><li>Tek dokunuşla “Krokide göster”</li></ul>
      <div class="try"><span>Canlı dene</span><button data-msg='{"type":"go","hash":"#/etkinlik/e7"}'><i>▶</i>Bir imzayı aç</button><button class="ghost" data-msg='{"type":"go","hash":"#/katilimcilar?tab=yazar"}'><i>✎</i>Tüm yazarlar</button></div>`,
    notes: `<p>Kırmızı “şimdi” çizgisini göster. Murat Menteş imzasına dokun, ardından “Krokide göster”e bas: Alfa’nın logosu krokide seçili gelir.</p>`
  },
  {
    id: 'kroki', theme: 'light', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/harita?stand=A-504' } },
    html: `
      <span class="kicker"><span class="num">02</span>Kroki</span>
      <h1 class="title">Stant numarası değil,<br><em>logo.</em></h1>
      <p class="lead">Ziyaretçi “A-504”ü bilmez, Alfa’yı bilir. Krokide yayınevlerinin logoları görünür; logoya dokunmak ya da adını aramak yeter.</p>
      <ul class="points"><li>Yayınevi logolarıyla kroki</li><li>Yazar ve yayınevi araması</li><li>Tüm yayınevleri tek listede</li></ul>
      <div class="try"><span>Canlı dene</span><button data-msg='{"type":"go","hash":"#/harita?stand=A-410"}'><i>▶</i>Everest nerede?</button><button class="ghost" data-msg='{"type":"go","hash":"#/ara?q=iletişim"}'><i>⌕</i>“İletişim” ara</button></div>`,
    notes: `<p>Vurgula: <b>“Krokiyi sıfırdan çizmedik, sizin 23. fuar krokinizden yaptık. Okur numara değil logo arar.”</b></p><p>Telefonda bir logoya dokun: yayınevinin kartı açılır.</p>`
  },
  {
    id: 'duyuru', theme: 'light', layout: 'panel', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/' } },
    cls: 'panel-slide',
    html: `
      <span class="kicker"><span class="num">03</span>Duyurular</span>
      <h1 class="title" style="font-size:52px;margin:16px 0 12px">Eylül yazar, <em>okurun telefonuna düşer.</em></h1>
      <p class="lead" style="font-size:20px;max-width:900px">Saat değişikliği, kayıp eşya, genel duyuru. Aşağıdaki panelde <b>“Gönder”</b>e ya da telefonun üstündeki <b>“Bildirim gönder”</b>e basın.</p>`,
    notes: `<p>Panelde “Gönder”e bas: sağdaki telefona bildirim düşer. Telefonun üstündeki turuncu <b>“Bildirim gönder”</b> de her basışta farklı bir örnek bildirim gösterir.</p><p><b>“Instagram’a koyup görülmesini ummak yerine, fuardaki herkesin telefonuna doğrudan.”</b></p>`
  },
  {
    id: 'cocuk', theme: 'light', extra: 'teal', phone: { msg: { type: 'go', fair: 'cocuk', hash: '#/' } },
    html: `
      <span class="kicker" style="color:var(--teal)"><span class="num" style="background:#ffb21f">2027</span>Çocuk Şenliği</span>
      <h1 class="title">Aynı uygulama,<br><em>her fuarda.</em></h1>
      <p class="lead">Önümüzdeki yıl çocuk etkinliklerinde aynı uygulama kullanılır. Fuar değişince program, katılımcılar, harita ve duyurular o etkinliğe göre açılır.</p>
      <div class="try"><span>Canlı dene</span><button data-msg='{"type":"go","fair":"cocuk","hash":"#/program"}'><i>▶</i>Şenlik programı</button><button class="ghost" data-msg='{"type":"go","fair":"cocuk","hash":"#/katilimcilar"}'><i>☺</i>Katılımcılar</button></div>`,
    notes: `<p>Telefon tema değiştirdi: aynı uygulama, Çocuk Şenliği. Arama artık atölye ve katılımcıları buluyor; harita alanlara ayrılmış. Bir kez indirilen uygulama Eylül’ün bütün etkinliklerinde kullanılır.</p>`
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
    id: 'kapanis', theme: 'dark', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/' } },
    html: `
      <div class="cover-brand"><span class="pill"><img class="e" src="assets/eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"><span>×</span><img class="b" src="assets/bulbi-logo.png" alt="Bulbi"></span></div>
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
$('#demo-push').onclick = () => sendPhone({ type: 'push' });
$('#prev').onclick = () => show(cur - 1);
$('#notes-close').onclick = () => { $('#notes').hidden = true; };
$('#help-chip').onclick = () => { $('#notes').hidden = false; };

const start = parseInt(location.hash.slice(1), 10);
show(Number.isFinite(start) ? start - 1 : 0);
if (new URLSearchParams(location.search).has('notlar')) $('#notes').hidden = false;
