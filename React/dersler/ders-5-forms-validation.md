# Ders 5: Forms ve Validation 📝

## 🤔 React'te Form Nedir?

React'te formlar **kontrollü (controlled)** veya **kontrolsüz (uncontrolled)** olabilir.

### Kontrollü vs Kontrolsüz

**Kontrollü Component:** State ile kontrol edilir (Önerilen!)
**Kontrolsüz Component:** DOM'un kendi değerini tutar (Ref ile)

### .NET Geliştiricisi İçin Analoji:

```csharp
// C# (WPF/Blazor) - Two-way binding
<input @bind="isim" />

// React - Kontrollü component (manuel binding)
<input value={isim} onChange={(e) => setIsim(e.target.value)} />
```

---

## 📝 Basit Form Örneği

```jsx
import { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [sifre, setSifre] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();  // Sayfanın yenilenmesini engelle
        console.log('Email:', email);
        console.log('Şifre:', sifre);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                placeholder="Şifre"
            />
            <button type="submit">Giriş Yap</button>
        </form>
    );
}
```

**Önemli:** `e.preventDefault()` sayfanın yenilenmesini engeller!

---

## ✅ Form Validation (Doğrulama)

### 1. Basit Validation

```jsx
function KayitFormu() {
    const [isim, setIsim] = useState('');
    const [email, setEmail] = useState('');
    const [hatalar, setHatalar] = useState({});
    
    const validate = () => {
        const yeniHatalar = {};
        
        if (!isim.trim()) {
            yeniHatalar.isim = 'İsim gerekli!';
        } else if (isim.length < 3) {
            yeniHatalar.isim = 'İsim en az 3 karakter olmalı!';
        }
        
        if (!email.trim()) {
            yeniHatalar.email = 'Email gerekli!';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            yeniHatalar.email = 'Geçerli bir email girin!';
        }
        
        return yeniHatalar;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const yeniHatalar = validate();
        
        if (Object.keys(yeniHatalar).length === 0) {
            // Validation başarılı!
            console.log('Form gönderildi!');
        } else {
            setHatalar(yeniHatalar);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    value={isim}
                    onChange={(e) => {
                        setIsim(e.target.value);
                        // Hataları temizle
                        if (hatalar.isim) {
                            setHatalar({...hatalar, isim: null});
                        }
                    }}
                />
                {hatalar.isim && <span style={{color: 'red'}}>{hatalar.isim}</span>}
            </div>
            
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (hatalar.email) {
                            setHatalar({...hatalar, email: null});
                        }
                    }}
                />
                {hatalar.email && <span style={{color: 'red'}}>{hatalar.email}</span>}
            </div>
            
            <button type="submit">Kayıt Ol</button>
        </form>
    );
}
```

---

## 🎯 Farklı Input Türleri

### Text Input
```jsx
<input 
    type="text"
    value={metin}
    onChange={(e) => setMetin(e.target.value)}
/>
```

### Textarea
```jsx
<textarea
    value={aciklama}
    onChange={(e) => setAciklama(e.target.value)}
    rows="4"
/>
```

### Checkbox
```jsx
<input
    type="checkbox"
    checked={kabul}
    onChange={(e) => setKabul(e.target.checked)}
/>
```

### Radio Button
```jsx
<input
    type="radio"
    name="cinsiyet"
    value="erkek"
    checked={cinsiyet === 'erkek'}
    onChange={(e) => setCinsiyet(e.target.value)}
/>
<input
    type="radio"
    name="cinsiyet"
    value="kadin"
    checked={cinsiyet === 'kadin'}
    onChange={(e) => setCinsiyet(e.target.value)}
/>
```

### Select (Dropdown)
```jsx
<select 
    value={sehir}
    onChange={(e) => setSehir(e.target.value)}
>
    <option value="">Şehir seçin</option>
    <option value="istanbul">İstanbul</option>
    <option value="ankara">Ankara</option>
    <option value="izmir">İzmir</option>
</select>
```

### File Input
```jsx
<input
    type="file"
    onChange={(e) => setDosya(e.target.files[0])}
/>
```

