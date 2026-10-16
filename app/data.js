// Eylül Fuar Rehberi — örnek veri
// Yazar, kitap ve yayınevi adları gerçek; 2026 imza saatleri ve stant numaraları
// sunum için hazırlanmış örneklerdir.

// Görsel yolları sayfanın açıldığı adresten bağımsız olsun (/app ya da /app/).
const A = new URL('../assets/', document.currentScript ? document.currentScript.src : location.href).href;

const FAIRS = {
  ankara: {
    id: 'ankara',
    name: '24. Ankara Kitap Fuarı',
    short: 'Ankara Kitap Fuarı',
    dates: '4–13 Aralık 2026',
    hours: '10.00 – 20.00',
    venue: 'ATO Congresium',
    address: 'Söğütözü Mah. 2176. Cad. No:3, Çankaya / Ankara',
    days: [
      { n: 1, label: 'Cuma', date: '4 Ara' },
      { n: 2, label: 'Cumartesi', date: '5 Ara' },
      { n: 3, label: 'Pazar', date: '6 Ara' },
      { n: 4, label: 'Pazartesi', date: '7 Ara' },
      { n: 5, label: 'Salı', date: '8 Ara' }
    ]
  },
  cocuk: {
    id: 'cocuk',
    name: 'Eylül Çocuk Şenliği',
    short: 'Çocuk Şenliği',
    dates: 'Nisan 2027 · konsept',
    hours: '10.00 – 19.00',
    venue: 'Mekân açıklanacak',
    address: 'Mekân bilgisi organizatörden gelince eklenir',
    days: [
      { n: 1, label: 'Cumartesi', date: '24 Nis' },
      { n: 2, label: 'Pazar', date: '25 Nis' }
    ]
  }
};

// Demo saati: fuarın 2. günü, öğleden sonra.
const DEMO_NOW = { day: 2, minutes: 13 * 60 + 42, label: 'Cumartesi, 5 Aralık' };

const PUBLISHERS = [
  { id: 'bilgi', name: 'Bilgi Yayınevi', stand: 'A-305', logo: 'publisher-bilgi.webp', about: 'Edebiyat, tarih ve düşünce alanındaki kitaplarıyla tanınan köklü Ankara yayınevi.' },
  { id: 'dogan', name: 'Doğan Kitap', stand: 'A-208', logo: 'publisher-dogan.svg', about: 'Roman, inceleme ve çocuk kitaplarından oluşan geniş bir yayın kataloğu.' },
  { id: 'alfa', name: 'Alfa Yayınları', stand: 'A-504', logo: 'publisher-alfa.png', about: 'Edebiyat, kültür ve kurgu dışı kitaplarıyla tanınan yayınevi.' },
  { id: 'everest', name: 'Everest Yayınları', stand: 'A-410', logo: 'publisher-everest.png', about: 'Çağdaş Türk ve dünya edebiyatından seçkin eserler yayımlıyor.' },
  { id: 'kirmizi', name: 'Kırmızı Kedi', stand: 'A-606', logo: 'publisher-kirmizi.png', about: 'Edebiyat, araştırma ve gazetecilik kitapları yayımlayan yayınevi.' },
  { id: 'can', name: 'Can Çocuk', stand: 'A-104', logo: 'publisher-can.jpg', about: 'Çocuk ve gençlik kitaplarıyla nesillere ulaşan yayınevi.' },
  { id: 'altin', name: 'Altın Kitaplar', stand: 'A-707', logo: 'publisher-altin.jpg', about: 'Edebiyat ve çocuk kitapları alanında köklü yayınevi.' },
  { id: 'otuken', name: 'Ötüken Neşriyat', stand: 'A-811', logo: 'publisher-otuken.webp', about: 'Türk edebiyatı, tarih ve düşünce alanlarında yayınlar sunuyor.' },
  { id: 'timas', name: 'Timaş Yayınları', stand: 'A-111', logo: 'publisher-timas.png', about: 'Yetişkin ve çocuk okurlara uzanan geniş bir katalog.' },
  // Logosu olmayan yayınevleri krokide adlarıyla görünür; stantları app.js'te boş yerlere dağıtılır.
  { id: 'iletisim', name: 'İletişim Yayınları', short: 'İLETİŞİM', color: '#d6111b' },
  { id: 'yky', name: 'Yapı Kredi Yayınları', short: 'YKY', color: '#1d1d1b' },
  { id: 'iskultur', name: 'İş Bankası Kültür Yayınları', short: 'İŞ KÜLTÜR', color: '#0b4f9c' },
  { id: 'sel', name: 'Sel Yayıncılık', short: 'SEL', color: '#c8102e' },
  { id: 'metis', name: 'Metis Yayınları', short: 'METİS', color: '#3a3a3a' },
  { id: 'kronik', name: 'Kronik Kitap', short: 'KRONİK', color: '#a3162a' },
  { id: 'epsilon', name: 'Epsilon Yayınevi', short: 'EPSİLON', color: '#e2001a' },
  { id: 'pegasus', name: 'Pegasus Yayınları', short: 'PEGASUS', color: '#e07b00' },
  { id: 'ithaki', name: 'İthaki Yayınları', short: 'İTHAKİ', color: '#00808a' },
  { id: 'tudem', name: 'Tudem Yayınları', short: 'TUDEM', color: '#e94e1b' },
  { id: 'gunisigi', name: 'Günışığı Kitaplığı', short: 'GÜNIŞIĞI', color: '#e09a00' },
  { id: 'domingo', name: 'Domingo Yayınevi', short: 'DOMINGO', color: '#6d2077' },
  { id: 'ayrinti', name: 'Ayrıntı Yayınları', short: 'AYRINTI', color: '#111111' },
  { id: 'remzi', name: 'Remzi Kitabevi', short: 'REMZİ', color: '#8b1d1d' },
  { id: 'destek', name: 'Destek Yayınları', short: 'DESTEK', color: '#0072bc' },
  { id: 'kafka', name: 'Kafka Kitap', short: 'KAFKA', color: '#2f2f2f' },
  { id: 'profil', name: 'Profil Kitap', short: 'PROFİL', color: '#c2185b' },
  { id: 'nobel', name: 'Nobel Yayın', short: 'NOBEL', color: '#004b87' }
];

