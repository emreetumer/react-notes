# 🛒 E-Commerce App - .NET + React Full Stack Proje

## 📋 Proje Özeti

Bu proje, **gerçek bir .NET + React uygulamasının tüm temel yapılarını** gösterir:

### ✨ Özellikler
- ✅ **Authentication** - Login/Register/Logout
- ✅ **CRUD Operations** - Ürün ekleme, silme, güncelleme
- ✅ **Shopping Cart** - Sepet yönetimi
- ✅ **Context API** - Global state management
- ✅ **Custom Hooks** - Reusable logic
- ✅ **API Simulation** - Gerçek API gibi çalışan mock servis
- ✅ **Protected Routes** - Kimlik doğrulamalı sayfalar
- ✅ **Form Validation** - Input kontrolleri
- ✅ **LocalStorage** - Veri persistence
- ✅ **Responsive Design** - Mobil uyumlu

### 🎯 .NET Developer İçin Karşılaştırmalar

| React | .NET/C# |
|-------|---------|
| Context API | Dependency Injection |
| Custom Hooks | Extension Methods |
| useEffect | IDisposable, Lifecycle |
| API Service | HttpClient, Repository Pattern |
| Props | Method Parameters |
| State | Class Properties |

---

## 📁 Proje Yapısı

```
final-proje/
├── src/
│   ├── api/
│   │   └── mockApi.js          # API simülasyonu (backend gibi)
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx     # Authentication state
│   │   ├── CartContext.jsx     # Shopping cart state
│   │   └── ProductContext.jsx  # Product state
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js  # LocalStorage hook
│   │   └── useApi.js           # API calls hook
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   │
│   │   ├── products/
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductForm.jsx
│   │   │
│   │   └── cart/
│   │       ├── CartSidebar.jsx
│   │       └── CartItem.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── AdminPage.jsx
│   │
│   ├── App.jsx
│   └── index.js
│
└── package.json
```

---

## 🚀 Kurulum

```bash
# 1. Proje oluştur
npx create-react-app ecommerce-app
cd ecommerce-app

# 2. Router kur
npm install react-router-dom

# 3. Dosyaları kopyala
# (Tüm src/ klasörünü değiştir)

# 4. Başlat
npm start
```

---

## 🎓 Öğrenilecek Konular

### 1. API Simülasyonu
```javascript
// Gerçek .NET API gibi çalışır!
const api = {
    login: async (email, password) => { /* ... */ },
    getProducts: async () => { /* ... */ },
    createProduct: async (data) => { /* ... */ }
}
```

### 2. Context Pattern
```javascript
// .NET'teki DI container gibi
<AuthProvider>
  <CartProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </CartProvider>
</AuthProvider>
```

### 3. Custom Hooks
```javascript
// .NET'teki Extension Methods gibi
const { data, loading, error } = useApi(apiCall);
const [value, setValue] = useLocalStorage('key', defaultValue);
```

### 4. Protected Routes
```javascript
// .NET'teki [Authorize] attribute gibi
<Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
```

---

## 📊 Veri Akışı

```
┌─────────────┐
│  Mock API   │  (LocalStorage simülasyonu)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Contexts   │  (Global State - DI Container gibi)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Components  │  (UI - Razor Pages gibi)
└─────────────┘
```

---

## 🎯 Kullanıcı Rolleri

### 👤 Normal User
- Ürünleri görüntüle
- Sepete ekle/çıkar
- Sipariş ver

### 👨‍💼 Admin (email: admin@test.com, şifre: admin123)
- Tüm normal user özellikleri +
- Ürün ekle/düzenle/sil
- Kullanıcı yönetimi

---

## 💡 Best Practices

✅ **Component Separation** - Her component tek bir işten sorumlu  
✅ **Custom Hooks** - Tekrar kullanılabilir logic  
✅ **Context API** - Prop drilling önleme  
✅ **Error Handling** - try/catch ve error states  
✅ **Loading States** - Kullanıcı deneyimi  
✅ **Form Validation** - Client-side kontroller  
✅ **Clean Code** - Okunabilir ve maintainable  

---

## 🔜 Gerçek API Entegrasyonu

Backend hazır olduğunda sadece `mockApi.js` dosyasını değiştir:

```javascript
// Mock API yerine
const API_URL = 'https://localhost:5001/api';

export const api = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }
    // ...diğer endpoint'ler
};
```

---

## 🎉 Başarılar!

Bu proje ile profesyonel React + .NET entegrasyonunun temellerini öğrendin! 

**Sıradaki adımlar:**
1. ✅ .NET Web API oluştur
2. ✅ Entity Framework ile database
3. ✅ JWT Authentication ekle
4. ✅ Real-time features (SignalR)
5. ✅ Deploy (Azure, AWS)
