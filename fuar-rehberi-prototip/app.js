// 2026 Ankara Kitap Fuarı ekranları konsepttir; imza ve söyleşi kayıtları örnek akışı gösterir.
// Yaklaşan 24. fuarın katılımcı listesi, imza programı ve krokisi henüz doğrulanmadı.
const fairs={
  ankara:{name:'24. Ankara Kitap Fuarı',kind:'Kitap, yazar ve kültür',venue:'2026 mekânı teyit edilecek',photo:true},
  children:{name:'Çocuk Şenliği',kind:'Aile ve çocuk deneyimi',venue:'Mekân bilgisi eklenecek',photo:false}
};
const publishers=[
  {id:'can',name:'Can Çocuk',category:'Yayınevi',initial:'CAN',logo:'publisher-can.jpg',website:'https://www.canyayinlari.com/',description:'Çocuk ve gençlik kitaplarıyla okurlara ulaşan yayınevi.'},
  {id:'dogan',name:'Doğan Kitap',category:'Yayınevi',initial:'DOĞAN',logo:'publisher-dogan.svg',website:'https://www.dogankitap.com.tr/',description:'Roman, inceleme ve çocuk kitaplarından oluşan geniş yayın kataloğu.'},
  {id:'altin',name:'Altın Kitaplar',category:'Yayınevi',initial:'ALTIN',logo:'publisher-altin.jpg',website:'https://www.altinkitaplar.com.tr/',description:'Edebiyat ve çocuk kitapları alanında yayınlar sunan yayınevi.'},
  {id:'otuken',name:'Ötüken Neşriyat',category:'Yayınevi',initial:'ÖTÜKEN',logo:'publisher-otuken.webp',website:'https://www.otuken.com.tr/',description:'Türk edebiyatı, tarih ve düşünce alanlarında yayınlar sunan yayınevi.'},
  {id:'alfa',name:'Alfa Yayınları',category:'Yayınevi',initial:'ALFA',logo:'publisher-alfa.png',website:'https://www.alfayayinlari.com/',description:'Edebiyat, kültür ve kurgu dışı kitaplarıyla tanınan yayınevi.'},
  {id:'everest',name:'Everest Yayınları',category:'Yayınevi',initial:'EVEREST',logo:'publisher-everest.png',website:'https://www.everestyayinlari.com/',description:'Çağdaş edebiyat ve kurgu dışı kitaplar yayımlayan yayınevi.'},
  {id:'kirmizi',name:'Kırmızı Kedi Yayınları',category:'Yayınevi',initial:'KIRMIZI',logo:'publisher-kirmizi.png',website:'https://www.kirmizikedi.com/',description:'Edebiyat ve araştırma kitapları yayımlayan yayınevi.'},
  {id:'bilgi',name:'Bilgi Yayınevi',category:'Yayınevi',initial:'BİLGİ',logo:'publisher-bilgi.webp',website:'https://www.bilgiyayinevi.com.tr/',description:'Edebiyat, tarih ve düşünce alanındaki kitaplarıyla tanınan yayınevi.'},
  {id:'timas',name:'Timaş Yayınları',category:'Yayınevi',initial:'TİMAŞ',logo:'publisher-timas.png',website:'https://www.timas.com.tr/',description:'Yetişkin ve çocuk okurlara uzanan kitap kataloğu sunan yayınevi.'}
];
const authors=[
  {id:'gazalci',name:'Mustafa Gazalcı',category:'Yazar',initial:'MG',publisher:'Bilgi Yayınları',photo:'author-gazalci.jpg',bookTitle:'Bozkırdaki Işıklar',bookCover:'book-gazalci.jpg',description:'Eğitimci ve yazar Mustafa Gazalcı’nın Bozkırdaki Işıklar ve Köy Enstitülerine odaklanan eserleri bu profilde bir arada. Kitap kapaklarını açarak tanıtımlarını inceleyebilirsin.'},
  {id:'buket',name:'Buket Uzuner',category:'Yazar',initial:'BU',publisher:'Everest Yayınları',photo:'author-buket.jpg',bookTitle:'İki Yeşil Susamuru',bookCover:'book-buket.jpg',description:'Buket Uzuner’in roman ve öykülerinden örnekler burada. İki Yeşil Susamuru ile Kumral Ada Mavi Tuna’nın kapaklarına dokunup kitapların tanıtımını okuyabilirsin.'},
  {id:'murat',name:'Murat Menteş',category:'Yazar',initial:'MM',publisher:'Alfa Yayınları',photo:'author-murat.jpg',bookTitle:'Dublörün Dilemması',bookCover:'book-murat.jpg',description:'Murat Menteş’in hareketli anlatımı ve sıra dışı karakterleriyle öne çıkan romanları bu profilde. Dublörün Dilemması, Korkma Ben Varım ve Ruhi Mücerret’i inceleyebilirsin.'},
  {id:'timur',name:'Timur Soykan',category:'Yazar',initial:'TS',publisher:'Kırmızı Kedi Yayınları',photo:'author-timur.jpg',bookTitle:'Badeci Şeyh’in Sır Odası',bookCover:'book-timur.jpg',description:'Gazeteci ve yazar Timur Soykan’ın araştırma kitapları bu profilde bir araya geliyor. Badeci Şeyh’in Sır Odası ve Baron İstilası için kapak ve kısa tanıtım bulunuyor.'},
  {id:'mustafa',name:'Mustafa Balbay',category:'Yazar',initial:'MB',publisher:'Bilgi Yayınevi',photo:'author-mustafa.jpg',bookTitle:'100 Yıla Bakış',bookCover:'book-mustafa.jpg',description:'Gazeteci ve yazar Mustafa Balbay’ın Türkiye’nin yakın tarihine ve Cumhuriyetin yeni yüzyılına bakan kitaplarını bu profilde inceleyebilirsin.'},
  {id:'nehir',name:'Nehir Yarar',category:'Yazar',initial:'NY',publisher:'Can Çocuk',photo:'author-nehir.jpg',bookTitle:'Veda Turtası',bookCover:'book-nehir.jpg',description:'Nehir Yarar’ın çocuk okurlara yönelik kitapları bu profilde. Veda Turtası ve Bir Problem Bin Çözüm’ün kapaklarından kitap detayına geçebilirsin.'},
  {id:'saygi',name:'Saygı Öztürk',category:'Yazar',initial:'SÖ',publisher:'Doğan Kitap',photo:'author-saygi-portrait.jpg',bookTitle:'Menzil',bookCover:'book-saygi.jpg',description:'Araştırmacı gazeteci ve yazar Saygı Öztürk’ün Menzil ve Biz Teğmeniz kitaplarını bu profilde inceleyebilirsin. Kitap sayfalarında kısa tanıtım ve kaynak bağlantısı yer alır.'}
];
const authorBooks={
  gazalci:[
    {title:'Bozkırdaki Işıklar',cover:'book-gazalci.jpg',description:'Köy Enstitülerinin eğitim mirasını, o yıllardan esinlenen öyküler aracılığıyla anlatıyor.',source:'https://www.bilgiyayinevi.com.tr/bozkirdaki-isiklar'},
    {title:'21 Köy Enstitüsü / Çınarlar Anlatıyor',cover:'book-gazalci-cinarlar.jpg',description:'21 Köy Enstitüsünün geçmişine, mezun öğretmenlerin tanıklıkları ve söyleşileriyle bakıyor.',source:'https://www.bilgiyayinevi.com.tr/doc/32'}
  ],
  buket:[
    {title:'İki Yeşil Susamuru',cover:'book-buket.jpg',description:'Çağdaş bir kadının yaşamı çevresinde ilişkileri ve insan hâllerini sorgulayan çok katmanlı bir roman.',source:'https://www.everestyayinlari.com/kitap/iki-yesil-su-susamuru-midi-boy-buket-uzuner/370506'},
    {title:'Kumral Ada Mavi Tuna',cover:'book-buket-kumral.jpg',description:'Çocukluktan taşınan duygularla yetişkinlikteki çatışmaları iç içe geçiren Buket Uzuner romanı.',source:'https://everestyayinlari.com/kumral-ada-mavi-tuna-midi-boy-buket-uzuner-kitabi-182618-9786051851747'}
  ],
  murat:[
    {title:'Dublörün Dilemması',cover:'book-murat.jpg',description:'Nuh Tufan ve çevresindeki sıra dışı karakterleri hızlı, mizahi ve felsefi bir macerada buluşturan roman.',source:'https://www.alfayayinlari.com/kitap.php?id=384040'},
    {title:'Korkma Ben Varım',cover:'book-murat-korkma-portrait.jpg',description:'Aşk ve macerayı alışılmadık karakterlerle bir araya getiren hareketli bir Murat Menteş romanı.',source:'https://www.alfayayinlari.com/kitap.php?id=389458'},
    {title:'Ruhi Mücerret',cover:'book-murat-ruhi.jpg',description:'Yüz yaşındaki İstiklal Harbi gazisi Ruhi Mücerret’in beklenmedik macerasını anlatıyor.',source:'https://www.alfayayinlari.com/kitap.php?id=385625'}
  ],
  timur:[
    {title:'Badeci Şeyh’in Sır Odası',cover:'book-timur.jpg',description:'Gazeteci Timur Soykan’ın tarikat içindeki istismar iddialarını ve güç ilişkilerini araştırdığı kitap.',source:'https://kirmizikediyayinevi.com/yazar/timur-soykan/'},
    {title:'Baron İstilası',cover:'book-timur-baron.jpg',description:'Uluslararası suç örgütlerinin Türkiye’deki izini süren gazetecilik araştırması.',source:'https://kirmizikediyayinevi.com/product/baron-istilasi/'}
  ],
  mustafa:[
    {title:'100 Yıla Bakış',cover:'book-mustafa.jpg',description:'Cumhuriyetin ilk yüzyılındaki toplumsal dönüşümü siyasal, sosyal ve kültürel kırılma noktaları üzerinden ele alıyor.',source:'https://www.bilgiyayinevi.com.tr/100-yila-bakis'},
    {title:'Cumhuriyetin İkinci Yüzyılı',cover:'book-mustafa-cumhuriyet.avif',description:'Mustafa Balbay, Cumhuriyetin yeni yüzyılına ilişkin düşüncelerini ve Türkiye’nin geleceğine dair değerlendirmelerini paylaşıyor.',source:'https://www.bilgiyayinevi.com.tr/cumhuriyetin-ikinci-yuzyili'}
  ],
  nehir:[
    {title:'Veda Turtası',cover:'book-nehir.jpg',description:'Nehir Yarar’ın çocuk okurlar için kaleme aldığı öykü kitabı.',source:'https://www.kitapyurdu.com/kitap/veda-turtasi/663921.html'},
    {title:'Bir Problem Bin Çözüm',cover:'book-nehir-problem.jpg',description:'Bir soruna farklı açılardan bakmayı ve birlikte çözüm üretmeyi çocuklara anlatıyor.',source:'https://www.canyayinlari.com/kitap-cocuk'}
  ],
  saygi:[
    {title:'Menzil',cover:'book-saygi.jpg',description:'Saygı Öztürk’ün Menzil topluluğuna ilişkin tanıklık, ziyaret ve araştırmalarına dayanan gazetecilik kitabı.',source:'https://www.dogankitap.com.tr/kitap/menzil'},
    {title:'Biz Teğmeniz',cover:'book-saygi-tegmeniz.png',description:'Ordudan çıkarılan teğmenlerin tanıklıklarını ve haklarındaki karar süreçlerini araştırıyor.',source:'https://www.dogankitap.com.tr/kitap/biz-tegmeniz'}
  ]
};
const childBrands=[
  {id:'toyzz',name:'Toyzz Shop',category:'Marka',initial:'TOYZZ',logo:'brand-toyzz.png',website:'https://www.toyzzshop.com/',description:'Oyuncak ve oyun dünyasında ailelere hitap eden Toyzz Shop için hazırlanmış örnek profil.',demoOffer:'Şenlik ziyaretçilerine özel fırsat alanı',demoCode:'SENLIK10'},
  {id:'aptamil',name:'Aptamil',category:'Marka',initial:'APTAMIL',logo:'brand-aptamil.jpg',website:'https://www.aptamil.com.tr/',description:'Ailelere yönelik bilgi ve etkinlik alanı için hazırlanmış örnek marka profili.',demoOffer:'Ebeveyn bilgi ve danışma noktası örneği'}
];
const childPlaces=[
  {id:'masal',name:'Masal Sahnesi',category:'Etkinlik',stand:'A12',initial:'MASAL',description:'Ailece dinlenebilecek hikâye buluşmaları.'},
  {id:'renk',name:'Renk Atölyesi',category:'Atölye',stand:'A14',initial:'RENK',description:'Çocuklar için çizim ve üretim alanı.'},
  {id:'oyun',name:'Oyun Alanı',category:'Etkinlik',stand:'B05',initial:'OYUN',description:'Hareketli ve yaratıcı oyunlar.'},
  {id:'kitap',name:'Kitap Köşesi',category:'Etkinlik',stand:'B08',initial:'KİTAP',description:'Resimli kitaplarla keşif alanı.'}
];
const eventSets={
  ankara:[
    {id:'a0',day:1,date:'4 Aralık 2026',time:'10.00',title:'Mustafa Gazalcı',kind:'İmza',publisher:'Bilgi Yayınları',place:'Bilgi Yayınları standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a1',day:1,date:'4 Aralık 2026',time:'10.30',title:'Kıymet Ergöçen',kind:'İmza',publisher:'Doğan Kitap',place:'Doğan Kitap standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a2',day:1,date:'4 Aralık 2026',time:'11.00',title:'Esra Yazdıç Demir',kind:'İmza',publisher:'Altın Kitaplar',place:'Altın Kitaplar standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a3',day:1,date:'4 Aralık 2026',time:'14.00',title:'Özlem Küçükfırat',kind:'İmza',publisher:'Ötüken Neşriyat',place:'Ötüken Neşriyat standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a4',day:2,date:'5 Aralık 2026',time:'10.30',title:'Nehir Yarar',kind:'İmza',publisher:'Can Çocuk',place:'Can Çocuk standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a5',day:2,date:'5 Aralık 2026',time:'13.00',title:'Mustafa Balbay',kind:'İmza',publisher:'Bilgi Yayınları',place:'Bilgi Yayınları standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a6',day:2,date:'5 Aralık 2026',time:'14.00',title:'Murat Menteş',kind:'İmza',publisher:'Alfa Yayınları',place:'Alfa Yayınları standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a7',day:2,date:'5 Aralık 2026',time:'15.00',title:'Buket Uzuner',kind:'İmza',publisher:'Everest Yayınları',place:'Everest Yayınları standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a8',day:2,date:'5 Aralık 2026',time:'15.00',title:'Timur Soykan',kind:'İmza',publisher:'Kırmızı Kedi Yayınları',place:'Kırmızı Kedi Yayınları standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a9',day:3,date:'6 Aralık 2026',time:'12.00',title:'Saygı Öztürk',kind:'İmza',publisher:'Doğan Kitap',place:'Doğan Kitap standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a12',day:3,date:'6 Aralık 2026',time:'13.00',title:'Mustafa Balbay',kind:'İmza',publisher:'Cumhuriyet Yayınları',place:'Cumhuriyet Yayınları standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a10',day:3,date:'6 Aralık 2026',time:'16.00',title:'Menekşe Tokyay',kind:'İmza',publisher:'İletişim Yayınları',place:'İletişim Yayınları standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'},
    {id:'a11',day:3,date:'6 Aralık 2026',time:'18.00',title:'Talha Uğurluel',kind:'İmza',publisher:'Timaş Yayınları',place:'Timaş Yayınları standı',description:'2026 fuarı için örnek imza kaydıdır; katılım ve saat henüz teyit edilmedi.'}
  ],
  children:[
    {id:'c1',day:1,time:'11.00',title:'Masal kapısı açılıyor',kind:'Sahne',age:'4–7 yaş',place:'Masal Sahnesi',speaker:'Anlatıcı buluşması',description:'Kahramanları çocukların seçtiği etkileşimli masal zamanı.'},
    {id:'c2',day:1,time:'12.15',title:'Kendi kahramanını çiz',kind:'Atölye',age:'7–10 yaş',place:'Renk Atölyesi',speaker:'Çizim atölyesi',description:'Çocuklar kendi hikâye kahramanlarını tasarlar.'},
    {id:'c3',day:1,time:'14.00',title:'Aile oyun saati',kind:'Oyun',age:'Tüm yaşlar',place:'Oyun Alanı',speaker:'Oyun ekibi',description:'Ailece birlikte oynanabilecek hareketli oyunlar.'},
    {id:'c4',day:2,time:'11.30',title:'Resimli kitaplar köşesi',kind:'Atölye',age:'4–7 yaş',place:'Kitap Köşesi',speaker:'Okuma buluşması',description:'Resimli kitaplarla etkileşimli keşif.'},
    {id:'c5',day:3,time:'13.30',title:'Renkli final',kind:'Sahne',age:'Tüm yaşlar',place:'Masal Sahnesi',speaker:'Şenlik ekibi',description:'Günün yaratıcı çalışmalarını paylaşma zamanı.'}
  ]
};
const bookTalks=[
  {id:'b1',day:1,date:'4 Aralık 2026',time:'14.00',title:'2026’da okur olmak',kind:'Söyleşi',speaker:'Konuşmacılar açıklanacak',host:'Düzenleyen açıklanacak',place:'Söyleşi alanı',description:'Dijital çağda kitapla kurduğumuz ilişki ve değişen okuma alışkanlıkları üzerine bir buluşma.',demo:true},
  {id:'b4',day:1,date:'4 Aralık 2026',time:'16.00',title:'Bir roman nasıl doğar?',kind:'Söyleşi',speaker:'Konuşmacılar açıklanacak',host:'Düzenleyen açıklanacak',place:'Söyleşi alanı',description:'Bir fikrin romana dönüşmesinde yazarlık, editörlük ve okur beklentisinin yeri konuşuluyor.',demo:true},
  {id:'b2',day:2,date:'5 Aralık 2026',time:'15.00',title:'Çocuklarla kitapların dünyası',kind:'Söyleşi',speaker:'Konuşmacılar açıklanacak',host:'Düzenleyen açıklanacak',place:'Söyleşi alanı',description:'Çocukların kitaplarla bağ kurmasına yardımcı olan hikâyeler ve birlikte okuma deneyimi.',demo:true},
  {id:'b5',day:2,date:'5 Aralık 2026',time:'17.00',title:'Ankara’nın edebiyat hafızası',kind:'Söyleşi',speaker:'Konuşmacılar açıklanacak',host:'Düzenleyen açıklanacak',place:'Söyleşi alanı',description:'Ankara sokaklarının, yazarlarının ve yayınevlerinin edebiyattaki izleri üzerine bir sohbet.',demo:true},
  {id:'b3',day:3,date:'6 Aralık 2026',time:'16.00',title:'Yayıncılığın yarını',kind:'Söyleşi',speaker:'Konuşmacılar açıklanacak',host:'Düzenleyen açıklanacak',place:'Söyleşi alanı',description:'Yeni yazarların, editörlerin ve yayınevlerinin geleceğe dönük fikirleri tartışılıyor.',demo:true},
  {id:'b6',day:3,date:'6 Aralık 2026',time:'18.00',title:'Çizgi romanın yeni okurları',kind:'Söyleşi',speaker:'Konuşmacılar açıklanacak',host:'Düzenleyen açıklanacak',place:'Söyleşi alanı',description:'Görsel anlatıların ve çizgi romanın genç okurlara açtığı yeni kapılar konuşuluyor.',demo:true}
];
const zones={A12:{name:'A12',type:'Katılımcı alanı'},A14:{name:'A14',type:'Katılımcı alanı'},B05:{name:'B05',type:'Katılımcı alanı'},B08:{name:'B08',type:'Katılımcı alanı'},C03:{name:'C03',type:'Katılımcı alanı'},C06:{name:'C06',type:'Katılımcı alanı'},SAHNE:{name:'Ana Sahne',type:'Etkinlik alanı'},GIRIS:{name:'Giriş / Danışma',type:'Karşılama noktası'}};
const state={page:'home',book:null,bookReturn:null,fair:'ankara',phase:'during',day:1,kind:'Tümü',programQuery:'',publisherQuery:'',homeQuery:'',query:'',category:'Tümü',selectedZone:'A12',detail:null,previous:'discover',saved:new Set(readSaved()),stamps:new Set(readStamps()),quizAnswer:null,prefs:{event:true,change:true,general:false},noticeFilter:'Tümü',demoNotice:null,adminAudience:'Tüm ziyaretçiler',qrMode:'stand',feedback:false};
const $=selector=>document.querySelector(selector);
const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function readSaved(){try{const saved=localStorage.getItem('eylul-rehber-saved-2026');return saved===null?['a0','a2','b1']:JSON.parse(saved)}catch{return ['a0','a2','b1']}}
function readStamps(){try{return JSON.parse(localStorage.getItem('eylul-rehber-stamps')||'[]')}catch{return []}}
function stampCount(){return events().filter(e=>state.stamps.has(e.id)).length}
function list(){return state.fair==='ankara'?[...authors,...publishers]:[...childBrands,...childPlaces]}
function events(){return state.fair==='ankara'?[...eventSets.ankara,...bookTalks]:eventSets.children}
let animateNextRender=false;
let routeTransition='page';
let tourNavigationFromScroll=false;
function go(page){
  const from=state.page;
  const subpages=['event','participant','book','signings','talks','publishersPage'];
  const detail=subpages.includes(page);
  const leavingDetail=subpages.includes(from);
  routeTransition=from==='book'&&page===state.bookReturn?.page?'route-back':detail&&from!==page?'route-forward':leavingDetail&&!detail?'route-back':'page';
  animateNextRender=from!==page;
  state.page=page;
  state.query='';
  const step=tourOrder.indexOf(page);
  if(step>=0)currentTourIndex=step;
  render();
  $('#phone').scrollTop=0;
  $('#scroll-area').scrollTop=0;
  if(window.innerWidth>850&&step>=0&&!tourNavigationFromScroll){
    tourScrollIntentUntil=0;
    window.scrollTo({top:step*window.innerHeight,behavior:'instant'});
  }
}
function pickFair(fair){routeTransition='page';animateNextRender=true;homeHeroIndex=0;state.fair=fair;tourOrder=fair==='children'?childTourOrder:bookTourOrder;$('.presentation').style.setProperty('--tour-steps',tourOrder.length);state.page='home';state.phase='during';state.day=1;state.kind='Tümü';state.programQuery='';state.publisherQuery='';state.homeQuery='';state.category='Tümü';state.query='';state.selectedZone='A12';currentTourIndex=1;closeSheet();render();$('#phone').scrollTop=0;$('#scroll-area').scrollTop=0;if(window.innerWidth>850)window.scrollTo({top:window.innerHeight,behavior:'instant'})}
function toast(message){const box=$('#toast');box.textContent=message;box.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>box.classList.remove('show'),2600)}
function hideDemoNotification(){
  clearTimeout(window.pushTimer);
  clearTimeout(window.pushHideTimer);
  clearTimeout(window.pushEntranceTimer);
  const banner=$('#push-notification');
  banner.classList.remove('show');
  $('#phone').classList.remove('is-notifying');
  window.pushHideTimer=setTimeout(()=>{if(!banner.classList.contains('show'))banner.hidden=true},240);
}
let demoNoticeCursor=0;
function showDemoNotification(message){
  const samples=state.fair==='ankara'?
    [{title:'Kitap fuarı yaklaşıyor',body:'4–13 Aralık 2026 için fuar rehberin hazır. Programı ve yayınevlerini keşfet.',audience:'Tüm ziyaretçiler'},
     {title:'Örnek: İmza hatırlatması',body:'Planına eklediğin yazar buluşması yaklaşıyor. Saatini ve yerini kontrol et.',audience:'Planına ekleyenler'},
     {title:'Örnek: Söyleşi saati değişti',body:'İlgilendiğin söyleşinin güncel saatini Program ekranında görebilirsin.',audience:'Planına ekleyenler'},
     {title:'Örnek: Salon bilgisi güncellendi',body:'Bir etkinliğin yeri değişti. Yeni salonu etkinlik detayından incele.',audience:'Tüm ziyaretçiler'},
     {title:'Örnek: Bugünün programı',body:'İmza ve söyleşileri güne göre süz; ilgilendiklerini Planım’a ekle.',audience:'Tüm ziyaretçiler'},
     {title:'Örnek: Yayınevini bul',body:'Aradığın yayınevinin profiline ve resmî sitesine Katılımcılar’dan ulaş.',audience:'Tüm ziyaretçiler'},
     {title:'Örnek: Fuar alanı duyurusu',body:'Giriş ve alan bilgilerini Fuar bilgileri sayfasından kontrol et.',audience:'Tüm ziyaretçiler'},
     {title:'Örnek: Planındaki buluşma',body:'Kaydettiğin etkinliğin ayrıntıları tek dokunuşla Planım’da.',audience:'Planına ekleyenler'}]:
    [{title:'Çocuk Şenliği yaklaşıyor',body:'Ailece keşfedeceğiniz etkinlikleri ve alanları rehberden inceleyin.',audience:'Tüm ziyaretçiler'},
     {title:'Örnek: Atölye hatırlatması',body:'Planınıza eklediğiniz atölyenin yaş ve saat bilgisine göz atın.',audience:'Planına ekleyenler'},
     {title:'Örnek: Atölye saati güncellendi',body:'Seçtiğiniz etkinliğin yeni saatini Program ekranında görebilirsiniz.',audience:'Planına ekleyenler'},
     {title:'Örnek: Sahne programı',body:'Bugünün sahne etkinliklerini ve atölyelerini tek listede keşfedin.',audience:'Tüm ziyaretçiler'},
     {title:'Örnek: Alan bilgisi',body:'Katılacağınız etkinliğin yerini şenlik krokisinden kontrol edin.',audience:'Tüm ziyaretçiler'}];
  const notice=message||samples[demoNoticeCursor++%samples.length];
  state.demoNotice=notice;
  state.noticeFilter='Tümü';
  if(state.page==='notifications')render();
  const banner=$('#push-notification');
  const wasVisible=!banner.hidden;
  clearTimeout(window.pushTimer);
  clearTimeout(window.pushHideTimer);
  clearTimeout(window.pushEntranceTimer);
  banner.classList.remove('show');
  $('#phone').classList.remove('is-notifying');
  const open=()=>{
    $('#push-title').textContent=notice.title;
    $('#push-body').textContent=notice.body;
    banner.hidden=false;
    void banner.offsetWidth;
    banner.classList.add('show');
    $('#phone').classList.add('is-notifying');
    window.pushTimer=setTimeout(hideDemoNotification,8000);
  };
  if(wasVisible)window.pushEntranceTimer=setTimeout(open,320);
  else open();
}
function nav(){const activePage=state.page==='signings'||state.page==='talks'?'program':state.page==='publishersPage'?'discover':state.page==='event'?(state.previous==='signings'||state.previous==='talks'?'program':state.previous):state.page==='participant'?(state.previous==='publishersPage'?'discover':state.previous):state.page==='passport'?'home':state.page;document.querySelectorAll('.bottom-nav button').forEach(button=>button.classList.toggle('active',button.dataset.page===activePage))}
function updateHeader(){
  const titles={program:'Program',map:'Harita',discover:'Katılımcılar',plan:'Planım',notifications:'Bildirimler',about:'Fuar bilgileri',admin:'Duyuru önizlemesi',passport:'Fuar pasaportu'};
  const title=titles[state.page];
  $('#app-logo').classList.toggle('hidden',Boolean(title));
  $('#app-header-title').classList.toggle('hidden',!title);
  if(title)$('#app-page-title').textContent=title;
}
function render(){
  const photoDetail=state.fair==='ankara'&&((state.page==='event'&&(authors.some(a=>a.name===events().find(e=>e.id===state.detail)?.title)||bookTalks.some(e=>e.id===state.detail)))||(state.page==='participant'&&(authors.some(a=>a.id===state.detail)||publishers.some(p=>p.id===state.detail)))||state.page==='book');
  const phone=$('#phone');
  phone.classList.toggle('detail-open',state.page==='event'||state.page==='participant'||state.page==='book');
  phone.classList.toggle('subpage-open',['signings','talks','publishersPage'].includes(state.page));
  phone.classList.toggle('photo-detail',photoDetail);
  const pages={welcome,home,program,signings,talks,map,discover,publishersPage,plan,notifications,admin,passport,event:eventDetail,participant:participantDetail,book:bookDetail,about};
  phone.querySelector(':scope > .detail-back')?.remove();
  $('#screen').innerHTML=pages[state.page]();
  const back=$('#screen .detail-back');
  if(back)phone.append(back);
  if(animateNextRender){$('#screen>.screen')?.classList.add('route-enter',routeTransition);animateNextRender=false}
  nav();updateHeader();updatePresentation();
}
function photoClass(){return state.fair==='children'?' children':''}
function chooseButton(){return `<button class="selector" data-action="switch-fair"><span><small>SEÇİLİ FUAR</small><strong>${fairs[state.fair].name}</strong></span><span class="chev">⌄</span></button>`}
function sectionTitle(title,page,label='Tümünü gör →'){return `<div class="section-title"><h2>${title}</h2>${page?`<button class="link-button" data-page="${page}">${label}</button>`:''}</div>`}
function welcome(){return `<div class="screen tight welcome-screen"><div class="kicker">EYLÜL FUAR REHBERİ</div><h1 class="page-title">Fuarını seç.</h1><div class="welcome-photo"><div class="archive-badge">2026 fuarı · konsept</div><div class="welcome-content"><div class="kicker" style="color:#ffb94b">TEK REHBER, TÜM FUARLAR</div><h1>Fuardaki her şey<br>cebinde.</h1></div></div><button class="event-choice" data-pick-fair="ankara"><span class="thumb"></span><span><strong>24. Ankara Kitap Fuarı</strong><small>4–13 Aralık 2026 · Planlanan tarih</small></span><span class="arrow">→</span></button><button class="event-choice" data-pick-fair="children"><span class="thumb children"></span><span><strong>Çocuk Şenliği</strong><small>Aile ve çocuk · Konsept görünümü</small></span><span class="arrow">→</span></button><button class="link-button" data-page="about" style="margin:5px 0 0">Eylül Fuarcılık hakkında →</button></div>`}
function normalizeSearch(value){return String(value||'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').trim()}
function globalSearchResults(){
  const query=normalizeSearch(state.homeQuery);
  const book=state.fair==='ankara';
  const matchingEvents=events().filter(e=>normalizeSearch([e.title,e.kind,e.publisher,e.host,e.speaker,e.place,e.date,e.age,e.description].join(' ')).includes(query));
  const matchingPeople=list().filter(p=>normalizeSearch([p.name,p.category,p.publisher,p.bookTitle,p.stand,p.description].join(' ')).includes(query));
  const total=matchingEvents.length+matchingPeople.length;
  if(!total)return '<div class="global-empty"><strong>Sonuç bulunamadı</strong><span>Başka bir yazar, yayınevi, etkinlik veya stant adı dene.</span></div>';
  const eventResults=matchingEvents.map(e=>`<button class="global-result" data-event="${escapeHTML(e.id)}"><span class="global-result-icon">${e.kind==='İmza'?'✎':'◉'}</span><span class="global-result-copy"><small>${book?(e.demo?'ÖRNEK SÖYLEŞİ':'2026 · ÖRNEK İMZA'):'ÖRNEK ETKİNLİK'} · ${escapeHTML(e.kind)}</small><strong>${escapeHTML(e.title)}</strong><em>${escapeHTML([e.time,e.place].filter(Boolean).join(' · '))}</em></span><span class="global-result-arrow">→</span></button>`).join('');
  const peopleResults=matchingPeople.map(p=>`<button class="global-result" data-participant="${escapeHTML(p.id)}"><span class="global-result-icon ${p.logo?'logo':''}">${p.photo?`<img src="assets/${p.photo}" alt="">`:p.logo?`<img src="assets/${p.logo}" alt="">`:p.stand?'⌖':escapeHTML(p.initial.slice(0,2))}</span><span class="global-result-copy"><small>${escapeHTML(p.category.toLocaleUpperCase('tr'))}${p.stand?` · TEMSİLİ ALAN ${escapeHTML(p.stand)}`:''}</small><strong>${escapeHTML(p.name)}</strong><em>${escapeHTML(p.publisher||p.bookTitle||(book?'2026 örnek programı':p.description))}</em></span><span class="global-result-arrow">→</span></button>`).join('');
  return `<div class="global-results"><p class="global-results-count">${total} sonuç · ${book?'2026 fuarı için örnek içerikler':'Konsept içerikler'}</p>${matchingEvents.length?`<div class="global-results-heading">Etkinlikler <span>${matchingEvents.length}</span></div>${eventResults}`:''}${matchingPeople.length?`<div class="global-results-heading">${book?'Yazarlar ve yayınevleri':'Markalar ve alanlar'} <span>${matchingPeople.length}</span></div>${peopleResults}`:''}</div>`;
}
let homeHeroIndex=0;
let lastHeroInteraction=0;
const bookHeroSlides=[
  {image:'ankara-fuar-arsiv.jpg',position:'center 57%',label:'24. ANKARA KİTAP FUARI',title:'Fuarın ritmi<br>cebinde.',subtitle:'4–13 Aralık 2026 · Yazarlar, imzalar ve yayınevleri tek yerde.',button:'Programı keşfet',action:'open-program'},
  {image:'author-buket.jpg',position:'center 39%',label:'2026 · ÖRNEK İMZA',title:'Bir imzadan<br>fazlası.',subtitle:'Sevdiğin yazarın buluşmasını bul, planına ekle.',button:'İmzalara bak',action:'open-signings'},
  {image:'eylul-galeri-2.jpg',position:'center 50%',label:'YAYINEVLERİ',title:'Yeni hikâyeler<br>burada.',subtitle:'Yayınevlerini ve yazarlarını yakından tanı.',button:'Yayınevlerini gör',page:'publishersPage'},
  {image:'ankara-fuar-banner.jpg',position:'center 50%',label:'KİTAP FUARI',title:'Yeni fikirlerle<br>buluş.',subtitle:'Söyleşi konularını keşfet, ilgini çekenleri kaydet.',button:'Söyleşilere bak',action:'open-talks'},
  {image:'author-murat.jpg',position:'center 30%',label:'YAZARLAR VE KİTAPLAR',title:'Yazarları<br>yakından tanı.',subtitle:'Fotoğrafları, kitapları ve imza bilgileri bir arada.',button:'Yazarları keşfet',action:'open-authors'}
];
function homeHeroCarousel(){
  const slide=bookHeroSlides[homeHeroIndex];
  return `<div class="home-hero-carousel" id="home-hero" aria-label="Kitap fuarı vitrini"><div class="home-hero-card" style="--hero-image:url('assets/${slide.image}');--hero-position:${slide.position}"><div class="home-hero-content"><span class="home-hero-label">${slide.label}</span><h2>${slide.title}</h2><p>${slide.subtitle}</p><button class="home-hero-cta" ${slide.page?`data-page="${slide.page}"`:`data-action="${slide.action}"`}>${slide.button}<span aria-hidden="true">↗</span></button></div></div><div class="home-hero-controls"><span class="home-hero-counter">0${homeHeroIndex+1} <i>/</i> 0${bookHeroSlides.length}</span><div class="home-hero-dots" role="group" aria-label="Banner seç">${bookHeroSlides.map((item,index)=>`<button type="button" data-hero-index="${index}" class="${index===homeHeroIndex?'active':''}" aria-label="${index+1}. banner: ${item.label}" aria-pressed="${index===homeHeroIndex}"></button>`).join('')}</div></div></div>`;
}
function setHomeHero(index,manual=true){
  homeHeroIndex=(index+bookHeroSlides.length)%bookHeroSlides.length;
  if(manual)lastHeroInteraction=Date.now();
  const current=$('#home-hero');
  if(current)current.outerHTML=homeHeroCarousel();
}
function homeContent(){
  const book=state.fair==='ankara';
  if(state.homeQuery.trim())return globalSearchResults();
  return `${book?homeHeroCarousel():hero('Şenlik rehberi<br>cebinde.','Program, markalar ve alanlar tek yerde.','Programı aç','open-program')}<div class="home-shortcuts">${book?'<button class="home-shortcut" data-action="open-signings"><span>✎</span><strong>İmzalar</strong></button><button class="home-shortcut" data-action="open-talks"><span>◉</span><strong>Söyleşiler</strong></button><button class="home-shortcut" data-page="publishersPage"><span>▤</span><strong>Yayınevleri</strong></button>':'<button class="home-shortcut" data-page="discover"><span>⌕</span><strong>Markalar</strong></button><button class="home-shortcut" data-page="map"><span>⌖</span><strong>Harita</strong></button><button class="home-shortcut" data-page="plan"><span>♡</span><strong>Planım</strong></button>'}</div>${sectionTitle(book?'Öne çıkan imza':'Örnek etkinlik',book?'signings':'program')}${eventCard(events()[0])}${sectionTitle(book?'Yayınevleri':'Örnek markalar',book?'publishersPage':'discover')}${brandStrip()}${book?organizerCard():''}`;
}
function home(){return `<div class="screen tight home-screen"><div class="fair-context"><span>ANKARA KİTAP FUARI</span><strong>24. Ankara Kitap Fuarı</strong></div><div class="home-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input id="home-search" type="search" value="${escapeHTML(state.homeQuery)}" placeholder="Yazar, etkinlik, yayınevi veya stant ara" aria-label="Fuarda ara" autocomplete="off"><button id="home-search-clear" type="button" data-action="clear-home-search" aria-label="Aramayı temizle" ${state.homeQuery.trim()?'':'hidden'}>×</button></div><div id="home-content">${homeContent()}</div></div>`}
function hero(title,subtitle,button,action){return `<div class="hero-photo${photoClass()}">${state.fair==='ankara'?'<div class="archive-badge">2026 konsept görseli</div>':''}<div class="hero-content"><div class="hero-label">${fairs[state.fair].name.toLocaleUpperCase('tr')}</div><h2>${title}</h2><p>${subtitle}</p><div class="hero-actions"><button data-action="${action}">${button} →</button></div></div></div>`}
function beforeHome(fair){return `${hero('Fuar gününü<br>kendine göre planla.','İlgi alanlarını seç, programını oluştur ve giriş bilgilerini cebinde tut.','Programı incele','open-program')}${sectionTitle('Gelmeden önce')}<div class="quick-grid"><button class="quick-tile" data-action="ticket"><span class="tile-icon">▣</span><strong>Bilet & giriş</strong><small>Giriş bilgilerini gör</small></button><button class="quick-tile" data-action="venue"><span class="tile-icon">⌖</span><strong>Ulaşım</strong><small>${escapeHTML(fair.venue)}</small></button><button class="quick-tile" data-page="program"><span class="tile-icon">▤</span><strong>Program</strong><small>Etkinlikleri kaydet</small></button><button class="quick-tile" data-page="notifications"><span class="tile-icon">◉</span><strong>Hatırlatmalar</strong><small>Bildirim tercihleri</small></button></div>${sectionTitle('Yayınevlerini keşfet','discover')}${brandStrip()}${organizerCard()}`}
function duringHome(fair){return `${hero('Bugün fuarda<br>neler var?','Saatlik programı takip et, katılımcıları bul ve stantlara kolayca ulaş.','Şimdi keşfet','open-program')}<div class="quick-grid"><button class="quick-tile" data-page="program"><span class="tile-icon">▤</span><strong>Etkinlik programı</strong><small>Güne göre filtrele</small></button><button class="quick-tile" data-page="discover"><span class="tile-icon">⌕</span><strong>Katılımcı bul</strong><small>Yayınevi ve stant ara</small></button><button class="quick-tile" data-page="map"><span class="tile-icon">⌖</span><strong>Salon krokisi</strong><small>Alanları keşfet</small></button><button class="quick-tile" data-action="qr"><span class="tile-icon">▦</span><strong>QR ile keşfet</strong><small>Standı okut</small></button></div>${sectionTitle('Sıradaki etkinlikler','program')}${events().filter(e=>e.day===1).slice(0,3).map(eventCard).join('')}${sectionTitle('Katılımcılar','discover')}${brandStrip()}${sectionTitle('Fuar içi hizmetler')}${serviceRow()}${organizerCard()}`}
function afterHome(){const count=events().filter(event=>state.saved.has(event.id)).length;return `${hero('Günün izleri<br>seninle kalsın.','Kaydettiğin buluşmaları gör, deneyimini paylaş ve diğer fuarları keşfet.','Planımı gör','open-plan')}<div class="plan-summary"><span>Bugünkü planın<br><strong>${count}</strong> <span>kayıtlı etkinlik</span></span><span style="font-size:27px;color:#f7a021">↗</span></div><div class="quick-grid"><button class="quick-tile" data-page="plan"><span class="tile-icon">♡</span><strong>Planıma dön</strong><small>Kaydettiklerin</small></button><button class="quick-tile" data-action="feedback"><span class="tile-icon">✦</span><strong>Görüşünü paylaş</strong><small>Demo geri bildirim</small></button><button class="quick-tile" data-page="welcome"><span class="tile-icon">◫</span><strong>Diğer fuarlar</strong><small>Yeni deneyimler</small></button><button class="quick-tile" data-page="about"><span class="tile-icon">ⓘ</span><strong>Organizatör</strong><small>Eylül Fuarcılık</small></button></div>${organizerCard()}`}
function brandStrip(){const items=state.fair==='ankara'?publishers:childBrands;return `<div class="brand-strip">${items.map(p=>`<button class="brand-card" data-participant="${p.id}"><span class="brand-logo-wrap"><img class="brand-logo" src="assets/${p.logo}" alt="${escapeHTML(p.name)} logosu"></span><small>${escapeHTML(p.name)}<br><b>Profili gör →</b></small></button>`).join('')}</div>`}
function organizerCard(){return `<div class="organizer-card"><div class="organizer-card-top"><img src="assets/eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"><span>1999’DAN BERİ</span></div><p>Kitap ve eğitim fuarları düzenleyen Eylül Fuarcılık’ın Ankara’daki fuar bilgileri, iletişimi ve resmî bağlantıları.</p><button data-page="about">Fuar bilgilerini gör →</button></div>`}
function serviceRow(){return `<div class="service-strip"><div class="service-row" id="service-row"><button data-service="Danışma"><span>ⓘ</span>Danışma</button><button data-service="WC"><span>♧</span>WC</button><button data-service="Dinlenme"><span>☕</span>Dinlenme</button><button data-service="İlk yardım"><span>✚</span>İlk yardım</button><button data-service="Çıkış"><span>➜</span>Çıkış</button></div><button class="service-next" type="button" data-action="scroll-services" aria-label="Diğer hizmetleri göster">→</button></div><p class="muted-note">Hizmet konumları resmî fuar planıyla doğrulanınca haritaya eklenir.</p>`}
function eventCard(event){const book=state.fair==='ankara';const talk=book&&event.kind==='Söyleşi';return `<div class="event-card ${talk?'talk-card':''}"><div class="event-time">${event.time}</div><div class="event-copy" data-event="${event.id}" role="button" tabindex="0"><small>${talk?`${event.date} · ÖRNEK SÖYLEŞİ`:book?`${event.date} · ÖRNEK İMZA`:`${event.kind} · ${event.age}`}</small><strong>${escapeHTML(event.title)}</strong><span>${talk?escapeHTML(event.place):book?escapeHTML(event.publisher):escapeHTML(event.place)} · Detayı gör →</span></div><button class="save-btn ${state.saved.has(event.id)?'saved':''}" data-save="${event.id}" aria-label="${state.saved.has(event.id)?'Planımdan çıkar':'Planıma ekle'}">${state.saved.has(event.id)?'♥':'♡'}</button></div>`}
function programItems(){
  const book=state.fair==='ankara';
  const pool=book?(state.kind==='Söyleşi'?bookTalks:eventSets.ankara):eventSets.children;
  const query=state.programQuery.trim().toLocaleLowerCase('tr');
  return pool.filter(e=>e.day===state.day&&(book||state.kind==='Tümü'||e.kind===state.kind)).filter(e=>!book||!query||[e.title,e.publisher,e.host,e.speaker,e.place,e.description].join(' ').toLocaleLowerCase('tr').includes(query));
}
function programResults(){const visible=programItems();return visible.length?visible.map(eventCard).join(''):'<div class="empty">Bu gün için eşleşen etkinlik bulunamadı.</div>'}
function program(){
  if(state.fair==='ankara')return `<div class="screen program-hub"><div class="kicker">2026 FUAR PROGRAMI</div><h1 class="page-title">Program</h1><p class="page-sub">Ne görmek istersin?</p><button class="program-entry" data-action="open-signings"><span class="program-entry-icon">✎</span><span><strong>İmzalar</strong><small>2026 örnek imza programı</small></span><b>→</b></button><button class="program-entry" data-action="open-talks"><span class="program-entry-icon">◉</span><span><strong>Söyleşiler</strong><small>Örnek etkinlik akışı</small></span><b>→</b></button><button class="program-entry" data-page="plan"><span class="program-entry-icon">♡</span><span><strong>Planım</strong><small>Kaydettiğin etkinlikler</small></span><b>→</b></button><p class="context-note">2026 programı açıklandığında bu ekran güncel içerikle doldurulur.</p></div>`;
  const kinds=['Tümü',...new Set(eventSets.children.map(e=>e.kind))];
  return `<div class="screen program-screen"><div class="kicker">ÇOCUK ŞENLİĞİ</div><h1 class="page-title">Etkinlik programı</h1><p class="page-sub">Gününü seç, ilgilendiğin etkinlikleri planına ekle.</p><div class="archive-callout"><strong>Örnek Çocuk Şenliği programı</strong><span>Tarih, katılımcı ve etkinlikler Eylül tarafından doğrulanınca güncellenir.</span></div><div class="chip-row">${[1,2,3].map(d=>`<button class="chip ${state.day===d?'active':''}" data-day="${d}">${d}. gün</button>`).join('')}</div><div class="chip-row" style="margin-top:-4px">${kinds.map(k=>`<button class="chip ${state.kind===k?'active':''}" data-kind="${k}">${k}</button>`).join('')}</div><div id="event-results">${programResults()}</div><button class="ghost full" data-page="plan" style="margin-top:12px">Kaydettiklerimi gör →</button></div>`;
}
function bookProgramPage(talk){
  const title=talk?'Söyleşiler':'İmzalar';
  const note=talk?'Bu 2026 söyleşi akışı tasarım örneğidir; konu ve saatler henüz teyit edilmedi.':'Bu 2026 imza akışı tasarım örneğidir; yazar katılımı ve saatler henüz teyit edilmedi.';
  return `<div class="screen program-screen book-list-screen"><button class="subpage-back" data-page="program" aria-label="Programa dön"><span aria-hidden="true">←</span> Program</button><div class="kicker">${talk?'KİTAP FUARI · ÖRNEK':'2026 · ÖRNEK PROGRAM'}</div><h1 class="page-title">${title}</h1><p class="page-sub">${talk?'Konuları incele, ilgini çeken söyleşiyi planına ekle.':'Yazarı bul, saatini ve yayınevini gör.'}</p><input id="program-search" class="search" type="search" value="${escapeHTML(state.programQuery)}" placeholder="${talk?'Konu veya konuşmacı ara':'Yazar veya yayınevi ara'}" aria-label="${title} içinde ara"><div class="chip-row">${[1,2,3].map(d=>`<button class="chip ${state.day===d?'active':''}" data-day="${d}">${["4 Ara","5 Ara","6 Ara"][d-1]}</button>`).join('')}</div><div id="event-results">${programResults()}</div><p class="book-list-note">${note}</p></div>`;
}
function signings(){state.kind='İmza';return bookProgramPage(false)}
function talks(){state.kind='Söyleşi';return bookProgramPage(true)}
function map(){if(state.fair==='ankara')return `<div class="screen book-map-screen"><div class="kicker">FUAR ALANI</div><h1 class="page-title">Fuar haritası</h1><p class="page-sub">Aradığın bölüme tek dokunuşla ulaş.</p><div class="book-map-status"><span>ÖRNEK YERLEŞİM</span><p>Kesin stant ve salon planı açıklanınca bu harita güncellenecek.</p></div><div class="book-map-visual" aria-label="2026 fuarı için örnek alan haritası"><div class="book-map-entrance">GİRİŞ <span>↓</span></div><div class="book-map-walkway"><span>ANA KORİDOR</span></div><div class="book-map-areas"><button type="button" data-page="discover"><small>A BLOK</small><strong>Yayınevleri</strong><span>Yazar ve yayınevi ara ↗</span></button><button type="button" data-action="open-signings"><small>B BLOK</small><strong>İmza alanı</strong><span>İmza saatlerini gör ↗</span></button><button type="button" data-action="open-talks"><small>C BLOK</small><strong>Söyleşiler</strong><span>Konuları incele ↗</span></button><button type="button" data-action="ticket"><small>BİLGİ</small><strong>Danışma</strong><span>Giriş bilgileri ↗</span></button></div></div><div class="map-panel"><strong>Yayınevinden standa</strong><p>Güncel kroki eklendiğinde ziyaretçi aradığı yayınevinin yerini burada işaretli görecek.</p><button class="primary dark" data-page="discover">Yayınevi ara →</button></div>${sectionTitle('Fuar içi hizmetler')}${serviceRow()}</div>`;const people=list();const selected=zones[state.selectedZone];const occupant=people.find(p=>p.stand===state.selectedZone);return `<div class="screen"><div class="kicker">FUAR İÇİNDE</div><h1 class="page-title">Salon haritası</h1><p class="page-sub">Bir alana dokunup alanları keşfet.</p><div class="map-card"><div class="map-grid"><button class="${state.selectedZone==='A12'?'selected':''}" data-zone="A12">A12</button><div class="path">KORİDOR</div><button class="${state.selectedZone==='A14'?'selected':''}" data-zone="A14">A14</button><button class="${state.selectedZone==='B05'?'selected':''}" data-zone="B05">B05</button><div class="path">KORİDOR</div><button class="${state.selectedZone==='B08'?'selected':''}" data-zone="B08">B08</button><button class="service" class="${state.selectedZone==='SAHNE'?'selected':''}" data-zone="SAHNE">ANA<br>SAHNE</button><button class="service" class="${state.selectedZone==='GIRIS'?'selected':''}" data-zone="GIRIS">GİRİŞ<br>DANIŞMA</button><button class="${state.selectedZone==='C03'?'selected':''}" data-zone="C03">C03</button></div></div><div class="map-panel"><div class="kicker">${selected.name}</div><strong>${occupant?occupant.name:selected.type}</strong><p>${occupant?occupant.description:'Bu alan konsept krokide gösteriliyor.'}</p></div></div>`}
function participantCards(items){return items.length?items.map(p=>`<button class="participant-card" data-participant="${p.id}">${p.photo?`<img class="participant-photo" src="assets/${p.photo}" alt="${escapeHTML(p.name)} fotoğrafı">`:p.logo?`<span class="participant-logo"><img src="assets/${p.logo}" alt="${escapeHTML(p.name)} logosu"></span>`:`<span class="participant-mark">${escapeHTML(p.initial.slice(0,2))}</span>`}<span><strong>${escapeHTML(p.name)}</strong><small>${state.fair==='ankara'?`${p.category} · ${escapeHTML(p.publisher||'2026 örnek programı')}`:p.category==='Marka'?'Örnek marka profili · Katılım teyitli değil':`${p.category} · Temsili alan ${p.stand}`}</small></span><span class="arrow">→</span></button>`).join(''):'<div class="empty">Aramana uygun sonuç bulunamadı.</div>'}
function discover(){const book=state.fair==='ankara';const categories=book?['Tümü','Yayınevi','Yazar']:['Tümü','Marka','Etkinlik','Atölye'];return `<div class="screen discover-screen"><div class="kicker">${book?'YAZAR & YAYINEVİ':'ÇOCUK ŞENLİĞİ'}</div><h1 class="page-title">Neyi arıyorsun?</h1><p class="page-sub">${book?'Yazar veya yayınevini bul.':'Marka, etkinlik veya alanı bul.'}</p><p class="context-note">${book?'2026 örnek programı':'Marka profilleri örnektir; katılım teyitli değildir.'}</p><input id="search" class="search" type="search" value="${escapeHTML(state.query)}" placeholder="${book?'Yazar veya yayınevi ara':'Marka veya alan ara'}" aria-label="Katılımcı ara"><div class="chip-row">${categories.map(c=>`<button class="chip ${state.category===c?'active':''}" data-category="${c}">${c}</button>`).join('')}</div><div id="participant-results">${participantCards(filteredParticipants())}</div><button class="qr-tile" data-action="qr"><span class="qr-icon">▦</span><span><strong>QR ile profil aç</strong><small>Katılımcı sayfasına doğrudan git</small></span><b>→</b></button></div>`}
function publishersPage(){return `<div class="screen publishers-screen"><button class="subpage-back" data-page="home" aria-label="Fuarıma dön"><span aria-hidden="true">←</span> Fuarım</button><div class="kicker">24. ANKARA KİTAP FUARI</div><h1 class="page-title">Yayınevleri</h1><p class="page-sub">Yayınevlerini ve örnek yazar profillerini keşfet.</p><input id="publisher-search" class="search" type="search" value="${escapeHTML(state.publisherQuery)}" placeholder="Yayınevi ara" aria-label="Yayınevi ara"><div class="publisher-count">${publishers.length} ÖRNEK YAYINEVİ PROFİLİ</div><div id="publisher-results">${publisherCards(filteredPublishers())}</div></div>`}
function filteredPublishers(){const query=normalizeSearch(state.publisherQuery);return publishers.filter(p=>normalizeSearch(p.name).includes(query))}
function publisherCards(items){return items.length?items.map(p=>{const count=eventSets.ankara.filter(e=>e.publisher===p.name||(p.id==='bilgi'&&e.publisher==='Bilgi Yayınları')).length;return `<button class="participant-card publisher-list-card" data-participant="${p.id}"><span class="participant-logo"><img src="assets/${p.logo}" alt="${escapeHTML(p.name)} logosu"></span><span><strong>${escapeHTML(p.name)}</strong><small>${count} örnek imza kaydı</small></span><span class="arrow">→</span></button>`}).join(''):'<div class="empty">Aramana uygun yayınevi bulunamadı.</div>'}
function filteredParticipants(){return list().filter(p=>(state.category==='Tümü'||p.category===state.category)&&(p.name+' '+(p.stand||'')+' '+p.category+' '+(p.publisher||'')).toLocaleLowerCase('tr').includes(state.query.toLocaleLowerCase('tr')))}
function plan(){
  const chosen=events().filter(e=>state.saved.has(e.id)).sort((a,b)=>a.day-b.day||a.time.localeCompare(b.time));
  const groups=[...new Set(chosen.map(e=>e.day))];
  return `<div class="screen plan-screen"><div class="kicker">KİŞİSEL FUAR AKIŞI</div><h1 class="page-title">Planım</h1><p class="page-sub">Kaydettiğin buluşmalar, gününe göre bir arada.</p><div class="plan-hero"><small>${state.fair==='ankara'?'4–13 ARALIK 2026 · ANKARA':'ÇOCUK ŞENLİĞİ · DEMO'}</small><strong>${chosen.length?`${chosen.length} buluşma<br>planında.`:'Fuardaki gününü<br>planla.'}</strong><span>İmzalar ve söyleşiler arasında kaybolma; sevdiğin etkinliğe zamanında yetiş.</span></div>${chosen.length?`<div class="plan-section-heading"><h2>Kaydettiğin etkinlikler</h2><small>ÖRNEK PLAN</small></div>${groups.map(day=>{const items=chosen.filter(e=>e.day===day);return `<div class="plan-day-heading"><span>${state.fair==='ankara'?items[0].date.toLocaleUpperCase('tr'):`${day}. GÜN`}</span><small>${items.length} etkinlik</small></div><div class="plan-day-list">${items.map(e=>`<div class="plan-event"><button type="button" class="plan-event-main" data-event="${e.id}"><time>${e.time}</time><span><small>${e.kind.toLocaleUpperCase('tr')} · ÖRNEK</small><strong>${escapeHTML(e.title)}</strong><em>${escapeHTML(e.kind==='Söyleşi'?e.place:e.publisher)}</em></span><b>→</b></button><button type="button" class="plan-event-remove" data-save="${e.id}" aria-label="${escapeHTML(e.title)} etkinliğini planımdan çıkar">♥</button></div>`).join('')}</div>`}).join('')}`:'<div class="empty">Henüz etkinlik kaydetmedin.<br>İmza veya söyleşi ekranından planını oluştur.</div>'}<button class="primary full plan-explore" data-page="program">Programı keşfet →</button><button class="plan-reminder" data-page="notifications"><span class="nicon">◉</span><span><strong>Etkinlik hatırlatmaları</strong><small>Program değişikliklerini ve duyuruları takip et.</small></span><b>→</b></button><p class="muted-note">Bu örnek plan yalnızca bu tarayıcıda saklanır; gerçek bildirimler için ziyaretçi izni gerekir.</p></div>`;
}

