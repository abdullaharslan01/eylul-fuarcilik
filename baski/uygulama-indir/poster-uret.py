# Girişteki "uygulamayı indir" posterleri: 6 tasarım, A3 (297×420 mm, 3 mm taşma; A1/A0 ve 70×100'e ölçeklenir).
# Kullanım: python poster-uret.py <kök> <ekran-klasörü> <çıktı-klasörü>
# Ekran klasörü: home, program, event, author, map, plan, gifts .png (1320×2868, yalnızca demo veri).
import fitz, segno, sys
root, shots, out = sys.argv[1:4]
MM = 72/25.4
def rgb(h): return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
paper, ink, soft, line, brand, deep, cream2 = map(rgb, ('FAF6EF','1A1712','5B5346','E8E0D2','F19A1B','B96E05','F3EADC'))
muted = (.85,.82,.77)
FONT = {'lora': root+'/ios/EylulRehber/Resources/Fonts/Lora-Bold.ttf',
        'arial': '/System/Library/Fonts/Supplemental/Arial.ttf',
        'bold': '/System/Library/Fonts/Supplemental/Arial Bold.ttf'}
URL = 'https://fuar.bulbi.co/indir'

def rounded_mask():
    d = fitz.open(); pg = d.new_page(width=1320, height=2868)
    pg.draw_rect(pg.rect, fill=(0,0,0), color=None)
    pg.draw_rect(pg.rect, fill=(1,1,1), color=None, radius=.125)
    return pg.get_pixmap(colorspace=fitz.csGRAY).tobytes('png')
MASK = rounded_mask()

class P:
    def __init__(s, W=303, H=426, bleed=3):
        s.W, s.H, s.bleed = W, H, bleed
        s.doc = fitz.open(); s.page = s.doc.new_page(width=W*MM, height=H*MM)
        for k, v in FONT.items(): s.page.insert_font(fontname=k, fontfile=v)
    def rect(s, x, y, w, h, fill, radius=None, opacity=1):
        s.page.draw_rect(fitz.Rect(x*MM, y*MM, (x+w)*MM, (y+h)*MM), color=None, fill=fill, width=0, radius=radius, fill_opacity=opacity)
    def tw(s, t, size, font): return fitz.Font(fontfile=FONT[font]).text_length(t, fontsize=size*MM)/MM
    def text(s, t, x, y, size, font, color, align='l'):
        w = s.tw(t, size, font)
        if align == 'c': x -= w/2
        if align == 'r': x -= w
        s.page.insert_text((x*MM, y*MM), t, fontname=font, fontsize=size*MM, color=color)
    def phone(s, x, y, w, shot, frame=None):
        frame = frame or ink
        h = w*2868/1320; b = w*.028
        for i in range(8, 0, -1):
            e = w*.012*i
            s.rect(x-b-e*.5, y-b+e*.7, w+2*b+e, h+2*b+e*.6, (0,0,0), radius=.15, opacity=.022)
        s.page.insert_image(fitz.Rect(x*MM, y*MM, (x+w)*MM, (y+h)*MM), filename=f'{shots}/{shot}.png', mask=MASK)
        sh = s.page.new_shape()
        sh.draw_rect(fitz.Rect((x-b)*MM, (y-b)*MM, (x+w+b)*MM, (y+h+b)*MM), radius=.155)
        sh.draw_rect(fitz.Rect(x*MM, y*MM, (x+w)*MM, (y+h)*MM), radius=.125)
        sh.finish(color=None, fill=frame, even_odd=True, width=0); sh.commit()
        return h
    def qr(s, x, y, card, bg=(1,1,1)):
        s.rect(x, y, card, card, bg, radius=.06)
        q = segno.make(URL, error='h', boost_error=False, micro=False)
        rows = [list(r) for r in q.matrix]; n = len(rows); m = card*.92/(n+2)
        qx = x+(card-n*m)/2; qy = y+(card-n*m)/2
        sh = s.page.new_shape()
        for yy, row in enumerate(rows):
            xx = 0
            while xx < n:
                if row[xx]:
                    e = xx
                    while e+1 < n and row[e+1]: e += 1
                    sh.draw_rect(fitz.Rect((qx+xx*m)*MM, (qy+yy*m)*MM, (qx+(e+1)*m)*MM, (qy+(yy+1)*m)*MM)); xx = e+1
                else: xx += 1
        sh.finish(color=None, fill=(0,0,0), width=0); sh.commit()
    def logo(s, x, y, w, card=False):
        h = w*336/1074
        if card: s.rect(x-w*.09, y-w*.07, w*1.18, h+w*.14, (1,1,1), radius=.2)
        s.page.insert_image(fitz.Rect(x*MM, y*MM, (x+w)*MM, (y+h)*MM), filename=root+'/ios/Branding/eylul-logo.png')
    def save(s, name, dpi=110):
        b = s.bleed
        s.page.set_mediabox(fitz.Rect(0, 0, s.W*MM, s.H*MM))
        if b: s.page.set_trimbox(fitz.Rect(b*MM, b*MM, (s.W-b)*MM, (s.H-b)*MM))
        s.doc.set_metadata({'title': 'Eylül Fuarcılık uygulamasını indir'})
        s.doc.save(f'{out}/{name}.pdf', garbage=4, deflate=True)
        fitz.open(f'{out}/{name}.pdf')[0].get_pixmap(dpi=dpi).save(f'{out}/{name}-onizleme.png')

