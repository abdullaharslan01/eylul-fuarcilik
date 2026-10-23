# Eylül Fuarcılık — fuar rehberi

Klasörler ayrı repolar: `ios/` (fuar_iOS), `android/` (fuar_android), `backend/` (fuar_web: API + panel). Kök repo
tanıtım sayfası ve yasal metinler. Her repoda ayrı commit ve push.

## Çalışma kuralları

1. **Önce düşün.** Belirsiz bir şey varsa varsayımı açıkça söyle; iki yorum mümkünse sessizce birini seçme.
   Yazmadan önce neyin değişeceğini ve nasıl doğrulanacağını bil.
2. **Basit tut.** İsteneni yapan en küçük kod. İstenmemiş özellik, "ileride lazım olur" soyutlaması, tek yerde
   kullanılan yardımcı katman yok. Yeni kod yazmadan önce projede, standart kütüphanede ya da platformda
   aynı işi yapan bir şey var mı bak; varsa onu kullan.
3. **Yalnızca gerekene dokun.** İstekle ilgisi olmayan satırları yeniden biçimlendirme, yeniden adlandırma,
   "temizleme". Gördüğün başka bir sorunu sessizce düzeltme; söyle.
4. **Hedefe göre çalış.** "Bitti" demeden önce çalıştığını gör: test, derleme, simülatör/emülatörde ya da
   panelde deneme. Doğrulanamayanı açıkça söyle.

## Proje kuralları

- **iOS ve Android aynı görünür ve aynı davranır** (yalnızca platformun kendi öğeleri farklı). Bir tarafta
  ekran değişirse diğerinde de değişir; ikisi yan yana karşılaştırılır.
- **Her şey panelden yönetilir;** panelde yapılan değişiklik uygulamalarda bir dakika içinde görünür.
- Panelden gelen etiketler (program kategorileri, etkinlik durumları, duyuru türleri) İngilizce modda da
  Türkçe kalır; yalnızca uygulamanın kendi metinleri çevrilir.
- **Bildirimler:** yerelde `PUSH_TOPIC_PREFIX=test-`; test bildirimi yalnızca Debug derlemelere gider.
  Mağaza derlemesine ya da gerçek kullanıcılara test bildirimi gönderme.
- **Mağaza:** TestFlight'a test kullanıcısı ya da grup ekleme; onaysız incelemeye gönderme. Mağaza
  derlemeleri sunucu yokken de çalışan çevrimdışı demo veriyle çıkar.
- Gizli dosyalar repoya girmez: `backend/secrets/`, `android/signing/`.
- Saatler fuar saatiyle (Europe/Istanbul) gösterilir ve girilir.
