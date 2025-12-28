# Ders 1: React Temelleri ve İlk Component 🎯

## 🤔 React Nedir?

React, **kullanıcı arayüzleri** oluşturmak için Facebook (Meta) tarafından geliştirilmiş bir JavaScript kütüphanesidir.

### .NET Geliştiricisi İçin Analoji:
- **ASP.NET MVC'deki View** → React'te **Component**
- **Razor Pages** → React'te **JSX**
- **Partial Views** → React'te **Reusable Components**

---

## 🧩 Component Nedir?

Component, **yeniden kullanılabilir UI parçalarıdır**. C#'taki class'lar gibi düşünebilirsin.

```csharp
// C# Class
public class Button {
    public string Text { get; set; }
    public void Click() { }
}
```

```jsx
// React Component
function Button() {
    return <button>Tıkla</button>;
}
```

---

## 📝 İlk Component'imiz

### Functional Component (Modern Yaklaşım)

```jsx
// Basit bir component
function Selamla() {
    return <h1>Merhaba, React Öğreniyorum!</h1>;
}
```

**Açıklama:**
- `function Selamla()` → Component'in adı (her zaman **BÜYÜK** harfle başlar!)
- `return` → Ekranda ne gösterileceğini belirtir
- `<h1>...</h1>` → JSX (JavaScript XML) - HTML gibi görünür ama JavaScript'tir

---

## 🎨 Daha Gerçekçi Örnek

```jsx
// Kullanıcı Kartı Component'i
function KullaniciKarti() {
    return (
        <div className="kart">
            <h2>Emre</h2>
            <p>Meslek: .NET Developer</p>
            <p>Şu an öğreniyor: React</p>
            <button>Profili Gör</button>
        </div>
    );
}
```

**Önemli Noktalar:**
- `className` kullanıyoruz (`class` değil) - çünkü `class` JavaScript'te rezerve kelime
- Birden fazla satır varsa `()` parantez içine alıyoruz
- Tek bir kök eleman olmalı (burada `<div>`)

---

## 🔄 Component'leri Kullanma

```jsx
function App() {
    return (
        <div>
            <h1>Hoşgeldiniz!</h1>
            <KullaniciKarti />
            <KullaniciKarti />
            <KullaniciKarti />
        </div>
    );
}
```

Gördün mü? Aynı component'i **3 kez** kullandık! Bu C#'ta instance oluşturmak gibi:

```csharp
// C# benzeri düşünce
var kart1 = new KullaniciKarti();
var kart2 = new KullaniciKarti();
var kart3 = new KullaniciKarti();
```

---

## 📦 Export ve Import

**Component dosyası (KullaniciKarti.jsx):**
```jsx
function KullaniciKarti() {
    return (
        <div className="kart">
            <h2>Emre</h2>
            <p>Meslek: .NET Developer</p>
        </div>
    );
}

export default KullaniciKarti;
```

**Başka bir dosyada kullanma:**
```jsx
import KullaniciKarti from './KullaniciKarti';

function App() {
    return <KullaniciKarti />;
}
```

**.NET'teki using'e benzer:**
```csharp
using MyApp.Components;  // C#

import KullaniciKarti from './KullaniciKarti';  // React
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Basit Header Component

```jsx
function Header() {
    return (
        <header>
            <h1>Benim React Uygulamam</h1>
            <nav>
                <a href="#home">Ana Sayfa</a>
                <a href="#about">Hakkında</a>
                <a href="#contact">İletişim</a>
            </nav>
        </header>
    );
}

export default Header;
```

### Örnek 2: Footer Component

```jsx
function Footer() {
    const yil = new Date().getFullYear();
    
    return (
        <footer>
            <p>© {yil} - Tüm hakları saklıdır</p>
        </footer>
    );
}

export default Footer;
```

**Dikkat:** `{yil}` kullanarak JavaScript değişkenini JSX içine gömdük! 🎉

### Örnek 3: Tam Sayfa

```jsx
import Header from './Header';
import Footer from './Footer';
import KullaniciKarti from './KullaniciKarti';

function App() {
    return (
        <div className="sayfa">
            <Header />
            
            <main>
                <h2>Kullanıcılar</h2>
                <KullaniciKarti />
                <KullaniciKarti />
            </main>
            
            <Footer />
        </div>
    );
}

export default App;
```

---

## ✅ Önemli Kurallar

1. **Component isimleri BÜYÜK harfle başlar**
   - ✅ `KullaniciKarti`
   - ❌ `kullaniciKarti`

2. **Tek bir kök eleman olmalı**
   ```jsx
   // ❌ YANLIŞ
   function Yanlis() {
       return (
           <h1>Başlık</h1>
           <p>Paragraf</p>
       );
   }
   
   // ✅ DOĞRU
   function Dogru() {
       return (
           <div>
               <h1>Başlık</h1>
               <p>Paragraf</p>
           </div>
       );
   }
   
   // ✅ Alternatif (Fragment)
   function Dogru2() {
       return (
           <>
               <h1>Başlık</h1>
               <p>Paragraf</p>
           </>
       );
   }
   ```

3. **HTML attribute'ları farklı yazılır**
   - `class` → `className`
   - `for` → `htmlFor`
   - `onclick` → `onClick`

---

## 🏋️ Alıştırmalar

1. **Kendi kartını oluştur**: Adın, mesleğin ve hobilerini içeren bir `BenimKartim` component'i yaz

2. **Navbar oluştur**: En az 4 link içeren bir navigasyon menüsü component'i yap

3. **Kombinasyon**: Yukarıdaki component'leri kullanarak basit bir sayfa oluştur

---

## 🎓 Öğrendiklerimiz

✅ React nedir ve neden kullanılır  
✅ Component nedir ve nasıl oluşturulur  
✅ JSX syntax'ı  
✅ Component'leri import/export etme  
✅ Birden fazla component'i birleştirme  

---

## ➡️ Sırada Ne Var?

Bir sonraki derste **Props** öğreneceğiz! Component'lere dışarıdan veri nasıl gönderilir göreceğiz. Bu, C#'taki method parametrelerine çok benziyor! 🚀