W, H = 303, 426
L = 23  # sol kenar (taşma dahil)

# 1 · Fuar cebinde (açık): dört özellik, altta koyu QR bandı
p = P(); p.rect(0, 0, W, H, paper)
p.logo(L, 21, 64)
p.text('Fuar', L, 70, 31, 'lora', ink); p.text('cebinde.', L, 99, 31, 'lora', deep)
p.text('Program, kroki, imza günleri ve hediyeler tek uygulamada.', L, 113, 6.1, 'arial', soft)
band = H-92; p.rect(0, band, W, 92, ink)
FEATURES = [('home', 'Fuarı keşfet', 'İmza günleri, yazarlar, duyurular'), ('program', 'Programı takip et', 'İmza günleri ve söyleşiler'),
            ('map', 'Stantı bul', 'Yayınevleri krokide'), ('gifts', 'QR okut, hediye kazan', 'Stantları gez, puan topla')]
pw, gap = 63, 8; x0 = (W-(pw*4+gap*3))/2
for i, (shot, t, d) in enumerate(FEATURES):
    x = x0+i*(pw+gap); y = 132+(0 if i % 2 == 0 else 12)
    bottom = y+p.phone(x, y, pw, shot)+13
    p.text(t, x+pw/2, bottom, 4.9, 'bold', ink, 'c'); p.text(d, x+pw/2, bottom+7, 3.8, 'arial', soft, 'c')
p.text('Uygulamayı indir', L, band+29, 14.5, 'lora', (1,1,1))
p.text('Telefonunun kamerasını QR’a tut,', L, band+42, 6.6, 'arial', muted)
p.text('App Store ya da Google Play açılsın.', L, band+51, 6.6, 'arial', muted)
p.text('Ücretsiz', L, band+65, 8, 'bold', brand); p.text('fuar.bulbi.co/indir', L, band+75, 6.2, 'arial', muted)
p.qr(W-L-68, band+12, 68)
p.save('poster-1-fuar-cebinde-acik')

# 2 · Fuar cebinde (koyu): üç telefon, beyaz QR kartı
p = P(); p.rect(0, 0, W, H, ink)
p.logo(L+6, 24, 60, card=True)
p.text('Fuar', L, 82, 34, 'lora', (1,1,1)); p.text('cebinde.', L, 114, 34, 'lora', brand)
p.text('Programı takip et, stantı bul, imza gününü kaçırma.', L, 129, 6.3, 'arial', muted)
side, main = 70, 86
p.phone(26, 168, side, 'event'); p.phone(W-26-side, 168, side, 'plan'); p.phone((W-main)/2, 146, main, 'home')
cy = H-84; p.rect(L-6, cy, W-2*(L-6), 66, (1,1,1), radius=.12)
p.qr(W-L-56, cy+5, 56)
p.text('Uygulamayı indir', L+6, cy+24, 13, 'lora', ink)
p.text('Kamerayı QR’a tut, ücretsiz indir.', L+6, cy+37, 6.2, 'arial', soft)
p.text('App Store · Google Play', L+6, cy+50, 6.2, 'bold', deep)
p.save('poster-2-fuar-cebinde-koyu')

