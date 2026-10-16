// Eylül Fuar Rehberi — örnek veri
// Yazar, kitap ve yayınevi adları gerçek; 2026 imza saatleri ve stant numaraları
// sunum için hazırlanmış örneklerdir.

const A = '../assets/';

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
  { id: 'timas', name: 'Timaş Yayınları', stand: 'A-111', logo: 'publisher-timas.png', about: 'Yetişkin ve çocuk okurlara uzanan geniş bir katalog.' }
];

const AUTHORS = [
  { id: 'murat', name: 'Murat Menteş', publisher: 'alfa', photo: 'author-murat.jpg', followers: '12,4 B', bio: 'Hareketli anlatımı ve sıra dışı karakterleriyle bilinen romancı ve senarist.' },
  { id: 'buket', name: 'Buket Uzuner', publisher: 'everest', photo: 'author-buket.jpg', followers: '9,8 B', bio: 'Roman ve öyküleriyle çağdaş Türk edebiyatının en çok okunan yazarlarından.' },
  { id: 'timur', name: 'Timur Soykan', publisher: 'kirmizi', photo: 'author-timur.jpg', followers: '15,1 B', bio: 'Araştırmacı gazeteci; dosya haberciliğini kitaplara taşıyan yazar.' },
  { id: 'mustafa', name: 'Mustafa Balbay', publisher: 'bilgi', photo: 'author-mustafa.jpg', followers: '7,2 B', bio: 'Gazeteci ve yazar; Türkiye’nin yakın tarihine dair kitaplarıyla tanınıyor.' },
  { id: 'gazalci', name: 'Mustafa Gazalcı', publisher: 'bilgi', photo: 'author-gazalci.jpg', followers: '3,1 B', bio: 'Eğitimci ve yazar; Köy Enstitüleri üzerine eserleriyle biliniyor.' },
  { id: 'nehir', name: 'Nehir Yarar', publisher: 'can', photo: 'author-nehir.jpg', followers: '2,6 B', bio: 'Çocuk okurlar için sıcak ve düşündüren öyküler yazıyor.' },
  { id: 'saygi', name: 'Saygı Öztürk', publisher: 'dogan', photo: 'author-saygi-portrait.jpg', followers: '6,5 B', bio: 'Araştırmacı gazeteci; tanıklığa dayanan kitaplarıyla okurla buluşuyor.' }
];

const BOOKS = [
  { id: 'dublor', author: 'murat', title: 'Dublörün Dilemması', cover: 'book-murat.jpg', about: 'Sıra dışı karakterleri hızlı, mizahi ve felsefi bir macerada buluşturan roman.' },
  { id: 'korkma', author: 'murat', title: 'Korkma Ben Varım', cover: 'book-murat-korkma-portrait.jpg', about: 'Aşk ve macerayı alışılmadık karakterlerle bir araya getiren roman.' },
  { id: 'ruhi', author: 'murat', title: 'Ruhi Mücerret', cover: 'book-murat-ruhi.jpg', about: 'Yüz yaşındaki bir gazinin beklenmedik macerası.' },
  { id: 'susamuru', author: 'buket', title: 'İki Yeşil Susamuru', cover: 'book-buket.jpg', about: 'İlişkileri ve insan hâllerini sorgulayan çok katmanlı bir roman.' },
  { id: 'kumral', author: 'buket', title: 'Kumral Ada Mavi Tuna', cover: 'book-buket-kumral.jpg', about: 'Çocukluktan taşınan duygularla yetişkinliği iç içe geçiren roman.' },
  { id: 'badeci', author: 'timur', title: 'Badeci Şeyh’in Sır Odası', cover: 'book-timur.jpg', about: 'Güç ilişkilerini belgeleriyle izleyen gazetecilik araştırması.' },
  { id: 'baron', author: 'timur', title: 'Baron İstilası', cover: 'book-timur-baron.jpg', about: 'Uluslararası suç örgütlerinin izini süren araştırma.' },
  { id: 'yuzyil', author: 'mustafa', title: '100 Yıla Bakış', cover: 'book-mustafa.jpg', about: 'Cumhuriyetin ilk yüzyılına siyasal ve kültürel bir bakış.' },
  { id: 'ikinci', author: 'mustafa', title: 'Cumhuriyetin İkinci Yüzyılı', cover: 'book-mustafa-cumhuriyet.avif', about: 'Türkiye’nin geleceğine dair değerlendirmeler.' },
  { id: 'bozkir', author: 'gazalci', title: 'Bozkırdaki Işıklar', cover: 'book-gazalci.jpg', about: 'Köy Enstitülerinin mirasını öykülerle anlatıyor.' },
  { id: 'cinarlar', author: 'gazalci', title: 'Çınarlar Anlatıyor', cover: 'book-gazalci-cinarlar.jpg', about: 'Mezun öğretmenlerin tanıklıklarıyla 21 Köy Enstitüsü.' },
  { id: 'veda', author: 'nehir', title: 'Veda Turtası', cover: 'book-nehir.jpg', about: 'Çocuk okurlar için sıcak bir öykü kitabı.' },
  { id: 'problem', author: 'nehir', title: 'Bir Problem Bin Çözüm', cover: 'book-nehir-problem.jpg', about: 'Bir soruna farklı açılardan bakmayı anlatıyor.' },
  { id: 'menzil', author: 'saygi', title: 'Menzil', cover: 'book-saygi.jpg', about: 'Tanıklık ve araştırmaya dayanan gazetecilik kitabı.' },
  { id: 'tegmen', author: 'saygi', title: 'Biz Teğmeniz', cover: 'book-saygi-tegmeniz.png', about: 'Teğmenlerin tanıklıklarını ve karar süreçlerini araştırıyor.' }
];

