import fitz, segno, sys
root, shots, out = sys.argv[1:4]
MM = 72/25.4
def rgb(h): return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
paper, ink, soft, line, brand, deep = map(rgb, ('FAF6EF','1A1712','5B5346','E8E0D2','F19A1B','B96E05'))
lora = root+'/ios/EylulRehber/Resources/Fonts/Lora-Bold.ttf'
arial='/System/Library/Fonts/Supplemental/Arial.ttf'; bold='/System/Library/Fonts/Supplemental/Arial Bold.ttf'
FONT={'lora':lora,'arial':arial,'bold':bold}
def rounded_mask():
    d=fitz.open(); pg=d.new_page(width=1320,height=2868)
    pg.draw_rect(pg.rect,fill=(0,0,0),color=None)
    pg.draw_rect(pg.rect,fill=(1,1,1),color=None,radius=.125)
    return pg.get_pixmap(colorspace=fitz.csGRAY).tobytes('png')
MASK=rounded_mask()
class P:
    def __init__(s,W,H,bleed):
        s.W,s.H,s.bleed=W,H,bleed
        s.doc=fitz.open(); s.page=s.doc.new_page(width=W*MM,height=H*MM)
        for k,v in FONT.items(): s.page.insert_font(fontname=k,fontfile=v)
    def rect(s,x,y,w,h,fill,color=None,width=0,radius=None,opacity=1):
        s.page.draw_rect(fitz.Rect(x*MM,y*MM,(x+w)*MM,(y+h)*MM),color=color,fill=fill,width=width*MM,radius=radius,fill_opacity=opacity)
    def text(s,t,x,y,size,font,color,align='l',width=None):
        w=fitz.Font(fontfile=FONT[font]).text_length(t,fontsize=size*MM)/MM
        if align=='c': x-=w/2
        s.page.insert_text((x*MM,y*MM),t,fontname=font,fontsize=size*MM,color=color)
    def phone(s,x,y,w,shot):
        h=w*2868/1320; b=w*.028
        for i in range(8,0,-1):
            e=w*.012*i
            s.rect(x-b-e*.5,y-b+e*.7,w+2*b+e,h+2*b+e*.6,(0,0,0),radius=.15,opacity=.022)
        s.page.insert_image(fitz.Rect(x*MM,y*MM,(x+w)*MM,(y+h)*MM),filename=shots+'/'+shot+'.png',mask=MASK)
        sh=s.page.new_shape()
        sh.draw_rect(fitz.Rect((x-b)*MM,(y-b)*MM,(x+w+b)*MM,(y+h+b)*MM),radius=.155)
        sh.draw_rect(fitz.Rect(x*MM,y*MM,(x+w)*MM,(y+h)*MM),radius=.125)
        sh.finish(color=None,fill=ink,even_odd=True,width=0); sh.commit()
    def qr(s,x,y,card):
        s.rect(x,y,card,card,(1,1,1),radius=.06)
        q=segno.make('https://fuar.bulbi.co/indir',error='h',boost_error=False,micro=False)
        rows=[list(r) for r in q.matrix]; n=len(rows); m=card*.92/(n+2); qx=x+(card-n*m)/2; qy=y+(card-n*m)/2
        sh=s.page.new_shape()
        for yy,row in enumerate(rows):
            xx=0
            while xx<n:
                if row[xx]:
                    e=xx
                    while e+1<n and row[e+1]: e+=1
                    sh.draw_rect(fitz.Rect((qx+xx*m)*MM,(qy+yy*m)*MM,(qx+(e+1)*m)*MM,(qy+(yy+1)*m)*MM)); xx=e+1
                else: xx+=1
        sh.finish(color=None,fill=(0,0,0),width=0); sh.commit()
    def logo(s,x,y,w):
        s.page.insert_image(fitz.Rect(x*MM,y*MM,(x+w)*MM,(y+w*336/1074)*MM),filename=root+'/ios/Branding/eylul-logo.png')
    def save(s,name,dpi):
        b=s.bleed
        s.page.set_mediabox(fitz.Rect(0,0,s.W*MM,s.H*MM))
        if b: s.page.set_trimbox(fitz.Rect(b*MM,b*MM,(s.W-b)*MM,(s.H-b)*MM))
        s.doc.set_metadata({'title':'Eylül Fuarcılık uygulamasını indir'})
        s.doc.save(out+'/'+name+'.pdf',garbage=4,deflate=True)
        fitz.open(out+'/'+name+'.pdf')[0].get_pixmap(dpi=dpi).save(out+'/'+name+'-onizleme.png')
FEATURES=[('home','Fuarı keşfet','Konuklar, duyurular, sponsorlar'),('program','Programı takip et','İmza günleri ve söyleşiler'),('map','Stantı bul','Yayınevleri krokide'),('gifts','QR okut, hediye kazan','Stantları gez, puan topla')]
# A3 dikey (297×420, 3 mm taşma)
W,H,B=303,426,3
p=P(W,H,B); p.rect(0,0,W,H,paper)
p.logo(23,21,64)
p.text('Fuar',23,70,31,'lora',ink); p.text('cebinde.',23,99,31,'lora',deep)
p.text('Program, kroki, imza günleri ve hediyeler tek uygulamada.',23,113,6.1,'arial',soft)
band=H-92
p.rect(0,band,W,92,ink)
pw=63; gap=8; x0=(W-(pw*4+gap*3))/2; y0=132
for i,(shot,t,d) in enumerate(FEATURES):
    x=x0+i*(pw+gap); y=y0+(0 if i%2==0 else 12)
    p.phone(x,y,pw,shot)
    bottom=y+pw*2868/1320+13
    p.text(t,x+pw/2,bottom,4.9,'bold',ink,'c')
    p.text(d,x+pw/2,bottom+7,3.8,'arial',soft,'c')
qs=68; qx=W-23-qs; qy=band+12
p.text('Uygulamayı indir',23,band+29,14.5,'lora',(1,1,1))
p.text('Telefonunun kamerasını QR’a tut,',23,band+42,6.6,'arial',(.85,.82,.77))
p.text('App Store ya da Google Play açılsın.',23,band+51,6.6,'arial',(.85,.82,.77))
p.text('Ücretsiz',23,band+65,8,'bold',brand)
p.text('fuar.bulbi.co/indir',23,band+75,6.2,'arial',(.85,.82,.77))
p.qr(qx,qy,qs)
p.save('tanitim-poster-A3',110)
# Billboard 4:3, 1:10 ölçek (400×300 cm → 400×300 mm)
W,H=400,300
p=P(W,H,0); p.rect(0,0,W,H,paper)
p.rect(0,0,150,H,ink)
p.rect(14,14,84,32,(1,1,1),radius=.2); p.logo(20,18.5,73)
p.text('Fuar',14,86,30,'lora',(1,1,1)); p.text('cebinde.',14,114,30,'lora',brand)
p.text('Program, kroki ve hediyeler',14,131,7.4,'arial',(.85,.82,.77))
qs=104; p.qr(14,146,qs)
p.text('Kamerayla okut, ücretsiz indir',14,265,6.6,'bold',(1,1,1))
p.text('fuar.bulbi.co/indir',14,276,6.6,'arial',(.85,.82,.77))
side=66; main=88
p.phone(158,68,side,'program'); p.phone(326,68,side,'gifts'); p.phone(231,24,main,'home')
p.text('Program · Kroki · İmza günleri · Hediyeler',275,249,8,'bold',ink,'c')
p.text('App Store ve Google Play’de ücretsiz',275,265,6.6,'arial',soft,'c')
p.save('tanitim-billboard-400x300cm-olcek-1-10',90)
