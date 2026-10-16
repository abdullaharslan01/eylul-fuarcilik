# Eylül Fuar Rehberi — Sunum rehberi

Bulbi’nin Eylül Fuarcılık’a sunacağı mobil fuar rehberi konsepti. Klasörde üç parça var:

| Dosya | Ne işe yarar |
| --- | --- |
| `index.html` | 8 slaytlık tanıtım sunumu. Sağdaki telefon gerçek, tıklanabilir uygulama. |
| `app/` | Mobil uygulama. Telefonda tek başına da açılır. |
| `panel.html` | Eylül ekibinin duyuru gönderdiği basit panel. Sunumun 5. slaytında canlı çalışır. |

Eski prototip `../fuar-rehberi-prototip/` klasöründe olduğu gibi duruyor.

## Açmak

Klasörde bir yerel sunucu başlat ve tarayıcıda aç:

```bash
cd ~/Documents/Bulbi/Eylul/fuar-rehberi-v2 && python3 -m http.server 4174
```

Sunum: http://localhost:4174 · Uygulama tek başına: http://localhost:4174/app/ · Panel: http://localhost:4174/panel.html

İnternet gerekmez; fontlar klasörün içinde.

## Kısayollar

- `→` / `←` ya da boşluk: slayt değiştir
- `N`: konuşmacı notları
- `F`: tam ekran
- 1. slayta dönünce telefon sıfırlanır, demo baştan oynatılabilir.

## Uygulamada ne var

Alt menü: **Ana sayfa · Program · Hediyeler · Kroki · Planım**

- **Ana sayfa:** yazar/yayınevi araması, dönen banner, Program · Kroki · Hediyeler · Duyurular kısayolları, pasaport ilerlemesi, kendi kendine kayan “Bugün imzada” şeridi, popüler yayınevleri.
- **Program:** 5 günün tamamı dolu; program içinde arama. Etkinlik detayında süre, giriş, etkinlik hakkında yazı, konuşmacılar, “Planıma ekle” ve “Krokide göster”.
- **Hediyeler:**
  - **QR pasaportu:** stant QR’ları okutulur, damga toplanır. 3 damgada bez çanta, 6 damgada kitap, tüm görevlerde çekiliş.
  - **Görevler.**
  - **Canlı bilgi yarışması:** 12.00 · 15.00 · 18.00’de herkese aynı anda 5 soru, her soruya 10 saniye. Süre bitince doğru cevap ve oyuncuların yüzde dağılımı gösterilir.
- **Kroki:** yayınevi logoları; yana kayan hizmet noktaları (WC, kafe, danışma, ilk yardım, mescit, asansör, kayıp çocuk, ATM, bebek bakım).
- **Planım:** kayıtlı etkinlik özeti, sıradaki etkinlik, pasaport ilerlemesi, gün gün plan.
- **Yazar sayfası:** kitap kapağına dokununca tam ekran kitap sayfası.
- **Detay ekranları:** iOS’taki gibi geri butonuyla açılır, alt menü gizlenir.
- **Çocuk Şenliği modu (fuar seçiciden):** kendi programı, 11 katılımcı, 6 alanlı harita, katılımcı araması, alan pasaportu ve şenlik duyuruları.

## Akış (yaklaşık 6 dakika)

1. **Kapak.**
2. **Okurun üç sorusu.**
3. **Program.** Bir imzayı aç; “Programda ara”.
4. **Kroki.** “Everest nerede?”, “İletişim ara”.
5. **Duyurular.** Paneldeki “Gönder” ya da telefonun üstündeki “Bildirim gönder”.
6. **Hediyeler.** “QR okut” → damga ve ödül; “Canlı yarışmayı başlat” → bildirim, 3-2-1, soru, sonuç.
7. **Çocuk Şenliği 2027.**
8. **Önerimiz.**
9. **Teşekkürler.**

## Kapanıştaki QR

Sunum `localhost` üzerinden açıldığında QR gösterilmez (o adres başkasının telefonunda açılmaz). Uygulamayı bir yerde yayınlarsan (Netlify, Vercel vb.) iki yol var: sunumu o adresten aç, QR kendiliğinden oluşur; ya da sunuma `?url=https://senin-adresin/app/` ekle.

## Araştırmadan çıkan notlar

- **Ziyaretçi sayısı:** Elimizdeki “180 bin” rakamına hiçbir kaynakta rastlamadım. Basında geçen rakamlar daha yüksek: fuar başına 500 bin ziyaretçi hedefi, ilk iki günde 50 bin kişi, son 5 yılda 2–2,5 milyon ziyaretçi. Sunumda bunlar kullanıldı. Kaynaklar: [AA](https://www.aa.com.tr/tr/kultur/ankara-kitap-fuari-son-5-yilda-2-milyonun-uzerinde-ziyaretci-agirladi/3705734), [Yeni Ankara](https://www.yeniankara.com.tr/ankara/ankara-kitap-fuarina-yogun-ilgi-3-gununde-ziyaretci-akini-132039).
- **Tarih:** 24. Ankara Kitap Fuarı 4–13 Aralık 2026. Mekân sitede ATO Congresium olarak geçiyor; bir takvim sitesi farklı mekân yazıyor. Toplantıda teyit et.
- **Bilet:** Nisan 2026 fuarında günlük e-bilet 50 TL’ydi. Öğrenci, öğretmen ve engelliler hafta içi ücretsiz giriyordu.
- **Eylül’ün mevcut dijital durumu:** Fuar sitesi hazır bir şablon. Fuar numaraları birbirini tutmuyor, imza programı 2024 tarihli 8 satırlık bir tablo, kroki tek bir JPG, duyurular Instagram’dan yapılıyor. Bunu sunumda kırıcı olmadan, “okura ulaşmanın daha güçlü bir yolu” diye anlat.
- **Şikâyetler ve kaynakları:** 2. slaytta her kartın altında yazıyor. Kayıp çocuk, oturma yeri ve yemek şikâyetleri için güçlü yazılı kaynak bulunamadı. Bunlar sahada sorulabilir.

## Örnek olan içerikler

Yazar, kitap ve yayınevi adları gerçek. Şunlar sunum için uydurulmuş örnek: 2026 imza saatleri, stant numaraları (ve hangi yayınevinin fuara katıldığı), duyurular ve Çocuk Şenliği programı. Kroki, Eylül’ün 23. fuar (Nisan 2026) krokisinden sadeleştirildi. Görsel kaynakları: `assets/IMAGE_SOURCES.md`.