// kind: imza | soylesi | cocuk | atolye
const EVENTS = [
  { id: 'e1', fair: 'ankara', day: 1, start: '10.00', end: '12.00', kind: 'imza', title: 'Mustafa Gazalcı', author: 'gazalci', publisher: 'bilgi' },
  { id: 'e2', fair: 'ankara', day: 1, start: '14.00', end: '15.00', kind: 'soylesi', title: '2026’da okur olmak', place: 'Söyleşi Salonu', speakers: 'Yazarlar ve editörler' },
  { id: 'e3', fair: 'ankara', day: 1, start: '16.00', end: '18.00', kind: 'imza', title: 'Saygı Öztürk', author: 'saygi', publisher: 'dogan' },
  { id: 'e4', fair: 'ankara', day: 2, start: '10.30', end: '12.00', kind: 'imza', title: 'Nehir Yarar', author: 'nehir', publisher: 'can' },
  { id: 'e5', fair: 'ankara', day: 2, start: '11.00', end: '12.00', kind: 'cocuk', title: 'Masal saati: Kitap kurdu', place: 'Çocuk Atölyesi', speakers: '4–8 yaş · ücretsiz' },
  { id: 'e6', fair: 'ankara', day: 2, start: '13.00', end: '14.30', kind: 'imza', title: 'Mustafa Balbay', author: 'mustafa', publisher: 'bilgi' },
  { id: 'e7', fair: 'ankara', day: 2, start: '14.00', end: '16.00', kind: 'imza', title: 'Murat Menteş', author: 'murat', publisher: 'alfa' },
  { id: 'e8', fair: 'ankara', day: 2, start: '15.00', end: '16.00', kind: 'soylesi', title: 'Bir roman nasıl doğar?', place: 'Söyleşi Salonu', speakers: 'Buket Uzuner · Murat Menteş' },
  { id: 'e9', fair: 'ankara', day: 2, start: '16.30', end: '18.00', kind: 'imza', title: 'Buket Uzuner', author: 'buket', publisher: 'everest' },
  { id: 'e10', fair: 'ankara', day: 2, start: '17.00', end: '18.00', kind: 'atolye', title: 'Kendi kitabını tasarla', place: 'Çocuk Atölyesi', speakers: '7–12 yaş · 20 kişi' },
  { id: 'e11', fair: 'ankara', day: 2, start: '18.00', end: '19.30', kind: 'imza', title: 'Timur Soykan', author: 'timur', publisher: 'kirmizi' },
  { id: 'e12', fair: 'ankara', day: 2, start: '19.00', end: '20.00', kind: 'soylesi', title: 'Ankara’nın edebiyat hafızası', place: 'Söyleşi Salonu', speakers: 'Mustafa Balbay ve konukları' },
  { id: 'e13', fair: 'ankara', day: 3, start: '11.00', end: '12.30', kind: 'imza', title: 'Saygı Öztürk', author: 'saygi', publisher: 'dogan' },
  { id: 'e14', fair: 'ankara', day: 3, start: '14.00', end: '15.00', kind: 'soylesi', title: 'Yayıncılığın yarını', place: 'Söyleşi Salonu', speakers: 'Yayınevi editörleri' },
  { id: 'e15', fair: 'ankara', day: 3, start: '15.00', end: '17.00', kind: 'imza', title: 'Buket Uzuner', author: 'buket', publisher: 'everest' },
  { id: 'e16', fair: 'ankara', day: 3, start: '16.00', end: '17.00', kind: 'cocuk', title: 'Çizgi roman atölyesi', place: 'Çocuk Atölyesi', speakers: '8–12 yaş' },
  { id: 'e17', fair: 'ankara', day: 4, start: '13.00', end: '15.00', kind: 'imza', title: 'Murat Menteş', author: 'murat', publisher: 'alfa' },
  { id: 'e18', fair: 'ankara', day: 5, start: '14.00', end: '15.30', kind: 'imza', title: 'Mustafa Gazalcı', author: 'gazalci', publisher: 'bilgi' },

  { id: 'k1', fair: 'cocuk', day: 1, start: '10.30', end: '11.15', kind: 'cocuk', title: 'Masal kapısı açılıyor', place: 'Masal Sahnesi', speakers: '4–7 yaş', age: [4, 7] },
  { id: 'k2', fair: 'cocuk', day: 1, start: '11.30', end: '12.30', kind: 'atolye', title: 'Kendi kahramanını çiz', place: 'Renk Atölyesi', speakers: '7–10 yaş', age: [7, 10] },
  { id: 'k3', fair: 'cocuk', day: 1, start: '13.00', end: '14.00', kind: 'atolye', title: 'Minik bilim insanları', place: 'Deney Masası', speakers: '6–9 yaş', age: [6, 9] },
  { id: 'k4', fair: 'cocuk', day: 1, start: '14.00', end: '15.00', kind: 'cocuk', title: 'Aile oyun saati', place: 'Oyun Alanı', speakers: 'Tüm yaşlar', age: [3, 12] },
  { id: 'k5', fair: 'cocuk', day: 1, start: '15.30', end: '16.30', kind: 'atolye', title: 'Kitap kurdu kodlama', place: 'Renk Atölyesi', speakers: '9–12 yaş', age: [9, 12] },
  { id: 'k6', fair: 'cocuk', day: 2, start: '11.00', end: '12.00', kind: 'cocuk', title: 'Resimli kitaplar köşesi', place: 'Kitap Köşesi', speakers: '3–6 yaş', age: [3, 6] }
];

