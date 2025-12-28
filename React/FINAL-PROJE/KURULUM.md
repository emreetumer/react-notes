# 🚀 Kurulum Rehberi

## 1️⃣ Proje Oluşturma

```bash
# Terminal'de şu komutları çalıştır:

# 1. React projesi oluştur
npx create-react-app ecommerce-app

# 2. Klasöre gir
cd ecommerce-app

# 3. React Router kur
npm install react-router-dom

# 4. Projeyi başlat
npm start
```

## 2️⃣ Dosyaları Kopyalama

Projeyi oluşturduktan sonra:

1. **src/** klasörünü tamamen sil
2. **FINAL-PROJE/src/** klasörünü kopyala
3. **package.json** dosyasını değiştir

## 3️⃣ Tarayıcıda Aç

```
http://localhost:3000
```

## 🧪 Test Hesapları

### Admin Hesabı
```
Email: admin@test.com
Şifre: admin123
```

### Normal User Hesabı
```
Email: user@test.com
Şifre: 123456
```

---

## 📱 Özellikler Testi

### ✅ Test Edilecekler

1. **Giriş/Çıkış**
   - Login sayfasından giriş yap
   - Header'da kullanıcı adını gör
   - Çıkış yap butonu çalışıyor mu?

2. **Ürün Listeleme**
   - Ürünler listelenmiş mi?
   - Kategori filtreleme çalışıyor mu?
   - Arama çalışıyor mu?

3. **Sepet**
   - Sepete ürün ekle
   - Miktar artır/azalt
   - Ürün sil
   - Toplam fiyat doğru mu?

4. **Admin Panel** (admin@test.com ile giriş yap)
   - Yeni ürün ekle
   - Ürün düzenle
   - Ürün sil

5. **LocalStorage**
   - Sepet verisi kaydoluyor mu?
   - Sayfayı yenile, sepet korunuyor mu?
   - Login token korunuyor mu?

---

## 🔧 Sorun Giderme

### Port 3000 kullanımda hatası:
```bash
# Windows'ta:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMARASI> /F
```

### Node modules hatası:
```bash
rm -rf node_modules package-lock.json
npm install
```

### React Router hatası:
```bash
npm install react-router-dom
```

---

## 📚 Kod Yapısını Anlamak

### 1. API Layer (mockApi.js)
- Gerçek API gibi çalışır
- LocalStorage kullanır
- async/await ile promise döner

### 2. Context Layer
- AuthContext: Login/logout/user bilgisi
- CartContext: Sepet işlemleri
- ProductContext: Ürün CRUD

### 3. Custom Hooks
- useLocalStorage: Veri persistence
- useApi: API çağrıları

### 4. Components
- Layout: Header, Footer
- Pages: Home, Login, Products, Cart, Admin

---

## 🎯 Gerçek .NET API Entegrasyonu

Backend hazır olduğunda:

### 1. API URL'i değiştir:
```javascript
// mockApi.js yerine
const API_URL = 'https://localhost:5001/api';

export const authApi = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }
};
```

### 2. .NET Backend örneği:
```csharp
// AuthController.cs
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        // Authentication logic
        var user = _userService.Login(dto.Email, dto.Password);
        var token = _jwtService.GenerateToken(user);
        
        return Ok(new {
            User = user,
            Token = token
        });
    }
}
```

---

## ✨ Başarılar!

Artık tam özellikli bir React uygulamanız var! 🎉

**Öğrendikleriniz:**
- ✅ Context API ile state management
- ✅ Custom hooks ile reusable logic
- ✅ Protected routes ile authorization
- ✅ Mock API ile backend simülasyonu
- ✅ CRUD operations
- ✅ Form handling & validation
- ✅ LocalStorage persistence
- ✅ React Router navigation

**Sıradaki adımlar:**
1. Kendi özelliklerini ekle
2. .NET backend geliştir
3. Real-time features ekle (SignalR)
4. Deploy et!
