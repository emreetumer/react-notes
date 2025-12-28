# Ders 4: useEffect ve Side Effects ⚡

## 🤔 Side Effect Nedir?

**Side Effect (Yan Etki)**, component'in render edilmesi dışında gerçekleşen işlemlerdir:

- API çağrıları
- Timer'lar (setTimeout, setInterval)
- DOM manipülasyonu
- LocalStorage okuma/yazma
- Event listener'lar ekleme/kaldırma
- Subscribe/Unsubscribe işlemleri

### .NET Geliştiricisi İçin Analoji:

```csharp
// C# Constructor veya OnInit gibi
public class Component {
    public Component() {
        // İlk yüklemede çalışır
        LoadData();
    }
    
    protected override void OnParametersSet() {
        // Parametreler değiştiğinde
        RefreshData();
    }
    
    public void Dispose() {
        // Component yok olurken
        CleanupResources();
    }
}
```

```jsx
// React useEffect
function Component() {
    useEffect(() => {
        // İlk yüklemede ve her güncellemede çalışır
        loadData();
        
        return () => {
            // Cleanup (component kaldırılırken)
            cleanupResources();
        };
    }, [dependencies]);
}
```

---

## 🪝 useEffect Hook'u

### Syntax:

```jsx
import { useEffect } from 'react';

useEffect(() => {
    // Side effect kodları buraya
    
    return () => {
        // Cleanup (opsiyonel)
    };
}, [dependencies]);  // Dependency array
```

**3 Ana Kullanım:**

1. **Her render'da çalış** (dependency yok)
2. **Sadece ilk render'da çalış** (boş array: `[]`)
3. **Belirli değerler değiştiğinde çalış** (`[dep1, dep2]`)

---

## 1️⃣ Her Render'da Çalışan useEffect

```jsx
import { useState, useEffect } from 'react';

function HerRender() {
    const [sayac, setSayac] = useState(0);
    
    // ❌ Dikkatli kullan! Her render'da çalışır
    useEffect(() => {
        console.log('Component render edildi!');
        console.log('Sayac:', sayac);
    });  // Dependency array YOK!
    
    return (
        <div>
            <h1>{sayac}</h1>
            <button onClick={() => setSayac(sayac + 1)}>Artır</button>
        </div>
    );
}
```

**Ne zaman kullanılır?**
- Çok nadir! Genellikle debugging için
- Her state değişiminde log tutmak için

---

## 2️⃣ Sadece İlk Render'da (Component Mount)

```jsx
import { useState, useEffect } from 'react';

function IlkRender() {
    const [data, setData] = useState(null);
    
    // ✅ Sadece component ilk yüklendiğinde çalışır
    useEffect(() => {
        console.log('Component yüklendi!');
        
        // API çağrısı simülasyonu
        setTimeout(() => {
            setData('Yüklendi!');
        }, 1000);
    }, []);  // BOŞ array = sadece ilk render
    
    return <div>{data || 'Yükleniyor...'}</div>;
}
```

**Ne zaman kullanılır?**
- API'den veri çekme (ilk yüklemede)
- Event listener ekleme
- Başlangıç ayarları

**C# Analojisi:**
```csharp
// C# OnInitialized veya Constructor
protected override void OnInitialized() {
    LoadData();  // Sadece bir kez çalışır
}

// React useEffect
useEffect(() => {
    loadData();  // Sadece bir kez çalışır
}, []);
```

---

## 3️⃣ Belirli Değerler Değiştiğinde

```jsx
import { useState, useEffect } from 'react';

function AramaKutusu() {
    const [aramaMetni, setAramaMetni] = useState("");
    const [sonuclar, setSonuclar] = useState([]);
    
    // ✅ aramaMetni değiştiğinde çalışır
    useEffect(() => {
        if (aramaMetni) {
            console.log('Arama yapılıyor:', aramaMetni);
            // API çağrısı yap
            // setSonuclar(...);
        }
    }, [aramaMetni]);  // aramaMetni değişince çalış
    
    return (
        <div>
            <input 
                value={aramaMetni}
                onChange={(e) => setAramaMetni(e.target.value)}
                placeholder="Ara..."
            />
        </div>
    );
}
```