const AUTHORS = [
  { id: 'murat', name: 'Murat Menteş', publisher: 'alfa', photo: 'author-murat.jpg', followers: '12,4 B', bio: 'Hareketli anlatımı ve sıra dışı karakterleriyle bilinen romancı ve senarist. Romanları geniş bir okur kitlesine ulaştı; mizahı ve sinema diliyle tanınıyor.' },
  { id: 'buket', name: 'Buket Uzuner', publisher: 'everest', photo: 'author-buket.jpg', followers: '9,8 B', bio: 'Roman ve öyküleriyle çağdaş Türk edebiyatının en çok okunan yazarlarından. Doğa, kadın ve yolculuk temaları eserlerinin merkezinde.' },
  { id: 'timur', name: 'Timur Soykan', publisher: 'kirmizi', photo: 'author-timur.jpg', followers: '15,1 B', bio: 'Araştırmacı gazeteci. Dosya haberciliğini kitaplara taşıyor; belgelere ve tanıklıklara dayanan çalışmalarıyla tanınıyor.' },
  { id: 'mustafa', name: 'Mustafa Balbay', publisher: 'bilgi', photo: 'author-mustafa.jpg', followers: '7,2 B', bio: 'Gazeteci ve yazar. Türkiye’nin yakın tarihine ve Cumhuriyetin yüzyılına dair kitaplarıyla okurla buluşuyor.' },
  { id: 'gazalci', name: 'Mustafa Gazalcı', publisher: 'bilgi', photo: 'author-gazalci.jpg', followers: '3,1 B', bio: 'Eğitimci ve yazar. Köy Enstitüleri üzerine öykü ve araştırmalarıyla eğitim tarihini geniş kitlelere anlatıyor.' },
  { id: 'nehir', name: 'Nehir Yarar', publisher: 'can', photo: 'author-nehir.jpg', followers: '2,6 B', bio: 'Çocuk edebiyatı yazarı. Çocuklar için sıcak, düşündüren ve birlikte okumaya uygun öyküler yazıyor.' },
  { id: 'saygi', name: 'Saygı Öztürk', publisher: 'dogan', photo: 'author-saygi-portrait.jpg', followers: '6,5 B', bio: 'Araştırmacı gazeteci ve yazar. Tanıklığa ve belgelere dayanan kitaplarıyla uzun yıllardır okurla buluşuyor.' }
];