function notifications(){
  const samples=[
    {kind:'Önemli',icon:'!',title:'Tüm ziyaretçilere',body:'Giriş, ulaşım ve alan değişiklikleri burada anında görünür.',meta:'GENEL DUYURU · ÖRNEK'},
    {kind:'Önemli',icon:'↗',title:'Program güncellendi',body:'Saat veya salon değiştiğinde güncel bilgi tek yerde.',meta:'PROGRAM DEĞİŞİKLİĞİ · ÖRNEK'},
    {kind:'Planım',icon:'♡',title:'Kaydettiğin etkinlik yaklaşıyor',body:'Planındaki buluşmadan önce sana özel hatırlatma.',meta:'KİŞİSEL HATIRLATMA · ÖRNEK'}
  ];
  if(state.demoNotice)samples.unshift({kind:state.demoNotice.audience==='Planına ekleyenler'?'Planım':'Önemli',icon:'◉',title:state.demoNotice.title,body:state.demoNotice.body,meta:state.demoNotice.audience.toLocaleUpperCase('tr')+' · DEMO ÖNİZLEME'});
  const visible=samples.filter(item=>state.noticeFilter==='Tümü'||item.kind===state.noticeFilter);
  return `<div class="screen"><div class="kicker">FUARIN NABZI</div><h1 class="page-title">Bildirimler</h1><p class="page-sub">Herkese açık duyurular ve planına özel haberler tek yerde.</p><div class="chip-row">${['Tümü','Önemli','Planım'].map(filter=>`<button class="chip ${state.noticeFilter===filter?'active':''}" data-notice-filter="${filter}">${filter}</button>`).join('')}</div>${visible.map(item=>`<div class="notification-card"><span class="nicon">${item.icon}</span><span><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.body)}</p><small>${escapeHTML(item.meta)}</small></span></div>`).join('')}${sectionTitle('Bildirim tercihlerim')}<div class="toggle-row"><span><strong>Etkinlik hatırlatmaları</strong><small>Planıma eklediklerim</small></span><button class="switch ${state.prefs.event?'on':''}" data-pref="event" aria-label="Etkinlik hatırlatmalarını aç veya kapat" aria-pressed="${state.prefs.event}"></button></div><div class="toggle-row"><span><strong>Program değişiklikleri</strong><small>Saat ve yer güncellemeleri</small></span><button class="switch ${state.prefs.change?'on':''}" data-pref="change" aria-label="Program değişikliklerini aç veya kapat" aria-pressed="${state.prefs.change}"></button></div><div class="toggle-row"><span><strong>Genel duyurular</strong><small>Fuar içi önemli bilgiler</small></span><button class="switch ${state.prefs.general?'on':''}" data-pref="general" aria-label="Genel duyuruları aç veya kapat" aria-pressed="${state.prefs.general}"></button></div><button class="primary full" data-action="simulate-notification" style="margin-top:13px">◉ Örnek bildirimi üstte göster</button><button class="ghost full" data-page="admin" style="margin-top:9px">Organizatör duyuru önizlemesi →</button><p class="muted-note">Bu test bildirimi sunumdaki uygulama ekranında yaklaşık 8 saniye görünür. Gerçek cihaz bildirimi için ziyaretçi izni ve gönderim altyapısı gerekir.</p></div>`;
}
function authorHero(p,label){return `<div class="author-hero ${p.id==='gazalci'?'portrait-hero':''}"><img src="assets/${p.photo}" alt="${escapeHTML(p.name)} fotoğrafı"><div class="author-hero-overlay"><small>${label}</small><h1>${escapeHTML(p.name)}</h1><span>${escapeHTML(p.publisher)}</span></div></div>`}
function bookFeature(p){const books=authorBooks[p.id]||[];return `<section class="author-books-section"><div class="section-title"><h2>Yazarın kitapları</h2></div><div class="author-books-row" aria-label="${escapeHTML(p.name)} kitapları">${books.map((book,index)=>`<button type="button" class="author-book" data-book="${p.id}:${index}" aria-label="${escapeHTML(book.title)} kitabını aç"><div class="author-book-cover"><img src="${escapeHTML(book.cover.startsWith('http')?book.cover:`assets/${book.cover}`)}" alt="${escapeHTML(book.title)} kitap kapağı" loading="lazy"></div><strong>${escapeHTML(book.title)}</strong></button>`).join('')}</div><p class="author-books-note">Yayımlanmış eserlerden örneklerdir; bu fuarda imzalanacak kitaplar teyitli değildir.</p></section>`}
function showBook(key){const [authorId,rawIndex]=String(key).split(':');const index=Number(rawIndex);if(!authorBooks[authorId]?.[index])return;state.book={authorId,index};state.bookReturn={page:state.page,detail:state.detail,previous:state.previous,scrollTop:$('#scroll-area').scrollTop};go('book')}
function closeBook(){const origin=state.bookReturn||{page:'home',detail:null,previous:'home'};state.detail=origin.detail;state.previous=origin.previous;state.book=null;go(origin.page);$('#scroll-area').scrollTop=origin.scrollTop||0;state.bookReturn=null}
function bookDetail(){const author=authors.find(a=>a.id===state.book?.authorId);const book=authorBooks[state.book?.authorId]?.[state.book?.index];if(!author||!book)return home();return `<div class="screen detail-screen book-detail-screen"><button type="button" class="detail-back" data-action="back-book" aria-label="${escapeHTML(author.name)} ekranına dön"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg></button><div class="book-detail-visual"><img src="${escapeHTML(book.cover.startsWith('http')?book.cover:`assets/${book.cover}`)}" alt="${escapeHTML(book.title)} kitap kapağı"></div><div class="book-detail-copy"><span class="kicker">${escapeHTML(author.name)}</span><h1>${escapeHTML(book.title)}</h1><p class="book-detail-publisher">${escapeHTML(author.publisher)}</p><div class="book-detail-divider"></div><h2>Kitap hakkında</h2><p class="book-detail-description">${escapeHTML(book.description)}</p><a class="book-detail-source" href="${escapeHTML(book.source)}" target="_blank" rel="noopener noreferrer">Kitabın kaynak sayfası <span>↗</span></a><p class="muted-note">Tanıtım kaynak bilgisinden özetlenmiştir. Bu kitabın fuarda imzalanacağı henüz doğrulanmadı.</p></div></div>`}

