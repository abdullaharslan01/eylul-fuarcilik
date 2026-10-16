/* Eylül Fuar Rehberi — tanıtım sunumu */

const $ = s => document.querySelector(s);
const IC = {
  coin: '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2a3 3 0 0 0-2.8-1.7c-1.7 0-3 1-3 2.3 0 3 6 1.7 6 4.6 0 1.3-1.3 2.3-3 2.3a3.2 3.2 0 0 1-3-1.8M12 6v1.5M12 16.5V18"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  bell: '<path d="M18 9a6 6 0 0 0-12 0c0 6.5-2.5 8-2.5 8h17S18 15.5 18 9M10 20.5a2.2 2.2 0 0 0 4 0"/>',
  loop: '<path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 12V10a4 4 0 0 1 4-4h13M7 21.5 3.5 18 7 14.5"/><path d="M20.5 12v2a4 4 0 0 1-4 4h-13"/>'
};
const svg = n => `<svg viewBox="0 0 24 24">${IC[n]}</svg>`;

// Her slayt: görünüm, sol içerik, telefonun gideceği ekran ve konuşmacı notu.
const SLIDES = [
  {
    id: 'kapak', theme: 'dark', phone: { msg: { type: 'reset', hash: '#/hosgeldin' } },
    html: `
      <div class="cover-brand"><span class="pill"><img class="e" src="assets/eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"><span>×</span><img class="b" src="assets/bulbi-logo.png" alt="Bulbi"></span></div>
      <span class="kicker">24. Ankara Kitap Fuarı · 4–13 Aralık 2026</span>
      <h1 class="title">Kitap fuarı<br>artık <em>cebinde.</em></h1>
      <p class="lead">Yarım milyon okurun fuar gününü baştan sona taşıyan mobil rehber: dijital imza sırası, aranabilir kroki, canlı duyurular.</p>
      <div class="stats">
        <div><b>500 bin</b><small>ziyaretçi hedefi · fuar başına</small></div>
        <div><b>500+</b><small>yayınevi</small></div>
        <div><b>850</b><small>yazar ve çizer</small></div>
        <div><b>1.000+</b><small>etkinlik</small></div>
      </div>
      <p class="src">Kaynak: Anadolu Ajansı, Yeni Ankara, TRT Avaz haberleri (2025–2026 fuarları).</p>`,
    notes: `<p>Açılış cümlesi: <b>“Fuarınız yılda iki kez yarım milyon okuru ağırlıyor. Bu okurların fuar günü telefonda başlıyor, ama bugün ellerinde bir JPG kroki ve Instagram var.”</b></p><p>Sağdaki telefon gerçek, tıklanabilir bir uygulama. İlgi alanlarından birkaçını seçip <b>Fuara başla</b>’ya bas.</p>`
  },
  {
    id: 'sorun', theme: 'dark', layout: 'full',
    html: `
      <span class="kicker">Ziyaretçinin gözünden</span>
      <h1 class="title">Okur fuarı seviyor.<br>Fuar günü <em>yoruyor.</em></h1>
      <div class="pains">
        ${[
          ['İmza kuyrukları', 'Sevilen yazarlar için saatlerce, 100 metreyi bulan kuyruklar. Bekleyen okur ne alışveriş yapabiliyor ne söyleşiye girebiliyor.', 'Ekşi Sözlük, Tigris Haber'],
          ['Programa ulaşamamak', 'Hangi yazar hangi gün, saat kaçta? Sorular cevapsız kalıyor; “program kötü yayınlandı” yorumları var.', 'FestTR ziyaretçi yorumları'],
          ['Stant bulmak', 'Kroki tek bir statik görsel. 500 yayınevi arasında aradığını bulmak için arama yok.', 'ankarakitapfuari.org.tr'],
          ['Hafta sonu kalabalığı', 'Hafta sonu ziyaretçi akını yaşanıyor; hangi saatin sakin olduğunu önceden görmek mümkün değil.', 'Habertürk, 22. fuar haberi'],
          ['Giriş ve otopark', 'Yağmur altında giriş kuyruğu, Congresium otopark çıkışında kilitlenen trafik.', 'Bengütürk, Ekşi Sözlük'],
          ['Fiyat belirsizliği', '“Fuar fiyatı internetten pahalı mı?” Kampanyalar dağınık, karşılaştırmak zor.', '1000Kitap, Şikayetvar']
        ].map(([t, p, s], i) => `<div class="pain"><span class="n">0${i + 1}</span><h3>${t}</h3><p>${p}</p><small>Kaynak: ${s}</small></div>`).join('')}
      </div>`,
    notes: `<p>Bunlar bizim tahminimiz değil; ziyaretçilerin kendi yazdıkları ve fuarın sitesinde görülenler.</p><p>Hepsini okuma. Üçünü vurgula: <b>imza kuyruğu, kroki, program</b>. Sonra: “Şimdi bunların her birini uygulamada nasıl çözdüğümüzü göstereyim.”</p>`
  },
  {
    id: 'bugun', theme: 'light', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/' } },
    html: `
      <span class="kicker"><span class="num">01</span>Bugün ekranı</span>
      <h1 class="title">Fuar günü <em>tek ekranda</em> başlar.</h1>
      <p class="lead">Uygulama açılınca okur önce şu an ne olduğunu görür: başlayan imza, planındaki sıradaki etkinlik, Eylül’ün duyurusu ve anlık yoğunluk.</p>
      <ul class="points"><li>Saate göre kendini güncelleyen canlı ana ekran</li><li>Eylül duyurusu herkesin ilk gördüğü yerde</li><li>“Hangi saat sakin?” yoğunluk eğrisi</li></ul>
      <div class="solves"><b>Çözdüğü sorun</b> Programa ulaşamamak · Kalabalık</div>
      <div class="try"><span>Canlı dene</span><button data-msg='{"type":"go","hash":"#/bildirimler"}'><i>▶</i>Duyurular</button><button class="ghost" data-msg='{"type":"go","hash":"#/"}'><i>⌂</i>Ana ekran</button></div>`,
    notes: `<p>Telefonu aşağı kaydır: <b>Bugün imzada</b> şeridi, <b>yoğunluk eğrisi</b>, sponsorlu <b>fuar fırsatları</b>.</p><p>“Fırsatlar” kartının üstünde <b>Sponsorlu</b> yazıyor. Gelir modelini burada sadece hissettir, detayı sonraki slaytlarda.</p>`
  },
  {
    id: 'sira', theme: 'light', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/etkinlik/e7' } },
    html: `
      <span class="kicker"><span class="num">02</span>Dijital imza sırası</span>
      <h1 class="title">Kuyrukta değil,<br><em>fuarda</em> bekle.</h1>
      <p class="lead">Okur sıra numarasını telefondan alır. Sırası yaklaşınca bildirim gelir; o arada söyleşiye girer, alışveriş yapar.</p>
      <ul class="points"><li>Yayınevi görevlisi sırayı tabletten yönetir</li><li>5 kişi kala otomatik bildirim, 0’da “Sıra sende!”</li><li>Koridorda kuyruk yerine dolaşan okur: daha çok satış</li></ul>
      <div class="solves"><b>Çözdüğü sorun</b> İmza kuyrukları</div>
      <div class="try"><span>Canlı dene</span><button class="pulse" data-msg='{"type":"queue-take","id":"e7"}'><i>1</i>Sıra al</button><button data-msg='{"type":"queue-advance","by":"step"}'><i>2</i>Sırayı ilerlet</button></div>`,
    notes: `<p><b>Bu sunumun en etkili anı.</b> “Sıra al”a bas: telefonda #47 numaralı dijital bilet çıkar.</p><p>Sonra “Sırayı ilerlet”e 2–3 kez bas. 5 kişi kalınca telefonun üstüne bildirim düşer, 0’da bilet yeşile döner. Burada bir saniye sus ve etkisini bırak.</p><p>Ekle: “Murat Menteş standının önünde 100 metrelik kuyruk yerine, bu 38 kişi şu an fuarda geziyor ve kitap alıyor.”</p>`
  },
  {
    id: 'kroki', theme: 'light', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/harita?stand=A-504' } },
    html: `
      <span class="kicker"><span class="num">03</span>Aranabilir kroki</span>
      <h1 class="title">“A-504 nerede?”<br>sorusu <em>bitti.</em></h1>
      <p class="lead">Statik JPG kroki, aranabilir ve yol tarifi veren haritaya dönüşür. Yayınevi, yazar, kitap ya da stant numarası yazmak yeter.</p>
      <ul class="points"><li>Girişten standa rota ve yürüme süresi</li><li>WC, kafe, danışma, kayıp çocuk noktası</li><li>Canlı yoğunluk katmanı: kalabalığı önceden gör</li></ul>
      <div class="solves"><b>Çözdüğü sorun</b> Stant bulmak · Kalabalık</div>
      <div class="try"><span>Canlı dene</span><button data-msg='{"type":"go","hash":"#/harita?katman=yogunluk"}'><i>◐</i>Yoğunluk</button><button data-msg='{"type":"go","hash":"#/ara?q=susamuru"}'><i>⌕</i>“susamuru” ara</button><button class="ghost" data-msg='{"type":"go","hash":"#/harita?yer=wc"}'><i>i</i>En yakın WC</button></div>`,
    notes: `<p>Vurgula: <b>“Krokiyi sıfırdan çizmedik, sizin 23. fuar krokinizi dijitalleştirdik.”</b> Yeni fuarın krokisi geldiğinde aynı şekilde aktarılır.</p><p>Arama Türkçe karakterleri dert etmez: “susamuru” yazınca Buket Uzuner’in kitabı, standı ve fuar fiyatı çıkar.</p>`
  },
  {
    id: 'program', theme: 'light', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/program' } },
    html: `
      <span class="kicker"><span class="num">04</span>Program & Planım</span>
      <h1 class="title">Her okura<br><em>kişisel ajanda.</em></h1>
      <p class="lead">İmzalar, söyleşiler ve çocuk etkinlikleri gün gün. Okur favorilerini işaretler, 15 dk önce hatırlatma alır; takip ettiği yazar fuara gelince haber alır.</p>
      <ul class="points"><li>“Şimdi” çizgisiyle canlı zaman akışı</li><li>Her imzada anlık sıra uzunluğu</li><li>Yazar takibi: “Fuara gelince haber ver”</li></ul>
      <div class="solves"><b>Çözdüğü sorun</b> Programa ulaşamamak</div>
      <div class="try"><span>Canlı dene</span><button data-msg='{"type":"go","hash":"#/planim"}'><i>♥</i>Planım</button><button data-msg='{"type":"go","hash":"#/yazar/timur"}'><i>✎</i>Yazar profili</button></div>`,
    notes: `<p>Kırmızı “şimdi” çizgisini göster; geçmiş etkinlikler soluk, canlı olan turuncu çerçeveli.</p><p>Yazar profilinde <b>“Fuara gelince haber ver”</b> butonu, Eylül için hedefli bildirimin temeli: Timur Soykan’ı takip eden kişi sayısını panelde göreceğiz.</p>`
  },
  {
    id: 'liste', theme: 'light', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/planim?sekme=liste' } },
    html: `
      <span class="kicker"><span class="num">05</span>Alınacaklar & fuar fiyatı</span>
      <h1 class="title">Listeni yap,<br><em>tek rotada</em> topla.</h1>
      <p class="lead">Okur almak istediği kitapları listeler. Uygulama hangi standda olduğunu, fuar fiyatını ve hepsini toplayan en kısa rotayı gösterir.</p>
      <ul class="points"><li>Liste fiyatı ve fuar fiyatı yan yana: fiyat şüphesi biter</li><li>4 stant, tek rota, birkaç dakika</li><li>Yayınevleri için ölçülebilir satış etkisi</li></ul>
      <div class="solves"><b>Çözdüğü sorun</b> Fiyat belirsizliği · Stant bulmak</div>
      <div class="try"><span>Canlı dene</span><button class="pulse" data-msg='{"type":"go","hash":"#/harita?rota=1"}'><i>↝</i>Rotamı çiz</button><button class="ghost" data-msg='{"type":"go","hash":"#/kitap/dublor"}'><i>▤</i>Kitap sayfası</button></div>`,
    notes: `<p>“Rotamı çiz”e bas: krokide numaralı duraklar ve tek bir rota çıkar.</p><p>Yayınevleri açısından: <b>“Bu listeler hangi kitabın fuara gelmeden önce merak edildiğini de söylüyor.”</b> Bu veri katılımcıya rapor olarak satılabilir.</p>`
  },
  {
    id: 'panel', theme: 'light', layout: 'panel', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/' } },
    cls: 'panel-slide',
    html: `
      <span class="kicker"><span class="num">06</span>Eylül paneli</span>
      <h1 class="title" style="font-size:52px;margin:16px 0 12px">Bir tıkla doğru okura, <em>saniyeler içinde.</em></h1>
      <p class="lead" style="font-size:20px;max-width:900px">Eylül ekibi panelden yazar; mesaj ilgili ziyaretçinin telefonuna düşer. Aşağıdaki panelde <b>“Şimdi gönder”</b>e basın.</p>`,
    notes: `<p>Panelde bir şablon seç (ör. <b>Program değişikliği</b>) ve <b>Şimdi gönder</b>’e bas: sağdaki telefona bildirim düşer.</p><p>Mesaj: <b>“Instagram’a koyup görülmesini ummak yerine, Timur Soykan’ı takip eden 3.120 kişiye doğrudan.”</b></p><p>Paneldeki diğer kutular: salon yoğunluğu, imza sıraları, en çok arananlar, sponsor gösterimleri. Sayıların örnek olduğunu belirt.</p>`
  },
  {
    id: 'giris', theme: 'light', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/bilet' } },
    html: `
      <span class="kicker"><span class="num">07</span>Giriş, ulaşım, okullar</span>
      <h1 class="title">Kapıdan girmeden<br><em>önce</em> de yanında.</h1>
      <p class="lead">E-bilet telefonda, ücretsiz giriş hakları net. Metro önerisi, otopark doluluğu ve okul gruplarına kontenjanlı ziyaret saati.</p>
      <ul class="points"><li>QR e-bilet ve girişte bekleme süresi</li><li>M2 Söğütözü yönlendirmesi, otopark doluluğu</li><li>Öğretmene saatli, kontenjanlı okul ziyareti</li></ul>
      <div class="solves"><b>Çözdüğü sorun</b> Giriş ve otopark · Okul yoğunluğu</div>
      <div class="try"><span>Canlı dene</span><button data-msg='{"type":"go","hash":"#/ulasim"}'><i>⇢</i>Ulaşım</button><button data-msg='{"type":"go","hash":"#/okul"}'><i>✎</i>Okul grubu</button></div>`,
    notes: `<p>Okul grupları açılış günlerini dolduruyor. <b>Okul grubu</b> ekranı öğretmene sakin saatlerde kontenjanlı ziyaret saati verir; belediye servis bilgisi de burada.</p>`
  },
  {
    id: 'cocuk', theme: 'light', extra: 'teal', phone: { msg: { type: 'go', fair: 'cocuk', hash: '#/' } },
    html: `
      <span class="kicker" style="color:var(--teal)"><span class="num" style="background:#ffb21f">08</span>2027 · Çocuk Şenliği</span>
      <h1 class="title">Aynı uygulama,<br><em>ailelere</em> özel.</h1>
      <p class="lead">Önümüzdeki yıl çocuk etkinliklerinde aynı altyapı “Çocuk Şenliği” moduna geçer: yaşa göre etkinlik, kontenjanlı atölye ve güvenli bileklik.</p>
      <ul class="points"><li>Yaş filtresi ve tek dokunuşla atölye rezervasyonu</li><li>Dolu atölyede otomatik bekleme listesi</li><li>QR bileklik: görevli okutunca veliye anında haber, numara görünmez</li></ul>
      <div class="try"><span>Canlı dene</span><button data-msg='{"type":"go","fair":"cocuk","hash":"#/program?gun=1"}'><i>✂</i>Atölyeler</button><button class="pulse" data-msg='{"type":"child-scan"}'><i>!</i>Görevli bilekliği okuttu</button></div>`,
    notes: `<p>Telefon tema değiştirdi: aynı uygulama, aile modu. <b>Ayır</b> butonuyla bir atölyeye yer ayır.</p><p>Sonra “Görevli bilekliği okuttu”ya bas: velinin telefonuna <b>“Ela güvende, Danışma noktasında”</b> bildirimi düşer. Aileler için en güçlü güven mesajı bu.</p>`
  },
  {
    id: 'deger', theme: 'light', layout: 'full',
    html: `
      <span class="kicker">Eylül için değer</span>
      <h1 class="title" style="font-size:64px">Bir maliyet değil,<br><em>yeni bir gelir ve iletişim kanalı.</em></h1>
      <div class="values">
        <div class="value"><span class="ico">${svg('coin')}</span><h3>Sponsor geliri</h3><p>Yayınevlerine satılabilir dijital alanlar. Her fuarda yeniden satılır.</p><div class="chips"><span>Ana ekran vitrini</span><span>Fuar fırsatları</span><span>Hedefli bildirim</span><span>Krokide öne çıkma</span></div></div>
        <div class="value"><span class="ico">${svg('chart')}</span><h3>Veri ve rapor</h3><p>En çok aranan yazar, saat saat yoğunluk, etkinlik katılımı. Bir sonraki fuar veriyle planlanır, katılımcıya rapor sunulur.</p><div class="chips"><span>Aramalar</span><span>Yoğunluk</span><span>Katılım</span></div></div>
        <div class="value"><span class="ico">${svg('bell')}</span><h3>Doğrudan iletişim</h3><p>Instagram algoritmasına takılmadan, doğru okura saniyeler içinde ulaşan duyuru ve değişiklik bildirimi.</p><div class="chips"><span>Program değişikliği</span><span>Kayıp eşya</span></div></div>
        <div class="value"><span class="ico">${svg('loop')}</span><h3>Yıl boyu bağ</h3><p>Nisan ve Aralık fuarları, Çocuk Şenliği: her etkinlikte büyüyen tek bir okur kitlesi.</p><div class="chips"><span>Nisan</span><span>Aralık</span><span>Çocuk Şenliği</span></div></div>
      </div>
      <div class="extras"><span>Basılı program ve kroki ihtiyacı azalır</span><span>Kuyruk şikâyeti azalır</span><span>Ziyaretçi memnuniyeti ölçülür</span></div>`,
    notes: `<p>Organizatörün dilinden konuş: <b>gelir, veri, iletişim, sadakat.</b></p><p>Sponsor alanlarının fiyatlandırması Eylül’e ait. Bizim önerimiz alanları açmak ve gösterim raporunu otomatik vermek.</p>`
  },
  {
    id: 'yol', theme: 'light', layout: 'full',
    html: `
      <span class="kicker">Yol haritası</span>
      <h1 class="title">Aralık fuarına <em>hazır.</em></h1>
      <div class="road">
        <div class="stop done"><small>Ekim 2026</small><h3>Konsept ve demo</h3><p>Bugün gördüğünüz çalışan prototip.</p><span class="tag" style="background:var(--brand);color:#1a1100">Tamamlandı</span></div>
        <div class="stop"><small>Kasım 2026</small><h3>İçerik ve pilot</h3><p>Program, katılımcı listesi, kroki ve sponsor alanlarının girişi. Yayınevi görevlilerine sıra paneli.</p></div>
        <div class="stop big"><small>4–13 Aralık 2026</small><h3>24. Ankara Kitap Fuarı</h3><p>Web’de QR ile anında, iOS ve Android’de mağazada. Girişte ve stantlarda QR afişler.</p><span class="tag">Canlı</span></div>
        <div class="stop"><small>2027</small><h3>Nisan fuarı ve Çocuk Şenliği</h3><p>Aynı platform: çocuk modu, bileklik ve atölye rezervasyonu.</p></div>
      </div>
      <div class="needs"><strong>Eylül’den ihtiyacımız</strong><div><span>İmza ve söyleşi programı</span><span>Katılımcı listesi</span><span>24. fuar krokisi</span><span>Sponsor alanları kararı</span></div></div>`,
    notes: `<p>Takvimi gerçekçi tut. Kasım’daki kritik ihtiyaç Eylül’den gelecek veri: <b>imza programı, katılımcı listesi, kroki</b>.</p><p>“Web sürümü QR ile anında açılır; mağaza onayını beklemek zorunda kalmayız.”</p>`
  },
  {
    id: 'birlikte', theme: 'dark', layout: 'full', plain: true,
    html: `
      <span class="kicker">Birlikte</span>
      <h1 class="title">Önerimiz: <em>kazan-kazan.</em></h1>
      <div class="deal">
        <div class="side b"><div class="who"><img src="assets/bulbi-logo.png" alt="Bulbi"><span>üstlenir</span></div>
          <ul><li>Uygulamanın tasarımı ve geliştirmesi</li><li>iOS, Android ve web yayını</li><li>Fuar boyunca canlı teknik destek</li><li>Organizatör paneli ve fuar sonu rapor</li></ul></div>
        <div class="side e"><div class="who"><img src="assets/eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"><span>katkısı</span></div>
          <ul><li>Program, katılımcı ve kroki verisi</li><li>Fuarlarda Bulbi’ye tanıtım standı</li><li>Uygulamada “Bulbi ile geliştirildi” görünürlüğü</li><li>Çocuk Şenliği’nde iş ortaklığı</li></ul></div>
      </div>
      <p class="win">Eylül <b>yeni bir dijital ürün</b> kazanır, okur <b>daha rahat bir fuar</b>, Bulbi <b>yarım milyon okurla tanışma</b> fırsatı.</p>`,
    notes: `<p>Teklifi net ve sade söyle: <b>“Uygulamayı biz yapıyoruz ve işletiyoruz. Karşılığında fuarlarınızda yer almak ve okurlarınıza kendimizi tanıtmak istiyoruz.”</b></p><p>Rakam tartışmasına bu slaytta girme. Önce fikri sevdir, detayı sonraki toplantıya bırak.</p>`
  },
  {
    id: 'kapanis', theme: 'dark', phone: { msg: { type: 'go', fair: 'ankara', hash: '#/' } },
    html: `
      <div class="cover-brand"><span class="pill"><img class="e" src="assets/eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"><span>×</span><img class="b" src="assets/bulbi-logo.png" alt="Bulbi"></span></div>
      <span class="kicker">Teşekkürler</span>
      <h1 class="title">Fuar artık<br><em>cebinizde.</em></h1>
      <div class="qr-box" id="qr-box"></div>`,
    notes: `<p>Kapanış: <b>“Aralık’ta 24. Ankara Kitap Fuarı’nda bu uygulamayla okurlarınızın karşısına çıkalım.”</b></p><p>Sorulara geçerken telefonu bırak; isteyen istediği ekranı açabilir.</p>`
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
    box.innerHTML = `<p style="max-width:600px"><b>Sorularınızı alalım.</b>Uygulama sağdaki telefonda çalışıyor; dilediğiniz ekranı birlikte açabiliriz. Bağlantıyı toplantıdan sonra paylaşacağız.</p>`;
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
$('#prev').onclick = () => show(cur - 1);
$('#notes-close').onclick = () => { $('#notes').hidden = true; };
$('#help-chip').onclick = () => { $('#notes').hidden = false; };

const start = parseInt(location.hash.slice(1), 10);
show(Number.isFinite(start) ? start - 1 : 0);
if (new URLSearchParams(location.search).has('notlar')) $('#notes').hidden = false;