const BOOKS = [
  { id: 'dublor', author: 'murat', title: 'Dublörün Dilemması', cover: 'book-murat.jpg', about: 'Bir dublörün hayatı, kendisini sürekli başkalarının yerine düşerken bulduğu bir maceraya dönüşür. Menteş, hızlı kurgusu ve kara mizahıyla okuru şehirden şehre sürüklerken kimlik, cesaret ve rol yapmak üzerine düşündürür.' },
  { id: 'korkma', author: 'murat', title: 'Korkma Ben Varım', cover: 'book-murat-korkma-portrait.jpg', about: 'Birbirinden tuhaf karakterlerin yolları, aşkla maceranın iç içe geçtiği bir hikâyede kesişir. Sinematografik sahneleri ve keskin diyaloglarıyla bir solukta okunan, yazarın en sevilen romanlarından biri.' },
  { id: 'ruhi', author: 'murat', title: 'Ruhi Mücerret', cover: 'book-murat-ruhi.jpg', about: 'Yüz yaşındaki bir gazi, hiç beklemediği bir anda kendini modern dünyanın ortasında bulur. Geçmişle bugünü çarpıştıran bu roman, mizahın ardına saklanmış hüzünlü bir hafıza yolculuğu.' },
  { id: 'susamuru', author: 'buket', title: 'İki Yeşil Susamuru', cover: 'book-buket.jpg', about: 'Çağdaş bir kadının hayatı etrafında örülen roman, ilişkileri, aileyi ve insanın kendine dönüşünü sorguluyor. Uzuner, katmanlı anlatımıyla okuru karakterlerinin iç dünyasına davet ediyor.' },
  { id: 'kumral', author: 'buket', title: 'Kumral Ada Mavi Tuna', cover: 'book-buket-kumral.jpg', about: 'Çocuklukta yaşanan duyguların yetişkinlikte nasıl geri döndüğünü anlatan, iki şehir arasında gidip gelen bir roman. Yolculuk, aidiyet ve kayıp üzerine şiirsel bir anlatı.' },
  { id: 'badeci', author: 'timur', title: 'Badeci Şeyh’in Sır Odası', cover: 'book-timur.jpg', about: 'Gazeteci Timur Soykan, uzun soluklu bir araştırmanın belgelerini ve tanıklıklarını bir araya getiriyor. Güç ilişkilerinin perde arkasına bakan, haberciliği kitaba taşıyan bir dosya.' },
  { id: 'baron', author: 'timur', title: 'Baron İstilası', cover: 'book-timur-baron.jpg', about: 'Uluslararası suç ağlarının Türkiye’deki izlerini süren bu kitap, karmaşık bir dünyayı açık bir dille anlatıyor. Soykan’ın sahadaki gözlemleri ve belgeleriyle desteklenmiş bir araştırma.' },
  { id: 'yuzyil', author: 'mustafa', title: '100 Yıla Bakış', cover: 'book-mustafa.jpg', about: 'Cumhuriyetin ilk yüzyılı; siyasal, toplumsal ve kültürel kırılma noktaları üzerinden ele alınıyor. Balbay, gazeteci gözüyle yüz yılı okunabilir bir zaman yolculuğuna dönüştürüyor.' },
  { id: 'ikinci', author: 'mustafa', title: 'Cumhuriyetin İkinci Yüzyılı', cover: 'book-mustafa-cumhuriyet.avif', about: 'Yeni yüzyılın eşiğinde Türkiye’yi bekleyen sorular ve fırsatlar üzerine bir değerlendirme. Eğitimden demokrasiye, gençlerden kentlere uzanan geniş bir tartışma.' },
  { id: 'bozkir', author: 'gazalci', title: 'Bozkırdaki Işıklar', cover: 'book-gazalci.jpg', about: 'Köy Enstitülerinden yetişen öğretmenlerin hayatlarından esinlenen öyküler, Anadolu’nun dört bir yanına taşınan bir eğitim idealini anlatıyor. Sade ve sıcak bir dille yazılmış bir hafıza kitabı.' },
  { id: 'cinarlar', author: 'gazalci', title: 'Çınarlar Anlatıyor', cover: 'book-gazalci-cinarlar.jpg', about: 'Yirmi bir Köy Enstitüsünün hikâyesi, mezunların tanıklıkları ve söyleşilerle yeniden kuruluyor. Eğitim tarihine meraklı okurlar için kaynak niteliğinde bir çalışma.' },
  { id: 'veda', author: 'nehir', title: 'Veda Turtası', cover: 'book-nehir.jpg', about: 'Bir vedanın ardından gelen duyguları çocukların diliyle anlatan, sıcak ve umutlu bir öykü. Aileler ve öğretmenler için birlikte okumaya uygun bir kitap.' },
  { id: 'problem', author: 'nehir', title: 'Bir Problem Bin Çözüm', cover: 'book-nehir-problem.jpg', about: 'Tek bir soruna farklı açılardan bakmayı ve birlikte çözüm üretmeyi anlatan eğlenceli bir çocuk kitabı. Merak ve iş birliği üzerine renkli bir hikâye.' },
  { id: 'menzil', author: 'saygi', title: 'Menzil', cover: 'book-saygi.jpg', about: 'Tanıklıklara, ziyaretlere ve belgelere dayanan bir gazetecilik çalışması. Öztürk, uzun yıllar süren araştırmasını okurla adım adım paylaşıyor.' },
  { id: 'tegmen', author: 'saygi', title: 'Biz Teğmeniz', cover: 'book-saygi-tegmeniz.png', about: 'Ordudan ilişiği kesilen teğmenlerin hikâyelerini kendi anlatımlarıyla aktaran bir kitap. Karar süreçlerini ve ailelerin yaşadıklarını belgelerle ortaya koyuyor.' }
];

