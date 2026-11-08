# Canlı uçtan uca test — 8 Kasım 2026

Canlı sunucu (`fuar.bulbi.co`), fuar `ankara-2026`. iOS (simülatör, Debug, canlı API) ve Android (emülatör, Debug, canlı API)
yan yana. SMS gönderilmez: test numaraları panelde (Panel kullanıcıları › Mağaza inceleme hesabı › Test numaraları)
inceleme hesabının sabit koduyla girer.

## Hazırlık (panel, organizatör)

| Kişi | Numara | Cihaz |
|---|---|---|
| Ziyaretçi A | 555 999 00 10 | iOS |
| Ziyaretçi B | 555 999 00 11 | Android |
| Görevli | 555 999 00 12 | önce Android, sonra iOS |

- Test görevi "Canlı test QR" (+300 puan, bir kez) eklenir; QR'ı panelden alınır.
- Hediye stoğu: "Yılın okuru: 1.000 TL kitap çeki" (300 puan) kalan 1'e indirilir (iki kişi aynı anda son adet için).
- Görevli panelden eklenir.
- Hepsi test sonunda geri alınır; test hesapları silinir.

## Senaryolar

Her ziyaretçi senaryosu iki platformda; ekranlar yan yana karşılaştırılır.

| # | Kim | Senaryo | Beklenen |
|---|---|---|---|
| G1 | Ziyaretçi | Telefonla yeni hesap: KVKK işaretlenmeden devam edilmez | uyarı, ilerlemez |
| G2 | Ziyaretçi | KVKK + numara → kod ekranı → kod → Bilgilerini tamamla (ad soyad zorunlu) | hesap açılır, Hediyeler'de 0 puan |
| G3 | Ziyaretçi | Kodu gönderip ekranı kapatıp hemen tekrar "Kod gönder" | iki platformda da kod ekranına geçilir (Android'de düzeltildi) |
| G4 | Ziyaretçi | Yanlış kod | "Kod hatalı" |
| Q1 | Ziyaretçi | Daha önce başka hesabın puan topladığı telefonda QR okut ("bir telefon bir hesap") | puan verilmez, açıklayıcı mesaj |
| Q2 | Ziyaretçi | Stant QR'ı | +10, yayınevi logosu, toplam |
| Q3 | Ziyaretçi | Aynı QR ikinci kez | "Zaten okutmuştun", puan değişmez |
| Q4 | Ziyaretçi | Bilinmeyen QR | "Bu QR tanınmadı" |
| Q5 | Ziyaretçi | Yüksek puanlı test QR'ı (+300) | +300, "Artık alabilirsin" hediyeleri |
| Q6 | Panel | Katılımcılar: iki test kişisi, puanları, okuttukları | panelde doğru |
| H1 | Ziyaretçi | Puanı yetmeyen hediye | "Hediyeyi al" yok / alınamaz |
| H2 | Ziyaretçi | Hediye al (ör. Kitap ayracı) | puan düşer, stok 1 düşer, kartta "Sende · teslim bekliyor", Kazandıklarım'da |
| H3 | Ziyaretçi | Aynı hediyeyi ikinci kez | alınamaz |
| H4 | İki ziyaretçi | Son 1 adet kalan hediyeyi ikisi aynı anda almaya çalışır | biri alır, öteki "Tükendi"; stok 0, eksiye düşmez |
| H5 | Ziyaretçi | Kalan puanla birden fazla hediye, puan bitene kadar | puan 0'ın altına inmez |
| H6 | Ziyaretçi | Hediye QR'ım | QR açılır, teslim bekleyenler listelenir |
| H7 | Panel | Hediye alanlar: bekleyen/teslim sayıları, stok | panelde doğru |
| T1 | Görevli | Panelden eklenen numarayla giriş → görevli ekranı | görevli modu |
| T2 | Görevli | Ziyaretçinin hediye QR'ını okut → teslim et | teslim; ziyaretçi ekranı "Hediyen teslim edildi", kart "Teslim alındı" |
| T3 | Görevli | Aynı QR ile ikinci teslim | reddedilir |
| T4 | Görevli | Teslimi geri al | hediye yine "teslim bekliyor" |
| T5 | Panel | Panelden teslim et / geri al | uygulama güncellenir |
| P1 | Panel | Stok değiştir → uygulamada kalan adet | 1 dk içinde |
| P2 | Panel | Görev ekle/kaldır → uygulamada görev listesi | 1 dk içinde |
| S1 | Ziyaretçi | Hesabı sil | çıkış; teslim edilmemiş hediye stoğa döner |

## Sonuçlar

Hepsi canlıda, iki platformda; ekranlar yan yana karşılaştırıldı.

| # | iOS | Android | Not |
|---|---|---|---|
| G1 | ✅ | ✅ | "KVKK onayı gerekli" |
| G2 | ✅ | ✅ | kod ekranı, SMS gitmedi; ad soyad zorunlu, "Devam et" ad yazılınca açılıyor |
| G3 | ✅ | ✅ (düzeltildi) | Android önceden kod ekranına geçmiyordu, 60 sn bekletiyordu |
| G4 | ✅ | ✅ | "Kod hatalı. Tekrar dene." |
| Q1 | ✅ | ✅ | "Bu telefonda bu fuarda başka bir hesapla puan toplandı…"; başlık iOS'ta farklıydı, düzeltildi |
| Q2 | ✅ +10 Can | ✅ +15 Doğan | Doğan 15 puan: panelde stant başına puan |
| Q3 | ✅ | ✅ | "Zaten okutmuştun" |
| Q4 | ✅ | ✅ | "Bu QR tanınmadı" |
| Q5 | ✅ +300, toplam 310 | ✅ +300, toplam 315 | "Artık alabilirsin: Yılın okuru" |
| Q6 | panel ✅ | | iki kişi, puanlar, okutma sayısı, sıra |
| H1 | ✅ "40 puan kaldı" | ✅ "20 puan kaldı" | "Hediyeyi al" yok |
| H2 | ✅ (düzeltildi) | ✅ | stok 1 düştü; iOS kartı "Teslim aldın" diyordu, artık "Sende · teslim bekliyor" |
| H3 | ✅ | ✅ | alınan hediyede "Hediye QR'ım" |
| H4 | ✅ "az önce tükendi, puanın düşmedi" | ✅ aldı | son 1 adet, aynı anda; stok 0, eksiye düşmedi |
| H5 | ✅ 310 → 0 | ✅ 15 → 5 | puan eksiye inmiyor |
| H6 | ✅ (düzeltildi) | ✅ | iOS listede puan yazıyordu, Android gibi "nereden alınır" |
| H7 | panel ✅ | | bekleyen / teslim sayıları |
| T1 | ✅ | ✅ | görevli modu (Okut, Okutmalar, Kazananlar, Saha, Profil) |
| T2 | ✅ (iOS görevli → Android ziyaretçi) | ✅ (Android görevli → iOS ziyaretçi) | ziyaretçinin açık QR ekranı "Hediyen teslim edildi" |
| T3 | panel ✅ | | aynı teslim ikinci kez: `already_claimed` |
| T4 | | ✅ | geri alınca yine "teslim bekliyor", stok değişmez |
| T6 | | ✅ | "İptal et": puan 10 döndü, stok 497 → 498 |
| T5 | panel ✅ | | panelden teslim ve iki adımlı geri alma |
| P1 | ✅ | ✅ | stok 1'e inince "1 adet kaldı", bitince "Tükendi" |
| P2 | ✅ | ✅ | eklenen görev uygulamada (8 görev) |
| S1 | ✅ | ✅ | hesap silinince ayrılmış ayraç stoğa döndü (498 → 499) |

## Bulunan ve düzeltilen

- **Canlıda hediye alma ve yanıtlı görev 404** (ALB'de yol kuralı yoktu): kural 17 eklendi, backend `5ebef69`.
- **Test numaraları** (SMS'siz canlı test): panel › Panel kullanıcıları › Mağaza inceleme hesabı, backend `c805ccb`.
- **iOS hediye kartı** teslim edilmeden "Teslim aldın" diyordu → "Sende · teslim bekliyor" / "Teslim alındı".
- **Android girişte "kod az önce gönderildi"** durumunda kod ekranına geçmiyordu → iOS gibi geçiyor.
- **iOS QR hata başlıkları** Android'den farklıydı ("QR kaydedilemedi" / "QR sayılmadı").
- **iOS Hediye QR'ı listesi** puan yazıyordu, Android "nereden alınır" → ikisi de "nereden alınır".
- **Yan menü**: E-Bilet alt yazısı ve konuk ülke ayracı iki platformda farklıydı → eşitlendi.
- "Teslim alındı" İngilizcesi iOS'ta "Picked up", Android'de "Collected" → ikisi de "Collected".

## Not edilen (düzeltilmedi)

- Hediye "az önce tükendi" hatasından sonra detay ekranı ~30 sn "1 adet / Hediyeyi al" gösterip sonra "Tükendi"ye dönüyor (kalan adet önbellekten geliyor).
- Hediyeler sekmesi açıkken panelden yapılan iptal/teslim, sekmeye yeniden girilince görünüyor (Hediye QR'ı ekranı 50 sn'de bir kendisi yeniliyor). İki platformda aynı.
- Android'de yeni görevli hesabı girişte kamera "Bilgilerini tamamla"dan önce açıldı.
- Hata yazısının yeri: Android kod kutularının altında, iOS düğmelerin altında.
- Can Yayınları logosu dairede çok küçük (görselin kenar boşluğu).

## Temizlik

Test görevi silindi, kitap çeki stoğu 3'e döndü, görevli silindi, test hesaplarının hediyeleri panelden iptal edildi (stoklar test
öncesiyle aynı), üç test hesabı uygulamadan silindi (8 Aralık'ta kalıcı silinir), test numaraları panelden kaldırıldı.
İnceleme hesabının sabahki ayracı (teslim bekliyor) duruyor.
