# Fuar Rehberi: yapay zekâ ajanları için devir belgesi

> Bu belge, projeyi hiç görmemiş bir yapay zekâ ajanının (Claude, Codex, Cursor, Gemini…) tek okumada projenin ne
> olduğunu, kodun nerede durduğunu ve hangi kurallara uyacağını anlaması için yazıldı.
> Son güncelleme: **6 Kasım 2026**. Hepsi `cok-fuar` dalı.
> Kodla belge çelişirse **kod doğrudur**; çelişkiyi bu belgeye işle.

---

## 0. Önce bunları oku (5 dakika)

1. Bu dosyanın §1 (ürün), §2 (repolar), §3 (kurallar) bölümleri.
2. Değiştireceğin repo klasöründeki `CLAUDE.md` (her repoda ayrı; kısa ve güncel):
   `ios/CLAUDE.md`, `android/CLAUDE.md` (+ `android/CONVENTIONS.md`), `backend/CLAUDE.md`.
3. Bir ekranı değiştireceksen §8'deki özellik tablosundan **iki platformdaki** dosyayı bul. İkisi birlikte değişir.

---

## 1. Ürün nedir, amacı ne

- **Fuar Rehberi**, kitap fuarları için bir mobil rehber uygulaması. Mağazada tek uygulama:
  - iOS: SwiftUI, App Store adı "Eylül Fuarcılık".
  - Android: Kotlin + Jetpack Compose, Google Play.
  - Kimliği iki platformda da `com.bulbi.fuar`.
- **Bulbi** platformun sahibi ve geliştiricisi. **Organizasyonlar** (fuar düzenleyen firmalar; ilki ve şimdilik tek
  müşteri **Eylül Fuarcılık**) kendi fuarlarını web panelinden yönetir. Sistem çok fuarlı ve çok organizasyonlu.