// kind: imza | soylesi | cocuk | atolye
const EVENTS = [
  // 1. gün · Cuma
  { id: 'e1', fair: 'ankara', day: 1, start: '10.00', end: '12.00', kind: 'imza', title: 'Mustafa Gazalcı', author: 'gazalci', publisher: 'bilgi' },
  { id: 'e19', fair: 'ankara', day: 1, start: '11.00', end: '12.00', kind: 'cocuk', title: 'Açılış masalı: Kitapların sesi', place: 'Çocuk Atölyesi', speakers: '4–8 yaş · ücretsiz' },
  { id: 'e2', fair: 'ankara', day: 1, start: '14.00', end: '15.00', kind: 'soylesi', title: '2026’da okur olmak', place: 'Söyleşi Salonu', speakers: 'Murat Menteş · Nehir Yarar' },
  { id: 'e20', fair: 'ankara', day: 1, start: '15.00', end: '16.30', kind: 'imza', title: 'Nehir Yarar', author: 'nehir', publisher: 'can' },
  { id: 'e3', fair: 'ankara', day: 1, start: '16.00', end: '18.00', kind: 'imza', title: 'Saygı Öztürk', author: 'saygi', publisher: 'dogan' },
  { id: 'e21', fair: 'ankara', day: 1, start: '17.30', end: '18.30', kind: 'soylesi', title: 'Haberden kitaba', place: 'Söyleşi Salonu', speakers: 'Timur Soykan · Saygı Öztürk' },
  // 2. gün · Cumartesi (sunumdaki "bugün")
  { id: 'e4', fair: 'ankara', day: 2, start: '10.30', end: '12.00', kind: 'imza', title: 'Nehir Yarar', author: 'nehir', publisher: 'can' },
  { id: 'e5', fair: 'ankara', day: 2, start: '11.00', end: '12.00', kind: 'cocuk', title: 'Masal saati: Kitap kurdu', place: 'Çocuk Atölyesi', speakers: '4–8 yaş · ücretsiz' },
  { id: 'e22', fair: 'ankara', day: 2, start: '12.00', end: '13.00', kind: 'soylesi', title: 'Köy Enstitüleri bugün ne söylüyor?', place: 'Söyleşi Salonu', speakers: 'Mustafa Gazalcı' },
  { id: 'e6', fair: 'ankara', day: 2, start: '13.00', end: '14.30', kind: 'imza', title: 'Mustafa Balbay', author: 'mustafa', publisher: 'bilgi' },
  { id: 'e7', fair: 'ankara', day: 2, start: '14.00', end: '16.00', kind: 'imza', title: 'Murat Menteş', author: 'murat', publisher: 'alfa' },
  { id: 'e8', fair: 'ankara', day: 2, start: '15.00', end: '16.00', kind: 'soylesi', title: 'Bir roman nasıl doğar?', place: 'Söyleşi Salonu', speakers: 'Buket Uzuner · Murat Menteş' },
  { id: 'e9', fair: 'ankara', day: 2, start: '16.30', end: '18.00', kind: 'imza', title: 'Buket Uzuner', author: 'buket', publisher: 'everest' },
  { id: 'e10', fair: 'ankara', day: 2, start: '17.00', end: '18.00', kind: 'atolye', title: 'Kendi kitabını tasarla', place: 'Çocuk Atölyesi', speakers: '7–12 yaş · 20 kişi' },
  { id: 'e11', fair: 'ankara', day: 2, start: '18.00', end: '19.30', kind: 'imza', title: 'Timur Soykan', author: 'timur', publisher: 'kirmizi' },
  { id: 'e12', fair: 'ankara', day: 2, start: '19.00', end: '20.00', kind: 'soylesi', title: 'Ankara’nın edebiyat hafızası', place: 'Söyleşi Salonu', speakers: 'Mustafa Balbay ve konukları' },
  // 3. gün · Pazar
  { id: 'e13', fair: 'ankara', day: 3, start: '11.00', end: '12.30', kind: 'imza', title: 'Saygı Öztürk', author: 'saygi', publisher: 'dogan' },
  { id: 'e23', fair: 'ankara', day: 3, start: '12.00', end: '13.30', kind: 'imza', title: 'Murat Menteş', author: 'murat', publisher: 'alfa' },
  { id: 'e14', fair: 'ankara', day: 3, start: '14.00', end: '15.00', kind: 'soylesi', title: 'Yayıncılığın yarını', place: 'Söyleşi Salonu', speakers: 'Yayınevi editörleri' },
  { id: 'e15', fair: 'ankara', day: 3, start: '15.00', end: '17.00', kind: 'imza', title: 'Buket Uzuner', author: 'buket', publisher: 'everest' },
  { id: 'e16', fair: 'ankara', day: 3, start: '16.00', end: '17.00', kind: 'cocuk', title: 'Çizgi roman atölyesi', place: 'Çocuk Atölyesi', speakers: '8–12 yaş' },
  { id: 'e24', fair: 'ankara', day: 3, start: '17.00', end: '18.30', kind: 'imza', title: 'Timur Soykan', author: 'timur', publisher: 'kirmizi' },
  { id: 'e25', fair: 'ankara', day: 3, start: '18.00', end: '19.00', kind: 'soylesi', title: 'Cumhuriyetin ikinci yüzyılı', place: 'Söyleşi Salonu', speakers: 'Mustafa Balbay' },
  // 4. gün · Pazartesi
  { id: 'e26', fair: 'ankara', day: 4, start: '10.30', end: '12.00', kind: 'imza', title: 'Nehir Yarar', author: 'nehir', publisher: 'can' },
  { id: 'e27', fair: 'ankara', day: 4, start: '11.00', end: '12.00', kind: 'atolye', title: 'Okullar için hikâye atölyesi', place: 'Çocuk Atölyesi', speakers: '8–12 yaş · sınıf grupları' },
  { id: 'e17', fair: 'ankara', day: 4, start: '13.00', end: '15.00', kind: 'imza', title: 'Murat Menteş', author: 'murat', publisher: 'alfa' },
  { id: 'e28', fair: 'ankara', day: 4, start: '15.00', end: '16.00', kind: 'soylesi', title: 'Çocuklarla birlikte okumak', place: 'Söyleşi Salonu', speakers: 'Nehir Yarar' },
  { id: 'e29', fair: 'ankara', day: 4, start: '16.30', end: '18.00', kind: 'imza', title: 'Mustafa Balbay', author: 'mustafa', publisher: 'bilgi' },
  // 5. gün · Salı
  { id: 'e30', fair: 'ankara', day: 5, start: '11.00', end: '12.30', kind: 'imza', title: 'Buket Uzuner', author: 'buket', publisher: 'everest' },
  { id: 'e18', fair: 'ankara', day: 5, start: '14.00', end: '15.30', kind: 'imza', title: 'Mustafa Gazalcı', author: 'gazalci', publisher: 'bilgi' },
  { id: 'e31', fair: 'ankara', day: 5, start: '15.00', end: '16.00', kind: 'soylesi', title: 'Romanın mutfağı', place: 'Söyleşi Salonu', speakers: 'Buket Uzuner' },
  { id: 'e32', fair: 'ankara', day: 5, start: '16.30', end: '18.00', kind: 'imza', title: 'Saygı Öztürk', author: 'saygi', publisher: 'dogan' },
  { id: 'e33', fair: 'ankara', day: 5, start: '17.00', end: '18.00', kind: 'cocuk', title: 'Masal maratonu', place: 'Çocuk Atölyesi', speakers: '4–10 yaş · ücretsiz' },

  // Çocuk Şenliği · 1. gün
  { id: 'k1', fair: 'cocuk', day: 1, start: '10.30', end: '11.15', kind: 'cocuk', title: 'Masal kapısı açılıyor', zone: 'masal', org: 'masal', speakers: '4–7 yaş' },
  { id: 'k2', fair: 'cocuk', day: 1, start: '11.00', end: '12.00', kind: 'atolye', title: 'Kendi kahramanını çiz', zone: 'renk', org: 'firca', speakers: '6–10 yaş' },
  { id: 'k3', fair: 'cocuk', day: 1, start: '11.30', end: '12.30', kind: 'atolye', title: 'Minik bilim insanları: Yanardağ deneyi', zone: 'bilim', org: 'kasif', speakers: '6–9 yaş' },
  { id: 'k4', fair: 'cocuk', day: 1, start: '12.30', end: '13.30', kind: 'atolye', title: 'Küçük şefler: Meyveli kurabiye', zone: 'mutfak', org: 'sef', speakers: '5–10 yaş' },
  { id: 'k5', fair: 'cocuk', day: 1, start: '13.30', end: '14.15', kind: 'cocuk', title: 'Kukla gösterisi: Kayıp kitap', zone: 'masal', org: 'kukla', speakers: '3–8 yaş' },
  { id: 'k6', fair: 'cocuk', day: 1, start: '14.30', end: '15.30', kind: 'cocuk', title: 'Aile oyun saati', zone: 'oyun', org: 'hareket', speakers: 'Tüm yaşlar' },
  { id: 'k7', fair: 'cocuk', day: 1, start: '15.30', end: '16.30', kind: 'atolye', title: 'Robotlarla tanışıyoruz', zone: 'bilim', org: 'mucit', speakers: '8–12 yaş' },
  { id: 'k8', fair: 'cocuk', day: 1, start: '16.00', end: '17.00', kind: 'cocuk', title: 'Nehir Yarar ile okuma saati', zone: 'kitap', org: 'can', speakers: '6–10 yaş' },
  // Çocuk Şenliği · 2. gün
  { id: 'k9', fair: 'cocuk', day: 2, start: '10.30', end: '11.30', kind: 'cocuk', title: 'Resimli kitaplarla keşif', zone: 'kitap', org: 'gunisigi', speakers: '3–6 yaş' },
  { id: 'k10', fair: 'cocuk', day: 2, start: '11.00', end: '12.00', kind: 'atolye', title: 'Kâğıttan hayvanlar', zone: 'renk', org: 'firca', speakers: '5–9 yaş' },
  { id: 'k11', fair: 'cocuk', day: 2, start: '12.00', end: '13.00', kind: 'atolye', title: 'Ekransız kodlama oyunu', zone: 'bilim', org: 'mucit', speakers: '7–12 yaş' },
  { id: 'k12', fair: 'cocuk', day: 2, start: '13.00', end: '14.00', kind: 'cocuk', title: 'Masal maratonu', zone: 'masal', org: 'masal', speakers: '4–8 yaş' },
  { id: 'k13', fair: 'cocuk', day: 2, start: '14.00', end: '15.00', kind: 'cocuk', title: 'Oyuncak tasarım yarışması', zone: 'oyun', org: 'toyzz', speakers: '6–12 yaş' },
  { id: 'k14', fair: 'cocuk', day: 2, start: '15.00', end: '16.00', kind: 'atolye', title: 'Pizza atölyesi', zone: 'mutfak', org: 'sef', speakers: '6–11 yaş' },
  { id: 'k15', fair: 'cocuk', day: 2, start: '16.00', end: '17.00', kind: 'cocuk', title: 'Tudem yazarlarıyla imza', zone: 'kitap', org: 'tudem', speakers: '7–12 yaş' }
];

