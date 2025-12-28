# Ders 3: State ve Event Handling 🎯

## 🤔 State Nedir?

**State**, component'in **içsel durumunu** (internal state) temsil eder. Component'in "hafızası" gibidir.

### .NET Geliştiricisi İçin Analoji:

```csharp
// C# Class
public class Sayac {
    private int deger = 0;  // Bu bir "state"
    
    public void Artir() {
        deger++;  // State değişiyor
    }
}
```

```jsx
// React Component
function Sayac() {
    const [deger, setDeger] = useState(0);  // Bu bir "state"
    
    const artir = () => {
        setDeger(deger + 1);  // State değişiyor
    }
}
```

**Fark:** Props dışarıdan gelir (read-only), State içerde tutulur (değiştirilebilir)!

---

## 🪝 useState Hook'u

React'te state kullanmak için `useState` hook'unu kullanırız.

### Syntax:

```jsx
import { useState } from 'react';

function Component() {
    const [deger, setDeger] = useState(başlangıçDeğeri);
    //      ↑       ↑                    ↑
    //   getter  setter           initial value
}
```

**Destructuring:**
- `deger`: Mevcut değeri okumak için
- `setDeger`: Değeri değiştirmek için
- `useState(0)`: Başlangıç değeri 0

---

## 🎯 İlk State Örneğimiz: Sayaç

```jsx
import { useState } from 'react';

function Sayac() {
    // State tanımla
    const [sayac, setSayac] = useState(0);
    
    // Event handler
    const artir = () => {
        setSayac(sayac + 1);
    };
    
    const azalt = () => {
        setSayac(sayac - 1);
    };
    
    const sifirla = () => {
        setSayac(0);
    };
    
    return (
        <div>
            <h1>Sayaç: {sayac}</h1>
            <button onClick={artir}>➕ Artır</button>
            <button onClick={azalt}>➖ Azalt</button>
            <button onClick={sifirla}>🔄 Sıfırla</button>
        </div>
    );
}
```

**Ne Oluyor?**
1. Başlangıçta `sayac = 0`
2. Butona tıklanınca `artir()` çalışır
3. `setSayac(sayac + 1)` state'i günceller
4. React component'i yeniden render eder
5. Ekranda yeni değer görünür!

---

## ⚡ Event Handling (Olay Yönetimi)

React'te olaylar camelCase ile yazılır.

### HTML vs React:

```html
<!-- HTML -->
<button onclick="handleClick()">Tıkla</button>

<!-- React -->
<button onClick={handleClick}>Tıkla</button>
```

### Yaygın Event'ler:

```jsx
function EventOrnekleri() {
    return (
        <div>
            {/* Mouse Events */}
            <button onClick={() => alert('Tıklandı!')}>Tıkla</button>
            <div onMouseEnter={() => console.log('Fare geldi')}>Üzerime gel</div>
            
            {/* Keyboard Events */}
            <input onKeyDown={(e) => console.log('Tuşa basıldı:', e.key)} />
            
            {/* Form Events */}
            <input onChange={(e) => console.log('Değişti:', e.target.value)} />
            <form onSubmit={(e) => e.preventDefault()}>
                <button type="submit">Gönder</button>
            </form>
            
            {/* Focus Events */}
            <input onFocus={() => console.log('Odaklandı')} />
            <input onBlur={() => console.log('Odak kaybetti')} />
        </div>
    );
}
```

**C# Event Handling ile karşılaştırma:**

```csharp
// C# WinForms/WPF
button.Click += (sender, e) => {
    MessageBox.Show("Tıklandı!");
};

// React
<button onClick={() => alert('Tıklandı!')}>
    Tıkla
</button>
```

---

## 🔄 State Güncelleme Kuralları

### ❌ YANLIŞ - State'i Direkt Değiştirme