# 3 · Turuncu: tek büyük telefon, büyük çağrı
p = P(); p.rect(0, 0, W, H, brand)
p.logo(L+6, 24, 60, card=True)
p.text('Uygulamayı', L, 86, 30, 'lora', ink); p.text('indir,', L, 117, 30, 'lora', ink)
p.text('fuarı kaçırma.', L, 148, 30, 'lora', (1,1,1))
p.text('Programın, planın ve haritan her an yanında.', L, 163, 6.6, 'arial', ink)
big = 96; p.phone(W-L-big+4, 176, big, 'home')
qs = 82; qy = 190; p.qr(L, qy, qs)
p.text('Kamerayı QR’a tut', L, qy+qs+16, 7.4, 'bold', ink)
p.text('App Store ya da Google Play açılır.', L, qy+qs+26, 6, 'arial', ink)
p.text('Ücretsiz', L, qy+qs+44, 10, 'bold', (1,1,1))
p.rect(0, H-30, W, 30, ink)
p.text('fuar.bulbi.co/indir', W/2, H-12, 7.6, 'bold', (1,1,1), 'c')
p.save('poster-3-turuncu')

# 4 · İmza saatini kaçırma: etkinlik ve plan ekranı
p = P(); p.rect(0, 0, W, H, paper)
p.rect(0, 0, W, 152, ink)
p.logo(L+6, 24, 56, card=True)
p.text('İmza saatini', L, 92, 30, 'lora', (1,1,1)); p.text('kaçırma.', L, 121, 30, 'lora', brand)
p.text('Yazarını planına ekle, başlamadan haber verelim.', L, 137, 6.3, 'arial', muted)
w1, w2 = 80, 70
p.phone(L+10, 166, w1, 'event'); p.phone(W-L-w2-8, 184, w2, 'plan')
bullets = [('Takvim', 'Gün gün imza ve söyleşiler'), ('Planım', 'Seçtiklerin tek listede'), ('Hatırlatma', 'Başlamadan bildirim')]
cy = H-66
p.rect(L-6, cy, W-2*(L-6), 54, (1,1,1), radius=.1)
for i, (t, d) in enumerate(bullets):
    p.rect(L+4, cy+8+i*15, 4, 4, brand, radius=.5)
    p.text(t, L+13, cy+12+i*15, 6.2, 'bold', ink); p.text(d, L+13, cy+18.5+i*15, 4.8, 'arial', soft)
p.qr(W-L-48, cy+3, 48)
p.text('Okut, ücretsiz indir', W-L-60, cy+29, 5, 'bold', deep, 'r')
p.save('poster-4-imza-saati')

# 5 · Stantı bul: kroki öne çıkıyor
p = P(); p.rect(0, 0, W, H, cream2)
p.logo(L, 22, 60)
p.text('Aradığın stant', L, 76, 27, 'lora', ink); p.text('bir dokunuş uzakta.', L, 102, 27, 'lora', deep)
p.text('Yayınevini ara, krokide yerini gör, yolunu bul.', L, 117, 6.3, 'arial', soft)
big = 106; p.phone(W-L-big-2, 134, big, 'map')
qs = 74; qx = L; qy = 150
p.qr(qx, qy, qs)
p.text('Uygulamayı indir', qx, qy+qs+15, 9, 'lora', ink)
p.text('Kamerayı QR’a tut', qx, qy+qs+26, 5.8, 'bold', soft)
for i, t in enumerate(['Kroki ve stantlar', 'Program ve imza günleri', 'Planım ve hatırlatmalar']):
    p.rect(qx, qy+qs+38+i*12, 3.6, 3.6, brand, radius=.5); p.text(t, qx+8, qy+qs+41.3+i*12, 5.4, 'arial', ink)
p.rect(0, H-30, W, 30, ink)
p.text('App Store ve Google Play’de ücretsiz · fuar.bulbi.co/indir', W/2, H-12, 6.4, 'bold', (1,1,1), 'c')
p.save('poster-5-stanti-bul')

# 6 · QR önde: uzaktan okunur, sade
p = P(); p.rect(0, 0, W, H, paper)
p.logo((W-70)/2, 24, 70)
p.text('Fuar cebinde.', W/2, 92, 27, 'lora', ink, 'c')
p.text('Kamerayı tut, uygulama gelsin.', W/2, 108, 7.6, 'arial', soft, 'c')
qs = 160; qx = (W-qs)/2; qy = 124
p.rect(qx-6, qy-6, qs+12, qs+12, brand, radius=.07)
p.qr(qx, qy, qs)
sw = 38; ys = qy+qs+20
for i, shot in enumerate(['program', 'home', 'map']):
    x = W/2-sw*1.5-8+i*(sw+8); p.phone(x, ys+(0 if i == 1 else 8), sw, shot)
p.rect(0, H-32, W, 32, brand)
p.text('Ücretsiz · App Store ve Google Play', W/2, H-13, 8, 'bold', (1,1,1), 'c')
p.save('poster-6-qr-onde')

