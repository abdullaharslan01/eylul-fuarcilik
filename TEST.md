# Tam test: her "test yap"ta aynı liste

Kullanıcı "test yap" dediğinde bu liste baştan sona, aynı sırayla uygulanır. Atlanan ya da yapılamayan adım raporda
**açıkça** yazılır ("yapılmadı: neden"). Yeni özellik eklenince satırı buraya da eklenir.

Rapor: `docs/test-sonuclari/<YYYY-AA-GG>.md` (kök repo; her adımın sonucu, ekran görüntüleri scratchpad'de, bulunan
sorunlar ve düzeltmeler). Mimari ve dosya haritası: `AGENTS.md`. Backend'in ayrıntılı planı: `backend/docs/test-plani.md`.

## Kurallar

- Hepsi **yerelde** (docker: `localhost:3100`). Canlıda yalnızca okuma (GET); canlıya yazmak, `main`'e push, mağazaya
  yükleme kullanıcıya sorulmadan yapılmaz.
- Gerçek SMS ve gerçek kullanıcıya bildirim yok: yerelde `SMS_PROVIDER=log`, `SMS_DEV_ECHO=true`, `PUSH_TOPIC_PREFIX=test-`.
- Yerel giriş: panel `super@example.com` / `dev-super-password` (Bulbi), `eylul@example.com` / `dev-eylul-password`.
- Uygulamalar yerel sunucuya karşı derlenir:
  - iOS: `xcodebuild … 'API_BASE_URL=http://localhost:3100'` (ayrı `-derivedDataPath`).
  - Android: `./gradlew :app:assembleDebug -PapiBaseUrl=http://10.0.2.2:3100` (mağaza ölçümü için `assembleRelease`).
- Her ekran iOS ve Android'de **yan yana** karşılaştırılır (`montage`: ffmpeg `hstack`). Fark varsa sorun sayılır,
  yalnızca platformun kendi öğeleri (Apple düğmesi, sistem diyalogları, durum çubuğu) farklı olabilir.
- Yük üreten araç aynı Mac'teyse kendi raporladığı gecikme şişer: sunucunun gerçek gecikmesini dışarıdan `curl` ile ölç.

## Test verisi

| Fuar | Ne için |
|---|---|
| `ankara-2026` | örnek fuar: yarışma, görev QR kodları (`task_codes`), görevli |
| `izmir-kitap-fuari-2027-md7h` | ikinci organizasyon, fuar değiştirme, başka marka |
| `buyuk-test` | büyük fuar: ~430 yayınevi, ~1.500 yazar, ~6.000 kitap, 600 etkinlik, uzun adlar. Yoksa kur: `backend/scripts/buyuk-fuar.py` (dosyanın başındaki üç komut). seed.js doğrulamaz: zorunlu alan eksikse uygulamalar fuarı hiç açamaz |
| `fuar_big` veritabanı | 1 milyon ziyaretçi (`scripts/kontrol.mjs` kurar) |

## A. Backend

| # | Adım | Nasıl | Geçer |
|---|---|---|---|
| A1 | Otomatik testler | `cd backend && docker compose run --rm api npm test` | hepsi geçer |
| A2 | Uçtan uca kontrol (1 milyon kişi) | `node scripts/kontrol.mjs --hizli` (tam hali ~30 dk) | KALDI yok |
| A3 | Büyük fuar yükü | `node scripts/loadtest.js --url http://localhost:3100 --fair buyuk-test --scenario fairs\|catalog\|poll` (15 sn, 200 bağlantı) | 0 hata |
| A4 | Fuar günü + panel kaydı | `mixed --rate 2000` sürerken panelden 3 sn'de bir kayıt; `/live` dışarıdan 0,2 sn'de bir `curl` | `/live` p99 < 500 ms, 5xx yok |
| A5 | Panel uçlarının hızı (büyük fuar) | kütüphane listeleri (500 yayınevi, 300 yazar, `only=fair`), panel kataloğu, yarışma, kişiler | her biri < 300 ms |
| A6 | Kayıtlarda hata | `docker compose logs api --since 2h \| grep '"level":(50\|60)'` | 0 |
| A7 | Canlı (yalnızca GET) | `/health`, `/v1/fairs`, her yayındaki fuarın `catalog` ve `live`'ı; `geofence` yalnızca yarışma konum istiyorsa | hepsi 200 |