**Ne zaman kullanılır?**
- Bir state değiştiğinde başka işlem yapma
- Props değiştiğinde güncelleme
- Filtreleme, sıralama gibi işlemler

---

## 🧹 Cleanup Function (Temizlik)

Bazı side effect'ler temizlenmeli:
- Timer'lar (setTimeout, setInterval)
- Event listener'lar
- WebSocket bağlantıları
- Subscriptions

```jsx
import { useState, useEffect } from 'react';

function Zamanlayici() {
    const [saniye, setSaniye] = useState(0);
    
    useEffect(() => {
        // Timer başlat
        const interval = setInterval(() => {
            setSaniye(s => s + 1);
        }, 1000);
        
        // ✅ CLEANUP: Component kaldırılınca timer'ı durdur
        return () => {
            clearInterval(interval);
            console.log('Timer durduruldu!');
        };
    }, []);
    
    return <h1>{saniye} saniye</h1>;
}
```

**C# Analojisi:**
```csharp
// C# IDisposable
public class Component : IDisposable {
    private Timer timer;
    
    public Component() {
        timer = new Timer(...);  // Başlat
    }
    
    public void Dispose() {
        timer?.Dispose();  // Temizle
    }
}

// React useEffect cleanup
useEffect(() => {
    const timer = setInterval(...);  // Başlat
    
    return () => clearInterval(timer);  // Temizle
}, []);
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Sayfa Başlığını Değiştirme

```jsx
import { useState, useEffect } from 'react';

function SayfaBasligi() {
    const [sayac, setSayac] = useState(0);
    
    useEffect(() => {
        // Tarayıcı sekmesinin başlığını değiştir
        document.title = `Sayaç: ${sayac}`;
        
        // Cleanup gerekmez (DOM manipülasyonu)
    }, [sayac]);  // sayac değişince güncelle
    
    return (
        <div>
            <h1>{sayac}</h1>
            <button onClick={() => setSayac(sayac + 1)}>
                Artır
            </button>
        </div>
    );
}
```

### Örnek 2: LocalStorage'a Kaydetme

```jsx
import { useState, useEffect } from 'react';

function Notlar() {
    const [notlar, setNotlar] = useState(() => {
        // İlk yüklemede localStorage'dan oku
        const kaydedilmis = localStorage.getItem('notlar');
        return kaydedilmis ? JSON.parse(kaydedilmis) : [];
    });
    
    // notlar değiştiğinde localStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('notlar', JSON.stringify(notlar));
        console.log('Notlar kaydedildi!');
    }, [notlar]);
    
    const notEkle = () => {
        setNotlar([...notlar, `Not ${notlar.length + 1}`]);
    };
    
    return (
        <div>
            <button onClick={notEkle}>Not Ekle</button>
            <ul>
                {notlar.map((not, i) => (
                    <li key={i}>{not}</li>
                ))}
            </ul>
        </div>
    );
}
```

### Örnek 3: Window Resize Event

```jsx
import { useState, useEffect } from 'react';