# 7 · Yazarlar: yazar sayfası ve etkinlik
p = P(); p.rect(0, 0, W, H, paper)
p.rect(0, 0, 12, H, brand)
p.logo(L+4, 22, 58)
p.text('Sevdiğin yazar', L+4, 78, 27, 'lora', ink); p.text('hangi gün, hangi saatte?', L+4, 104, 22, 'lora', deep)
p.text('Yazarları, kitaplarını ve imza günlerini uygulamada bul.', L+4, 119, 6.2, 'arial', soft)
w1, w2 = 92, 74
p.phone(L+6, 140, w1, 'author'); p.phone(W-L-w2-2, 168, w2, 'event')
by = H-60; p.rect(0, by, W, 60, ink)
p.qr(W-L-50, by+5, 50)
p.text('Uygulamayı indir', L+4, by+22, 12, 'lora', (1,1,1))
p.text('Kamerayı QR’a tut · App Store ve Google Play’de ücretsiz', L+4, by+35, 5.4, 'arial', muted)
p.text('fuar.bulbi.co/indir', L+4, by+46, 5.4, 'bold', brand)
p.save('poster-7-yazarlar')

# 8 · Kendi planını yap: koyu turuncu zemin
p = P(); p.rect(0, 0, W, H, deep)
p.logo(L+6, 24, 56, card=True)
p.text('Fuarı kendi', L, 84, 30, 'lora', (1,1,1)); p.text('planınla gez.', L, 114, 30, 'lora', ink)
p.text('Gitmek istediklerini seç, Planım’da sırayla gör.', L, 129, 6.4, 'arial', (1,1,1))
big = 92; p.phone((W-big)/2, 142, big, 'plan')
cy = H-62; p.rect(L-6, cy, W-2*(L-6), 48, (1,1,1), radius=.14)
p.qr(W-L-44, cy+2, 44)
p.text('Uygulamayı indir', L+6, cy+19, 11, 'lora', ink)
p.text('Kamerayı QR’a tut, ücretsiz indir.', L+6, cy+31, 5.6, 'arial', soft)
p.save('poster-8-planim')

# 9 · Hediyeler: QR okut, puan topla
p = P(); p.rect(0, 0, W, H, ink)
p.logo(L+6, 24, 56, card=True)
p.text('Stantları gez,', L, 84, 29, 'lora', (1,1,1)); p.text('hediyeni al.', L, 113, 29, 'lora', brand)
p.text('Stantlardaki QR’ları okut, puan topla, hediyeni Danışma’dan al.', L, 128, 6, 'arial', muted)
steps = [('1', 'İndir'), ('2', 'QR okut'), ('3', 'Puan topla'), ('4', 'Hediyeni al')]
sx = L; sy = 142
for i, (n, t) in enumerate(steps):
    x = sx+i*66
    p.rect(x, sy, 12, 12, brand, radius=.5); p.text(n, x+6, sy+8.4, 6.5, 'bold', ink, 'c')
    p.text(t, x+16, sy+8.2, 6, 'bold', (1,1,1))
big = 96; p.phone(W-L-big, 168, big, 'gifts')
qs = 84; p.qr(L, 196, qs)
p.text('Önce uygulamayı indir', L, 196+qs+15, 7.4, 'bold', (1,1,1))
p.text('Kamerayı QR’a tut, App Store', L, 196+qs+26, 5.8, 'arial', muted)
p.text('ya da Google Play açılsın.', L, 196+qs+34, 5.8, 'arial', muted)
p.text('Ücretsiz', L, 196+qs+50, 10, 'bold', brand)
p.save('poster-9-hediyeler')

# 10 · Büyük daire: iri başlık, daire içinde telefon
p = P(); p.rect(0, 0, W, H, paper)
p.page.draw_circle((W*.68*MM, 250*MM), 108*MM, color=None, fill=brand)
p.logo(L, 22, 60)
p.text('Fuar', L, 82, 40, 'lora', ink); p.text('cebinde.', L, 120, 40, 'lora', ink)
big = 92; p.phone(W*.68-big/2, 150, big, 'home')
qs = 70; qy = H-qs-26; p.qr(L, qy, qs)
p.text('Kamerayı tut,', L, qy-22, 9, 'bold', ink); p.text('uygulamayı indir.', L, qy-11, 9, 'bold', ink)
p.text('Ücretsiz · fuar.bulbi.co/indir', L, H-14, 6.2, 'bold', deep)
p.save('poster-10-daire')