// Çocuk Şenliği alanları ve katılımcıları (tamamı konsept).
const KID_ZONES = [
  { id: 'masal', name: 'Masal Sahnesi', icon: 'stage', color: '#0b8e78', bg: '#dcf3ec' },
  { id: 'renk', name: 'Renk Atölyesi', icon: 'brush', color: '#c2185b', bg: '#fde6ee' },
  { id: 'bilim', name: 'Bilim Alanı', icon: 'sparkle', color: '#4542b5', bg: '#ecebff' },
  { id: 'oyun', name: 'Oyun Alanı', icon: 'play', color: '#c26f05', bg: '#fff1db' },
  { id: 'kitap', name: 'Kitap Köşesi', icon: 'book', color: '#6d2077', bg: '#f3e6f6' },
  { id: 'mutfak', name: 'Mutfak Atölyesi', icon: 'cup', color: '#a3162a', bg: '#fde4e1' }
];
const KID_ORGS = [
  { id: 'masal', name: 'Masal Kumpanyası', short: 'MASAL', color: '#0b8e78', kind: 'Tiyatro', zone: 'masal', about: 'Çocukların seçtiği kahramanlarla, seyircinin de içine katıldığı canlı masal gösterileri hazırlıyor.' },
  { id: 'kukla', name: 'Minik Sahne Kukla Tiyatrosu', short: 'KUKLA', color: '#0e6655', kind: 'Tiyatro', zone: 'masal', about: 'El yapımı kuklalarla kısa, eğlenceli ve okumaya özendiren gösteriler sergiliyor.' },
  { id: 'firca', name: 'Renkli Fırça Atölyesi', short: 'FIRÇA', color: '#c2185b', kind: 'Atölye', zone: 'renk', about: 'Resim, kolaj ve kâğıt işleriyle çocukların kendi hikâyelerini çizmesine eşlik ediyor.' },
  { id: 'kasif', name: 'Bilim Kâşifleri', short: 'KÂŞİF', color: '#4542b5', kind: 'Atölye', zone: 'bilim', about: 'Mutfaktaki malzemelerle güvenli ve şaşırtıcı bilim deneyleri yaptırıyor.' },
  { id: 'mucit', name: 'Minik Mucitler Robotik', short: 'MUCİT', color: '#2f6ee5', kind: 'Atölye', zone: 'bilim', about: 'Robot setleri ve ekransız oyunlarla kodlamanın temel fikrini öğretiyor.' },
  { id: 'sef', name: 'Küçük Şefler Mutfağı', short: 'ŞEF', color: '#a3162a', kind: 'Atölye', zone: 'mutfak', about: 'Çocuklar kendi kurabiye ve pizzalarını hazırlıyor; sağlıklı beslenmeyi oyunla öğreniyor.' },
  { id: 'hareket', name: 'Hareket Oyun Kulübü', short: 'HAREKET', color: '#c26f05', kind: 'Oyun', zone: 'oyun', about: 'Ailelerin birlikte katılabildiği hareketli grup oyunları düzenliyor.' },
  { id: 'toyzz', name: 'Toyzz Shop', logo: 'brand-toyzz.png', kind: 'Marka', zone: 'oyun', about: 'Oyun alanında oyuncak tasarım yarışması için hazırlanmış örnek marka profili.' },
  { id: 'can', name: 'Can Çocuk', logo: 'publisher-can.jpg', kind: 'Yayınevi', zone: 'kitap', about: 'Çocuk ve gençlik kitaplarıyla okuma saatleri ve yazar buluşmaları yapıyor.' },
  { id: 'gunisigi', name: 'Günışığı Kitaplığı', short: 'GÜNIŞIĞI', color: '#e09a00', kind: 'Yayınevi', zone: 'kitap', about: 'Resimli kitaplar ve ilk okuma kitaplarıyla küçük okurlara keşif alanı sunuyor.' },
  { id: 'tudem', name: 'Tudem Çocuk', short: 'TUDEM', color: '#e94e1b', kind: 'Yayınevi', zone: 'kitap', about: 'Çocuk edebiyatı yazarlarıyla imza ve sohbet buluşmaları düzenliyor.' }
];

