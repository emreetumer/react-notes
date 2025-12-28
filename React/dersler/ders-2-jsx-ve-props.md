# Ders 2: JSX ve Props 🎁

## 🤔 JSX Nedir?

**JSX = JavaScript XML**

JSX, JavaScript içinde HTML yazmamızı sağlayan bir syntax'dır. Arka planda JavaScript'e dönüştürülür.

```jsx
// JSX yazıyoruz
const element = <h1>Merhaba Dünya!</h1>;

// Arka planda şuna dönüşür
const element = React.createElement('h1', null, 'Merhaba Dünya!');
```

**.NET'teki Razor'a benzer:**
```csharp
// Razor (C#)
<h1>@Model.Baslik</h1>

// JSX (React)
<h1>{props.baslik}</h1>
```

---

## 🎨 JSX İçinde JavaScript Kullanma

JSX içinde `{}` kullanarak JavaScript kodu yazabiliriz:

```jsx
function KarsilaMesaji() {
    const isim = "Emre";
    const yas = 22;
    const meslek = ".NET Developer";
    
    return (
        <div>
            <h1>Merhaba {isim}!</h1>
            <p>Yaş: {yas}</p>
            <p>Meslek: {meslek}</p>
            <p>Yetişkin mi? {yas >= 18 ? "Evet" : "Hayır"}</p>
            <p>1 + 1 = {1 + 1}</p>
        </div>
    );
}
```

**C# String Interpolation ile karşılaştırma:**
```csharp
// C#
$"Merhaba {isim}! Yaşın {yas}"

// React JSX
<p>Merhaba {isim}! Yaşın {yas}</p>
```

---

## 🎁 Props Nedir?

**Props = Properties (Özellikler)**

Props, component'lere **dışarıdan veri göndermek** için kullanılır. C#'taki method parametreleri gibidir!

### C# Method ile Karşılaştırma:

```csharp
// C# Method
public string SelamVer(string isim, int yas) {
    return $"Merhaba {isim}, {yas} yaşındasın!";
}

// Kullanım
SelamVer("Emre", 22);
```

```jsx
// React Component
function SelamVer(props) {
    return <p>Merhaba {props.isim}, {props.yas} yaşındasın!</p>;
}

// Kullanım
<SelamVer isim="Emre" yas={22} />
```

---

## 📝 Props Örnekleri

### Örnek 1: Basit Props

```jsx
function Karsilama(props) {
    return (
        <div>
            <h1>Merhaba {props.isim}!</h1>
            <p>Hoşgeldin!</p>
        </div>
    );
}

// Kullanım
function App() {
    return (
        <div>
            <Karsilama isim="Emre" />
            <Karsilama isim="Ahmet" />
            <Karsilama isim="Ayşe" />
        </div>
    );
}
```

### Örnek 2: Birden Fazla Props

```jsx
function KullaniciKarti(props) {
    return (
        <div className="kart">
            <h2>{props.isim}</h2>
            <p><strong>Yaş:</strong> {props.yas}</p>
            <p><strong>Meslek:</strong> {props.meslek}</p>
            <p><strong>Şehir:</strong> {props.sehir}</p>
        </div>
    );
}

// Kullanım
<KullaniciKarti 
    isim="Emre" 
    yas={22} 
    meslek=".NET Developer" 
    sehir="İstanbul" 
/>
```

---

## 🎯 Destructuring (Modern Yaklaşım)

Props'ları kullanmanın daha temiz bir yolu:

```jsx
// Eski yol
function KullaniciKarti(props) {
    return <h2>{props.isim}</h2>;
}

// Modern yol (Destructuring)
function KullaniciKarti({ isim, yas, meslek }) {
    return (
        <div>
            <h2>{isim}</h2>
            <p>Yaş: {yas}</p>
            <p>Meslek: {meslek}</p>
        </div>
    );
}
```

**C# ile karşılaştırma:**
```csharp
// C# Named Parameters
public void Goster(string isim, int yas, string meslek) {
    // ...
}

// React Destructuring
function Goster({ isim, yas, meslek }) {
    // ...
}
```

---

## 🔧 Farklı Veri Tipleri ile Props

### String Props
```jsx
<Component isim="Emre" />
```

### Number Props (süslü parantez gerekli!)
```jsx
<Component yas={22} />
```

### Boolean Props
```jsx
<Component aktif={true} />
<Component aktif />  {/* true anlamına gelir */}
```

### Array Props
```jsx
<Component hobiler={["Kodlama", "Spor", "Müzik"]} />
```

### Object Props
```jsx
<Component 
    kullanici={{ 
        isim: "Emre", 
        yas: 22 
    }} 
/>
```

---

## 🎨 Stil (Style) Props

### Inline Style Kullanımı

```jsx
function RenkliKutu({ renk, genislik, yukseklik }) {
    return (
        <div style={{
            backgroundColor: renk,
            width: genislik,
            height: yukseklik,
            padding: '20px',
            borderRadius: '8px'
        }}>
            Bu kutu {renk} renkli!
        </div>
    );
}

// Kullanım
<RenkliKutu renk="blue" genislik="200px" yukseklik="100px" />
```