function eventDetail(){const e=events().find(x=>x.id===state.detail);if(!e)return program();const book=state.fair==='ankara';const talk=book&&e.kind==='Söyleşi';const author=book&&!talk?authors.find(a=>a.name===e.title):null;return `<div class="screen detail-screen ${author||talk?'has-hero':''}"><button class="detail-back" ${publisherEventReturn?`data-return-publisher="${publisherEventReturn.id}"`:`data-page="${state.previous}"`} aria-label="${publisherEventReturn?'Yayınevine dön':state.previous==='home'?'Aramaya dön':state.previous==='plan'?'Planıma dön':'Programa dön'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg></button>${author?authorHero(author,'2026 · ÖRNEK İMZA'):talk?`<div class="talk-hero"><div><small>ÖRNEK SÖYLEŞİ · KİTAP FUARI</small><h1>${escapeHTML(e.title)}</h1><span>${escapeHTML(e.place)}</span></div></div>`:`<div class="kicker">${book?'2026 · ÖRNEK İMZA':`${e.kind.toLocaleUpperCase('tr')} · ${e.age}`}</div><h1 class="page-title">${escapeHTML(e.title)}</h1>`}${author||talk?'':`<p class="page-sub detail-sub">${book?escapeHTML(e.publisher):escapeHTML(e.speaker)}</p>`}<div class="info-list"><div class="info-line"><span>◷</span><span><strong>Ne zaman?</strong><em>${book?e.date:`${e.day}. gün`} · ${e.time}</em></span></div><div class="info-line"><span>⌖</span><span><strong>Nerede?</strong><em>${escapeHTML(e.place)}</em></span></div>${talk?`<div class="info-line"><span>♙</span><span><strong>Konuşmacı</strong><em>${escapeHTML(e.speaker)}</em></span></div><div class="info-line"><span>▤</span><span><strong>Yayınevi / düzenleyen</strong><em>${escapeHTML(e.host)}</em></span></div>`:''}</div>${author?`<section class="event-about"><h2>Yazar hakkında</h2><p>${escapeHTML(author.description)}</p></section>${bookFeature(author)}`:talk?`<p class="talk-description">${escapeHTML(e.description)}</p><div class="talk-demo-note">Örnek 2026 söyleşisi · Konu, konuşmacı ve saat teyit edilmedi.</div>`:book?'':`<p class="page-sub">${escapeHTML(e.description)}</p>`}<div class="sheet-actions"><button class="primary" data-save="${e.id}">${state.saved.has(e.id)?'Planımdan çıkar':'♡ Planıma ekle'}</button><button class="ghost" ${book?'data-action="open-map"':`data-show-zone="${childPlaces.find(p=>p.name===e.place)?.stand||'SAHNE'}"`}>Krokiyi gör →</button></div>${!book?`<button class="passport-banner" data-action="event-qr"><span class="passport-icon">▦</span><span><strong>Bu etkinliğe katıldın mı?</strong><small>Etkinlikteki QR koduyla pasaportuna damga ekle.</small></span><b>→</b></button>`:''}</div>`}
const publisherProfiles={
  can:{about:[
    'Can Çocuk, Can Yayınları’nın çocuk edebiyatına ayrılan markası. Resimli kitaplar, masallar, öyküler ve romanlarla farklı yaşlardan okurlara sesleniyor.',
    'Yayınevinin çocuk kitapları seçkisinde hem Türkçe yazılmış eserler hem de dünya edebiyatından çeviriler bulunuyor. Katalog, çocukları eğlendirirken düşünmeye ve keşfetmeye çağıran kitapları bir araya getiriyor.'
  ],source:'https://www.canyayinlari.com/kitap-cocuk'},
  dogan:{about:[
    '1999’dan beri yayın yapan Doğan Kitap, Türk ve dünya edebiyatından eserleri okurlarla buluşturuyor. Dünya edebiyatından çevirilerin yanında yerli yazarların kitaplarına ve yeni kalemlerin ilk eserlerine de yer veriyor.',
    'Kataloğu roman ve öyküyle sınırlı değil; polisiye, araştırma, anı, tarih, sağlık ve yaşam konularına da uzanıyor. Böylece farklı ilgi alanlarından okurlar yayınevinin kitaplarında kendi rotasını bulabiliyor.'
  ],source:'https://www.dogankitap.com.tr/hakkimizda'},
  altin:{about:[
    'Altın Kitaplar yayın yolculuğuna dünya klasiklerini Türkçe okurla buluşturarak başladı. Zamanla polisiye, macera ve roman türlerindeki çeviri eserlerle kataloğunu genişletti.',
    'Çocuk ve gençlik edebiyatı da yayınevinin önemli alanlarından biri. Yerli yazarların kitaplarını, dünya çocuk edebiyatından çevirileri ve eğitim alanındaki yayınları farklı kuşaklardan okurlarla buluşturuyor.'
  ],source:'https://b2b.altinkitaplar.com.tr/cms/hakkimizda/1333'},
  otuken:{about:[
    'Ötüken Neşriyat, 1964’te İstanbul’da kuruldu. Türk edebiyatı, tarih, kültür ve düşünce alanlarındaki eserleriyle uzun soluklu bir yayın çizgisi oluşturdu.',
    'Klasik yazarların toplu eserlerinin yanında edebiyat araştırmaları ve yeni yazarların kitaplarına da yer veriyor. Resmî tarihçesine göre katalogu 2026 itibarıyla 2.400 kitaba ulaşmış durumda.'
  ],source:'https://otuken.com.tr/page/tarihce'},
  alfa:{about:[
    'Alfa Yayınları, yayın hayatına özellikle üniversite ve yüksekokullar için başvuru ve referans kitapları hazırlayarak başladı. Zaman içinde okur kitlesini ve yayın alanlarını genişletti.',
    'Bugün eğitim, tarih, felsefe ve bilim başta olmak üzere 20’den fazla konuda kitap yayımlıyor. Resmî tanıtımına göre 3.500’ü aşkın kitap ve yüzlerce yazarla oluşan bir yayın birikimine sahip.'
  ],source:'https://www.alfayayinlari.com/icerik.php?sayfa=about'},
  everest:{about:[
    'Everest Yayınları’nın kataloğu çağdaş Türk ve dünya edebiyatından roman, öykü, şiir ve anlatıları bir araya getiriyor. Modern klasikler, biyografi ve inceleme kitapları da okurun keşfedebileceği alanlar arasında.',
    'Yayınevi yerli yazarların eserlerine ve dünya dillerinden çevrilen kitaplara yer veriyor. İlk Roman Yarışması gibi çalışmalarıyla yeni edebiyat seslerine de alan açıyor.'
  ],source:'https://www.everestyayinlari.com/'},
  kirmizi:{about:[
    'Kırmızı Kedi Yayınevi 2008’de yayın hayatına başladı. Edebiyat, araştırma ve farklı düşünce alanlarından kitapların yanında Kırmızı Kedi Çocuk markasıyla genç okurlara da sesleniyor.',
    'Resmî tanıtımında Kırk Yayınevi ve Çınar Yayınları markalarını da kapsayan 2.000’in üzerinde başlıktan söz ediyor. Kitap mağazalarıyla yayımladığı eserleri okurlarla doğrudan buluşturuyor.'
  ],source:'https://kirmizikediyayinevi.com/hakkimizda/'},
  bilgi:{about:[
    'Bilgi’nin hikâyesi, Ahmet Tevfik Küflü’nün 1956’da Ankara’da açtığı Bilgi Kitabevi ile başladı. 1965’te kurulan Bilgi Yayınevi, kentteki bu edebiyat buluşma noktasını yayıncılığa taşıdı.',
    'Türk edebiyatının önemli yazarlarının eserlerinin yanı sıra tarih, eğitim ve toplum konularındaki araştırmaları yayımladı. 1990’lardan itibaren çocuk kitaplarını da kataloğuna katarak yeni kuşak okurlara ulaştı.'
  ],source:'https://www.bilgiyayinevi.com.tr/hakkimizda'},
  timas:{about:[
    'Timaş Yayınları 1982’de yayın hayatına başladı. Edebiyat, tarih, kültür, düşünce ve aile alanlarındaki kitaplarını çocuk ve gençlik yayınlarıyla tamamlayan geniş bir yayın grubu oluşturdu.',
    'Resmî tanıtımına göre 7.000’den fazla kitabı 40’tan fazla ülkede okurlarla buluştu. Farklı yaş gruplarına ve ilgi alanlarına yönelik markalarıyla yeni yazarları ve fikirleri yayın dünyasına taşımayı sürdürüyor.'
  ],source:'https://timas.com.tr/hakkimizda'}
};
function publisherDetail(p){
  if(state.fair!=='ankara')return `<div class="screen detail-screen"><button class="detail-back" data-page="${state.previous}" aria-label="Alanlara dön"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg></button><div class="participant-feature" style="height:145px"><small>${escapeHTML(p.category.toLocaleUpperCase('tr'))}</small><strong>${escapeHTML(p.name)}</strong></div><div class="kicker">KONSEPT ALAN</div><h1 class="page-title" style="font-size:24px;margin-top:7px">${escapeHTML(p.name)}</h1><p class="page-sub">${escapeHTML(p.description)}</p><div class="info-list"><div class="info-line"><span>⌖</span><span><strong>Alan kodu</strong><em>${escapeHTML(p.stand)} · Konsept yerleşim</em></span></div></div><button class="ghost full" data-show-zone="${escapeHTML(p.stand)}">Salon krokisinde gör →</button></div>`;
  const names=p.id==='bilgi'?['Bilgi Yayınevi','Bilgi Yayınları']:[p.name];
  const featuredAuthors=authors.filter(a=>names.includes(a.publisher));
  const signings=eventSets.ankara.filter(e=>names.includes(e.publisher));
  const profile=publisherProfiles[p.id];
  return `<div class="screen detail-screen publisher-detail has-hero"><button class="detail-back" data-page="${state.previous}" aria-label="${state.previous==='publishersPage'?'Yayınevlerine dön':state.previous==='home'?'Fuarıma dön':'Katılımcılara dön'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg></button><div class="publisher-cover"><span>YAYINEVİ PROFİLİ · DEMO</span><strong>Kitapların arasında<br>keşfet.</strong></div><div class="publisher-identity"><div class="publisher-identity-logo"><img src="assets/${p.logo}" alt="${escapeHTML(p.name)} logosu"></div><div><small>YAYINEVİ</small><h1>${escapeHTML(p.name)}</h1></div></div><div class="publisher-facts"><div><strong>${signings.length}</strong><span>Örnek imza</span></div><div><strong>${featuredAuthors.length||escapeHTML(signings[0]?.date.split(' ').slice(0,2).join(' ')||'2026')}</strong><span>${featuredAuthors.length?'Yazar profili':'Örnek tarih'}</span></div></div><section class="publisher-section"><h2>Yayınevi hakkında</h2>${(profile?.about||[p.description]).map(paragraph=>`<p>${escapeHTML(paragraph)}</p>`).join('')}<a href="${profile?.source||p.website}" target="_blank" rel="noopener noreferrer" class="publisher-source">Resmî kaynaktan oku ↗</a></section><section class="publisher-section"><h2>Örnek imza programı</h2><p class="publisher-section-note">Bu 2026 akışı demodur; yazar katılımı ve saatler teyit edilmedi.</p><div class="publisher-signings">${signings.map(e=>`<button type="button" class="publisher-signing" data-event="${e.id}"><span class="publisher-signing-date"><strong>${e.date.split(' ')[0]}</strong><small>ARALIK</small></span><span class="publisher-signing-copy"><strong>${escapeHTML(e.title)}</strong><small>${escapeHTML(e.time)} · ${escapeHTML(e.place)}</small></span><span class="publisher-signing-arrow">→</span></button>`).join('')}</div></section>${featuredAuthors.length?`<section class="publisher-section"><h2>Yazarlar ve kitapları</h2><div class="publisher-author-list">${featuredAuthors.map(a=>`<button class="publisher-author-card" data-participant="${a.id}"><img class="publisher-author-photo" src="assets/${a.photo}" alt="${escapeHTML(a.name)} fotoğrafı"><span><small>YAZAR PROFİLİ</small><strong>${escapeHTML(a.name)}</strong><em>${escapeHTML(a.bookTitle)}</em></span><img class="publisher-author-book" src="assets/${a.bookCover}" alt="${escapeHTML(a.bookTitle)} kitap kapağı"></button>`).join('')}</div></section>`:''}<div class="publisher-actions"><button class="publisher-map-link" data-action="open-map"><span>⌖</span><span><strong>Fuar krokisi</strong><small>Güncel stantlar açıklanınca burada gösterilecek.</small></span><b>→</b></button><a class="publisher-website" href="${p.website}" target="_blank" rel="noopener noreferrer"><span><strong>Resmî web sitesi</strong><small>${escapeHTML(new URL(p.website).hostname.replace(/^www\./,''))}</small></span><b>↗</b></a></div></div>`;
}
function participantDetail(){const p=list().find(x=>x.id===state.detail);if(!p)return discover();const book=state.fair==='ankara';if(p.category==='Yazar')return `<div class="screen detail-screen has-hero"><button class="detail-back" ${publisherReturn?`data-return-publisher="${publisherReturn.id}"`:`data-page="${state.previous}"`} aria-label="${publisherReturn?'Yayınevine dön':state.previous==='home'?'Aramaya dön':'Yazarlara dön'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg></button>${authorHero(p,'YAZAR · ÖRNEK PROFİL')}<p class="author-description">${escapeHTML(p.description)}</p>${bookFeature(p)}</div>`;if(p.category==='Marka')return `<div class="screen detail-screen brand-detail"><button class="detail-back" data-page="discover" aria-label="Markalara dön"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg></button><div class="brand-detail-head"><span class="kicker">ÖRNEK MARKA PROFİLİ</span><img src="assets/${p.logo}" alt="${escapeHTML(p.name)} logosu"></div><h1 class="page-title">${escapeHTML(p.name)}</h1><p class="page-sub">${escapeHTML(p.description)}</p><div class="brand-demo-notice">Bu profil iş birliği fikrini göstermek içindir. ${escapeHTML(p.name)} bu şenliğin teyitli sponsoru değildir.</div><div class="section-title"><h2>Şenlikte neler olabilir?</h2></div><div class="brand-offer"><small>MARKAYA ÖZEL ALAN · ÖRNEK</small><strong>${escapeHTML(p.demoOffer)}</strong><span>${p.demoCode?'Ziyaretçi uygulamada kendine özel kodu görebilir.':'Ziyaretçi etkinliği ve marka bilgisini tek yerden görebilir.'}</span>${p.demoCode?`<div class="demo-code"><b>${escapeHTML(p.demoCode)}</b><small>DEMO KODU · GEÇERLİ DEĞİL</small></div>`:''}</div><a class="ghost full brand-website" href="${p.website}" target="_blank" rel="noopener noreferrer">Resmî web sitesi ↗</a><div class="section-title"><h2>Profilde başka ne olur?</h2></div><div class="info-list"><div class="info-line"><span>⌖</span><span><strong>Stand ve konum</strong><em>Kesinleşince fuar haritasına bağlanır.</em></span></div><div class="info-line"><span>◉</span><span><strong>Etkinlik ve duyurular</strong><em>İlgilenen ziyaretçi marka haberlerini takip eder.</em></span></div></div></div>`;return publisherDetail(p)}
function about(){return `<div class="screen fair-info-screen"><button class="link-button" data-page="home" style="padding:0;margin-bottom:14px">← Fuara dön</button><div class="kicker">ANKARA KİTAP FUARI</div><h1 class="page-title">Fuar bilgileri</h1><p class="page-sub">Ziyaret sırasında işine yarayacak bağlantılar ve organizatör bilgileri.</p><div class="fair-info-alert"><strong>24. fuar için not</strong><span>Yeni imza listesi, katılımcılar, salon planı ve mekân bilgisi organizatör tarafından kesinleştikçe bu rehbere işlenir. Ekrandaki program kayıtları ve profiller örnektir.</span></div><div class="fair-facts"><div><small>FUAR</small><strong>24. Ankara Kitap Fuarı</strong></div><div><small>PLANLANAN TAKVİM</small><strong>4–13 Aralık 2026</strong></div><div><small>ORGANİZATÖR</small><strong>Eylül Fuarcılık</strong></div><div><small>MEKÂN</small><strong>Organizatör teyidi bekleniyor</strong></div></div><div class="section-title"><h2>Hızlı bağlantılar</h2></div><div class="fair-info-links"><button data-action="open-signings"><span>✎</span><strong>İmza programı</strong><b>→</b></button><button data-action="open-talks"><span>◉</span><strong>Söyleşiler</strong><b>→</b></button><button data-page="map"><span>⌖</span><strong>Fuar krokisi</strong><b>→</b></button><button data-action="ticket"><span>▣</span><strong>Bilet ve giriş</strong><b>→</b></button></div><div class="section-title"><h2>Rehberde neler var?</h2></div><div class="fair-guide-features"><div><span>01</span><strong>Program</strong><small>İmzalar ve söyleşiler gün gün incelenir.</small></div><div><span>02</span><strong>Katılımcılar</strong><small>Yazar, kitap ve yayınevi profilleri aranır.</small></div><div><span>03</span><strong>Planım</strong><small>İlgi duyulan buluşmalar tek listede saklanır.</small></div><div><span>04</span><strong>Harita ve bildirimler</strong><small>Alan bilgisi ve önemli değişiklikler kolayca bulunur.</small></div></div><div class="section-title"><h2>Sık sorulanlar</h2></div><div class="fair-faq"><div><strong>İmza ve söyleşileri nereden takip ederim?</strong><p>Program ekranından arayabilir; resmî fuar sitesinden de kontrol edebilirsin.</p></div><div><strong>2026 programı kesinleşti mi?</strong><p>Bu ekrandaki imza ve söyleşiler sunum örneğidir. Kesin program ve katılımcılar organizatörün duyurusuyla güncellenir.</p></div><div><strong>İlgilendiğim etkinliği nasıl saklarım?</strong><p>İmza veya söyleşideki kalbe dokun. Kaydın Planım ekranında gün ve saat sırasıyla görünür.</p></div><div><strong>Otopark bilgisi var mı?</strong><p>Resmî SSS sayfasına göre otoparkta farklı uygulamalar bulunuyor; güncel ücret için organizatörle iletişime geç.</p></div></div><div class="section-title"><h2>Organizatör</h2></div><div class="fair-organizer"><img src="assets/eylul-fuarcilik-logo.png" alt="Eylül Fuarcılık"><p>Eylül Fuarcılık ve Rem Fuar & Organizasyon, kendi kurumsal bilgilerine göre 1999’dan beri fuar sektöründe. Kitap ve eğitim fuarları düzenliyor.</p><a href="https://www.eylulfuar.com.tr/kurumsal/hakkimizda" target="_blank" rel="noopener noreferrer">Kurumsal sayfa ↗</a></div><div class="section-title"><h2>İletişim</h2></div><div class="fair-contact"><div><small>TELEFON</small><strong>0312 418 68 99</strong></div><div><small>E-POSTA</small><strong>info@eylulfuar.com</strong></div><div><small>MERKEZ ADRESİ</small><strong>Hacettepe, St. Petersburg Meydanı No:38, Ev Kadını Sk. 06420 Altındağ / Ankara</strong></div></div><a class="fair-official-link" href="https://ankarakitapfuari.org.tr/" target="_blank" rel="noopener noreferrer">Ankara Kitap Fuarı resmî sitesi <span>↗</span></a><a class="fair-official-link" href="https://eylulfuar.com.tr/sikca-sorulan-sorular" target="_blank" rel="noopener noreferrer">Eylül Fuarcılık SSS <span>↗</span></a><p class="muted-note">Kurumsal ve SSS bilgileri Eylül Fuarcılık sitesinden alınmıştır. Bu ekran iş birliği için hazırlanmış demodur.</p></div>`}
function openSheet(content){$('#sheet').innerHTML=`<div class="sheet-top"><div class="kicker">EYLÜL FUAR REHBERİ</div><button data-action="close-sheet" aria-label="Kapat">×</button></div>${content}`;$('#sheet-backdrop').hidden=false}
function closeSheet(){stopCamera();$('#sheet-backdrop').hidden=true;$('#sheet').classList.remove('map-sheet')}
function openMapSheet(){
  openSheet(`<div class="official-map"><div class="kicker">RESMÎ SİTEDEKİ KROKİ</div><h2>Fuar alanı krokisi</h2><p>Bu gerçek kroki resmî fuar sitesinde yayımlanıyor. Görsel 3–12 Nisan 2026 tarihli fuara ait; Aralık fuarının stantları kesinleşince güncellenecek.</p><div class="map-zoom" tabindex="0" aria-label="Resmî fuar krokisini kaydırarak incele"><img src="assets/ankara-resmi-kroki.jpg" alt="Resmî sitede yayımlanan 3–12 Nisan 2026 fuar alanı krokisi"></div><div class="map-sheet-hint">← Krokiyi sağa ve sola kaydır →</div><a class="official-map-link" href="https://ankarakitapfuari.org.tr/fuar-alani-krokisi" target="_blank" rel="noopener noreferrer">Resmî kroki sayfası ↗</a></div>`);
  $('#sheet').classList.add('map-sheet');
}