// Stand -> kim
const STAND_OWNERS = Object.fromEntries(PUBLISHERS.filter(p => p.stand).map(p => [p.stand, p.id]));

const NOTICES = [
  { id: 'n1', fair: 'ankara', type: 'change', time: '13.20', title: 'Söyleşi salonu değişti', body: '“Bir roman nasıl doğar?” söyleşisi 15.00’te Salon B’de yapılacak.', link: '#/etkinlik/e8' },
  { id: 'n2', fair: 'ankara', type: 'eylul', time: '12.30', title: 'Murat Menteş bugün 14.00’te', body: 'Alfa Yayınları standında imza günü var. Krokiden yerini görebilirsin.', link: '#/etkinlik/e7' },
  { id: 'n3', fair: 'ankara', type: 'eylul', time: '10.05', title: 'Hafta sonu yoğunluğu', body: 'Metroyla gelenler için M2 Söğütözü durağı en yakın giriş.', link: '#/' },
  { id: 'n4', fair: 'ankara', type: 'eylul', time: 'Dün', title: 'Hoş geldin!', body: '24. Ankara Kitap Fuarı kapılarını açtı. 500’ü aşkın yayınevi ve 850 yazar seni bekliyor.', link: '#/' },
  { id: 'kn1', fair: 'cocuk', type: 'change', time: '11.40', title: 'Bilim atölyesi doldu', body: 'Yanardağ deneyi atölyesi doldu. 15.30’daki robot atölyesinde hâlâ yer var.', link: '#/etkinlik/k7' },
  { id: 'kn2', fair: 'cocuk', type: 'eylul', time: '11.00', title: 'Kukla gösterisi 13.30’da', body: '“Kayıp kitap” gösterisi Masal Sahnesi’nde. Ön sıralar küçükler için ayrıldı.', link: '#/etkinlik/k5' },
  { id: 'kn3', fair: 'cocuk', type: 'eylul', time: '10.00', title: 'Şenliğe hoş geldiniz', body: 'Çocuğunuzla buluşma noktası Danışma. Kayıp durumunda görevlilere haber verin.', link: '#/harita' }
];