// Stand -> kim
const STAND_OWNERS = Object.fromEntries(PUBLISHERS.map(p => [p.stand, p.id]));

const NOTICES = [
  { id: 'n1', type: 'change', time: '13.20', title: 'Söyleşi salonu değişti', body: '“Bir roman nasıl doğar?” söyleşisi 15.00’te Salon B’de yapılacak.', link: '#/etkinlik/e8' },
  { id: 'n2', type: 'eylul', time: '12.30', title: 'Murat Menteş bugün 14.00’te', body: 'Alfa Yayınları standında (A-504) imza günü var. Krokiden yerini görebilirsin.', link: '#/etkinlik/e7' },
  { id: 'n3', type: 'eylul', time: 'Dün', title: 'Hoş geldin!', body: '24. Ankara Kitap Fuarı kapılarını açtı. 500’ü aşkın yayınevi ve 850 yazar seni bekliyor.', link: '#/' }
];

// Sunumdan veya panelden tetiklenen canlı duyurular
const LIVE_PUSHES = [
  { type: 'eylul', title: 'İmza 15 dk sonra başlıyor', body: 'Murat Menteş, 14.00’te Alfa Yayınları standında okurlarıyla buluşuyor.', link: '#/etkinlik/e7' },
  { type: 'change', title: 'Program değişikliği', body: 'Timur Soykan imzası 18.00 yerine 18.30’da başlayacak.', link: '#/etkinlik/e11' },
  { type: 'eylul', title: 'Kayıp eşya', body: 'Mavi bir sırt çantası Danışma’ya teslim edildi. Girişin hemen sağında.', link: '#/harita?yer=danisma' },
  { type: 'eylul', title: 'Fuar 20.00’de kapanıyor', body: 'Bugün için son bir saat. Yarın 10.00’da yeniden buradayız.', link: '#/program' }
];

const KID_ZONES = [
  { id: 'masal', name: 'Masal Sahnesi', icon: 'stage' },
  { id: 'renk', name: 'Renk Atölyesi', icon: 'brush' },
  { id: 'oyun', name: 'Oyun Alanı', icon: 'play' },
  { id: 'kitap', name: 'Kitap Köşesi', icon: 'book' }
];
