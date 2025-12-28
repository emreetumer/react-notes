# 🚀 Next.js E-Commerce Kurulum Rehberi

## 📋 Gereksinimler

- **Node.js**: v18.17 veya üzeri
- **npm** veya **yarn**
- **Visual Studio Code** (önerilen)

---

## 🔧 Kurulum Adımları

### 1️⃣ Projeyi İndir/Kopyala

```bash
# Eğer git kullanıyorsanız
git clone <repo-url>
cd nextjs-ecommerce

# Veya dosyaları manuel kopyalayın
```

### 2️⃣ Bağımlılıkları Yükle

```bash
npm install
# veya
yarn install
```

**Yüklenecek Paketler:**
- `next@14.2.0` - Next.js framework
- `react@18.3.1` - React library
- `react-dom@18.3.1` - React DOM
- `typescript@5.5.3` - TypeScript
- `tailwindcss@3.4.1` - CSS framework
- Ve diğer dev dependencies

### 3️⃣ Geliştirme Sunucusunu Başlat

```bash
npm run dev
# veya
yarn dev
```

**Tarayıcıda açın:** http://localhost:3000

---

## 🧪 Test Et

### Test Hesapları

**Admin Hesabı:**
```
Email: admin@test.com
Şifre: admin123
```

**Normal Kullanıcı:**
```
Email: user@test.com
Şifre: 123456
```

### Test Senaryoları

1. **Kayıt Ol**
   - `/login` sayfasına git
   - "Kayıt Ol" linkine tıkla
   - Yeni hesap oluştur

2. **Giriş Yap**
   - Email ve şifre ile giriş yap
   - Header'da kullanıcı bilgileri görünmeli

3. **Ürünleri Görüntüle**
   - `/products` sayfasına git
   - Arama ve kategori filtrelerini test et

4. **Sepete Ekle**
   - Ürün kartındaki "Sepete Ekle" butonuna tıkla
   - Header'da sepet sayısı güncellenecek

5. **Sepeti Görüntüle**
   - `/cart` sayfasına git
   - Ürün miktarını artır/azalt
   - Siparişi tamamla

6. **Admin Panel** (Sadece admin@test.com ile)
   - `/admin` sayfasına git
   - Yeni ürün ekle
   - Mevcut ürünü düzenle/sil

---

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (Header + Providers)
│   ├── page.tsx           # Home page (/)
│   ├── login/page.tsx     # Login page
│   ├── products/page.tsx  # Products listing
│   ├── cart/page.tsx      # Shopping cart
│   └── admin/page.tsx     # Admin panel
│
├── components/
│   └── layout/
│       └── Header.tsx     # Navigation header
│
├── lib/
│   ├── api/
│   │   └── mockApi.ts     # Mock backend API
│   ├── contexts/
│   │   ├── AuthContext.tsx    # Authentication
│   │   ├── CartContext.tsx    # Shopping cart
│   │   └── ProductContext.tsx # Products management
│   ├── hooks/
│   │   └── useLocalStorage.ts # LocalStorage hook
│   └── types/
│       └── index.ts       # TypeScript types
```

---

## 🔍 TypeScript Faydaları

### Type Safety
```typescript
// Compile-time type checking
interface Product {
    id: number;
    name: string;
    price: number;
}

// Hatalı kullanım hatası verir
const product: Product = {
    id: 1,
    name: "Laptop",
    price: "45000" // ❌ Error: Type 'string' is not assignable to type 'number'
};
```

### IntelliSense
- Otomatik kod tamamlama
- Parametre önerileri
- Type documentation

### Refactoring
- Safe rename
- Find all references
- Automatic imports

---

## 🎨 Tailwind CSS Kullanımı

**Utility-first CSS framework:**

```tsx
<div className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
    Button
</div>
```

**Responsive Design:**
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
</div>
```

---

## 🚀 Production Build

```bash
# Build için
npm run build

# Production sunucusu
npm run start
```

**Optimize edilmiş çıktı:**
- Minified code
- Tree shaking
- Code splitting
- Image optimization

---

## 🔐 Environment Variables

**.env.local** dosyası oluştur:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Kullanım:**
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## 🌐 Gerçek Backend Entegrasyonu

### .NET Web API ile entegrasyon

**mockApi.ts yerine:**

```typescript
// lib/api/realApi.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = {
    login: async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }
};
```

**CORS ayarları (.NET):**
```csharp
// Program.cs
builder.Services.AddCors(options => {
    options.AddPolicy("AllowNext", policy => {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

---

## 🐛 Troubleshooting

### Port 3000 zaten kullanımda
```bash
# Farklı port kullan
npm run dev -- -p 3001
```

### Module not found hatası
```bash
# node_modules'u temizle
rm -rf node_modules
npm install
```

### TypeScript hatası
```bash
# Type cache'i temizle
rm -rf .next
npm run dev
```

### LocalStorage çalışmıyor
- Tarayıcı geliştirici araçlarından (F12) Application > LocalStorage'ı kontrol et
- Incognito modda test et

---

## 📚 Öğrenim Kaynakları

**Next.js:**
- https://nextjs.org/docs
- https://nextjs.org/learn

**TypeScript:**
- https://www.typescriptlang.org/docs/
- https://react-typescript-cheatsheet.netlify.app/

**Tailwind CSS:**
- https://tailwindcss.com/docs

---

## 🎯 Sıradaki Adımlar

1. ✅ **Database Ekle** (Prisma ORM)
2. ✅ **Authentication** (NextAuth.js)
3. ✅ **File Upload** (Cloudinary)
4. ✅ **Payment** (Stripe)
5. ✅ **Deploy** (Vercel)

---

## 💡 İpuçları

### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Prettier - Code formatter**

### Kısayollar
- `tsrafce` - TypeScript React Arrow Function Component Export
- `Ctrl + Space` - IntelliSense
- `F12` - Go to definition
- `Alt + Shift + F` - Format document

---

## ✅ Checklist

- [ ] Node.js kuruldu (v18+)
- [ ] Proje klonlandı/indirildi
- [ ] `npm install` çalıştırıldı
- [ ] `npm run dev` çalıştırıldı
- [ ] http://localhost:3000 açıldı
- [ ] Test hesapları ile giriş yapıldı
- [ ] Tüm özellikler test edildi
- [ ] TypeScript hatası yok
- [ ] ESLint hatası yok

---

## 🎉 Başarılar!

Modern, type-safe, production-ready Next.js uygulamanız hazır! 🚀

**Sorularınız için:**
- GitHub Issues
- Stack Overflow
- Next.js Discord