// Sunumdan veya panelden tetiklenen canlı duyurular
const LIVE_PUSHES = [
  { type: 'eylul', title: 'İmza 15 dk sonra başlıyor', body: 'Murat Menteş, 14.00’te Alfa Yayınları standında okurlarıyla buluşuyor.', link: '#/etkinlik/e7' },
  { type: 'change', title: 'Program değişikliği', body: 'Timur Soykan imzası 18.00 yerine 18.30’da başlayacak.', link: '#/etkinlik/e11' },
  { type: 'eylul', title: 'Kayıp eşya', body: 'Mavi bir sırt çantası Danışma’ya teslim edildi. Girişin hemen sağında.', link: '#/harita?yer=danisma' },
  { type: 'eylul', title: 'Fuar 20.00’de kapanıyor', body: 'Bugün için son bir saat. Yarın 10.00’da yeniden buradayız.', link: '#/program' }
];
const KID_PUSHES = [
  { type: 'eylul', title: 'Kukla gösterisi başlıyor', body: '“Kayıp kitap” 10 dakika sonra Masal Sahnesi’nde.', link: '#/etkinlik/k5' },
  { type: 'change', title: 'Atölyede yer açıldı', body: 'Robotlarla tanışıyoruz atölyesinde 3 kişilik yer açıldı.', link: '#/etkinlik/k7' },
  { type: 'eylul', title: 'Aile oyun saati', body: 'Hareket Oyun Kulübü 14.30’da Oyun Alanı’nda. Tüm yaşlar katılabilir.', link: '#/etkinlik/k6' }
];