**DİKKAT:** Style'da:
- ✅ `backgroundColor` (camelCase)
- ❌ `background-color` (CSS'teki gibi değil!)

---

## 🎯 Default Props

Props verilmezse varsayılan değerler:

```jsx
function Selamla({ isim = "Misafir", mesaj = "Hoşgeldin!" }) {
    return (
        <div>
            <h1>{mesaj}</h1>
            <p>Merhaba {isim}!</p>
        </div>
    );
}

// Props vermeden kullanım
<Selamla />  
// Çıktı: Merhaba Misafir! Hoşgeldin!

// Props ile kullanım
<Selamla isim="Emre" mesaj="Hoşbulduk!" />
// Çıktı: Merhaba Emre! Hoşbulduk!
```

---

## 🔥 Gerçek Dünya Örneği: Blog Kartı

```jsx
function BlogKarti({ baslik, yazar, tarih, ozet, okunmaSuresi }) {
    return (
        <article className="blog-kart">
            <h2>{baslik}</h2>
            
            <div className="meta-bilgi">
                <span>✍️ {yazar}</span>
                <span>📅 {tarih}</span>
                <span>⏱️ {okunmaSuresi} dk okuma</span>
            </div>
            
            <p>{ozet}</p>
            
            <button>Devamını Oku →</button>
        </article>
    );
}

// Kullanım
function BlogSayfasi() {
    return (
        <div>
            <BlogKarti 
                baslik="React'a Giriş"
                yazar="Emre"
                tarih="30 Kasım 2025"
                ozet="React öğrenmeye başlarken bilmeniz gerekenler..."
                okunmaSuresi={5}
            />
            
            <BlogKarti 
                baslik="Props Nedir?"
                yazar="Emre"
                tarih="30 Kasım 2025"
                ozet="Component'ler arası veri aktarımı..."
                okunmaSuresi={8}
            />
        </div>
    );
}
```

---

## 📊 JSX'te Koşullu Render (Conditional Rendering)

### Ternary Operator

```jsx
function DurumMesaji({ aktif }) {
    return (
        <div>
            <p>Durum: {aktif ? "✅ Aktif" : "❌ Pasif"}</p>
        </div>
    );
}

// Kullanım
<DurumMesaji aktif={true} />   // ✅ Aktif
<DurumMesaji aktif={false} />  // ❌ Pasif
```

### && Operatörü

```jsx
function Bildirim({ mesajSayisi }) {
    return (
        <div>
            <h1>Bildirimler</h1>
            {mesajSayisi > 0 && (
                <p>🔔 {mesajSayisi} yeni mesajınız var!</p>
            )}
        </div>
    );
}

// Kullanım
<Bildirim mesajSayisi={5} />  // Mesaj gösterir
<Bildirim mesajSayisi={0} />  // Hiçbir şey göstermez
```

---

## 🎨 JSX'te Map (Liste Render)

```jsx
function HobiListesi({ hobiler }) {
    return (
        <div>
            <h2>Hobilerim</h2>
            <ul>
                {hobiler.map((hobi, index) => (
                    <li key={index}>{hobi}</li>
                ))}
            </ul>
        </div>
    );
}

// Kullanım
<HobiListesi hobiler={["Kodlama", "Spor", "Müzik", "Okuma"]} />
```

**C# LINQ ile karşılaştırma:**
```csharp
// C# LINQ
var liste = hobiler.Select(h => $"<li>{h}</li>");

// React Map
hobiler.map(h => <li>{h}</li>)
```

---

## ⚠️ Önemli Kurallar

### 1. Props Read-Only'dir (Salt Okunur)

```jsx
// ❌ YANLIŞ - Props'u değiştiremezsin!
function Yanlis(props) {
    props.isim = "Başka İsim";  // HATA!
    return <h1>{props.isim}</h1>;
}

// ✅ DOĞRU - Props'u sadece kullan
function Dogru({ isim }) {
    return <h1>{isim}</h1>;
}
```

**.NET analojisi:**
```csharp
// Readonly property gibi düşün
public class Component {
    public readonly string Isim;  // Sadece okunabilir
}
```

### 2. JSX'te Comments

```jsx
function Ornek() {
    return (
        <div>
            {/* Bu bir yorum */}
            <h1>Başlık</h1>
            
            {/* 
                Çok satırlı
                yorum
            */}
        </div>
    );
}
```

### 3. className kullan (class değil)

```jsx
// ❌ YANLIŞ
<div class="container"></div>

// ✅ DOĞRU
<div className="container"></div>
```

---

## 🏋️ Alıştırmalar

### 1. Ürün Kartı Oluştur

Props: `urunAdi`, `fiyat`, `indirimOrani`, `stokta`

```jsx
function UrunKarti({ urunAdi, fiyat, indirimOrani, stokta }) {
    // Senin kodun buraya
}
```

### 2. Profil Kartı

Props: `isim`, `meslek`, `email`, `telefon`, `resimUrl`

### 3. Hava Durumu Widget'ı

Props: `sehir`, `derece`, `durum`, `nem`

---

## 🎓 Öğrendiklerimiz

✅ JSX nedir ve nasıl çalışır  
✅ JSX içinde JavaScript kullanma  
✅ Props nedir ve nasıl kullanılır  
✅ Destructuring ile props kullanma  
✅ Farklı veri tipleriyle props  
✅ Default props  
✅ Koşullu render (ternary, &&)  
✅ Liste render (map)  

---

## ➡️ Sırada Ne Var?

Bir sonraki derste **State** ve **Event Handling** öğreneceğiz! Artık interaktif component'ler yapacağız - butona tıklama, input değişikliği gibi! 🎉