function fairSheet(){openSheet(`<h2>Fuarını seç</h2><p>Her fuarın programı, katılımcıları ve haritası kendi içinde açılır.</p><button class="event-choice" data-pick-fair="ankara"><span class="thumb"></span><span><strong>24. Ankara Kitap Fuarı</strong><small>4–13 Aralık 2026</small></span><span class="arrow">→</span></button><button class="event-choice" data-pick-fair="children"><span class="thumb children"></span><span><strong>Çocuk Şenliği</strong><small>Konsept görünümü</small></span><span class="arrow">→</span></button>`)}
function helpSheet(){openSheet(`<h2>Nasıl yardımcı olabiliriz?</h2><p>Fuar alanında en çok aranan bilgilere buradan ulaşabilirsin.</p><div class="info-list"><div class="info-line"><span>⌖</span><span><strong>Yer ve stantlar</strong><em>Harita sekmesinden ara.</em></span></div><div class="info-line"><span>◷</span><span><strong>Etkinlik saatleri</strong><em>Program sekmesinden takip et.</em></span></div><div class="info-line"><span>ⓘ</span><span><strong>Organizatör</strong><em>Eylül Fuarcılık</em></span></div></div><div class="sheet-actions"><button class="primary" data-page="map">Haritaya git</button><button class="ghost" data-page="about">Hakkımızda</button></div>`)}
function ticketSheet(){openSheet(`<h2>Giriş & bilet</h2><p>Giriş bilgilerini bu alanda görebilirsin. ${state.fair==='ankara'?'Ankara Kitap Fuarı için mevcut e-bilet sayfasına geçiş aşağıda.':'Çocuk Şenliği için resmî bilet ve giriş bilgileri henüz eklenmedi.'}</p>${state.fair==='ankara'?'<a class="primary" href="https://ankarakitapfuari.org.tr/biletler" target="_blank" rel="noopener" style="display:inline-block">Resmî e-bilet sayfası →</a>':''}<p class="muted-note">Bu demo bilet satışı veya giriş doğrulaması yapmaz.</p>`)}
function venueSheet(){openSheet(`<h2>Ulaşım</h2><p>${state.fair==='ankara'?'Önceki Ankara Kitap Fuarı ATO Congresium’da yapıldı. Yaklaşan 24. fuarın mekânı organizatör tarafından teyit edilince güncel adres burada gösterilir.':'Çocuk Şenliği mekân bilgisi organizatörden geldikten sonra burada gösterilir.'}</p><div class="info-line"><span>⌖</span><span><strong>${fairs[state.fair].venue}</strong><em>Giriş, otopark ve erişim bilgileri resmî fuar verisiyle eklenir.</em></span></div>`)}
function feedbackSheet(){openSheet(`<h2>Fuar deneyimin nasıldı?</h2><p>Görüşlerin fuar deneyiminin gelişmesine yardımcı olabilir. Bu demo yanıtları herhangi bir yere göndermez.</p><div class="sheet-actions"><button class="ghost" data-rate="1">😐</button><button class="ghost" data-rate="2">🙂</button><button class="ghost" data-rate="3">😍</button></div>`)}
function serviceSheet(name){openSheet(`<h2>${escapeHTML(name)}</h2><p>${escapeHTML(name)} konumu, resmî fuar planı verildiğinde burada harita üzerinde gösterilir.</p><button class="primary" data-page="map">Haritayı aç →</button>`)}
function qrSheet(mode='stand'){
  state.qrMode=mode;
  const isEvent=mode==='event';
  openSheet(`<div class="qr-intro"><span class="qr-intro-icon" aria-hidden="true">▦</span><h2>${isEvent?'Etkinlik QR kodunu okut':state.fair==='ankara'?'QR ile yayınevini keşfet':'QR ile katılımcıyı keşfet'}</h2><p>${isEvent?'Etkinlik kodunu okut, fuar pasaportundaki damganı gör.':'Standdaki kodu okut; yayınevinin profili açılsın.'}</p></div><button class="primary full qr-camera-button" data-action="start-camera">Kamerayı aç <span aria-hidden="true">→</span></button><div class="qr-manual"><span>Kodla devam et</span><div class="row"><input class="search" id="qr-code" type="text" placeholder="${isEvent?'ETK-A1':state.fair==='ankara'?'ALFA':'TOYZZ'}" aria-label="${isEvent?'Etkinlik kodu':state.fair==='ankara'?'Yayınevi kodu':'Katılımcı kodu'}"><button class="ghost" data-action="lookup-code">Bul</button></div></div><p class="muted-note">Kamera akışı sunum için örnek QR taramasıdır.</p>`)
}
function save(id){state.saved.has(id)?state.saved.delete(id):state.saved.add(id);localStorage.setItem('eylul-rehber-saved-2026',JSON.stringify([...state.saved]));render();toast(state.saved.has(id)?'Planına eklendi':'Planından çıkarıldı')}
let publisherEventReturn=null;
function showEvent(id){publisherEventReturn=state.page==='participant'&&publishers.some(p=>p.id===state.detail)?{id:state.detail,previous:state.previous}:null;state.detail=id;state.previous=publisherEventReturn?'participant':['home','plan','signings','talks'].includes(state.page)?state.page:'program';go('event')}
let publisherReturn=null;
function showParticipant(id){publisherReturn=state.page==='participant'&&publishers.some(p=>p.id===state.detail)?{id:state.detail,previous:state.previous}:null;state.detail=id;state.previous=['home','publishersPage'].includes(state.page)?state.page:'discover';go('participant')}
function showZone(zone){state.selectedZone=zone;closeSheet();go('map')}
function lookupCode(demoCode){
  const code=(typeof demoCode==='string'?demoCode:$('#qr-code')?.value||'').trim().toUpperCase();
  if(!code)return toast('Bir kod gir.');
  if(state.qrMode==='event'){
    const id=code.replace(/^ETK-/, '').toLowerCase();
    const found=events().find(e=>e.id===id && code==='ETK-'+e.id.toUpperCase());
    if(!found)return toast('Bu etkinlik kodu demo listesinde yok.');
    const already=state.stamps.has(id);
    state.stamps.add(id);
    localStorage.setItem('eylul-rehber-stamps',JSON.stringify([...state.stamps]));
    closeSheet();go('passport');
    return toast(already?'Bu etkinliğin damgası zaten pasaportunda.':'Etkinlik damgası pasaportuna eklendi.');
  }
  const person=state.fair==='ankara'?publishers.find(p=>p.id.toUpperCase()===code):list().find(p=>p.stand===code||p.id.toUpperCase()===code);
  if(person){closeSheet();showParticipant(person.id)}else toast('Bu kod demo listesinde bulunamadı.');
}
let scanTimer=null,scanCompleteTimer=null;
function startCamera(){
  if(scanTimer||scanCompleteTimer)return;
  const target=state.qrMode==='event'?{code:'ETK-A1',name:'Etkinlik kodu',logo:'eylul-fuarcilik-logo.png',qr:'demo-qr-etkinlik.svg'}:state.fair==='ankara'?{code:'ALFA',name:'Alfa Yayınları',logo:'publisher-alfa.png',qr:'demo-qr-alfa.svg'}:{code:'TOYZZ',name:'Toyzz Shop',logo:'brand-toyzz.png',qr:'demo-qr-toyzz.svg'};
  $('#sheet-backdrop').classList.add('scanner-open');
  $('#sheet').classList.add('qr-scanning');
  $('#sheet').innerHTML=`<div class="scanner-header"><span>QR OKUYUCU <small>DEMO</small></span><button type="button" data-action="close-sheet" aria-label="QR okuyucuyu kapat">×</button></div><div class="scanner-camera"><div class="scanner-vignette"></div><div class="scanner-target"><div class="scanner-code-card"><img class="scanner-brand" src="assets/${target.logo}" alt="${escapeHTML(target.name)}"><img class="scanner-qr" src="assets/${target.qr}" alt="${escapeHTML(target.code)} örnek QR kodu"><strong>${escapeHTML(target.name)}</strong></div><span class="scanner-beam" aria-hidden="true"></span><i class="scan-corner top-left"></i><i class="scan-corner top-right"></i><i class="scan-corner bottom-left"></i><i class="scan-corner bottom-right"></i></div></div><div class="scanner-bottom"><span class="scanner-pulse" aria-hidden="true"></span><strong id="scanner-status" role="status" aria-live="polite">QR kodu okunuyor…</strong><p>Örnek kod kadrajda otomatik olarak tanınır.</p></div>`;
  scanTimer=setTimeout(()=>{
    scanTimer=null;
    if($('#sheet-backdrop').hidden)return;
    $('#sheet').classList.add('scan-found');
    const status=$('#scanner-status');
    if(status)status.textContent=`${target.name} bulundu`;
    scanCompleteTimer=setTimeout(()=>{scanCompleteTimer=null;if(!$('#sheet-backdrop').hidden)lookupCode(target.code)},700);
  },1900);
}
function stopCamera(){clearTimeout(scanTimer);clearTimeout(scanCompleteTimer);scanTimer=null;scanCompleteTimer=null;$('#sheet-backdrop').classList.remove('scanner-open');$('#sheet').classList.remove('qr-scanning','scan-found')}
async function enableNotifications(){if(!('Notification' in window)){toast('Bu tarayıcı telefon bildirimlerini desteklemiyor.');return}try{const permission=await Notification.requestPermission();if(permission==='granted'){toast('Bildirim izni verildi.');new Notification('Eylül Fuar Rehberi',{body:'Örnek: Kaydettiğin etkinlik birazdan başlıyor.'})}else toast('Bildirim izni verilmedi.')}catch{toast('Bildirim önizlemesi bu ortamda kullanılamıyor.')}}
document.addEventListener('click',event=>{const el=event.target.closest('button,[data-event]');if(!el)return;if(el.dataset.returnPublisher){state.detail=el.dataset.returnPublisher;state.previous=publisherReturn?.previous||publisherEventReturn?.previous||'discover';publisherReturn=null;publisherEventReturn=null;return go('participant')}if(el.dataset.book)return showBook(el.dataset.book);if(el.dataset.authorProgram){const match=eventSets.ankara.find(e=>e.title===el.dataset.authorProgram);state.kind='İmza';state.day=match?.day||1;state.programQuery=el.dataset.authorProgram;return go('signings')}if(el.dataset.heroIndex!==undefined)return setHomeHero(Number(el.dataset.heroIndex));if(el.dataset.tour)return moveTour(el.dataset.tour==='next'?1:-1);if(el.dataset.pickFair)return pickFair(el.dataset.pickFair);if(el.dataset.save)return save(el.dataset.save);if(el.dataset.event)return showEvent(el.dataset.event);if(el.dataset.participant)return showParticipant(el.dataset.participant);if(el.dataset.showZone)return showZone(el.dataset.showZone);if(el.dataset.zone){state.selectedZone=el.dataset.zone;return render()}if(el.dataset.phase){state.phase=el.dataset.phase;return render()}if(el.dataset.day){state.day=Number(el.dataset.day);return render()}if(el.dataset.kind){state.kind=el.dataset.kind;if(state.fair==='ankara')state.programQuery='';return render()}if(el.dataset.category){state.category=el.dataset.category;return render()}if(el.dataset.noticeFilter){state.noticeFilter=el.dataset.noticeFilter;return render()}if(el.dataset.adminAudience){state.adminAudience=el.dataset.adminAudience;return render()}if(el.dataset.quiz){state.quizAnswer=el.dataset.quiz;return render()}if(el.dataset.pref){state.prefs[el.dataset.pref]=!state.prefs[el.dataset.pref];return render()}if(el.dataset.rate){closeSheet();state.feedback=true;return toast('Demo geri bildirimin kaydedildi.')}if(el.dataset.service)return serviceSheet(el.dataset.service);if(el.dataset.page){closeSheet();return go(el.dataset.page)}if(el.dataset.action==='clear-home-search'){state.homeQuery='';$('#home-search').value='';$('#home-content').innerHTML=homeContent();$('#home-search-clear').hidden=true;$('#home-search').focus();return}switch(el.dataset.action){case 'simulate-notification':return showDemoNotification();case 'dismiss-notification':return hideDemoNotification();case 'open-notification':hideDemoNotification();return go('notifications');case 'restart-demo':return restartDemo();case 'back-book':return closeBook();case 'switch-fair':return fairSheet();case 'help':return helpSheet();case 'ticket':return ticketSheet();case 'venue':return venueSheet();case 'feedback':return feedbackSheet();case 'qr':return qrSheet('stand');case 'event-qr':return qrSheet('event');case 'preview-announcement':{const title=$('#admin-title')?.value.trim();const body=$('#admin-body')?.value.trim();if(!title||!body)return toast('Başlık ve mesajı doldur.');return showDemoNotification({title,body,audience:state.adminAudience})}case 'start-camera':return startCamera();case 'lookup-code':return lookupCode();case 'close-sheet':return closeSheet();case 'notify-permission':return enableNotifications();case 'open-signings':state.kind='İmza';state.day=1;state.programQuery='';return go('signings');case 'open-talks':state.kind='Söyleşi';state.day=1;state.programQuery='';return go('talks');case 'open-authors':state.category='Yazar';return go('discover');case 'open-program':if(state.fair==='ankara')state.kind='İmza';return go('program');case 'open-plan':return go('plan');case 'open-map':return openMapSheet();case 'scroll-services':{const row=$('#service-row');if(row)row.scrollTo({left:row.scrollLeft+row.clientWidth>=row.scrollWidth-8?0:row.scrollLeft+190,behavior:'smooth'});return}case 'map-other':return toast('Bu alan gerçek fuar krokisiyle açılacak.')}});
let heroPointerStart=null;
document.addEventListener('pointerdown',event=>{if(event.target.closest('#home-hero .home-hero-card'))heroPointerStart=event.clientX},{passive:true});
document.addEventListener('pointerup',event=>{if(heroPointerStart===null)return;const distance=event.clientX-heroPointerStart;heroPointerStart=null;if(Math.abs(distance)>55)setHomeHero(homeHeroIndex+(distance<0?1:-1))},{passive:true});
setInterval(()=>{if(state.page==='home'&&state.fair==='ankara'&&!state.homeQuery&&document.visibilityState==='visible'&&Date.now()-lastHeroInteraction>12000&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setHomeHero(homeHeroIndex+1,false)},6500);
document.addEventListener('input',event=>{if(event.target.id==='home-search'){state.homeQuery=event.target.value;$('#home-content').innerHTML=homeContent();$('#home-search-clear').hidden=!state.homeQuery.trim();return}if(event.target.id==='search'){state.query=event.target.value;$('#participant-results').innerHTML=participantCards(filteredParticipants())}if(event.target.id==='program-search'){state.programQuery=event.target.value;$('#event-results').innerHTML=programResults()}if(event.target.id==='publisher-search'){state.publisherQuery=event.target.value;$('#publisher-results').innerHTML=publisherCards(filteredPublishers())}});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSheet();if((event.key==='Enter'||event.key===' ')&&event.target.dataset.event){event.preventDefault();showEvent(event.target.dataset.event)}if(event.key==='Enter'&&event.target.id==='qr-code')lookupCode()});
$('#sheet-backdrop').addEventListener('click',event=>{if(event.target.id==='sheet-backdrop')closeSheet()});