// Yayınevi sayfası: web sitesi, alanlar ve fuar için kısa tanıtım (tanıtım metinleri özettir).
const PUB_INFO = {
  bilgi: { web: 'https://www.bilgiyayinevi.com.tr', genres: ['Edebiyat', 'Tarih', 'Düşünce'], fair: 'Standda Köy Enstitüleri ve yakın tarih kitapları öne çıkıyor; Mustafa Gazalcı ve Mustafa Balbay imza günleriyle okurla buluşuyor.' },
  dogan: { web: 'https://www.dogankitap.com.tr', genres: ['Roman', 'İnceleme', 'Araştırma'], fair: 'Saygı Öztürk’ün imza günleri ve araştırma dizisinin yeni baskıları standın en çok sorulanları arasında.' },
  alfa: { web: 'https://www.alfayayinlari.com', genres: ['Roman', 'Kurgu dışı', 'Klasikler'], fair: 'Murat Menteş’in romanları ve imza günleri standın yıldızı; fuar boyunca yeni çıkan romanlar da masada.' },
  everest: { web: 'https://www.everestyayinlari.com', genres: ['Çağdaş edebiyat', 'Dünya klasikleri', 'Öykü'], fair: 'Buket Uzuner’in imza ve söyleşi günleri var; çağdaş Türk edebiyatı rafları genişletildi.' },
  kirmizi: { web: 'https://www.kirmizikedi.com', genres: ['Edebiyat', 'Araştırma', 'Gazetecilik'], fair: 'Timur Soykan’ın araştırma kitapları ve imza günleri standın en yoğun saatlerini oluşturuyor.' },
  can: { web: 'https://www.canyayinlari.com', genres: ['Çocuk', 'Gençlik', 'Resimli kitap'], fair: 'Nehir Yarar’la okuma saatleri ve çocuklar için resimli kitap köşesi standda.' },
  altin: { web: 'https://www.altinkitaplar.com.tr', genres: ['Edebiyat', 'Çocuk', 'Klasikler'], fair: 'Klasikler ve çocuk kitapları serileri fuara özel tam takım halinde sergileniyor.' },
  otuken: { web: 'https://www.otuken.com.tr', genres: ['Türk edebiyatı', 'Tarih', 'Düşünce'], fair: 'Tarih ve düşünce dizilerinin yeni basımları standda.' },
  timas: { web: 'https://www.timas.com.tr', genres: ['Roman', 'Çocuk', 'Kişisel gelişim'], fair: 'Yetişkin ve çocuk okurlar için geniş bir seçki standda.' },
  iletisim: { web: 'https://iletisim.com.tr', genres: ['Edebiyat', 'Sosyal bilimler', 'Araştırma'] },
  yky: { web: 'https://www.ykykultur.com.tr', genres: ['Edebiyat', 'Sanat', 'Çocuk'] },
  iskultur: { web: 'https://www.iskultur.com.tr', genres: ['Klasikler', 'Tarih', 'Çocuk'] },
  sel: { web: 'https://www.selyayincilik.com', genres: ['Edebiyat', 'Polisiye', 'Düşünce'] },
  metis: { web: 'https://www.metiskitap.com', genres: ['Edebiyat', 'Siyaset', 'Felsefe'] },
  ithaki: { web: 'https://www.ithaki.com.tr', genres: ['Bilimkurgu', 'Fantastik', 'Klasikler'] },
  tudem: { web: 'https://www.tudem.com', genres: ['Çocuk', 'Gençlik', 'Eğitim'] },
  gunisigi: { web: 'https://www.gunisigikitapligi.com', genres: ['Çocuk', 'Gençlik', 'Resimli kitap'] },
  ayrinti: { web: 'https://www.ayrintiyayinlari.com.tr', genres: ['Edebiyat', 'Düşünce', 'Sosyal bilimler'] },
  remzi: { web: 'https://www.remzi.com.tr', genres: ['Edebiyat', 'Çocuk', 'Kişisel gelişim'] },
  profil: { web: 'https://www.profilkitap.com', genres: ['Tarih', 'Araştırma', 'Biyografi'] },
  nobel: { genres: ['Akademik', 'Ders kitabı', 'Bilim'] },
  pegasus: { genres: ['Roman', 'Fantastik', 'Gençlik'] },
  epsilon: { genres: ['Roman', 'Polisiye', 'Çocuk'] },
  kronik: { genres: ['Tarih', 'Biyografi', 'Araştırma'] },
  destek: { genres: ['Kişisel gelişim', 'Roman', 'Psikoloji'] },
  domingo: { genres: ['Edebiyat', 'Mizah', 'Gençlik'] },
  kafka: { genres: ['Edebiyat', 'Felsefe', 'Psikoloji'] }
};