```jsx
function Yanlis() {
    const [sayac, setSayac] = useState(0);
    
    // ❌ BU ÇALIŞMAZ!
    const artir = () => {
        sayac = sayac + 1;  // YANLIŞ!
    };
}
```

### ✅ DOĞRU - Setter Kullan

```jsx
function Dogru() {
    const [sayac, setSayac] = useState(0);
    
    // ✅ DOĞRU!
    const artir = () => {
        setSayac(sayac + 1);  // Setter kullan
    };
}
```

---

## 💡 Farklı Veri Tipleriyle State

### String State

```jsx
function IsimGiris() {
    const [isim, setIsim] = useState("");
    
    return (
        <div>
            <input 
                value={isim}
                onChange={(e) => setIsim(e.target.value)}
                placeholder="İsminizi girin"
            />
            <p>Merhaba {isim}!</p>
        </div>
    );
}
```

### Boolean State

```jsx
function Anahtar() {
    const [acik, setAcik] = useState(false);
    
    return (
        <div>
            <button onClick={() => setAcik(!acik)}>
                {acik ? "🔆 Açık" : "🔌 Kapalı"}
            </button>
            <p>Durum: {acik ? "Işık Yanıyor ✨" : "Işık Söndü 🌙"}</p>
        </div>
    );
}
```

### Array State

```jsx
function Gorevler() {
    const [gorevler, setGorevler] = useState(["Alışveriş", "Kod yaz"]);
    
    const ekle = () => {
        setGorevler([...gorevler, "Yeni görev"]);
    };
    
    return (
        <div>
            <ul>
                {gorevler.map((gorev, index) => (
                    <li key={index}>{gorev}</li>
                ))}
            </ul>
            <button onClick={ekle}>➕ Görev Ekle</button>
        </div>
    );
}
```

### Object State

```jsx
function KullaniciBilgi() {
    const [kullanici, setKullanici] = useState({
        isim: "Emre",
        yas: 22,
        meslek: ".NET Developer"
    });
    
    const yasArtir = () => {
        setKullanici({
            ...kullanici,  // Diğer özellikleri koru
            yas: kullanici.yas + 1  // Sadece yaşı değiştir
        });
    };
    
    return (
        <div>
            <p>{kullanici.isim} - {kullanici.yas} yaş</p>
            <button onClick={yasArtir}>🎂 Yaş Artır</button>
        </div>
    );
}
```

---

## 🎨 Inline Event Handler vs Ayrı Function

### Inline (Küçük işlemler için)

```jsx
function InlineOrnek() {
    const [sayac, setSayac] = useState(0);
    
    return (
        <button onClick={() => setSayac(sayac + 1)}>
            Tıkla ({sayac})
        </button>
    );
}
```

### Ayrı Function (Karmaşık işlemler için)

```jsx
function AyriFunctionOrnek() {
    const [sayac, setSayac] = useState(0);
    
    const handleClick = () => {
        // Karmaşık işlemler
        console.log('Butona tıklandı');
        setSayac(sayac + 1);
        // Başka işlemler...
    };
    
    return (
        <button onClick={handleClick}>
            Tıkla ({sayac})
        </button>
    );
}
```

---

## 🔥 Gerçek Dünya Örneği: Beğeni Butonu

```jsx
import { useState } from 'react';

function BegeniButonu() {
    const [begenildi, setBegenildi] = useState(false);
    const [begeniSayisi, setBegeniSayisi] = useState(42);
    
    const handleClick = () => {
        if (begenildi) {
            // Beğeni kaldır
            setBegenildi(false);
            setBegeniSayisi(begeniSayisi - 1);
        } else {
            // Beğen
            setBegenildi(true);
            setBegeniSayisi(begeniSayisi + 1);
        }
    };
    
    return (
        <button 
            onClick={handleClick}
            style={{
                backgroundColor: begenildi ? '#e74c3c' : '#ecf0f1',
                color: begenildi ? 'white' : '#333',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
            }}
        >
            {begenildi ? '❤️' : '🤍'} {begeniSayisi} beğeni
        </button>
    );
}
```

