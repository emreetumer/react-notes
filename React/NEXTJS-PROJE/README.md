# 🚀 E-Commerce App - Next.js 14 + TypeScript Full Stack Proje

## 📋 Proje Özeti

**Modern Next.js 14** ile **App Router**, **TypeScript**, **Server Components** ve **Client Components** kullanarak profesyonel bir e-ticaret uygulaması.

### ✨ Özellikler
- ✅ **Next.js 14 App Router** - Modern routing
- ✅ **TypeScript** - Type safety
- ✅ **Server Components** - Performance
- ✅ **Client Components** - Interactivity
- ✅ **Server Actions** - Form handling
- ✅ **Authentication** - Login/Register/Logout
- ✅ **CRUD Operations** - Product management
- ✅ **Shopping Cart** - Global state (Context)
- ✅ **Mock API** - Backend simülasyonu
- ✅ **Tailwind CSS** - Modern styling
- ✅ **Middleware** - Protected routes
- ✅ **LocalStorage** - Persistence

### 🎯 .NET Developer İçin Karşılaştırmalar

| Next.js/TypeScript | .NET/C# |
|-------------------|---------|
| TypeScript | C# Type System |
| Server Components | Razor Pages / MVC Views |
| Client Components | Blazor Components |
| Server Actions | Controller Actions |
| Middleware | ASP.NET Middleware |
| API Routes | Web API Controllers |
| Context API | Dependency Injection |
| interface/type | interface/class |

---

## 📁 Proje Yapısı (Next.js 14 App Router)

```
nextjs-ecommerce/
├── src/
│   ├── app/                        # App Router
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   ├── login/
│   │   │   └── page.tsx           # Login page
│   │   ├── register/
│   │   │   └── page.tsx           # Register page
│   │   ├── products/
│   │   │   ├── page.tsx           # Products list
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Product detail
│   │   ├── cart/
│   │   │   └── page.tsx           # Cart page
│   │   ├── admin/
│   │   │   └── page.tsx           # Admin panel
│   │   └── api/                   # API Routes (optional)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── products/
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductForm.tsx
│   │   └── cart/
│   │       └── CartItem.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   └── mockApi.ts         # Mock API (Backend simülasyonu)
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CartContext.tsx
│   │   │   └── ProductContext.tsx
│   │   ├── hooks/
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useAuth.ts
│   │   └── types/
│   │       └── index.ts           # TypeScript types
│   │
│   ├── middleware.ts               # Route protection
│   └── styles/
│       └── globals.css
│
├── public/
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Kurulum

```bash
# 1. Next.js projesi oluştur (TypeScript ile)
npx create-next-app@latest nextjs-ecommerce --typescript --tailwind --app --eslint

# 2. Klasöre gir
cd nextjs-ecommerce

# 3. Geliştirme sunucusunu başlat
npm run dev
```

**Kurulum sırasında sorulan sorulara cevaplar:**
- ✅ TypeScript: Yes
- ✅ ESLint: Yes
- ✅ Tailwind CSS: Yes
- ✅ `src/` directory: Yes
- ✅ App Router: Yes
- ✅ Import alias: Yes (@/*)

---

## 📊 Next.js 14 Özellikleri

### 1️⃣ Server Components (Default)
```tsx
// Server Component (async, veri çeker)
export default async function ProductsPage() {
    const products = await getProducts(); // Server-side
    return <ProductList products={products} />;
}
```

### 2️⃣ Client Components (Interactivity)
```tsx
'use client'; // Client Component işareti

export default function AddToCartButton() {
    const [count, setCount] = useState(0);
    // State, events, Context kullanabilir
}
```

### 3️⃣ Server Actions (Form Handling)
```tsx
// app/actions.ts
'use server';

export async function loginAction(formData: FormData) {
    // Server-side form processing
    const email = formData.get('email');
    // ...
}
```

### 4️⃣ Middleware (Route Protection)
```ts
// middleware.ts
export function middleware(request: NextRequest) {
    // Auth kontrolü, redirect
}
```

---

## 🎓 TypeScript Avantajları

### Type Safety
```typescript
// C# class gibi
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

// C# method gibi type-safe
function addProduct(product: Product): Promise<Product> {
    // ...
}
```

### Auto-completion
- IntelliSense desteği
- Compile-time hata yakalama
- Refactoring kolaylığı

---

## 🧪 Test Hesapları

```
Admin:
Email: admin@test.com
Şifre: admin123

User:
Email: user@test.com
Şifre: 123456
```

---

## 🔜 Gerçek API Entegrasyonu

Backend hazır olduğunda:

```typescript
// lib/api/mockApi.ts yerine

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api';

export async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}
```

---

## 📚 Öğrenilecek Konular

1. **Next.js App Router**
   - File-based routing
   - Layouts
   - Loading & Error handling

2. **TypeScript**
   - Interfaces & Types
   - Generics
   - Type inference

3. **Server vs Client Components**
   - Rendering strategy
   - Data fetching
   - Hydration

4. **State Management**
   - Context API
   - Server State
   - Client State

---

## 🎉 Başarılar!

Modern, type-safe, performant bir Next.js uygulaması! 🚀

**Sıradaki adımlar:**
1. ✅ .NET Web API geliştir
2. ✅ Database entegrasyonu (Prisma ORM)
3. ✅ NextAuth.js ile authentication
4. ✅ Deploy (Vercel)