## B. Panel (tarayıcıda, `http://localhost:3100/panel/`)

| # | Adım | Geçer |
|---|---|---|
| B1 | Bulbi hesabıyla Bulbi alanındaki her sayfa açılır (Fuarlar, Organizasyonlar, Genel bannerlar, Kişiler, Hesap silme, Panel kullanıcıları, Uygulama güncellemesi, Sunucu) | konsolda hata yok |
| B2 | Organizatör hesabıyla her sayfa açılır (Özet, Program, Duyurular, Bannerlar, Yayınevleri, Yazarlar, Kitaplar, Kroki, Hediyeler: Görevler / Hediyeler / Katılımcılar / Görevliler, Kişiler, Fuar ayarları: 7 sekme) | konsolda hata yok; başka organizasyonun fuarı görünmez |
| B3 | Fuar ayarları önizlemesi: her sekmede telefon önizlemesi, Sözleşmeler'in 4 alt sekmesi | önizleme uygulamayla aynı |
| B4 | Büyük fuarda kütüphane sayfaları, arama, seçiciler | takılmadan açılır |
| B5 | Ana ekran: sponsor ve popüler yayınevi sırası oklarla, hepsi silinince bölüm kalkar; program bölümünde Öne çıkanlar ve Ana ekranda gösterme | uygulamada aynı sıra |
| B6 | Hediyeler › Kazananlar: Kazanan / Alan / Almayan süzgeci ve sayıları, Bildirim gönder penceresi doğru grupla açılır | sayılar listeyle aynı |
| B7 | Organizasyon › SMS: iki hesap, aktif servis, Test OTP gönder (yerelde "SMS gitmedi", yanlış numara hatası) | hata metni görünür |
| B8 | Panel açıkken yeni sürüm yayınlanınca sekme değiştirmek ekranı boş bırakmaz | sayfa bir kez yenilenir |

## C. Uygulamalar: ekranlar (iOS ve Android yan yana)

