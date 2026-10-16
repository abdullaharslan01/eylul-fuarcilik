# Eylül Fuar Rehberi — Sunum rehberi

Bulbi’nin Eylül Fuarcılık’a sunacağı mobil fuar rehberi konsepti. Klasörde üç parça var:

| Dosya | Ne işe yarar |
| --- | --- |
| `index.html` | 14 slaytlık tanıtım sunumu. Sağdaki telefon gerçek, tıklanabilir uygulama. |
| `app/` | Mobil uygulama. Telefonda tek başına da açılır. |
| `panel.html` | Eylül ekibinin göreceği organizatör paneli. Sunumun 8. slaytında canlı çalışır. |

Eski prototip `../fuar-rehberi-prototip/` klasöründe olduğu gibi duruyor.

## Açmak

Klasörde bir yerel sunucu başlat ve tarayıcıda aç:

```bash
cd ~/Documents/Bulbi/Eylul/fuar-rehberi-v2 && python3 -m http.server 4174
```

Sunum: http://localhost:4174 · Uygulama tek başına: http://localhost:4174/app/ · Panel: http://localhost:4174/panel.html

İnternet gerekmez; fontlar ve QR kütüphanesi klasörün içinde.

## Kısayollar

- `→` / `←` ya da boşluk: slayt değiştir
- `N`: konuşmacı notlarını aç/kapat (sol altta açılır, her slaytta ne söyleyeceğin yazar)
- `F`: tam ekran
- `index.html#4` gibi bir adresle doğrudan o slayttan başlanır. 1. slayta dönünce telefon sıfırlanır, demo baştan oynatılabilir.

## Akış (yaklaşık 10 dakika)

1. **Kapak.** Yılda iki kez yarım milyon okur. Telefonda ilgi alanı seç, “Fuara başla”.
2. **Sorunlar.** Ziyaretçi şikâyetleri, kaynaklarıyla. İmza kuyruğu, kroki ve programı vurgula.
3. **Bugün ekranı.** Canlı ana ekran, Eylül duyurusu, yoğunluk eğrisi.
4. **Dijital imza sırası. En etkili an.** “Sıra al” → #47. “Sırayı ilerlet”e 3–4 kez bas: 5 kişi kala “Sıran yaklaşıyor”, sonra “Sıra sende!” bildirimi gelir.
5. **Aranabilir kroki.** A-504’e rota, yoğunluk katmanı, “susamuru” araması.
6. **Program & Planım.** “Şimdi” çizgisi, yazar takibi.
7. **Alınacaklar listesi.** Fuar fiyatı ve “Rotamı çiz”.
8. **Eylül paneli.** Panelde “Şimdi gönder”e bas, bildirim sağdaki telefona düşer.
9. **Giriş, ulaşım, okullar.**
10. **Çocuk Şenliği 2027.** Atölye rezervasyonu ve “Görevli bilekliği okuttu” → velinin telefonuna bildirim.
11. **Eylül için değer.** Sponsor geliri, veri, doğrudan iletişim, yıl boyu bağ.
12. **Yol haritası** ve Eylül’den ihtiyacımız olan veri.
13. **İş birliği önerisi.** Bulbi geliştirir ve işletir; Eylül fuarlarda stant ve görünürlük verir.
14. **Kapanış.**

## Kapanıştaki QR

Sunum `localhost` üzerinden açıldığında QR gösterilmez (o adres başkasının telefonunda açılmaz). Uygulamayı bir yerde yayınlarsan (Netlify, Vercel vb.) iki yol var: sunumu o adresten aç, QR kendiliğinden oluşur; ya da sunuma `?url=https://senin-adresin/app/` ekle.

## Araştırmadan çıkan notlar

- **Ziyaretçi sayısı:** Elimizdeki “180 bin” rakamına hiçbir kaynakta rastlamadım. Basında geçen rakamlar daha yüksek: fuar başına 500 bin ziyaretçi hedefi, ilk iki günde 50 bin kişi, son 5 yılda 2–2,5 milyon ziyaretçi. Sunumda bunlar kullanıldı. Kaynaklar: [AA](https://www.aa.com.tr/tr/kultur/ankara-kitap-fuari-son-5-yilda-2-milyonun-uzerinde-ziyaretci-agirladi/3705734), [Yeni Ankara](https://www.yeniankara.com.tr/ankara/ankara-kitap-fuarina-yogun-ilgi-3-gununde-ziyaretci-akini-132039).
- **Tarih:** 24. Ankara Kitap Fuarı 4–13 Aralık 2026. Mekân sitede ATO Congresium olarak geçiyor; bir takvim sitesi farklı mekân yazıyor. Toplantıda teyit et.
- **Bilet:** Nisan 2026 fuarında günlük e-bilet 50 TL’ydi. Öğrenci, öğretmen ve engelliler hafta içi ücretsiz giriyordu.
- **Eylül’ün mevcut dijital durumu:** Fuar sitesi hazır bir şablon. Fuar numaraları birbirini tutmuyor, imza programı 2024 tarihli 8 satırlık bir tablo, kroki tek bir JPG, duyurular Instagram’dan yapılıyor. Bunu sunumda kırıcı olmadan, “okura ulaşmanın daha güçlü bir yolu” diye anlat.
- **Şikâyetler ve kaynakları:** 2. slaytta her kartın altında yazıyor. Kayıp çocuk, oturma yeri ve yemek şikâyetleri için güçlü yazılı kaynak bulunamadı. Bunlar sahada sorulabilir.

## Örnek olan içerikler

Yazar, kitap ve yayınevi adları gerçek. Şunlar sunum için uydurulmuş örnek: 2026 imza saatleri, stant numaraları, sıra uzunlukları, yoğunluk ve panel sayıları, fiyatlar, kampanyalar, Çocuk Şenliği programı. Kroki, Eylül’ün 23. fuar (Nisan 2026) krokisinden sadeleştirildi. Görsel kaynakları: `assets/IMAGE_SOURCES.md`.
