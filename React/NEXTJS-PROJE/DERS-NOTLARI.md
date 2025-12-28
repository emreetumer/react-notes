# 📘 Next.js + TypeScript ile E-Commerce - Ders Notları

## 🎯 Bu Projede Öğrenecekleriniz

### 1️⃣ Next.js 14 App Router

#### Server Components (Varsayılan)
```tsx
// app/products/page.tsx
// Bu component SERVER-SIDE çalışır
export default async function ProductsPage() {
    // Direct database access mümkün
    const products = await db.products.findMany();
    
    return <ProductList products={products} />;
}
```

**Avantajları:**
- ✅ Daha hızlı sayfa yükleme
- ✅ SEO dostu
- ✅ Zero JavaScript to client (varsayılan)
- ✅ Direct database/API access

**C# Analojisi:** Razor Pages / MVC Views (Server-side rendering)

---

#### Client Components
```tsx
'use client'; // Bu directive CLIENT-SIDE işareti

import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    // State, events, Context API kullanabilir
    
    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
```

**Ne zaman kullanılır:**
- ❌ State (useState, useReducer)
- ❌ Effects (useEffect)
- ❌ Context API
- ❌ Browser APIs (localStorage, window)
- ❌ Event handlers (onClick, onChange)

**C# Analojisi:** Blazor WebAssembly (Client-side)

---

### 2️⃣ TypeScript Temelleri

#### Interfaces vs Types

```typescript
// Interface (genişletilebilir)
interface User {
    id: number;
    name: string;
}

interface Admin extends User {
    role: 'admin';
}

// Type (union types için iyi)
type Status = 'pending' | 'completed' | 'cancelled';
type ID = string | number;
```

**C# Analojisi:**
```csharp
// Interface
public interface IUser {
    int Id { get; set; }
    string Name { get; set; }
}

// Enum
public enum Status {
    Pending,
    Completed,
    Cancelled
}
```

---

#### Generic Types

```typescript
// TypeScript
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

const response: ApiResponse<Product> = {
    success: true,
    data: { id: 1, name: "Laptop" }
};
```

```csharp
// C# equivalent
public class ApiResponse<T> {
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string? Error { get; set; }
}

var response = new ApiResponse<Product> {
    Success = true,
    Data = new Product { Id = 1, Name = "Laptop" }
};
```

---

#### Utility Types

```typescript
// Partial<T> - tüm alanlar optional
interface Product {
    id: number;
    name: string;
    price: number;
}

type UpdateProduct = Partial<Product>;
// { id?: number; name?: string; price?: number; }

// Omit<T, K> - belirli alanları çıkar
type ProductWithoutId = Omit<Product, 'id'>;
// { name: string; price: number; }

// Pick<T, K> - sadece belirli alanları al
type ProductBasic = Pick<Product, 'id' | 'name'>;
// { id: number; name: string; }
```

---

### 3️⃣ React Context API (TypeScript ile)

#### Context Oluşturma

```typescript
// 1. Type tanımla
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// 2. Context oluştur
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    
    const login = async (email: string, password: string) => {
        // Login logic
    };
    
    const value: AuthContextType = { user, login, logout };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 4. Custom hook
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
```

**C# Analojisi:**
```csharp
// Dependency Injection
public interface IAuthService {
    User? CurrentUser { get; }
    Task LoginAsync(string email, string password);
    void Logout();
}

// Startup.cs / Program.cs
services.AddScoped<IAuthService, AuthService>();

// Controller
public class HomeController {
    private readonly IAuthService _authService;
    
    public HomeController(IAuthService authService) {
        _authService = authService;
    }
}
```

---

### 4️⃣ Next.js Routing (App Router)

#### File-based Routing

```
app/
├── page.tsx              → /
├── login/
│   └── page.tsx         → /login
├── products/
│   ├── page.tsx         → /products
│   └── [id]/
│       └── page.tsx     → /products/123
└── admin/
    └── page.tsx         → /admin
```

**Dynamic Routes:**

```tsx
// app/products/[id]/page.tsx
export default function ProductDetail({ 
    params 
}: { 
    params: { id: string } 
}) {
    return <div>Product ID: {params.id}</div>;
}
```

**C# Analojisi:**
```csharp
// Startup.cs / Program.cs
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Controller
public IActionResult ProductDetail(int id) {
    return View(id);
}
```

---

#### Layouts

```tsx
// app/layout.tsx
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
```

**C# Analojisi:** `_Layout.cshtml` (Razor)

---

### 5️⃣ State Management Patterns

#### Local State (useState)

```typescript
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Product[]>([]);
```

#### Global State (Context API)