Her ekran: Türkçe ve İngilizce, açık ve koyu, normal ve **en büyük yazı** (iOS en büyük erişilebilirlik boyu,
uygulama `accessibility1`'de keser; Android `settings put system font_scale 2.0`), büyük fuarda uzun adlarla.

iOS sürümleri: **17, 18, 26, 27** (simülatör; 18 indirilemiyorsa raporda yaz). Android: emülatör (Android 17).

| # | Ekran | Açma (iOS / Android) |
|---|---|---|
| C1 | Fuar seçici (ilk açılış, iki dil) | uygulamayı sil-kur / `uninstall` |
| C2 | Açılış ekranı (doğru fuarın logosu, fuar değişince başka fuarın adı görünmez) | 0,2 sn arayla görüntü |
| C3 | İlk açılış turu | `-eylul.tour.done` vermeden / ilk açılış |
| C4 | Ana sayfa: bannerlar, bugünkü imzalar, popüler yayınevleri, arama kutusu | varsayılan |
| C5 | Fuar bilgileri: tanıtım, tarih, saat, SSS, harita, uzaklık, yol tarifi | `-eylul.page info` / ⓘ |
| C6 | Program: gün, tür süzgeci, "şimdi" çizgisine kaydırma, canlı / iptal / saat değişti etiketleri | `eylulrehber://program` + `eylul.now` |
| C7 | Etkinlik, yayınevi, yazar, kitap sayfaları (uzun ad / başlık) | `eylulrehber://event/<id>`, `publisher/`, `author/`, `book/` |
| C8 | Arama (sayılar "1.508" biçiminde, sonuç yok durumu) | `eylulrehber://search` |
| C9 | Kroki: bütün plan görünür, yayınevi adları stantların içinde, yakınlaşıp uzaklaşınca ad kaybolmaz; dokununca seçim ve yakınlaşma; boş stant; tesis simgeleri (iOS 17'de WC) | `eylulrehber://map` |
| C10b | QR okutma beklerken kitap sayfası çevrilir; yazı "QR okunuyor" → 2 sn "Puanın işleniyor" → 5 sn sonra "Fuar şu an çok kalabalık" ve açıklama; "Vazgeç" kapatır. Sunucu 5xx verirse kişi hata görmeden 3 kez yeniden denenir | yavaş sunucu (ör. canlı yük testi sırasında) |
| C9b2 | Krokideki aramada yalnızca yayınevleri çıkar; yayınevine dokununca stantı krokide seçili ve ortalanmış açılır (detay değil); geri aramaya döner. İki parmakla istenen noktaya yakınlaşılır, en yakında yazılar net (normal ve tam ekran) | `eylulrehber://map` |
| C9c | Kroki panel ile aynı (stant köşesi, çizgi, renk, GİRİŞ etiketi); tam ekrandan profile gidip dönünce yakınlık, seçim ve tam ekran korunur; "Tam ekran" düğmesi bütün planla açar | panel Kroki sayfası yan yana |
| C9d | Takvim: gün çizgisi ve tür zemini kayarak geçer, bugün kutu içinde; etkinlik görseli ana ekran kartı, takvim yuvarlağı ve etkinlik sayfasında | `eylulrehber://program` + `eylul.now` |
| C9a | Konuk ülke listesi ve detay: afiş, dönen görsel, konuk → yazar sayfası, yayınevi → web | `eylulrehber://editions` |
| C9b | Takvimde etkinliksiz gün: çip yok, ortada yer tutucu; ⓘ'ye iki kez basınca tek sayfa | `eylul.now 2026-12-07T13:42:00+03:00` |
| C10 | Duyurular ve duyuru sayfası | `eylulrehber://notices` |
| C11 | Planım (boş ve dolu), çakışma uyarısı | `eylulrehber://plan` |
| C12 | Hediyeler (girişsiz, girişli, yarışma kapalı) | `eylulrehber://gifts` |
| C13 | Giriş ekranı (KVKK + Kullanıcı Sözleşmesi kutusu, Apple / Google / telefon) | `-eylul.page signin` |
| C14 | Yan menü, Hakkımızda ve iletişim, Sözleşmeler ve Politikalar, Ayarlar (dil, görünüm, bildirim) | `-eylul.page menu\|about\|agreements\|settings` |
| C15 | Hata ekranı ("Fuar bilgisi yüklenemedi") | sunucu kapalıyken / bozuk fuar |
| C16 | Performans | açılış süresi (her saniye görüntü), bellek (iOS `footprint`, Android `dumpsys meminfo`), kaydırma (Android `dumpsys gfxinfo`, release derleme), **boşta işlemci her iOS sürümünde** (`ps -o pcpu`, %5 altı; yüksekse `sample <pid> 3`) |

## D. Uygulama + backend birlikte

Her senaryo en az bir platformda uçtan uca, ekranı diğerinde de karşılaştırılarak. API ile doğrulanabilenler
`scripts/kontrol.mjs`'in 6. adımında da var.

Notlar: yerel `ankara-2026` 27–31 Ekim'de; fuar günü ekranları için `eylul.now 2026-10-28T14:10:00+03:00`. Panelden bugün
eklenen duyuru bu saatte "gelecekte" sayılıp gizlenir: D8'de `eylul.now`'ı duyurudan sonraya al. Görevliye hediye QR'ı
`eylul.scan eylulrehber://redeem/<kod>` ile verilir (çıplak kod stant kodu sayılır). Android'de dokunma: `uiautomator dump`
ile metne göre (koordinat tahmini yok).

| # | Senaryo | Geçer |
|---|---|---|
| D1 | SMS ile yeni hesap: KVKK + sözleşme işaretlenmeden devam edilmez; kod ("Test kodu"na dokununca dolar) | hesap açılır |
| D2 | Bilgilerini tamamla: ad soyad zorunlu, Açık Rıza ve İYS isteğe bağlı | `/v1/me`'de ad; rıza seçildiyse kayıtlı |
| D3 | QR okut (`eylul.scan`): "+10 puan" → ikinci kez "Zaten okutmuştun" → bilinmeyen kod | puan bir kez artar |
| D4 | Konum kuralı: yarışma konum istemiyorsa izinsiz okutulur; istiyorsa izin / uzaklık kontrolü | panel ayarıyla aynı davranış |
| D5 | Eşik geçilince "Hediye kazandın", Hediye QR'ım (dakikada değişir) | QR açılır |
| D6 | Görevli: panelden telefonla eklenir, uygulamada görevli modu, hediye QR'ı okutup teslim, ikinci teslim reddedilir, geri al. Ziyaretçinin açık Hediye QR'ım ekranı teslimden sonra "Hediyen teslim edildi" der (kırmızı hata ve "Tekrar dene" yok) | bakiye ve stok doğru; iki uygulamada aynı ekran |
| D6a | Görevli duyurusu "Bildirim olarak da gönder": bildirim yalnızca `test-` konusuna; gitmezse duyuru yayında, uyarı çıkar | uyarı doğru |
| D7 | Stoğu biten hediye "Tükendi", sıradaki hedef onu atlar | kartta Tükendi |
| D8 | Panelden duyuru → uygulamanın duyurularında (en geç 1 dk); bildirim yalnızca `test-` konusuna | görünür |
| D9 | Panelden etkinlik durumu (canlı / iptal / saat değişti) → programda etiket | görünür |
| D10 | Panelden fuar ayarı: SSS, Hakkımızda, iletişim, sözleşme metni, bölüm kapatma (hediyeler kapalı ekranı), ana sayfa yayınevleri **ve sırası** (Yayınevleri › Ana sayfada), banner | uygulamada görünür, sıra paneldeki gibi |
| D11 | Uygulama güncellemesi: önerilen (kapatılabilir) ve zorunlu ekran | ikisi de çıkar, sonra eski hâline al |
| D12 | Fuar değiştir: başka organizasyonun fuarı, katılım için o fuarın KVKK'sı | doğru fuar, doğru marka |
| D13 | Çevrimdışı: ağ yokken son indirilen katalog açılır | uygulama açılır |
| D14 | Telefon değiştirme ve hesap silme (ayrılan hediye stoğa döner) | panelde Hesap silme'de görünür |
| D14a | Telefon değiştirme tam ekran; kendi numarası "zaten kayıtlı", başka hesabın numarası "kayıtlı bir hesap var" | kod gitmez |
| D14b | Android: QR okut açılıp geri tuşuyla çıkılınca hata yazısı çıkmaz | Hediyeler'e döner |
| D14c | Görevli › Kazananlar: süzgeç, arama, almayanı iptal (puan ve stok döner), listeye bildirim; sahadan 5 dakikada bir | iki platformda aynı |
| D14d | Eksik etkinlik: yayınevi, kitap ve görseli olmayan imza iki uygulamada bozulmadan açılır | tasarım bozulmaz |
| D14e | `/indir`: iPhone App Store'a, Android Google Play'e, bilgisayar QR'lı sayfaya gider | canlıda `curl -A` ile |
| D15 | "Bir telefon bir hesap": aynı cihazda ikinci hesap `device_in_use` (fuar ayarı açıkken) | red mesajı |
| D16 | Taslak fuar uygulamada ve API'de görünmez | 404 / listede yok |
| D17 | Eksik veri: `backend/scripts/eksik-fuar.py` ile `bos-test` ve `eksik-test` kur (dosyanın başındaki komutlar); iki uygulamada ana sayfa, Program, Kroki, Hediyeler, yazar, yayınevi, kitap, etkinlik; sonra `eksik-fuar.sql` ile sil | `bos-test`: her sekmede "yakında"; `eksik-test`: kayıtlar yer tutucuyla, boş "Hakkında" ve geçersiz web sitesi yok, saatsiz etkinlik "bulunamadı"; fuar listesi 200 |

## Bitiş

- Test için değiştirilen yerel ayarlar geri alınır (fuar ayarı, yazı boyutu, emülatör `font_scale 1.0`, simülatör
  `content_size large`).
- Bulunanlar düzeltilir, düzeltme yeniden denenir; düzeltilmeyen `AGENTS.md` §12'ye yazılır.
- Rapor `docs/test-sonuclari/<tarih>.md`'ye; kullanıcıya özet: geçen, kalan, yapılamayan.
