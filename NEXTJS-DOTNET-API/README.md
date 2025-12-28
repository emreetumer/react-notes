# 🚀 Next.js + .NET Web API Entegrasyonu

Bu proje, **Next.js** frontend'i ile **.NET Web API** backend'ini entegre etmeyi gösteren kapsamlı bir örnek uygulamadır.

## 📋 İçerik

- ✅ **Detaylı Teorik Anlatım** - [DERS-NOTLARI.md](./DERS-NOTLARI.md)
- ✅ **API Client Yapısı** - Axios ile merkezi API yönetimi
- ✅ **Authentication** - JWT tabanlı kimlik doğrulama
- ✅ **CRUD İşlemleri** - Product yönetimi örnekleri
- ✅ **Custom Hooks** - useAuth, useProducts
- ✅ **TypeScript** - Tam tip güvenliği
- ✅ **Error Handling** - Merkezi hata yönetimi
- ✅ **Pagination** - Sayfalama desteği
- ✅ **File Upload** - Dosya yükleme örneği

## 🎯 Özellikler

### API Client
- Request/Response interceptors
- Automatic token management
- Token refresh mechanism
- Centralized error handling
- Request/Response logging

### Authentication
- Login/Register
- JWT token management
- Protected routes
- Role-based access control
- Password reset
- Email verification

### Product Management
- List products with pagination
- Search and filter
- CRUD operations
- Image upload
- Stock management
- Category management

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Type Safety**: TypeScript
- **State Management**: React Hooks
- **Backend**: .NET Web API (ayrı bir proje olarak)

## 📦 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/your-username/react-notes.git
cd NEXTJS-DOTNET-API
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

`.env.example` dosyasını kopyalayıp `.env.local` oluşturun:

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:

```env
NEXT_PUBLIC_API_URL=https://localhost:7001/api
NEXT_PUBLIC_API_TIMEOUT=30000
```

### 4. .NET API'yi Hazırlayın

Bu proje bir .NET Web API ile çalışmak üzere tasarlanmıştır. Kendi API'nizi oluşturmanız gerekir.

**Minimum API Endpoints:**

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/refresh

GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
```

**Örnek .NET API CORS Ayarı:**

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

app.UseCors("AllowNextJs");
```

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 📚 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── login/             # Login sayfası
│   ├── products/          # Products listesi
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
│
├── lib/                   # Kütüphane kodları
│   ├── api/              # API katmanı
│   │   ├── client.ts     # API client (Axios)
│   │   └── services/     # Service katmanları
│   │       ├── auth.service.ts
│   │       └── product.service.ts
│   │
│   ├── types/            # TypeScript tipleri
│   │   ├── auth.types.ts
│   │   ├── product.types.ts
│   │   └── common.types.ts
│   │
│   ├── hooks/            # Custom React Hooks
│   │   ├── useAuth.ts
│   │   └── useProducts.ts
│   │
│   └── config/           # Konfigürasyon
│       └── env.ts
│
└── components/           # React bileşenleri
```

## 🎓 Nasıl Kullanılır?

### 1. Teorik Bilgileri Öğrenin

[DERS-NOTLARI.md](./DERS-NOTLARI.md) dosyasını okuyarak:
- API Client nasıl oluşturulur
- Authentication nasıl yapılır
- CRUD işlemleri nasıl implement edilir
- Error handling nasıl yapılır
- Best practices nelerdir

### 2. Kod Örneklerini İnceleyin

```typescript
// API çağrısı örneği
import { productService } from '@/lib/api/services/product.service';

// Ürünleri getir
const products = await productService.getProducts({
  page: 1,
  pageSize: 10,
  search: 'laptop'
});

// Yeni ürün oluştur
const newProduct = await productService.createProduct({
  name: 'MacBook Pro',
  price: 35000,
  description: 'M3 Pro chip',
  stock: 10,
  categoryId: 'abc123'
});
```

### 3. Custom Hook Kullanımı

```typescript
// Component içinde
import { useProducts } from '@/lib/hooks/useProducts';

function ProductList() {
  const { products, isLoading, error } = useProducts({
    page: 1,
    pageSize: 12
  });

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return <ProductGrid products={products} />;
}
```

## 🔑 Önemli Kavramlar

### API Client Pattern

```typescript
// Tüm API istekleri merkezi bir client üzerinden gider
const apiClient = new ApiClient();

// Otomatik token ekleme
apiClient.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Service Layer Pattern

```typescript
// Her entity için ayrı service
class ProductService {
  async getProducts() { /* ... */ }
  async createProduct() { /* ... */ }
  async updateProduct() { /* ... */ }
  async deleteProduct() { /* ... */ }
}

export const productService = new ProductService();
```

### Custom Hooks Pattern

```typescript
// State management ve API çağrıları hook içinde
function useProducts(query) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchProducts();
  }, [query]);
  
  return { products, isLoading, refetch: fetchProducts };
}
```

## ⚙️ Konfigürasyon

### API URL Değiştirme

`.env.local` dosyasında:

```env
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

### Timeout Ayarlama

```env
NEXT_PUBLIC_API_TIMEOUT=60000  # 60 saniye
```

### Logging Açma/Kapama

```env
NEXT_PUBLIC_ENABLE_LOGGING=true  # Development için true
```

## 🐛 Sorun Giderme

### CORS Hatası

```
Access to XMLHttpRequest at 'https://api...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Çözüm:** .NET API'nizde CORS ayarlarını yapın (yukarıda gösterildi).

### 401 Unauthorized

**Çözüm:** Token'ın doğru gönderildiğinden emin olun. Browser DevTools > Network > Headers kontrol edin.

### Network Error

**Çözüm:** 
1. .NET API'nizin çalıştığını kontrol edin
2. API URL'in doğru olduğunu kontrol edin
3. Firewall ayarlarını kontrol edin

## 📖 Daha Fazla Bilgi

- [DERS-NOTLARI.md](./DERS-NOTLARI.md) - Detaylı teorik anlatım
- [Next.js Docs](https://nextjs.org/docs)
- [Axios Docs](https://axios-http.com)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje eğitim amaçlıdır ve özgürce kullanılabilir.

## 💡 İpuçları

1. **Type Safety**: Her zaman TypeScript tiplerini kullanın
2. **Error Handling**: Try-catch blokları kullanın
3. **Loading States**: Kullanıcı deneyimi için loading gösterin
4. **Validation**: Form validasyonlarını mutlaka yapın
5. **Security**: Token'ları güvenli şekilde saklayın

## 📧 Destek

Sorularınız için:
- Issue açın
- Email gönderin
- Pull request gönderin

---

**Not:** Bu proje, .NET Web API ile Next.js entegrasyonunu öğrenmek için hazırlanmış kapsamlı bir örnektir. Kendi projelerinizde temel olarak kullanabilirsiniz.

Happy Coding! 🚀