---

## 🎯 Çoklu State Kullanımı

```jsx
function Profil() {
    const [isim, setIsim] = useState("Emre");
    const [yas, setYas] = useState(22);
    const [aktif, setAktif] = useState(true);
    const [hobiler, setHobiler] = useState(["Kodlama", "Spor"]);
    
    return (
        <div>
            <h2>{isim}</h2>
            <p>Yaş: {yas}</p>
            <p>Durum: {aktif ? "Çevrimiçi" : "Çevrimdışı"}</p>
            <p>Hobiler: {hobiler.join(", ")}</p>
        </div>
    );
}
```

**İpucu:** Her state ayrı bir `useState` ile tanımlanır!

---

## ⚠️ State Güncellemede Yaygın Hatalar

### Hata 1: Asenkron State Güncellemesi

```jsx
// ❌ YANLIŞ
const artir = () => {
    setSayac(sayac + 1);
    console.log(sayac);  // Eski değeri gösterir!
};

// ✅ DOĞRU
const artir = () => {
    setSayac(prevSayac => {
        const yeniDeger = prevSayac + 1;
        console.log(yeniDeger);  // Yeni değer
        return yeniDeger;
    });
};
```

### Hata 2: Array/Object'i Direkt Değiştirme

```jsx
// ❌ YANLIŞ
const ekle = () => {
    gorevler.push("Yeni");  // Mutasyon!
    setGorevler(gorevler);
};

// ✅ DOĞRU
const ekle = () => {
    setGorevler([...gorevler, "Yeni"]);  // Yeni array oluştur
};
```

---

## 🎮 Event Object (e)

```jsx
function InputOrnek() {
    const [metin, setMetin] = useState("");
    
    const handleChange = (e) => {
        console.log('Event:', e);
        console.log('Hedef:', e.target);
        console.log('Değer:', e.target.value);
        
        setMetin(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();  // Sayfanın yenilenmesini engelle
        alert(`Gönderilen: ${metin}`);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={metin}
                onChange={handleChange}
            />
            <button type="submit">Gönder</button>
        </form>
    );
}
```

**C# EventArgs ile karşılaştırma:**

```csharp
// C#
void Button_Click(object sender, EventArgs e) {
    // sender = event'i tetikleyen
    // e = event bilgileri
}

// React
const handleClick = (e) => {
    // e = synthetic event
    // e.target = event'i tetikleyen element
}
```

---

## 🏋️ Alıştırmalar

### 1. Todo Toggle
Tıklanınca "Yapıldı" ↔ "Yapılmadı" değişen bir görev kartı yap.

### 2. Renk Değiştirici
Butona her tıklanışta div'in arka plan rengini değiştiren bir component.

### 3. Karakter Sayacı
Textarea'ya yazılan metnin karakter sayısını gösteren bir component.

### 4. Sepet
"Sepete Ekle" butonu olan ürün kartı. Tıklanınca "Sepette" olsun ve buton rengi değişsin.

---

## 🎓 Öğrendiklerimiz

✅ State nedir ve ne işe yarar  
✅ useState hook'u nasıl kullanılır  
✅ Event handling (onClick, onChange, vb.)  
✅ Farklı veri tipleriyle state  
✅ State güncelleme kuralları  
✅ Event object kullanımı  
✅ Inline vs ayrı event handler  

---

## ➡️ Sırada Ne Var?

Bir sonraki derste **useEffect** ve **Component Lifecycle** öğreneceğiz! API çağrıları, side effects ve daha fazlası! 🚀

**ÖDEV:** Bir sayaç uygulaması yap:
- Artır, Azalt, Sıfırla butonları
- Sayaç 0'ın altına inemesin
- Sayaç 10'a ulaşınca "Tebrikler!" mesajı göster