```typescript
// Provider hierarchy
<AuthProvider>
    <ProductProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </ProductProvider>
</AuthProvider>
```

**C# Analojisi:**
```csharp
// DI Container
services.AddScoped<IAuthService, AuthService>();
services.AddScoped<IProductService, ProductService>();
services.AddScoped<ICartService, CartService>();
```

---

### 6️⃣ Custom Hooks (TypeScript)

#### useLocalStorage Hook

```typescript
function useLocalStorage<T>(
    key: string, 
    initialValue: T
): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;
        
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

// Kullanım
const [user, setUser] = useLocalStorage<User | null>('user', null);
```

---

### 7️⃣ Form Handling & Validation

#### TypeScript ile Form

```typescript
interface LoginForm {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: ''
    });
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Type-safe form data
        const { email, password } = formData;
        await login(email, password);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({
                    ...formData,
                    email: e.target.value
                })}
            />
        </form>
    );
}
```

---

### 8️⃣ API Integration

#### Mock API Pattern

```typescript
// lib/api/mockApi.ts
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = {
    getAll: async (): Promise<ApiResponse<Product[]>> => {
        await delay(300); // Simulate network delay
        const products = localStorage.getItem('products');
        return { 
            success: true, 
            data: products ? JSON.parse(products) : [] 
        };
    },
    
    create: async (product: CreateProductDto): Promise<ApiResponse<Product>> => {
        await delay(400);
        const newProduct: Product = {
            id: Date.now(),
            ...product
        };
        // Save to localStorage
        return { success: true, data: newProduct };
    }
};
```

**Real API'ye geçiş:**

```typescript
// lib/api/realApi.ts
export const productsApi = {
    getAll: async (): Promise<ApiResponse<Product[]>> => {
        const response = await fetch(`${API_URL}/products`);
        return response.json();
    },
    
    create: async (product: CreateProductDto): Promise<ApiResponse<Product>> => {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        return response.json();
    }
};
```

---

## 🎓 TypeScript Best Practices

### 1. Always Type Function Parameters

```typescript
// ❌ Bad
function addProduct(product) {
    // ...
}

// ✅ Good
function addProduct(product: CreateProductDto): Promise<Product> {
    // ...
}
```

### 2. Use Interfaces for Objects

```typescript
// ✅ Good
interface Product {
    id: number;
    name: string;
    price: number;
}

const product: Product = {
    id: 1,
    name: "Laptop",
    price: 45000
};
```

### 3. Avoid 'any'

```typescript
// ❌ Bad
const data: any = fetchData();

// ✅ Good
const data: Product[] = await fetchProducts();
```

### 4. Use Type Guards

```typescript
function isProduct(obj: any): obj is Product {
    return 'id' in obj && 'name' in obj && 'price' in obj;
}

if (isProduct(data)) {
    // TypeScript knows 'data' is Product here
    console.log(data.name);
}
```

---

## 🚀 Performance Optimization

### 1. useMemo

```typescript
const filteredProducts = useMemo(() => {
    return products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );
}, [products, search]);
```

### 2. useCallback

```typescript
const handleAddToCart = useCallback((product: Product) => {
    addToCart(product, 1);
}, [addToCart]);
```

### 3. React.memo

```typescript
const ProductCard = React.memo<ProductCardProps>(({ product }) => {
    return <div>{product.name}</div>;
});
```

---

## 📊 Proje Mimarisi

```
Next.js App (Frontend)
    ↓
Context Providers (State Management)
    ↓
Mock API Layer (Business Logic Simulation)
    ↓
LocalStorage (Data Persistence)

// Production'da:
Next.js App
    ↓
Context Providers
    ↓
Real API Layer (Axios/Fetch)
    ↓
.NET Web API
    ↓
Entity Framework Core
    ↓
SQL Server Database
```

---

## 🎯 .NET Developer İçin Özet

| Next.js/TypeScript | .NET/C# |
|-------------------|---------|
| Server Components | Razor Pages / MVC |
| Client Components | Blazor WebAssembly |
| Context API | Dependency Injection |
| Custom Hooks | Extension Methods |
| TypeScript Interfaces | C# Interfaces |
| Generic Types `<T>` | Generic Types `<T>` |
| useState | ViewBag / ViewData |
| useEffect | Component Lifecycle |
| API Routes | Web API Controllers |
| Middleware | ASP.NET Middleware |

---

## ✅ Sıradaki Öğrenilecekler

1. **Database Integration** (Prisma ORM)
2. **Authentication** (NextAuth.js)
3. **Server Actions** (Form handling)
4. **API Routes** (Next.js backend)
5. **Deployment** (Vercel)
6. **Testing** (Jest, React Testing Library)

---

Başarılar! 🚀