function passport(){
  const count=stampCount();
  const featured=events().slice(0,3);
  return `<div class="screen"><button class="link-button" data-page="home">← Fuara dön</button><div class="kicker" style="margin-top:12px">İSTEĞE BAĞLI KEŞİF</div><h1 class="page-title">Fuar Pasaportu</h1><p class="page-sub">Etkinliklere katıl, çıkışta küçük bir sürprize yaklaş.</p><div class="passport-progress"><div class="passport-progress-top"><span>KEŞİF DAMGALARI</span><strong>${Math.min(count,3)} / 3</strong></div><div class="stamp-track">${[0,1,2].map(i=>`<span class="stamp ${i<count?'filled':''}">${i<count?'✓':'✳'}</span>`).join('')}</div><p>${count>=3?'Üç farklı etkinliği keşfettin! Bu ekranda ödül teslim bilgisi gösterilebilir.':'Farklı etkinliklerdeki QR kodlarını okut. Her etkinlik bir damga.'}</p></div><button class="primary full" data-action="event-qr">Etkinlik QR kodunu okut →</button>${sectionTitle('Keşfedilecek etkinlikler','program')}${featured.map(e=>`<button class="passport-event" data-event="${e.id}"><span class="${state.stamps.has(e.id)?'checked':''}">${state.stamps.has(e.id)?'✓':'○'}</span><strong>${e.title}</strong><small>${e.time} →</small></button>`).join('')}<div class="quiz-card"><span class="kicker">GÜNÜN SORUSU · İSTEĞE BAĞLI</span><h2>Eylül Fuarcılık hangi yıldan beri fuarlar düzenliyor?</h2><div class="quiz-options">${['1999','2005','2012'].map(answer=>`<button class="chip ${state.quizAnswer===answer?'active':''}" data-quiz="${answer}">${answer}</button>`).join('')}</div>${state.quizAnswer?`<p>${state.quizAnswer==='1999'?'Doğru! Eylül Fuarcılık 1999’dan beri fuarlar düzenliyor.':'Bir ipucu: Resmî organizatör sayfasına göz atabilirsin.'}</p>`:''}</div><p class="muted-note">Ödül fikri konsepttir; kapsamı ve teslim koşulları organizatör tarafından belirlenir. Bu demo QR kodları katılım kanıtı değildir.</p></div>`;
}
function admin(){return `<div class="screen"><button class="link-button" data-page="notifications">← Bildirimlere dön</button><div class="kicker" style="margin-top:12px">ORGANİZATÖR GÖRÜNÜMÜ · DEMO</div><h1 class="page-title">Tek duyuru.<br>Doğru kitle.</h1><p class="page-sub">Eylül ekibi önemli bilgiyi ziyaretçilerin uygulamasına buradan ulaştırabilir.</p><div class="announcement-lead"><small>DUYURU MERKEZİ</small><strong>Program değiştiğinde, herkes aynı bilgiyi zamanında görsün.</strong><p>Bu ekranda duyuru yalnızca ziyaretçi görünümünde önizlenir.</p></div>${sectionTitle('Kime ulaşacak?')}<button class="audience-card ${state.adminAudience==='Tüm ziyaretçiler'?'active':''}" data-admin-audience="Tüm ziyaretçiler"><strong>◉ Tüm ziyaretçiler</strong><small>Giriş, ulaşım ve genel fuar duyuruları</small></button><button class="audience-card ${state.adminAudience==='Planına ekleyenler'?'active':''}" data-admin-audience="Planına ekleyenler"><strong>♡ Planına ekleyenler</strong><small>Belirli etkinliğin takipçileri için hatırlatma</small></button><label class="admin-field"><span>DUYURU BAŞLIĞI</span><input id="admin-title" maxlength="65" value="Ana sahnede program güncellemesi"></label><label class="admin-field"><span>KISA MESAJ</span><textarea id="admin-body" maxlength="160">Bugünkü söyleşi saat 14.30'da başlayacak. Güncel konum: Ana Sahne.</textarea></label><button class="primary full" data-action="preview-announcement">Ziyaretçi görünümünde önizle →</button><p class="muted-note">Bu prototip gerçek ziyaretçilere mesaj göndermez. Canlı kullanımda yetkilendirme, onay ve gönderim kayıtları gerekir.</p></div>`}