- Ziyaretçinin uygulamada yapabildikleri:
  - fuar seçmek;
  - yayınevlerini, yazarları ve kitapları gezmek;
  - programa bakmak (imza, söyleşi, çocuk, atölye);
  - stant krokisini ve fuarın gerçek haritasını kullanmak;
  - duyuruları okumak;
  - **Planım**'a etkinlik eklemek (hatırlatma ve widget);
  - fuar bilgilerine bakmak (ⓘ: tanıtım, saatler, SSS, konum);
  - **Hediyeler** yarışmasına katılmak: stanttaki gizli QR'ları okutup puan toplar, puanı yeten hediyeyi uygulamada
    **alır** (puan ve stok o anda düşer, hediye Kazandıklarım'a geçer), Danışma'da görevli "Hediye QR'ını" okutup teslim eder.
- **Temel ilke: her şey panelden yönetilir.** Panelde yapılan değişiklik uygulamalarda yaklaşık 1 dakika içinde görünür.
  Uygulamada sabit içerik ya da sunucusuz/demo mod yoktur. Ağ yoksa yalnızca son indirilen kopya gösterilir.
- Ölçek hedefi: fuar başına günde 100 bin – 700 bin ziyaretçi. Saatler her zaman fuar saatiyle (Europe/Istanbul).
- **Canlı:** API ve panel `https://fuar.bulbi.co` (panel `/panel/`). Uygulamalar mağazada **1.3** (iOS build 12,
  Android versionCode 7; ikisi de 30–31 Ekim 2026'da yayına alındı).
- **Fuarlar:**
  - `ankara-2026`: 24. Ankara Kitap Fuarı, ATO Congresium, 4–13 Aralık. Kaynak `backend/seed/catalog.json`: program, SSS ve
    iletişim ankarakitapfuari.org.tr'den (6 Kasım); `scripts/fuar-yukle.mjs` sunucuya yükler ve eski demoyu temizler
    (kampanya ve basılı QR'lar değişmez). Yayınevi–stant eşleşmesi sitede yok: **Eylül'ün listesiyle doğrulanmalı.**
    Kroki 3–12 Nisan planından çıkarıldı (sitedeki görsel "Güncelleniyor"): yeni plan gelince koordinatlar değişir.
  - `sanliurfa-2026`: 9. Şanlıurfa Kitap Fuarı, 20–29 Kasım; programı örnek veridir.

---

## 2. Repolar, dallar, klasörler

`/Users/abdulluharslan/Documents/Bulbi/Eylul/` kökü ve içindeki üç klasör **dört ayrı git reposudur**. Her repoda
ayrı commit ve push yapılır.

| Klasör | Repo | Ne | Aktif dal |
|---|---|---|---|
| `.` (kök) | kök repo | tanıtım sunumu (`index.html`, `app/`, `panel.html`, `SUNUM-REHBERI.md`), yasal sayfalar (`legal/`), bu belge | `main` |
| `backend/` | `fuar_web` | API (Fastify + PostgreSQL) **ve** yönetim paneli (React, `backend/panel/`) | `cok-fuar` (= `origin/main`) |
| `ios/` | `fuar_iOS` | iOS uygulaması + Planım widget'ı | `cok-fuar` (`origin/main`'in 11 commit önünde) |
| `android/` | `fuar_android` | Android uygulaması + widget | `cok-fuar` (`origin/main`'in 11 commit önünde) |

- `cok-fuar` ("çok fuar") çok fuarlı yeniden tasarımın dalıdır; bugün bütün iş burada yapılıyor.
- **Backend'de `main`'e push canlıya yayın demektir** (GitHub Actions → AWS). Yerel `main` dalı eski; `origin/main`'e bak.
- Mağaza derlemeleri iOS/Android `cok-fuar` ucundan alındı.
- Kökteki `legal/*.html` canlıda `https://fuar.bulbi.co/uploads/legal/…` adresinden sunulur (S3:
  `s3://bulbi-eylul-uploads/uploads/legal/`). Repo gizli olduğu için GitHub Pages kullanılmaz. Değiştirirsen S3'e
  yeniden yükle.

---

## 3. Değişmez kurallar (çiğneme)

**Çalışma biçimi** (her `CLAUDE.md`'de aynı):
- Önce düşün, varsayımı açıkça söyle.
- İsteneni yapan en küçük kodu yaz.
- Yalnızca gerekene dokun; ilgisiz satırları yeniden biçimlendirme.
- "Bitti" demeden önce derle, test et, ekranda gör. Doğrulayamadığını açıkça söyle.

**Ürün kuralları:**
1. **iOS ve Android aynı görünür ve aynı davranır.** Yalnızca platformun kendi öğeleri farklıdır. Bir tarafta ekran
   değişirse diğerinde de değişir; ikisi yan yana karşılaştırılır.
2. **Her şey panelden.** Uygulamaya sabit içerik koyma. Yeni bir içerik alanı gerekiyorsa üç yerde eklenir:
   - backend şeması (`backend/src/schemas.js`);
   - panel formu;
   - iki uygulamanın modeli.
3. **Panelden gelen etiketler** (program türleri, etkinlik durumları, SSS, tanıtım metinleri) İngilizce modda da
   Türkçe kalır. Yalnızca uygulamanın kendi metinleri çevrilir.
4. **Sunucusuz / demo mod yok.** Mağaza derlemesi canlı sunucu adresi olmadan çıkmaz; iOS ve Android release
   derlemesi durur.
5. Saatler Europe/Istanbul'da gösterilir ve girilir.

**Güvenlik ve yayın kuralları** (kullanıcının açık onayı olmadan yapılmaz):

| Yapma | Neden / ne yapılır |
|---|---|
| Backend `main`'e push | Canlıya yayın demek. Önce kullanıcıya sor. |
| Canlı veriyi değiştirmek (panelde ya da API ile) | Önce sor. Kalıcı silme yapma. |
| Mağaza incelemesine göndermek, yayına almak | Önce sor. İki mağaza da **elle yayın** modunda: iOS `MANUAL`, Play "Yönetilen yayınlama" açık. Onaydan sonra biri "Yayınla"ya basmalı. |
| TestFlight'a ya da Play'e test kullanıcısı / grup eklemek | Hiç yapma. |
| Gerçek kullanıcılara ya da mağaza derlemesine test bildirimi göndermek | Hiç yapma. Yerelde `PUSH_TOPIC_PREFIX=test-`; test bildirimi yalnızca Debug derlemelere gider. |
| Gizli dosyaları repoya koymak | `backend/secrets/`, `android/signing/`, `.env` repoya girmez. SSM'deki gizli değerleri sohbete yazdırma. |
| Testte gerçek SMS göndermek | Yapma. Yerelde `SMS_DEV_ECHO=true` kodu cevapta döndürür. |
| Canlı panele parola yazmak | Yapma. Kullanıcı kendi tarayıcısında girer. |

---

## 4. Genel mimari

```
 iOS (SwiftUI)  ─┐
 Android (Compose)┼─► https://fuar.bulbi.co ── CloudFront ─┬─ /uploads/* ─► S3 (görseller, yasal sayfalar)
 Panel (React)  ─┘                                        └─ diğerleri ─► ALB ─┬─ public  (fuar listesi, katalog, canlı, stok)
                                                                               ├─ auth    (giriş, hesap, fuara katılım)
                                                                               ├─ scan    (QR okutma, puan, hediye QR'ı, görevli)
                                                                               ├─ admin   (panel + /v1/admin API)
                                                                               └─ worker  (ALB'siz; saatte bir hesap silme temizliği)
                                                                                     │
                                                         PostgreSQL (RDS eylul-db, RDS Proxy) + Redis/Valkey (yalnızca hız sınırı ve "şu an aktif" sayacı)
```

- **Tek kod, beş rol:** aynı Docker imajı `SERVICE_ROLES` ortam değişkenine göre bir ya da birkaç rolü çalıştırır
  (`backend/src/config.js`, `backend/src/app.js`). Yerelde ve testte `all`.
- **İçerik akışı (uygulama):**
  1. `GET /v1/fairs`: fuar listesi.
  2. Fuar seçilince `GET /v1/fairs/:id/catalog`: tam katalog, diske yazılır.
  3. Dakikada bir `GET /live` (ETag; değişmediyse 304). `contentVersion` değişince katalog yeniden iner.
  4. Hediye ekranında 30 sn'de bir `/stock`.
  5. 5 dakikada bir `POST /ping` (aktif cihaz sayımı).
  - **Arama telefonda** yapılır; sunucuya yük yoktur.
- **Açılış:** uygulama cihazdaki kopyayı yükler, açılış ekranı sürerken (en çok 3 sn) yenisini alır; kullanıcı güncel içerikle başlar.
- **Önbellek katmanları:** telefon diski → CloudFront (`s-maxage`: katalog 10 sn, canlı 5 sn, stok 3 sn) → sunucu
  belleği (katalog bir kez kurulur; panel kaydedince geçersiz olur). Katalog ve fuar listesi S3'e yedeklenir.
- **Kimlik:**
  - Ziyaretçi SMS koduyla, Apple ile (yalnızca iOS) ya da Google ile girer.
  - Sunucu imzalı bir token verir. Her istekte `Authorization: Bearer` ve `X-Device-ID` gider.
  - Hesap aynı anda tek cihazda açıktır; başka cihazda açılınca eskisi `401 device_changed` alır.
  - Panel girişi ayrıdır: e-posta + parola, 12 saatlik token.

---

## 5. Backend (`backend/`, repo fuar_web)

### 5.1 Teknoloji ve çalıştırma
- Node.js, Fastify 5, `pg`, `ioredis`, `jose` (Apple/Google token doğrulama). Panel: React + Vite + shadcn/ui +
  Tailwind (form için yalnızca `@mantine/form`).
- Yerel çalıştırma:
  ```bash
  cd backend
  docker compose up -d --build          # API: http://localhost:3100, panel: http://localhost:3100/panel/
  docker compose run --rm api npm test  # 82 uçtan uca test, ayrı fuar_test veritabanında
  ```
- Yerel panel girişleri:
  - `super@example.com` / `dev-super-password`: Bulbi, süper kullanıcı.
  - `eylul@example.com` / `dev-eylul-password`: Eylül organizatörü (yalnızca yerel veritabanında var).
- Yerel `.env`'de `API_PORT=3100`, `PUSH_TOPIC_PREFIX=test-` ve `SMS_DEV_ECHO=true` (SMS kodu cevapta döner).
  Ortam değişkenlerinin tamamı `src/config.js`'te.
- Dockerfile paneli kendisi derler. `cd panel && npm run build` yalnızca yerel önizleme için gerekir.

### 5.2 Kod haritası

**`src/` (sunucu çekirdeği):**

| Dosya | Görev |
|---|---|
| `src/server.js` | Başlatma: havuz, şema kurulumu, ilk süper kullanıcı, boş veritabanına örnek katalog, S3 yedeği, worker zamanlayıcısı |
| `src/app.js` | Fastify; hız sınırı (Redis'te ortak), hata eşleme, yavaş istek günlüğü, rollere göre uç kaydı, `/uploads/` ve `/panel/` |
| `src/config.js` | Bütün ortam değişkenleri, `hasRole()` |
| `src/db.js` | Havuz, `withTransaction`, `ensureSchema` (**yalnızca boş veritabanına** `db/schema.sql` kurar) |
| `src/catalog.js` | `CatalogStore`: katalog / canlı / stok kurma, ETag + gzip, önbellek, `invalidate`, fuar ve kayıt CRUD, `applyBatch`, kütüphane birleştirme |
| `src/schemas.js` | Bütün kayıtların JSON şemaları (uygulama modelleriyle aynı; bilinmeyen alan atılır), `mergedBrand`, `linkProblem`, koleksiyon / tekil kayıt haritaları |
| `src/claims.js` | Puan bakiyesi, hediye alınabilir mi, teslim / geri alma, `gift_usage` sayacı |
| `src/auth.js` | Ziyaretçi tokeni (HMAC), telefon biçimi, dakikada bir değişen hediye QR kodu, mesafe |
| `src/adminUsers.js` | Panel kullanıcıları (scrypt), 12 saatlik token |
| `src/otp.js` | SMS kodu: 6 hane, 5 deneme, yeniden gönderme 60 sn, saatte 5 |
| `src/sms.js` | SMS gönderiminin sağlayıcıya bağlı kısmı (`log` / `mobildev` / `netgsm` / `none`): organizasyonun iki hesabı (MobilDev, Netgsm; panel › Organizasyonlar › SMS'te aktif olan seçilir, `POST /companies/:id/sms/test` servisin hata kodunu gösterir; Netgsm OTP Türkçe karaktersiz, dakikada 100) ve `{OTP}` şablonu, yoksa Bulbi'ninki. `SMS_PROVIDER=log` iken gerçek SMS hiç gitmez |
| `src/identity.js` | Apple ve Google kimlik tokeni doğrulama |
| `src/push.js` | Firebase Cloud Messaging. Konular `fair-<fuar>`, `event-<fuar>-<etkinlik>`, `visitor-<id>`; başlarına `PUSH_TOPIC_PREFIX` eklenir |
| `src/deletion.js` | Hesap silme: hesap hemen kapanır, 30 gün sonra temizlenir; aynı kimliğin yeniden hediye toplamasını engelleyen kayıt kalır |
| `src/stats.js`, `src/usage.js` | Panel özet sayıları; cihaz ping'i ("şu an aktif" Redis'te, günlük tekil cihaz `device_days`'te) |
| `src/staticCopy.js` | Fuar listesi, katalog ve canlı parçayı S3'e yazar (yedek) |
| `src/scaling.js` | Paneldeki "Sunucu" sayfası: mod (normal / fuar / büyük), ECS ve RDS ayarı |

**`src/routes/` (uçlar):**
- `public.js`: fuar listesi, katalog, canlı bilgi, stok, ping, `/q/:kod`, `/indir`.
- `contest.js`: giriş, hesap, fuara katılım, okutma, puan durumu, hediye QR'ı, görevli uçları.
- `admin.js`: panel API'si.
- `adminAuth.js`: panel girişi, organizasyonlar, kullanıcılar.
- `uploads.js`: görsel yükleme (S3 ya da disk).

**Diğer klasörler:**
- `db/schema.sql`: **tek ve tam şema**. Göç (migration) dosyası yok; 2026-10 sonunda hepsi tek dosyada birleştirildi.
- `seed/catalog.json`: yerel örnek fuar `ankara-2026` (boş veritabanına yüklenir).
- `scripts/kontrol.mjs`: tek komutla kontrol listesi (`docs/test-plani.md`).
- `scripts/loadtest.js`: yerel yük testi. `scripts/canli-yuk.mjs` ve `k6-yuk.js`: AWS kapasite testi.
- `deploy/aws/`: AWS betikleri. `deploy.sh` ARM64 imajı ECR'ye iter ve beş ECS servisini günceller. Diğerleri:
  `olcek.sh`, `render_task.py`, `config.env` (kaynak kimlikleri), `firebase-wif.sh`, `sms-from-bulbi.sh`.
- `.github/workflows/deploy.yml`:
  - Her PR'da test.
  - `main`'e push'ta test, ardından OIDC ile AWS'ye yayın (`deploy/aws/deploy.sh`).
  - `watch.yml` 30 dakikada bir canlıyı yoklar.

### 5.3 API özeti

**Herkese açık (`public`):**
- `GET /health`: veritabanına bakmaz.
- `GET /v1/fairs?q=`: yayındaki fuarlar.
- `GET /v1/fairs/:id/catalog | live | stock`: ETag ve `X-Content-Version` ile.
- `POST /v1/fairs/:id/ping`.
- `GET /q/:kod`: uygulamayı ya da mağazayı açan sayfa.
- `GET /indir`: baskıdaki QR'ın adresi, **hiç değişmez** (`baski/uygulama-indir/`). iPhone/iPad App Store'a, Android Google Play'e 302; öteki cihazlar iki bağlantı. Mağaza adresi panelde Uygulama güncellemesi'nden.
- `GET /v1/staff/fairs/:id/gift-list?status=&q=`, `POST .../gift-list/notify`: Kazananlar (Kazanan / Alan / Almayan), panelle aynı liste; görevli bildirimi fuar başına 5 dakikada bir.
- Taslak fuar her yerde 404 döner.

**Giriş ve hesap (`auth`):**
- `POST /v1/auth/otp`, `POST /v1/auth/verify`: yeni hesapta `kvkkAccepted` zorunlu.
- `POST /v1/auth/social`: Apple ya da Google.
- `POST /v1/fairs/:id/join`: fuara katılım (o fuarın KVKK onayı).
- `GET` / `PATCH` / `DELETE /v1/me`: ad, e-posta, `marketingConsent`, `explicitConsent`; silme isteği.
- `POST /v1/me/phone/otp`, `POST /v1/me/phone/verify`.

**Yarışma (`scan`):**
- `GET /v1/fairs/:id/progress`.
- `POST /v1/fairs/:id/scans {code, location?}` döner:
  - başarılı: `scanned` (+ `wonGiftIDs`);
  - sayılmadı: `already`, `unknown`;
  - reddedildi: `join_required`, `profile_incomplete`, `location_required` / `too_far` / `mock_location`, `device_in_use`.
- `GET /v1/fairs/:id/redeem-code`.

**Görevli (`scan`):** panelde telefon numarasıyla eklenmiş ziyaretçi hesabı.
- Uçlar `/v1/staff/fairs/:id/` altında:
  - teslim için: `redeem/:kod`, `gift-claims` (POST, DELETE);
  - geçmiş ve sayılar: `scans`, `claims`, `stats`;
  - saha işleri: `uploads`, `notices` (POST, DELETE), `events/:id/status` (PUT).

**Panel (`admin`, önek `/v1/admin`):**
- Organizatör yalnızca kendi organizasyonunun fuarlarını görür; başka fuar 404 döner. (S) = yalnızca süper (Bulbi).

| Alan | Uçlar |
|---|---|
| Fuar | `GET /fairs`, `PUT /fairs/:id` (SSS `fair.faq` alanı da buradan kaydedilir), `PUT /fairs/:id/home-publishers`, `POST /fairs/:id/copy-from/:kaynak` (S; yayınevi, kişi, kroki, tesis, tür, yarışma, KVKK kopyalanır, **program, duyuru, banner kopyalanmaz**), `PUT /fairs/:id/company` (S), `DELETE /fairs/:id` (S) |
| Koleksiyonlar | `banners`, `publishers`, `authors`, `events`, `notices`, `facilities`: `GET` liste, `GET` / `PUT` / `DELETE /fairs/:id/<koleksiyon>/:kayıt`, `…/dependents`, `PUT /<koleksiyon>-order` |
| Toplu kayıt | `POST /fairs/:id/batch {put:[{collection,item}], remove, singletons}`: tek işlemde (kroki editörü bunu kullanır) |
| Tekil kayıtlar | `GET` / `PUT /fairs/:id/venue-map, gift-campaign, legal, event-kinds, facility-kinds` |
| Kütüphane | `/library/publishers, authors, books`: her organizasyonun kendi kütüphanesi; süper kullanıcı `X-Fair-Id` göndermeli |
| Organizasyon | `/companies` (S), `PUT /companies/:id/brand` (logo, renk, **about** = Hakkımızda metni, telefon, e-posta, web, adres; S), `PUT /companies/:id/legal` (S), `GET` / `PUT /companies/:id/sms` (S) |
| Genel ayarlar | `/global-banners`, `/app-update` (zorunlu / önerilen güncelleme), `/app-info` ("Bulbi tarafından yapılmıştır" satırı), `/settings/review-account` (mağaza inceleme hesabı, S), `/scaling` (S) |
| Bildirim | `POST /fairs/:id/notices/:nid/push`, `POST /fairs/:id/events/:eid/push`, `POST /fairs/:id/contest/notify`, `GET /fairs/:id/push-log` |
| Kişiler | `GET /visitors` (süzgeçli), `GET /visitors/:id`, `DELETE /visitors/:id` (S), `GET /deletions` (S) |
| Yarışma | `GET /fairs/:id/contest` (sıralama), `POST` / `DELETE /fairs/:id/gift-claims`, `GET` / `PUT` / `DELETE /fairs/:id/staff/:telefon`, `GET /fairs/:id/task-codes` |
| Yükleme | `POST /v1/admin/uploads`: jpeg, png ya da webp, en çok 5 MB |

### 5.4 Uygulamanın aldığı katalog (JSON)

- **Üst anahtarlar:**
  - içerik: `fair`, `banners`, `publishers`, `authors`, `books`, `events`, `notices`, `facilities`;
  - kroki ve türler: `venueMap`, `eventKinds`, `facilityKinds`;
  - yarışma: `giftCampaign`;
  - isteğe bağlı: `legal`, `appUpdate`, `appInfo`.
- `/live` bunların sık değişen kısmını taşır: `contentVersion`, `fair`, `events`, `notices`, `banners`, `giftCampaign`,
  `appUpdate`, `appInfo`, `eventKinds`.
- **`fair` alanları:**

  | Grup | Alanlar |
  |---|---|
  | Zorunlu (panelde; uygulama yalnızca `id` ister) | `id`, `name`, `shortName`, `venue`, `address`, `openingHours`, `days[{number,date}]` |
  | Fuar listesi kartı | `city`, `cover`, `summary` |
  | Konum | `location{lat,lng}` |
  | Durum | `status` (draft / published / archived), `live{state,message}` |
  | Görünüm | `brand{logo, logoDark, organizer, colorHex, about, phone, email, website, address}`, `labels` (sekme adları), `signIn{image,title,subtitle}` |
  | Bölümler | `modules{contest, program, map, plan}` (duyurular her zaman açık), `giftsOff` (yarışma kapalıyken Hediyeler sekmesi) |
  | İçerik | `faq[{question,answer}]`, `homePublishers[]` |
  | Yarışma | `contest{onePerDevice, location{required,lat,lng,radiusMeters}}` |
- **Marka birleştirme** (`mergedBrand`): organizasyonun `brand`'ı alınır, `organizer` organizasyon adıdır, fuarın
  dolu alanları üstüne yazar. Hakkımızda metni (`about`) ve iletişim genelde organizasyonda tutulur.
- **Yasal metinler** (`legal`):
  - `kvkkHtml`: KVKK Aydınlatma Metni;
  - `userAgreementHtml`: Kullanıcı Sözleşmesi;
  - `explicitConsentHtml`: Açık Rıza Metni;
  - `marketingHtml`: ticari ileti / İYS izni.
  - Önce organizasyonunki kullanılır, fuarın kendi metni varsa o geçer.
  - **Dört metin de taslaktır; Eylül'ün avukatı onaylayacak.**
- **Hediye kampanyası** (`giftCampaign`):
  - Görevler `tasks[]`:
    - tür `publishers` (yayınevi stantları, yayınevi başına gizli QR) ya da `qr` (özel QR);
    - tekrar `once` ya da `daily`.
  - Hediyeler `gifts[{requiredPoints, stock}]`, teslim metni `deliveredMessage`.
  - **Hediye alma (6 Kasım):** kişi `POST /fairs/:id/gifts/:hediye/take` ile alır; puan ve stok tek işlemde düşer
    (`claimGift`), stok yoksa hiçbir şey değişmez, yeniden deneme güvenli. `gift_claims` = alınan, `gift_deliveries` = teslim
    edilen. Geri alma iki adım: teslimi kaldırır, sonra iptal edip puan ve stoğu döndürür. Stok alınan adetin altına inemez
    (panel ve görevli). Hesap silinince teslim alınmamış hediyeler stoğa döner. Teslimde kişiye bildirim, ticari ileti izni
    varsa SMS gider (`notifyDelivered`). Yük testi: 100 kişi, 300 eşzamanlı istek, 25 stok: tam 25 kişi aldı.
- `appUpdate` ve `appInfo` bütün fuarlarda aynıdır (`settings` tablosu).

### 5.5 Veri modeli (`db/schema.sql`)

| Konu | Tablolar |
|---|---|
| Panel | `companies` (organizasyon: marka, yasal metinler, SMS ayarı), `admin_users` |
| Fuar ve içerik | `fairs` (`data` jsonb), `items` (fuarın koleksiyonları jsonb; tekil kayıtlar `id='main'`), `library` (her organizasyonun yayınevi / yazar / kitabı), `settings` |
| Ziyaretçi | `visitors` (tek hesap, bütün fuarlar; `marketing_consent_at`, `explicit_consent_at`, `deletion_requested_at`), `visitor_fairs` (fuara katılım = o fuarın KVKK onayı) |
| SMS | `otp_codes`, `otp_sends` |
| Yarışma | `task_codes` (gizli QR → görev + yayınevi), `task_scans` (aynı okutmanın iki kez yazılmasını birincil anahtar engeller), `fair_players` (puan özeti), `gift_claims`, `gift_usage`, `gift_events` |
| Görevli | `staff`, `staff_scans` |
| Diğer | `push_log`, `device_days`, `blocked_identities`, `account_deletions` |

> ⚠️ **Göç yok.** `ensureSchema` yalnızca boş veritabanına kurar. Canlı veritabanına yeni bir sütun ya da tablo
> **elle** (`ALTER TABLE …`) eklenmelidir; yoksa o sütunu okuyan uçlar canlıda kırılır. Şemaya bir şey eklersen
> canlıya nasıl ekleneceğini kullanıcıya söyle.

---

## 6. Panel (`backend/panel/src/`)

- `App.jsx`: giriş ekranı ve iki alan. Sayfa adresi `#/sayfa` biçiminde.
  - **Bulbi alanı** (süper kullanıcı, organizasyona girmeden):
    - Fuarlar, Organizasyonlar, Genel bannerlar, Kişiler, Hesap silme;
    - Panel kullanıcıları (mağaza inceleme hesabı da burada), Uygulama güncellemesi (+ Bulbi satırı), Sunucu.
  - **Organizasyon alanı** (organizatör, ya da organizasyona giren süper kullanıcı). Üstte fuar seçici, menüde:
    - içerik: Özet, Program, Duyurular, Bannerlar, Kütüphane (Yayınevleri, Yazarlar, Kitaplar);
    - Kroki, Hediyeler, Kişiler, Fuar ayarları;
    - bölümü kapalı sayfalar gizlenir.
- `FairContext.jsx`: seçili fuar, panelin taze katalog kopyası, `save` ve `reload`. `api.js`: token ve `X-Fair-Id`.
- Sayfalar `pages/`:

  | Sayfa | Ne yönetir |
  |---|---|
  | `Dashboard.jsx` | Özet sayılar, eksik içerik uyarıları |
  | `Events.jsx` | Program, etkinlik türleri, canlı başlat / bitir, bildirim |
  | `content.jsx` | Yayınevleri (ana sayfa seçimi), yazarlar, kitaplar, duyurular, hizmet türleri |
  | `Banners.jsx` | Fuar bannerları ve genel bannerlar |
  | `MapEditor.jsx` | Kroki: stantlar, alanlar, şekiller, tesisler (`/batch` ile kaydeder) |
  | `Contest.jsx` | Görevler (QR PNG / PDF, okutma konumu, bir telefon bir hesap), Hediyeler, Katılımcılar (sıralama, Excel, bildirim), Görevliler (`Staff.jsx`) |
  | `FairSettings.jsx` | Sekmeler: Genel, Görünüm (logo, renk, Hakkımızda ve iletişim, fuar kartı), Bölümler ve adlar, **Sık sorulan sorular**, Giriş ekranı, **Sözleşmeler** (dört metin), Yedek. Sağda canlı telefon önizlemesi (`components/PhonePreview.jsx`) |
  | `Companies.jsx` | Organizasyon: marka, Hakkımızda ve iletişim, dört yasal metin, SMS ayarı |
  | `MarketingConsents.jsx` | Kişiler: süzgeç, kişi kartı, Excel |
  | `Fairs.jsx`, `Deletions.jsx`, `Users.jsx`, `AppUpdate.jsx`, `Server.jsx` | Bulbi alanı sayfaları |
- Ortak parçalar `components/`:
  - `CollectionPage` (liste + form + sayfalama), `library.jsx` (kütüphane sayfası ve seçici);
  - `fields.jsx`, `confirmDelete`, `LocationPicker` (Leaflet), `ImageCropDialog`, `LinkField`, `PushButton`;
  - `qrCards.js` (QR kartları), `xlsx.js`;
  - `ui/`: shadcn bileşenleri.
- Saatler `time.js` ile Europe/Istanbul.

---

## 7. Mobil uygulamalar: ortak yapı

İki uygulama aynı mimariyi platformun kendi araçlarıyla kurar:

| Kavram | iOS | Android |
|---|---|---|
| Giriş noktası | `App/EylulRehberApp.swift` → fuar seçili değilse `FairPickerView`, seçiliyse `FairScene` | `MainActivity.kt` → `FairPickerScreen` ya da `key(fairId)` içinde uygulama |
| Kök ekran | `App/RootView.swift` (açılış ekranı, tur, güncelleme, tam ekran katmanlar, bağlantılar, yoklama) | `ui/EylulApp.kt` (NavHost, `MainTabs`, katmanlar, yoklama) |
| Gezinti | `Core/Routing/AppRouter.swift`: `AppTab`, `AppDestination`, `AppSheet`, `AppCover`, `handle(AppLink)` | `core/AppState.kt`: `AppTab`, `Routes` (`@Serializable`), `handle(AppLink)` |
| Sekmeler | Ana sayfa, Hediyeler, **Program** (ortadaki büyük düğme), Kroki, Planım; üstte menü, logo, ⓘ, zil | aynısı |
| Fuar verisi | `Core/Stores/FairStore.swift` | `core/Stores.kt › FairStore` |
| Ziyaretçinin cihazdaki verisi (Planım, okunanlar, okutmalar) | `Core/Stores/VisitorStore.swift` (UserDefaults, `eylul.visitor.v1.<fuar>`) | `core/Stores.kt › VisitorStore` (SharedPreferences, aynı anahtar) |
| Oturum, yarışma API'si | `Core/Session/SessionStore.swift` (+ `APIClient`), token Keychain'de | `core/Stores.kt › SessionStore`, `core/Contest.kt`; token SharedPreferences'ta |
| Katalog indirme ve önbellek | `Core/Data/FairRepository.swift` (`CachedFairRepository(RemoteFairRepository)`) | `core/Api.kt › CatalogRepository` |
| Fuar listesi | `Core/Data/FairDirectory.swift` | `core/Fairs.kt` |
| Modeller | `Core/Models/Models.swift` | `core/Models.kt` |
| Dil | Türkçe kaynak, İngilizcesi `Resources/Localizable.xcstrings`; `L("…")` | `t("Türkçe", "English")` satır içinde (`core/Language.kt`) |
| Fuar saati | `Core/Models/FairTime.swift` | `core/Language.kt › FairTime` |
| Tasarım | `DesignSystem/` (`Glass.swift`, `Theme.swift`, `Components.swift`, `Typography.swift`: başlıklar Lora) | `ui/theme/Theme.kt`, `ui/components/Components.kt`, `ui/people/PeopleShared.kt` |
| Push | `Core/Session/PushService.swift` (Firebase Messaging) | `core/Push.kt` |
| Konum | `Core/Session/LocationService.swift` | `core/Location.kt` |
| Yerel hatırlatma | `Core/Session/ReminderScheduler.swift` (etkinlikten 15 dk önce) | `core/Reminders.kt` |
| Widget | `EylulWidget/PlanWidget.swift` + `Shared/PlanSnapshot.swift` + `Core/Session/PlanWidgetSync.swift` | `core/PlanTracking.kt` + `res/xml/plan_widget_info.xml` (ayrıca yalnızca Android'de "Program takibi" süreli bildirimi) |
| Kısayollar | `Config/Info.plist › UIApplicationShortcutItems` | `res/xml/shortcuts.xml` |

- **Yoklama:**
  - 30 sn'de bir saat (`tick`);
  - 60 sn'de bir `/live`;
  - 5 dk'da bir `/ping`;
  - uygulama öne gelince ve push gelince yenileme.
- **Derin bağlantılar:**
  - Biçim `eylulrehber://<hedef>/<id>`.
  - Hedefler: event, publisher, author, book, stand, notice, program, map, gifts, plan, search, notices, url, stamp,
    redeem, scan.
  - Push yükü `target`, `id`, `fairID` taşır; başka fuarınsa önce fuar değişir.
- **Push konuları:** `fair-<fuar>`, `event-<fuar>-<etkinlik>` (Planım'daki her etkinlik için), `visitor-<id>`.
  Debug'da başlarına `test-` eklenir, mağaza derlemesinde ön ek yoktur.
- **Kapalı bölüm:** fuarın `modules` ayarı kapalı bölümleri gizler. Hediyeler sekmesi her zaman durur; yarışma
  kapalıysa `GiftsOff` ekranını gösterir.
- **Fuar değiştirme:** yan menüdeki "Fuar değiştir" satırı, birden çok yayındaki fuar varsa görünür.
- **Eksik veri (2 Kasım 2026):** panelden bir alan ya da bölüm gelmezse uygulama yine açılır. Kimlik dışında her alanın
  varsayılanı var (boş metin, 0, görselsiz → yer tutucu zemin, logosuz yayınevinde adı); okunamayan kayıt (kimliği ya da
  saati eksik etkinlik…) listeden atlanır, geri kalanı gösterilir. Boş bölümde "yakında" ekranı: ana sayfa "İçerik
  hazırlanıyor", Program "Program yakında açıklanacak", Hediyeler "Görevler ve hediyeler yakında", Kroki "Kroki yakında
  eklenecek". Boş "Hakkında" kartı ve geçersiz web adresi gösterilmez.
  - iOS: `Models.swift` › `@Default` / `@Lossy` (salt okunur sarmalayıcı; ayarlanabilir olanı `nonisolated struct`
    içinde derlenmiyor) ve değişen kapsayıcılarda (`FairCatalog`, `CatalogLive`, `GiftCampaign`) elle çözücü
    (`c.value`, `c.lossy`); iç içe isteğe bağlı nesneler `lenient`.
  - Android: `Models.kt` › alan varsayılanları, `SkipInvalidListSerializer` (`…List`), `OrNullSerializer`,
    `OrDefaultSerializer` (kroki, kampanya).
  - Panel bu alanları yine zorunlu tutar (veri kalitesi); uygulama artık onlara güvenmez. Test: TEST.md D17.

### 7.1 iOS (`ios/`)
- **Proje:**
  - SwiftUI, iOS 17+ (iOS 26'da Liquid Glass), Swift 6, varsayılan izolasyon MainActor, yalnızca iPhone, dikey.
  - Xcode "synchronized folders" kullanılır: yeni dosya eklemek için `project.pbxproj`'a dokunmak gerekmez.
  - Tek paket bağımlılığı Firebase (yalnızca Messaging). Google girişi SDK'sız, PKCE ile (`Core/Session/GoogleAuth.swift`).
- **Hedefler:**
  - `EylulRehber` (uygulama, `com.bulbi.fuar`);
  - `EylulWidgetExtension` (`com.bulbi.fuar.widget`);
  - ortak dosya `Shared/PlanSnapshot.swift` (App Group `group.com.bulbi.fuar`).
- **Derleme ayarı:**
  - `API_BASE_URL` Debug ve Release'de `https://fuar.bulbi.co`.
  - "API adresi" build phase'i, Release'de adres boşsa derlemeyi durdurur.
  - `PUSH_TOPIC_PREFIX` Debug'da `test-`, Release'de boş.
  - Sürüm: `MARKETING_VERSION 1.3`, `CURRENT_PROJECT_VERSION 12`. **Sonraki yükleme build 13.**
- **Mağaza yüklemesi:**
  - `xcodebuild archive`, ardından `xcodebuild -exportArchive` (ExportOptions: app-store-connect, destination upload,
    team `Q47SYK6PMC`).
  - App Store Connect işleri tarayıcıdan, kullanıcının oturumuyla yapılır.
- Ekran görüntüleri ve inceleme QR'ı: `ios/AppStore/`. Marka betikleri: `ios/Branding/`.
- Yerel docker'a karşı derleme (simülatör):
  ```bash
  cd ios
  xcodebuild -project EylulRehber.xcodeproj -scheme EylulRehber \
    -destination 'platform=iOS Simulator,name=iPhone 17e' API_BASE_URL=http://localhost:3100 build
  ```
  Paylaşılmış (commit'li) scheme yok; `EylulRehber` scheme'i Xcode kendisi üretir.
- Önbellekteki eski katalog yeni model alanlarını göstermez; gerekirse uygulamayı silip yeniden kur.

### 7.2 Android (`android/`)
- **Proje:**
  - Tek modül `:app`. Kod paketi `com.bulbi.eylulrehber`, uygulama kimliği `com.bulbi.fuar`.
  - minSdk 26, targetSdk 36, compileSdk 37, Java 17.
- **Kütüphaneler:**
  - arayüz ve gezinti: Compose (BOM 2026.09), navigation-compose;
  - ağ ve veri: OkHttp, kotlinx.serialization, Coil;
  - harita: **MapLibre** + OpenFreeMap (gerçek harita);
  - Google Play servisleri:
    - QR okuma: Code Scanner;
    - konum: play-services-location;
    - Google girişi: Credential Manager + googleid;
    - SMS kodunu otomatik doldurma: auth-api-phone;
  - Firebase Messaging, ZXing (hediye QR'ı), konfetti.
- **Derleme ayarı:**
  - `gradle.properties › apiBaseUrl=https://fuar.bulbi.co` (`BuildConfig.API_BASE_URL`). Adres boşsa **release**
    derlemesi durur; debug durmaz.
  - İmza `android/signing/` klasöründen gelir (repoda yok, yalnızca bu Mac'te; yükleme anahtarı).
  - Sürüm: `versionName 1.3`, `versionCode 7`. **Sonraki yükleme versionCode 8.**
  - Play'e AAB yüklenir. Tarayıcıdan yüklemede 10 MB sınırı var: büyük paket parçalanıp sayfada birleştirilir.
- Yerel docker'a karşı derleme (emülatör):
  ```bash
  cd android
  ./gradlew :app:assembleDebug -q -PapiBaseUrl=http://10.0.2.2:3100
  adb install -r app/build/outputs/apk/debug/app-debug.apk
  ```
  Release APK debug'ı engeller (imza farkı): önce `adb uninstall com.bulbi.fuar`.

---

## 8. Özellik → dosya haritası

iOS yolları `ios/EylulRehber/`'a, Android yolları `android/app/src/main/java/com/bulbi/eylulrehber/`'e, panel yolları
`backend/panel/src/pages/`'e göredir.

| Özellik | iOS | Android | Panel | API / veri |
|---|---|---|---|---|
| Fuar seçimi, fuar değiştir | `Features/Account/FairPickerView.swift`, `Core/Data/FairDirectory.swift` | `ui/FairPicker.kt`, `core/Fairs.kt` | `Fairs.jsx` (durum: taslak / yayında) | `GET /v1/fairs?q=` |
| Açılış ekranı | `App/SplashView.swift` | `ui/SplashScreen.kt` | — | `fair.summary`, `FairStore.dayStatus` |
| İlk açılış turu | `Features/Home/AppTour.swift` | `ui/AppTour.kt` | — | `eylul.tour.done` |
| Ana sayfa (bannerlar, program bölümü: kalan etkinlikler sırayla `count` kadar, yoksa bölüm yok; popüler yayınevleri, arama) | `Features/Home/HomeView.swift` | `ui/home/HomeScreen.kt` | Ana ekran sayfası, `Banners.jsx` | `banners`, `fair.homeProgram`, `fair.homePublishers`, `fair.sponsors`, `fair.ticketUrl` |
| **Fuar bilgileri (ⓘ)**: tanıtım, tarih, saat, SSS, konum, Hakkımızda bağlantısı | `Features/Home/FairInfo.swift` | `ui/home/FairInfo.kt` | `FairSettings.jsx` (Genel, Sık sorulan sorular) | `fair.summary`, `fair.cover`, `fair.faq`, `fair.location` |
| Gerçek harita, uzaklık, yol tarifi | `Features/Home/VenueMap.swift` (MapKit, Apple / Google Haritalar) | `ui/home/VenueMap.kt` (MapLibre, Google Haritalar / `geo:`) | `FairSettings.jsx` (`components/LocationPicker.jsx`) | `fair.location` |
| Arama (yazar, yayınevi) | `Features/Search/SearchView.swift` | `ui/search/SearchScreen.kt` | — | telefonda |
| Yayınevi, yazar, kitap | `Features/People/PublisherDetailView.swift`, `AuthorDetailView.swift`, `BookDetailSheet.swift`, `BooksView.swift` | `ui/people/PeopleScreens.kt`, `PeopleShared.kt` | `content.jsx` (kütüphane) | `publishers`, `authors`, `books` |
| Program (gün, tür süzgeci, canlı, iptal / erteleme) | `Features/Program/ProgramView.swift`, `EventDetailView.swift` | `ui/program/ProgramScreen.kt`, `ProgramShared.kt`, `EventDetailScreen.kt` | `Events.jsx` | `events`, `eventKinds`, `liveStatus`, `update` |
| Kroki (stant planı, tesisler). Tek Canvas, stant başına ad stanta sığdırılır, yakınlığa göre gizlenmez; hareket yeniden çizim yapmaz (iOS `scaleEffect`+Equatable, Android `graphicsLayer`); yazı yerleşim formülü iki platformda aynı (`FloorStand.layout`) | `Features/Map/FloorPlanScreen.swift`, `FloorPlanCanvas.swift`, `FloorPlanViewport.swift` | `ui/map/MapScreens.kt` | `MapEditor.jsx` | `venueMap`, `facilities` |
| Konuk ülke (afişli sade liste, detay sayfası, konuk = yazar) | `Features/Home/FairInfo.swift › EditionsView, EditionDetailView, ImageCarousel` | `ui/home/FairInfo.kt` | `FairSettings.jsx` (Konuk Ülke) | `fair.editions` (`guests`, `partners`, `gallery`) |
| Duyurular ve bildirim | `Features/Notices/NoticesView.swift`, `NoticeDetailView.swift` | `ui/notices/NoticesScreens.kt` | `content.jsx` (duyurular), `components/PushButton.jsx` | `notices`, push `fair-<fuar>` |
| Planım, hatırlatma, widget | `Features/Plan/PlanView.swift`, `Core/Session/ReminderScheduler.swift`, `PlanWidgetSync.swift`, `EylulWidget/` | `ui/plan/PlanScreen.kt`, `core/Reminders.kt`, `core/PlanTracking.kt` | — | cihazda |
| Hediyeler: görevler, puan, hediye alma, Kazandıklarım | `Features/Gifts/GiftsView.swift`, `TaskDetailView.swift`, `GiftDetailView.swift` | `ui/gifts/GiftsScreens.kt`, `TaskDetail.kt`, `ContestScreens.kt` | `Contest.jsx` (Hediye alanlar sekmesi, stok) | `giftCampaign`, `/progress` (`wins`), `/stock`, `/gifts/:id/take` |
| QR okutma | `Features/Gifts/QRScannerView.swift` (VisionKit) | `ui/gifts/QRScanner.kt` (Google Code Scanner) | `Contest.jsx` (QR kartları) | `POST /scans` |
| Hediye QR'ım (dakikada bir değişir) | `Features/Gifts/RedeemQRView.swift` | `ui/gifts/ContestScreens.kt › RedeemQrLayer` | — | `GET /redeem-code` |
| Yarışma kapalı ekranı | `Features/Gifts/GiftsOffView.swift` | `ui/gifts/GiftsOffScreen.kt` | `FairSettings.jsx` (Bölümler ve adlar) | `fair.modules.contest`, `fair.giftsOff` |
| Görevli modu (teslim, saha, duyuru + bildirim, stok, bekleyen iptali) | `Features/Staff/StaffShell.swift`, `StaffFieldView.swift`, `StaffGifts.swift` | `ui/staff/StaffApp.kt`, `FieldTab.kt` | `Staff.jsx` (Hediyeler › Görevliler) | `/v1/staff/…` |
| Giriş (SMS, Apple, Google) ve **üyelik onayları** (KVKK + Kullanıcı Sözleşmesi zorunlu; Açık Rıza ve İYS isteğe bağlı) | `Features/Gifts/SignInView.swift`, `KVKKView.swift` (`LegalDoc`) | `ui/gifts/SignInSheet.kt` (`LegalDoc`, `LegalSheet`) | `FairSettings.jsx` (Giriş ekranı, Sözleşmeler), `Companies.jsx` | `/v1/auth/*`, `legal`, `PATCH /v1/me` |
| Profil, telefon değiştirme, hesap silme | `Features/Gifts/ProfileView.swift` | `ui/gifts/ContestScreens.kt › ProfileScreen` | `Deletions.jsx` | `/v1/me`, `DELETE /v1/me` |
| Yan menü (Fuar bilgileri, Hakkımızda, Sözleşmeler ve Politikalar, Ayarlar, Fuar değiştir, Bulbi satırı) | `Features/Account/SideMenu.swift` | `ui/SideMenu.kt` | `AppUpdate.jsx` (Bulbi satırı) | `appInfo` |
| Hakkımızda ve iletişim | `Features/Account/ContactView.swift › AboutView` | `ui/SideMenu.kt › AboutScreen` | `Companies.jsx`, `FairSettings.jsx` (Görünüm) | `fair.brand.about`, telefon, e-posta, web, adres, `images`, `contactTitle`, `contactUrl`, `socials` |
| Sözleşmeler ve Politikalar | `Features/Account/SideMenu.swift › AgreementsView` | `ui/SideMenu.kt › AgreementsScreen` | `FairSettings.jsx` (Sözleşmeler), `Companies.jsx` | `legal` |
| Ayarlar (dil, görünüm, bildirim) | `SideMenu.swift › SettingsView`, `LanguageView`, `AppearanceView` | `ui/SideMenu.kt › SettingsScreen`, `LanguageScreen`, `AppearanceScreen` | — | cihazda |
| Uygulama güncellemesi (zorunlu / önerilen) | `Core/Models/AppUpdate.swift`, `App/UpdateRequiredView.swift` | `core/AppUpdate.kt`, `ui/UpdateScreens.kt` | `AppUpdate.jsx` | `appUpdate` |
| Erişilebilirlik (ekran okuyucu, büyük yazı) | etiketler, `DynamicTypeSize.isLarge`, Lora + Dynamic Type | `isLargeText`, `AdaptiveRow`, `contentDescription`, `Role.Tab` | — | — |

---

## 9. Test kancaları (simülatör / emülatör)

| Ne | iOS (launch argümanı) | Android (`adb shell am start … --es`) |
|---|---|---|
| Saati kaydır | `-eylul.now 2026-12-05T13:42:00+03:00` | `--es eylul.now 2026-12-05T13:42:00+03:00` |
| Dil | `-eylul.language tr\|en` | `--es eylul.language tr\|en` |
| Görünüm | `-eylul.appearance dark\|light\|system` | `--es eylul.appearance dark\|light\|system` |
| Fuar seç | `-eylul.fairID ankara-2026` | `--es eylul.fairID ankara-2026` |
| Bağlantı aç | `-eylul.openLink eylulrehber://event/e7` | `--es eylul.openLink eylulrehber://event/e7` |
| QR okutmuş gibi | `-eylul.scan <QR içeriği>` | `--es eylul.scan <QR içeriği>` |
| Sayfa aç | `-eylul.page menu\|info\|about\|settings\|agreements\|signin` | yok |
| Turu atla | `-eylul.tour.done YES` | ilk açılışta "Geç" |
| Telefon önceden dolu | `-eylul.test.phone …` | yok |
| Hatırlatma iznini sorma (ekran görüntüsü için) | `-eylul.screenshotMode YES` | yok |

- Android'de etkinlik adı: `com.bulbi.fuar/com.bulbi.eylulrehber.MainActivity`.
- Android kancaları yalnızca Debug'da çalışır. iOS'ta `language`, `appearance`, `fairID` ve `screenshotMode`
  mağaza derlemesinde de okunur.
- Debug'da sunucu `devCode` döndürürse "Test kodu" düğmesi çıkar (SMS kodu elle yazılmaz).
- Kamerasız simülatörde iOS örnek okutma (`demoScan`) yapar.
- **Simülatörde dokunma:** iOS simülatöründe ekrana dokunma her zaman uygulamaya ulaşmayabilir. Sayfa açmak için
  `-eylul.page` / `-eylul.openLink` kullan. Android'de `adb shell input tap x y` çalışır.

---

## 10. Test ve doğrulama

**"Test yap" denince tam liste: [`TEST.md`](TEST.md)** (backend, panel, iki uygulama, uygulama + backend senaryoları;
her seferinde aynı adımlar, rapor `docs/test-sonuclari/`). Aşağısı araçların kısa özeti.

1. **Backend:** `cd backend && docker compose run --rm api npm test`. 82 test geçmeli. Yeni uç ya da kural için
   `test/api.test.js`'e test ekle.
2. **Uçtan uca kontrol listesi:** `node scripts/kontrol.mjs` (1 milyon kişilik veriyle; `--hizli` ~5 dk). Plan:
   `backend/docs/test-plani.md`, sonuçlar `backend/docs/test-sonuclari/` (gitignore'da, yalnızca yerelde).
3. **Uygulamalar:** iOS ve Android'de **otomatik test yok**. Doğrulama simülatörde ve emülatörde, yerel docker'a karşı
   yapılır:
   - test kancalarıyla ilgili ekran açılır;
   - ekran görüntüsü alınır;
   - iki platform yan yana karşılaştırılır.
4. **Panel:** yerelde `http://localhost:3100/panel/` üzerinde tarayıcıyla. Kayıttan sonra uygulamanın
   `/v1/fairs/<id>/catalog`'unda değişikliğin göründüğüne bak.
5. **Canlıda** yük testi yapılmaz. Canlıda yalnızca okuma (GET) ile kontrol yapılır; değişiklik için kullanıcıya sor.

---

## 11. Yayın süreci

- **Backend / panel:** `cok-fuar`'da çalış, sonra kullanıcının onayıyla `main`'e birleştir ve push et. GitHub Actions
  test eder ve AWS'ye yayınlar. Şema değiştiyse canlı veritabanına `ALTER` gerekir (§5.5).
- **Toplu veri yükleme:** `API=… EMAIL=… node scripts/fuar-yukle.mjs` (`backend/` içinde; şifre gizli sorulur). Görselleri yükler, fuarı `seed/catalog.json`'la değiştirir, kampanyayı ve QR'ları korur, eski demo yazar/kitapları siler.
- **Mağaza uyumu:** görevli teslimi artık QR kodu ister (`gift-claims` gövdesinde `code`), hediye alma yeni uygulamada: bu backend'le 1.3 uygulamadaki görevli teslim edemez. Fuar başlamadan iOS 13 / Android 8 yayınlanmalı.
- **Canlı içerik** (fuar, program, metin): panelden, ya da panelin oturumuyla `/v1/admin` API'sinden. Değişiklik
  uygulamaya 1 dakika içinde yansır; CloudFront önbelleği 30 sn'ye kadar eski kopya verebilir.
- **Mağaza:**
  1. Sürüm ya da build numarasını artır.
  2. Canlı adresle derle:
     - iOS: archive + export (`API_BASE_URL` canlı adres);
     - Android: `./gradlew bundleRelease -PapiBaseUrl=https://fuar.bulbi.co`.
  3. Yükle.
  4. **Kullanıcının onayıyla** incelemeye gönder.
  5. Onaydan sonra **elle yayınla**:
     - iOS: App Store Connect'te yayına al;
     - Play: Console › Yayın özeti › "Değişiklikleri yayınla".
  - Sürüm notu genelde "Genel hız ve performans iyileştirmeleri".
  - Mağaza metinlerinde şehir adı geçmez; uygulama genel bir fuar uygulamasıdır.
- **Mağaza inceleme hesabı:** panelde (Panel kullanıcıları › inceleme hesabı). Sabit kodla girer, SMS gitmez. Aynı
  hesap ikinci cihazda açılınca ilki kapanır.

---

## 12. Bilinen sorunlar, borçlar, eskimiş belgeler (1 Kasım 2026)

**1 Kasım uçtan uca testinde bulunanlar ve durumları:**
- **QR okutmada gereksiz konum zorunluluğu — düzeltildi, canlıda (backend `2d5a6d6`):**
  - Canlı fuarlarda eski `fair.geofence` duruyordu; panelde "QR okutma yeri" kapalıyken uygulamalar yine konum
    istiyordu (`needsLocation` iki platformda da `fair.geofence`'e bakar).
  - Artık katalog `geofence`'i yalnızca `contestFence(fair)` konum istiyorsa gönderir (`src/catalog.js › #build`).
    Eski geofence, fuarın `location`'ı yoksa onun yerine geçer (kroki, yol tarifi). Uygulama güncellemesi gerekmedi.
- **iOS fuar seçme ekranında dil karışıklığı — düzeltildi (iOS `f7ec957`, sonraki sürümle çıkar):** dil ortamı artık
  `EylulRehberApp`'te, ilk açılıştaki `FairPickerView` de uygulamanın dilinde.
- **iOS programı "şimdi" çizgisine kaydırmıyordu — düzeltildi (iOS `f7ec957`):** çizgi tembel listede başka satırın
  içindeydi; artık Android'deki gibi kendi satırı.
- **Android Debug "Test kodu" — düzeltildi (Android `8d8c6e7`):** dokununca kodu alana yazar (iOS ile aynı).
- **Bilerek bırakılan:** iOS'ta Apple giriş düğmesi sistemin `SignInWithAppleButton`'ı; yazısı uygulamanın açıldığı
  dilde. Uygulama içinde dil değişince bir sonraki açılışta düzelir (`AppLanguage.select` `AppleLanguages`'i ayarlar).
  Elle çizilmiş kopyası App Review riski taşır.

**1 Kasım iOS 17 / 26 / 27, büyük fuar ve büyük yazı testi (düzeltildi, iOS `8259eb6`, Android `374be72`):**
- iOS 17'de WC simgesi (`figure.stand.dress.line.vertical.figure`, iOS 18+) boş kare çıkıyordu: `FacilityGlyph` yedek simge.
- iOS 26'da ana sekmelerde içerik logonun arkasında görünüyordu: `mainTopBar` artık her sürümde kâğıt renginde dolu.
- Fuar değişince açılışta store'un örnek fuarının adı ("24. Ankara Kitap Fuarı") görünüyordu: `FairLogo` katalog
  gelene kadar fuar listesini kullanır (Android gibi).
- iOS yazı boyutu en çok `accessibility1` (Android'in 2,0 sınırı kadar); üstünde adlar harf harf bölünüyordu.
- Büyük fuar (428 yayınevi, 1.508 yazar, 6.025 kitap, 600 etkinlik; yerel `buyuk-test`): katalog 177 KB gzip, ilk
  kurulum 0,16 sn; iki uygulama da akıcı (Android release: ana sayfa %1 takılan kare, bellek 143 MB; iOS 54 MB).
- iOS 27 simülatöründe açılış 3-6 sn boş: Apple'ın kendi uygulamalarında da aynı (simülatör dyld'si), cihazda yok.
  Ayrıca uygulamanın kendi döngüsü vardı (iOS 27'de sürekli %98 işlemci, `VisitorStore` init'te UserDefaults'a
  yazıyordu → `@AppStorage` → gövde yeniden kurulur): 1 Kasım'da düzeltildi (`VisitorStore.restoring`). Mağazadaki
  1.3'te var; iOS 13. derlemeyle gider.
- Xcode 27.1 iOS 18 simülatörünü indirmiyor (`xcodebuild -downloadPlatform` "not available"); iOS 18 denenmedi.

**1 Kasım büyük fuar backend testi (düzeltildi, backend `4ba90c8`; canlıya push bekliyor):** panel kütüphane listeleri
(500 yayınevi 1,5 sn → 20 ms), kişiler listesi (1 milyon kişide 501. sayfa 2,8 sn → 0,05 sn), katalog yeniden kurulumu
(gzip iş parçacığında, değişmediyse yeniden sıkıştırılmaz), hediye geri almada indeks, S3 kopyaları sırayla,
`scripts/loadtest.js` uygulama gibi kayıt olur. Yük testinde yükü üreten araç aynı Mac'te: kendi raporladığı gecikme
şişer (6 sn gördük), sunucunun gerçek gecikmesini dışarıdan `curl` ile ölç.

**1 Kasım tam test (TEST.md, rapor `docs/test-sonuclari/2026-11-01.md`):** yarışma sıralaması ve özet 1 milyon kişide
15 sn zaman aşımına düşüyordu (`notDeleting` `NOT IN` → `NOT EXISTS`, backend `38468bb`). `kontrol.mjs` 1.3'e uyduruldu;
`fuar_big` test veritabanının şeması elle tamamlandı (göç yok: yerel test veritabanları da elle güncellenir).

**iOS 27 açılış çökmesi (6 Kasım, düzeltildi):** `EylulRehberApp` sahne kapanışı gözlenen değer okuyordu; SwiftUI sahneyi
`AsyncRenderer` iş parçacığında yeniden kurunca ana iş parçacığı denetiminde `EXC_BREAKPOINT` (4 açılışta 1). İçerik `AppContent`
View'una taşındı: 12 temiz açılışta 0 çökme. Mağazadaki 1.3 etkilenir, iOS'un sonraki derlemesiyle gider.

**6 Kasım (başka bir ajanın değişikliklerinin denetimi ve QR testi):**
- `server.js`'teki açılış geçişi kaldırıldı: her `admin` açılışında canlıya `importCatalog` yapıyor, fuar ayarlarını
  (`contest`, `modules`, `status`) ve paneldeki kampanyayı siliyor, `items`/`library` silmeleri fuara bağlı değildi.
  **Canlıda çalıştıysa** yarışma ayarları panelden yeniden girilmeli (konum kuralı, bir telefon bir hesap). Tek seferlik işler
  betikle yapılır, açılışa yazılmaz. `importCatalog` artık fuar kaydını birleştirir, dosyada olmayan ayar kayıtlarını silmez.
- Düzeltilenler: pasif hesaba hediye teslimi; stoğu 0 hediyede ilk teslim; görevli ekranının 2 dakikada donması
  (`refresh=1` 60 dk'lık kodu kabul eder); SMS gitmeyince gönderim hakkı iade; iOS'ta 5xx'te "Tekrar dene".
- Bırakılanlar: cevap kaybolup yeniden denenince "Zaten okutmuştun" (puan güvende); fuar tarihi dışında okutma açık
  (mağaza inceleme QR'ları için); `copy-from` yarışma konum ayarını taşımıyor.
- iOS `URL?` alanları yalnızca http(s) okur (`decodeIfPresent(URL.Type)`): `tel:` taşıyan alan `String` olmalı.

**Büyük fuar için bilinen, düzeltilmemiş backend borçları** (kod incelemesi, 1 Kasım):
- Kütüphane kaydı `invalidateAll` ile her organizasyonun fuarlarını eskitir; yalnızca o organizasyonunki yeter
  (`src/catalog.js` `putLibraryItem`, `deleteLibraryItem`).
- `MAX_CACHED_FAIRS = 50`: büyük fuar kataloğu bellekte ~25 MB; çok sayıda büyük fuar 512 MB görevi zorlar.
- `/admin/fairs/:id/catalog` sıkıştırmasız 5 MB döner ve önbelleksiz kurulur (panel her kayıttan sonra çağırır).
- `/batch`, `importCatalog`, `reorder` satır başına sorgu (2.000 satırda binlerce sorgu); `reorder` dizisinde üst sınır yok.
- Yarışma katılımcı aramasında toplam her sayfada yeniden sayılır, ILIKE trigram indeksini kullanamaz.
- `/ping` kimliksiz ve sınırsız (rastgele cihaz kimliği `device_days`'i şişirir); sayımlar ana havuzda.
- "Bir telefon bir hesap" ve giriş sınırı uygulamanın gönderdiği `X-Device-ID`'ye dayanır; fuar Wi-Fi'ı tek IP'yse
  IP başına dakikada 2.000 sınırı açılış yoğunluğunda gerçek girişleri durdurabilir.

**Açık riskler:**
- **Canlı veritabanı ve elle şema:** Göç yok; yeni sütun canlıya elle eklenir (ECS'te tek seferlik görev,
  `ALTER TABLE … ADD COLUMN IF NOT EXISTS`). `visitors.explicit_consent_at` 30 Ekim'de böyle eklendi ve doğrulandı.
  Yeni sütun ekleyen her değişiklikte bu adım `main`'e push'tan önce yapılmalı, yoksa giriş ve `/v1/me` canlıda bozulur.
- **Rıza kaydı:**
  - İzinler (açık rıza, ticari ileti) ziyaretçi başına tek kayıt, metinler ise organizasyon başına.
  - Kullanıcı Sözleşmesi kabulü `kvkkAccepted` ile birlikte sayılıyor.
  - Hangi metin sürümünün onaylandığı kaydedilmiyor.
- **Güvenlik borçları** (`backend/docs/yapilacaklar.md`):
  - ziyaretçi tokeninin süresi yok;
  - Apple / Google tokeninde nonce yok;
  - SMS kodu özeti tuzsuz;
  - veritabanı TLS sertifikası doğrulanmıyor;
  - SMS için genel (IP başı) sınır yok;
  - görevli teslimi kişinin anlık QR'ını istemiyor;
  - App Attest / Play Integrity yok.
- **Push:** `docker-compose.yml` `${PUSH_TOPIC_PREFIX-test-}` kullanır. Yerel `.env`'de değeri boş bırakmak yerel
  bildirimleri **gerçek kullanıcılara** gönderir.

**Uygulama tarafı:**
- **Farklar (bilinçli):**
  - Android'de Apple girişi yok;
  - Android'de "Program takibi" süreli bildirimi var, iOS'ta yok;
  - harita: iOS MapKit, Android MapLibre;
  - QR okuyucu: iOS kendi kamera ekranı, Android Google Code Scanner.
- **Farklar (bilinçsiz):**
  - Android oturum tokenini düz SharedPreferences'ta tutar (yedeğe girmez), iOS Keychain'de;
  - Android'de TalkBack için başlık işaretleri yok.
- **Widget tek fuarlı:** fuar değişince widget yeni fuarı gösterir. Widget bağlantısında `fairID` olmadığı için başka
  fuarda "Etkinlik bulunamadı" açılabilir.
- **Android push:** fuar değişince eski fuarın etkinlik konularından çıkılır; eski fuarın Planım bildirimleri gelmez.
- **Kalıntılar:**
  - İki uygulamada da örnek görseller paketleniyor (iOS `Assets`, Android `res/drawable-nodpi/`, ~50 görsel).
  - Etkinlik görseli yoksa her fuarda Ankara görseli (`ankara-fuar-banner`, `children-workshop`) yedek olarak
    kullanılıyor.
  - iOS'ta `MockData` Release'e giriyor (ilk açılışta, katalog gelene kadar).
- Ana sayfadaki fuar kartı kaldırıldı (fuar bilgileri artık üstteki ⓘ). Bazı yorumlar hâlâ "ana sayfadaki kart" /
  "Konum düğmesi" diyor.

**Eskimiş belgeler** (koda güven):
- `backend/docs/mimari-ozet.md` (27 Ekim):
  - canlıyı "eski tek fuarlı sürüm" ve Redis'i "planlı" diye anlatır;
  - hediye ayırma (rezervasyon) ve worker hatırlatmaları artık yok;
  - test sayısı artık 75 değil 82.
- `backend/docs/aws.md`: tek servis / Tulpar RDS anlatan bölümler eski. Canlı:
  - 5 ECS servisi (0,25 vCPU / 512 MB, ARM64);
  - kendi RDS'i `eylul-db` + RDS Proxy;
  - Valkey (Redis).
- `backend/docs/yapilacaklar.md`: AWS maddelerinin çoğu yapıldı ama işaretlenmedi; "cok-fuar'ı main'e birleştir"
  yapıldı.
- `backend/README.md` (Mantine, port 3000, eski menü), `ios/README.md`, `android/README.md`: tek fuarlı dönemden.
- `ios/CLAUDE.md` var olmayan `-eylul.test.name` / `-eylul.test.email` kancalarını sayar.
  `android/CONVENTIONS.md` artık olmayan `Notice.Kind`'ı anar.
- `scripts/kontrol.mjs`: hesap silinince hediyenin stoğa döndüğünü bekler (artık dönmüyor). Worker adımı planda var,
  betikte yok.

---

## 13. Belge dizini

| Belge | İçerik | Durum |
|---|---|---|
| `AGENTS.md` (bu dosya) | Bütün proje, mimari, özellik haritası, kurallar | güncel (1 Kas 2026) |
| `CLAUDE.md` (kök + her repo) | Kısa çalışma kuralları, komutlar, test kancaları | güncel (küçük sapmalar §12'de) |
| `android/CONVENTIONS.md` | Android kod düzeni, ortak bileşenler | büyük ölçüde güncel |
| `backend/docs/cok-fuar.md` | Çok fuarlı veri modeli, fuar listesi, gizli QR kodları | kısmen eski adlar (`stamp`) |
| `backend/docs/yarisma-guvenlik.md` | Yarışmada hile önlemleri | kısmen eski adlar |
| `backend/docs/aws.md`, `yuk-testi.md` | AWS kurulumu, ölçekleme, yük ölçümleri | kısmen eski |
| `backend/docs/test-plani.md` | Tek komutla kontrol listesi | güncel, betikte küçük sapmalar |
| `backend/docs/mimari-ozet.md` | Mimari özeti (27 Ekim) | eski; bu belge yerini alır |
| `backend/docs/yapilacaklar.md` | Yapılacaklar ve borçlar | işaretlenmemiş maddeler var |
| `SUNUM-REHBERI.md` | Kökteki tanıtım sunumu | ürün koduyla ilgisiz |

---

## 14. Yeni bir işe başlarken kontrol listesi

1. Hangi repo(lar)? Dal `cok-fuar` mı? Her repoda `git status` temiz mi? Başka bir oturumun yarım işi var mı?
2. Değişiklik ekransa iki platformdaki dosyayı (§8) bul. Panelden yönetilmesi gerekiyorsa backend şemasını ve panel
   formunu da ekle.
3. Yerel docker'ı güncel kodla kaldır (`docker compose up -d --build`), backend testlerini çalıştır.
4. iOS'u simülatörde, Android'i emülatörde yerel API'ye karşı derle ve ekranda gör; ikisini yan yana karşılaştır.
5. Commit'ler her repoda ayrı, açıklayıcı İngilizce başlıklı.
6. Canlıya, `main`'e ve mağazaya **kullanıcıya sormadan** gönderme.
