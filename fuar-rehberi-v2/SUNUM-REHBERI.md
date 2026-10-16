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

- **Ana sayfa:** yazar/yayınevi araması, kendi kendine dönen banner, Program · Yazarlar · Yayınevleri · Kroki kısayolları ve sağa doğru kayan “Bugün imzada” şeridi.
- **Ara (alt menü):** yazar ve yayınevi araması; Tümü / Yazarlar / Yayınevleri filtreleri. Boşken tüm yazarları ve 27 yayınevini listeler.
- **Yazarlar / Yayınevleri:** ana sayfadaki kısayollardan açılan tam liste.
- **Program:** 5 günün tamamı dolu; imzalar, söyleşiler ve çocuk etkinlikleri. “Planıma ekle” ve “Krokide göster” (kroki, sayfanın üstüne ayrı bir ekran olarak açılır).
- **Yazar sayfası:** kitap kapağına dokununca tam ekran kitap sayfası açılır: büyük kapak, tanıtım yazısı, yazarın diğer kitapları.
- **Detay ekranları:** iOS’taki gibi geri butonuyla açılır, alt menü gizlenir.
- **Planım:** kaydedilen etkinlikler.
- **Kroki:** stant numarası yerine yayınevi logoları (logosu olmayanlar renkli adlarıyla). Logoya dokun ya da yayınevi adını ara. WC, kafe ve danışma noktaları.
- **Duyurular:** Eylül’ün gönderdiği bildirimler (sağ üstteki zil).
- **Bildirim gönder:** uygulamanın parçası değil; sunumda telefonun üstündeki turuncu buton. Her basışta telefona farklı bir örnek bildirim düşer.
- **Çocuk Şenliği modu (fuar seçiciden):** tema değişir; 2 günlük 15 etkinlik, 11 katılımcı (atölye, tiyatro, yayınevi, marka), 6 alanlı şenlik haritası, katılımcı ve etkinlik araması, şenliğe özel duyurular.

## Akış (yaklaşık 5 dakika)

1. **Kapak.** Yılda iki kez yarım milyon okur.
2. **Okurun üç sorusu:** kim ne zaman nerede, stant nerede, değişiklikten nasıl haberim olur.
3. **Program.** Murat Menteş imzasını aç, “Krokide göster”.
4. **Kroki.** “Everest nerede?” ya da bir logoya dokun.
5. **Duyurular.** Paneldeki “Gönder”e ya da telefondaki “Bildirim gönder”e bas.
6. **Çocuk Şenliği 2027.** Aynı uygulama, fuar değişir.
7. **Önerimiz.** Bulbi geliştirir; Eylül stant ve görünürlük verir.
8. **Teşekkürler.**

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