const bookTourOrder=['home','signings','event','talks','publishersPage','participant','plan','map','notifications','admin'];
const childTourOrder=['welcome','home','program','event','discover','participant','plan','map','notifications','admin'];
let tourOrder=bookTourOrder;
let currentTourIndex=0;
const compactSlides={
  welcome:{kicker:'EYLÜL FUAR REHBERİ',title:'Fuarın tamamı.|Tek ekranda.',description:'Ziyaretçi kitap fuarını veya çocuk şenliğini seçer. Bütün yolculuk aynı uygulamada başlar.'},
  home:{kicker:'KİTAP FUARI',title:'Kitap fuarı|cebinde.',description:'Ziyaretçi yazar, yayınevi, etkinlik veya stant adını tek yerden arar. Aradığı buluşmaya ve profile hemen ulaşır.'},
  program:{kicker:'PROGRAM',title:'Program hep|elinin altında.',description:'Ziyaretçi günü seçer, imza ve söyleşilere ayrı bakar. İstediği buluşmayı kendi planına ekler.'},
  signings:{kicker:'İMZA PROGRAMI',title:'Yazarlar|bir arada.',description:'İmza ekranında yazar, saat ve yayınevi kolayca bulunur. Ziyaretçi ilgilendiği buluşmayı planına ekler.'},
  talks:{kicker:'SÖYLEŞİLER',title:'Konuları|keşfet.',description:'Söyleşiler ayrı ekranda görünür. Ziyaretçi başlığı inceler, ayrıntıya ve kişisel planına geçer.'},
  publishersPage:{kicker:'YAYINEVLERİ',title:'Yayınevini|bul.',description:'Yayınevleri ayrı listede aranır. Logosuna dokunan ziyaretçi kurum profilini, kitapları ve imza örneklerini görür.'},
  event:{kicker:'ETKİNLİK',title:'Her detay|bir arada.',description:'Ziyaretçi bulduğu imzanın saatini ve yerini görür. Tek dokunuşla planına ekleyip krokiyi açar.'},
  map:{kicker:'HARİTA',title:'Alanı aç.|Yerini gör.',description:'Ziyaretçi örnek alan planında yayınevleri, imzalar ve söyleşiler arasında tek dokunuşla geçer. Güncel stantlar açıklanınca konumları bu akışa bağlanır.'},
  discover:{kicker:'KATILIMCILAR',title:'Yazarları|keşfet.',description:'Yazar ve yayınevlerini isimle arar; ilgili profile ve imza bilgilerine kolayca geçer.'},
  book:{kicker:'KİTAP DETAYI',title:'Kitaba|yakından bak.',description:'Kapak, kısa tanıtım ve kaynak bağlantısı tek kitap sayfasında; geri tuşu yazara döner.'},
  participant:{kicker:'PROFİL',title:'Yazar ve kitabı|tanı.',description:'Yazarın fotoğrafı ve kitabı profilde görünür; program bağlantısı ilgili imza kaydını açar.'},
  plan:{kicker:'PLANIM',title:'Gününü|sen kur.',description:'Seçtiği buluşmalar kişisel listesinde toplanır. Ziyaretçi hatırlatmaları istediği gibi yönetir.'},
  notifications:{kicker:'BİLDİRİMLER',title:'Duyurular|yerini bulur.',description:'Program değişikliği veya genel fuar duyurusu ekranın üstünde belirir. Ziyaretçi ayrıntıyı açabilir.'},
  admin:{kicker:'EYLÜL İÇİN',title:'Kontrol|Eylül’de.',description:'Eylül ekibi duyuruyu hazırlar, hedef kitleyi seçer ve ziyaretçi görünümünde önizler.'},
  passport:{kicker:'FUAR PASAPORTU',title:'Katıldıkça|keşfet.',description:'Etkinlik QR kodlarıyla katılım fikri, küçük ödüller için isteğe bağlı bir keşif akışı.'},
  about:{kicker:'EYLÜL FUARCILIK',title:'Her adımda|Eylül.',description:'Fuarı düzenleyen marka, uygulamanın içinde de görünür. Ziyaretçi organizatörü kolayca tanır.'}
};
$('.presentation').style.setProperty('--tour-steps',tourOrder.length);
function showTourStep(index){
  const page=tourOrder[index];
  if(!page||page===state.page)return;
  if(page==='signings'){state.kind='İmza';state.day=2;state.programQuery=''}
  if(page==='talks'){state.kind='Söyleşi';state.day=1;state.programQuery=''}
  if(page==='event'){state.detail=state.fair==='ankara'?'a6':'c1';state.previous=state.fair==='ankara'?'signings':'home'}
  if(page==='participant'){state.detail=state.fair==='ankara'?'alfa':'toyzz';state.previous=state.fair==='ankara'?'publishersPage':'discover'}
  currentTourIndex=index;
  tourNavigationFromScroll=true;
  try{closeSheet();go(page)}finally{tourNavigationFromScroll=false}
}
function moveTour(direction){
  const current=currentTourIndex;
  const next=Math.max(0,Math.min(tourOrder.length-1,current+direction));
  if(next===current)return;
  showTourStep(next);
  if(window.innerWidth>850)window.scrollTo({top:next*window.innerHeight,behavior:'instant'});
}
function restartDemo(){hideDemoNotification();demoNoticeCursor=0;homeHeroIndex=0;currentTourIndex=0;tourOrder=bookTourOrder;$('.presentation').style.setProperty('--tour-steps',tourOrder.length);routeTransition='page';animateNextRender=true;state.page='home';state.fair='ankara';state.day=1;state.kind='Tümü';state.programQuery='';state.publisherQuery='';state.homeQuery='';state.category='Tümü';state.query='';state.saved.clear();state.stamps.clear();state.quizAnswer=null;state.demoNotice=null;state.noticeFilter='Tümü';state.prefs={event:true,change:true,general:false};localStorage.removeItem('eylul-rehber-saved');localStorage.removeItem('eylul-rehber-stamps');closeSheet();render();$('#scroll-area').scrollTop=0;window.scrollTo({top:0,behavior:'instant'})}
let lastPresentedKey='';
function updatePresentation(){
  const presentationKey=`${state.fair}:${state.page}:${state.page==='participant'?state.detail:''}`;
  if(presentationKey!==lastPresentedKey){const preview=$('.preview-copy');preview.classList.remove('is-changing');void preview.offsetWidth;preview.classList.add('is-changing');lastPresentedKey=presentationKey}
  let slide=compactSlides[state.page]||compactSlides.home;
  if(state.fair==='children'){
    const childSlides={home:{kicker:'ÇOCUK ŞENLİĞİ',title:'Ailece|kolay keşif.',description:'Aileler etkinliği, markayı veya alan kodunu tek aramadan bulur. Program ve haritaya kolayca geçer.'},program:{title:'Günü birlikte|planla.',description:'Etkinlikler yaşa ve saate göre görülebilir. Aileler ilgilendiklerini planına ekler.'},event:{description:'Etkinliğin yaşı, saati ve yeri açıkça görünür; aileler kendi planına ekleyebilir.'},map:{description:'Sahne ve atölyeler alan planında bulunur; konumlar gerçek programla güncellenebilir.'},discover:{title:'Markaları|keşfet.',description:'Markalar ve etkinlik alanları isimle aranır; her birinin ayrı profili açılır.'},participant:{kicker:'MARKA PROFİLİ',title:'Markaya|yakından bak.',description:'Markanın web sitesi, etkinlikleri ve örnek fırsat alanı tek sayfada buluşur.'}};
    slide={...slide,...childSlides[state.page]};
    if(state.page==='participant'&&childPlaces.some(p=>p.id===state.detail)){
      slide={...slide,kicker:'ŞENLİK ALANI',title:'Alanı|kolay bul.',description:'Ziyaretçi aradığı alanın kodunu ve kısa bilgisini görür. Tek dokunuşla krokide işaretli yerine geçer.'};
    }
  }else if(state.page==='participant'&&publishers.some(p=>p.id===state.detail)){
    slide={...slide,kicker:'YAYINEVİ',title:'Yayınevini|keşfet.',description:'Yayınevinin tanıtımı, yazarları ve resmî sitesi tek profilde yer alır.'};
  }else if(state.page==='event'&&bookTalks.some(e=>e.id===state.detail)){
    slide={...slide,kicker:'SÖYLEŞİ',title:'Söyleşiye|yakından bak.',description:'Konu, saat, salon ve konuşmacı tek ekranda görünür. Ziyaretçi bu buluşmayı planına ekleyebilir.'};
  }
  const pageStep=tourOrder.indexOf(state.page);
  const step=pageStep>=0?pageStep:currentTourIndex;
  $('#preview-count').textContent=pageStep>=0?`${String(step+1).padStart(2,'0')} / ${tourOrder.length}`:'EKRAN';
  $('#preview-kicker').textContent=slide.kicker;
  $('#preview-title').innerHTML=slide.title.split('|').map((part,index)=>`<span class="${index?'accent':''}">${escapeHTML(part)}</span>`).join('<br>');
  $('#preview-description').textContent=slide.description;
  $('#tour-step-label').textContent=pageStep>=0?`${step+1}. adım / ${tourOrder.length}`:'Serbest keşif';
  $('#tour-progress b').style.width=`${(step+1)/tourOrder.length*100}%`;
  $('#tour-previous').disabled=step===0;
  $('#tour-next').disabled=step===tourOrder.length-1;
  $('#preview-note').textContent=state.fair==='ankara'?'2026 fuarı için konsept sunum · Program örnektir':'Konsept demo · Çocuk Şenliği içeriği örnektir';
}
let tourScrollFrame=0;
let tourScrollIntentUntil=0;
window.addEventListener('wheel',event=>{
  if(window.innerWidth>850&&!event.target.closest('.phone'))tourScrollIntentUntil=performance.now()+1200;
},{passive:true});
window.addEventListener('keydown',event=>{
  if(window.innerWidth>850&&['PageDown','PageUp','ArrowDown','ArrowUp',' '].includes(event.key)&&!event.target.closest('input,textarea,button,.phone'))tourScrollIntentUntil=performance.now()+1200;
});
window.addEventListener('scroll',()=>{
  if(window.innerWidth<=850||tourScrollFrame||performance.now()>tourScrollIntentUntil)return;
  tourScrollFrame=requestAnimationFrame(()=>{
    tourScrollFrame=0;
    const index=Math.max(0,Math.min(tourOrder.length-1,Math.round(window.scrollY/window.innerHeight)));
    if(index!==currentTourIndex)showTourStep(index);
  });
},{passive:true});
if(window.innerWidth>850){history.scrollRestoration='manual';window.scrollTo(0,0)}
render();