---

## 🔥 Gelişmiş Form Pattern

```jsx
import { useState } from 'react';

function GelismisForm() {
    // Tek state ile tüm form
    const [formData, setFormData] = useState({
        isim: '',
        email: '',
        yas: '',
        sehir: '',
        sartlar: false
    });
    
    // Generic change handler
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="isim"
                value={formData.isim}
                onChange={handleChange}
            />
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                name="yas"
                type="number"
                value={formData.yas}
                onChange={handleChange}
            />
            <select
                name="sehir"
                value={formData.sehir}
                onChange={handleChange}
            >
                <option value="">Seçin</option>
                <option value="istanbul">İstanbul</option>
            </select>
            <input
                name="sartlar"
                type="checkbox"
                checked={formData.sartlar}
                onChange={handleChange}
            />
            <button type="submit">Gönder</button>
        </form>
    );
}
```

**Avantajları:**
- Tek state, tüm form
- Generic handler
- Kolay yönetim
- Scalable (ölçeklenebilir)

---

## 🎨 Real-Time Validation

```jsx
function GercekZamanliValidasyon() {
    const [email, setEmail] = useState('');
    const [emailGecerli, setEmailGecerli] = useState(null);
    
    const emailDogrula = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };
    
    const handleEmailChange = (e) => {
        const yeniEmail = e.target.value;
        setEmail(yeniEmail);
        
        if (yeniEmail.length > 0) {
            setEmailGecerli(emailDogrula(yeniEmail));
        } else {
            setEmailGecerli(null);
        }
    };
    
    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                style={{
                    borderColor: emailGecerli === null ? 'gray' 
                               : emailGecerli ? 'green' : 'red'
                }}
            />
            {emailGecerli === false && (
                <span style={{color: 'red'}}>❌ Geçersiz email!</span>
            )}
            {emailGecerli === true && (
                <span style={{color: 'green'}}>✅ Geçerli email!</span>
            )}
        </div>
    );
}
```

---

## 📊 Şifre Gücü Göstergesi

```jsx
function SifreGucu() {
    const [sifre, setSifre] = useState('');
    
    const sifreGucuHesapla = (sifre) => {
        let guc = 0;
        if (sifre.length >= 8) guc++;
        if (/[a-z]/.test(sifre) && /[A-Z]/.test(sifre)) guc++;
        if (/\d/.test(sifre)) guc++;
        if (/[^a-zA-Z\d]/.test(sifre)) guc++;
        return guc;
    };
    
    const guc = sifreGucuHesapla(sifre);
    const renkler = ['red', 'orange', 'yellow', 'lightgreen', 'green'];
    const metinler = ['Çok Zayıf', 'Zayıf', 'Orta', 'İyi', 'Güçlü'];
    
    return (
        <div>
            <input
                type="password"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
            />
            {sifre && (
                <div>
                    <div style={{
                        height: '5px',
                        width: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '5px',
                        marginTop: '10px'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${(guc / 4) * 100}%`,
                            backgroundColor: renkler[guc],
                            borderRadius: '5px',
                            transition: 'all 0.3s'
                        }} />
                    </div>
                    <p style={{color: renkler[guc]}}>
                        {metinler[guc]}
                    </p>
                </div>
            )}
        </div>
    );
}
```

---

## 🏋️ Alıştırmalar

1. **Kayıt Formu:** İsim, email, şifre, şifre tekrar, şartlar checkbox
2. **İletişim Formu:** İsim, email, konu, mesaj textarea
3. **Profil Güncelleme:** Tüm input türlerini içeren form
4. **Arama Formu:** Debounce ile API çağrısı

---

## 🎓 Öğrendiklerimiz

✅ Kontrollü componentler  
✅ Form submission  
✅ Validation pattern'leri  
✅ Farklı input türleri  
✅ Generic form handler  
✅ Real-time validation  
✅ Error handling  

---

## ➡️ Sırada Ne Var?

Bir sonraki derste **Custom Hooks** öğreneceğiz! Kendi hook'larını yazarak kodu tekrar kullanılabilir yapacağız! 🎣