function EkranBoyutu() {
    const [genislik, setGenislik] = useState(window.innerWidth);
    const [yukseklik, setYukseklik] = useState(window.innerHeight);
    
    useEffect(() => {
        // Event handler
        const handleResize = () => {
            setGenislik(window.innerWidth);
            setYukseklik(window.innerHeight);
        };
        
        // Event listener ekle
        window.addEventListener('resize', handleResize);
        
        // ✅ CLEANUP: Event listener'ı kaldır
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);  // Sadece mount/unmount'ta
    
    return (
        <div>
            <h2>Ekran Boyutu</h2>
            <p>Genişlik: {genislik}px</p>
            <p>Yükseklik: {yukseklik}px</p>
        </div>
    );
}
```

### Örnek 4: Fetch ile Veri Çekme

```jsx
import { useState, useEffect } from 'react';

function KullaniciListesi() {
    const [kullanicilar, setKullanicilar] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [hata, setHata] = useState(null);
    
    useEffect(() => {
        // Async fonksiyon tanımla
        const veriCek = async () => {
            try {
                setYukleniyor(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setKullanicilar(data);
                setHata(null);
            } catch (err) {
                setHata('Veri yüklenemedi!');
            } finally {
                setYukleniyor(false);
            }
        };
        
        veriCek();
    }, []);  // Sadece ilk yüklemede
    
    if (yukleniyor) return <p>Yükleniyor...</p>;
    if (hata) return <p>Hata: {hata}</p>;
    
    return (
        <ul>
            {kullanicilar.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

---

## ⚠️ Yaygın Hatalar

### Hata 1: Dependency Array'i Unutmak

```jsx
// ❌ YANLIŞ - Sonsuz döngü!
useEffect(() => {
    setSayac(sayac + 1);
});  // Her render'da çalışır → state değişir → yeniden render → tekrar çalışır

// ✅ DOĞRU
useEffect(() => {
    // Sadece gerektiğinde çalış
}, [gerekliDependency]);
```

### Hata 2: Async useEffect

```jsx
// ❌ YANLIŞ - useEffect async olamaz!
useEffect(async () => {
    const data = await fetchData();
}, []);

// ✅ DOĞRU - İçinde async fonksiyon kullan
useEffect(() => {
    const veriCek = async () => {
        const data = await fetchData();
    };
    veriCek();
}, []);
```

### Hata 3: Gereksiz Dependency

```jsx
// ❌ YANLIŞ - Fonksiyon her render'da yeni oluşur
function Component() {
    const handleClick = () => {
        console.log('Clicked');
    };
    
    useEffect(() => {
        // handleClick her değiştiğinde çalışır (gereksiz)
    }, [handleClick]);
}

// ✅ DOĞRU - useCallback kullan (ileri düzey)
// veya fonksiyonu useEffect içine al
```

---

## 🎓 useEffect Akış Şeması

```
Component Render
      ↓
JSX Return
      ↓
Browser Paint (Ekrana çiz)
      ↓
useEffect Çalış
      ↓
(State değişirse → Yeniden Render)
      ↓
Cleanup (varsa, önceki effect temizle)
      ↓
Yeni useEffect Çalış
```

---

## 🏋️ Alıştırmalar

### 1. Kronomettre
- Başlat/Durdur butonu
- useEffect ile setInterval
- Cleanup ile timer'ı temizle

### 2. Dark Mode
- Toggle butonu
- useEffect ile localStorage'a kaydet
- Sayfa yenilenince ayarı hatırlasın

### 3. Canlı Saat
- Her saniye güncellenen dijital saat
- Component kaldırılınca timer durdurulsun

### 4. API Arama
- Input'a yazılan metni debounce ile ara
- 500ms sonra API çağrısı yap

---

## 🎓 Öğrendiklerimiz

✅ Side Effect nedir  
✅ useEffect hook'u ve syntaxı  
✅ Dependency array kullanımı  
✅ Cleanup function  
✅ API çağrıları  
✅ Event listener yönetimi  
✅ LocalStorage kullanımı  
✅ Yaygın hatalar ve çözümleri  

---

## ➡️ Sırada Ne Var?

Bir sonraki derste **Form Handling ve Validation** öğreneceğiz! Kontrollü componentler, form validasyonu ve kullanıcı input'larını yönetme! 📝

**ÖNEMLİ:** useEffect React'in en kritik hook'larından biri! Bu dersi iyi anladığından emin ol! 🚀
