# Ders 9: Best Practices ve Performance 🚀

## 🎯 React Best Practices

### 1. Component Organizasyonu

```
src/
├── components/
│   ├── common/           # Ortak componentler
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── layout/          # Layout componentleri
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   └── features/        # Özellik bazlı
│       ├── auth/
│       ├── products/
│       └── cart/
├── hooks/               # Custom hooks
├── contexts/            # Context providers
├── utils/               # Yardımcı fonksiyonlar
├── services/            # API servisleri
└── App.jsx
```

### 2. Naming Conventions

```jsx
// ✅ DOĞRU
function UserProfile() { }      // PascalCase (Components)
function useAuth() { }          // camelCase (Hooks - 'use' prefix)
const API_URL = '...';          // UPPER_CASE (Constants)
const handleClick = () => { };  // camelCase (Functions)

// ❌ YANLIŞ
function user_profile() { }
function Auth() { }  // Hook ama 'use' yok
const apiUrl = '...';  // Constant ama lowercase
```

### 3. Props Destructuring

```jsx
// ❌ YANLIŞ
function UserCard(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.email}</p>
        </div>
    );
}

// ✅ DOĞRU
function UserCard({ name, email, age = 0 }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>{age} yaş</p>
        </div>
    );
}
```

### 4. Conditional Rendering

```jsx
// ✅ DOĞRU - Ternary
{isLoading ? <Spinner /> : <Data />}

// ✅ DOĞRU - &&
{error && <ErrorMessage />}

// ✅ DOĞRU - Early return
if (isLoading) return <Spinner />;
if (error) return <Error />;
return <Data />;

// ❌ YANLIŞ - if/else JSX içinde
{if (isLoading) {
    return <Spinner />;
}}
```

---

## ⚡ Performance Optimization

### 1. React.memo (Component Memoization)

```jsx
import { memo } from 'react';

// Expensive Component
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
    console.log('Render!');
    
    // Ağır hesaplamalar...
    return <div>{data}</div>;
});

// Parent değişse bile, props aynıysa re-render olmaz!
```

**Ne Zaman Kullan:**
- Props sık değişmeyen componentler
- Render maliyeti yüksek componentler
- Liste item'ları

**Ne Zaman Kullanma:**
- Her component için (gereksiz optimization)
- Props sürekli değişen componentler

### 2. useMemo (Değer Memoization)

```jsx
import { useMemo } from 'react';

function ProductList({ products }) {
    // ❌ YANLIŞ - Her render'da yeniden hesaplanır
    const expensiveCalculation = products.reduce((sum, p) => sum + p.price, 0);
    
    // ✅ DOĞRU - Sadece products değişince hesaplanır
    const total = useMemo(() => {
        console.log('Hesaplanıyor...');
        return products.reduce((sum, p) => sum + p.price, 0);
    }, [products]);
    
    return <h2>Toplam: ${total}</h2>;
}
```

### 3. useCallback (Fonksiyon Memoization)

```jsx
import { useCallback, memo } from 'react';

// Memo'lu child component
const Button = memo(({ onClick, children }) => {
    console.log('Button render!');
    return <button onClick={onClick}>{children}</button>;
});

function Parent() {
    const [count, setCount] = useState(0);
    
    // ❌ YANLIŞ - Her render'da yeni fonksiyon
    const handleClick = () => {
        console.log('Clicked!');
    };
    
    // ✅ DOĞRU - Fonksiyon memoize edildi
    const handleClickMemo = useCallback(() => {
        console.log('Clicked!');
    }, []);  // Dependencies boş = hiç değişmez
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Artır</button>
            <Button onClick={handleClickMemo}>Tıkla</Button>
        </div>
    );
}
```

### 4. Lazy Loading (Code Splitting)

```jsx
import { lazy, Suspense } from 'react';

// ❌ YANLIŞ - Tüm component'ler başta yüklenir
import Dashboard from './Dashboard';
import Settings from './Settings';

// ✅ DOĞRU - Sadece gerektiğinde yüklenir
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Suspense>
    );
}
```

---

## 🛡️ Error Handling

### Error Boundary

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Bir hata oluştu!</h1>
                    <p>{this.state.error?.message}</p>
                </div>
            );
        }
        
        return this.props.children;
    }
}

// Kullanım
function App() {
    return (
        <ErrorBoundary>
            <MyApp />
        </ErrorBoundary>
    );
}
```

---

## 🔒 Security Best Practices

### 1. XSS (Cross-Site Scripting) Koruması

```jsx
// ✅ React otomatik escape eder
function Safe({ userInput }) {
    return <div>{userInput}</div>;
}

// ❌ Tehlikeli! Sadece güvendiğin kaynaklarda kullan
function Dangerous({ html }) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### 2. Environment Variables

```jsx
// .env dosyası
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=your_api_key_here

// Kullanım
const apiUrl = process.env.REACT_APP_API_URL;

// ❌ YANLIŞ - Hassas bilgileri client'ta tutma!
const password = process.env.REACT_APP_PASSWORD;
```

---

## 📝 Code Quality

### 1. PropTypes veya TypeScript

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email }) {
    return <div>...</div>;
}

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    email: PropTypes.string.isRequired
};

UserCard.defaultProps = {
    age: 0
};
```

### 2. ESLint ve Prettier

```json
// package.json
{
  "scripts": {
    "lint": "eslint src/**/*.{js,jsx}",
    "format": "prettier --write src/**/*.{js,jsx,css}"
  }
}
```

---

## 🎯 State Management Best Practices

### 1. State Yerleştirme

```jsx
// ❌ YANLIŞ - Global state için her şey
const [appState, setAppState] = useState({
    user: {},
    theme: 'light',
    cart: [],
    formData: {},
    // ...
});

// ✅ DOĞRU - İhtiyaç duyulan yerde state
function Component() {
    const [localState, setLocalState] = useState(0);  // Component state
}

function App() {
    return (
        <ThemeProvider>  {/* Global - Context */}
            <Component />
        </ThemeProvider>
    );
}
```

### 2. Derived State (Türetilmiş State)

```jsx
// ❌ YANLIŞ - Gereksiz state
function Cart({ items }) {
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        setTotal(items.reduce((sum, item) => sum + item.price, 0));
    }, [items]);
}

// ✅ DOĞRU - Calculate don't store
function Cart({ items }) {
    const total = items.reduce((sum, item) => sum + item.price, 0);
}
```

---

## 📊 Debugging Tips

### 1. React DevTools

```jsx
// Component ismini göster
function MyComponent() { }
MyComponent.displayName = 'MyAwesomeComponent';

// Console log ile debug
useEffect(() => {
    console.log('Component mounted');
    console.log('Props:', props);
    console.log('State:', state);
}, []);
```

### 2. Strict Mode

```jsx
import { StrictMode } from 'react';

// Development'ta sorunları erken yakala
function App() {
    return (
        <StrictMode>
            <MyApp />
        </StrictMode>
    );
}
```

---

## 📱 Accessibility (a11y)

```jsx
// ✅ Semantic HTML
<button>Tıkla</button>
<nav>...</nav>
<main>...</main>

// ✅ ARIA attributes
<button 
    aria-label="Menüyü aç"
    aria-expanded={isOpen}
>
    ☰
</button>

// ✅ Keyboard navigation
<div 
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && handleClick()}
>
    Tıklanabilir
</div>
```

---

## 🎓 Öğrendiklerimiz

✅ Component organizasyonu  
✅ Naming conventions  
✅ Performance optimization (memo, useMemo, useCallback)  
✅ Lazy loading  
✅ Error boundaries  
✅ Security best practices  
✅ Code quality  
✅ State management  
✅ Debugging  
✅ Accessibility  

---

## 🎉 React Yolculuğun Tamamlandı!

Artık profesyonel React Developer'sın! 

**Şimdi Ne Yapmalısın:**
1. ✅ Küçük projeler yap (Todo, Blog, E-commerce)
2. ✅ Gerçek API'lerle çalış
3. ✅ GitHub'a projelerini yükle
4. ✅ Modern kütüphaneleri öğren (Redux, React Query, NextJS)
5. ✅ Açık kaynak projelere katkı yap

**Önerilen Projeler:**
- 📝 Todo App (CRUD operations)
- 🛒 E-commerce (Shopping cart, products)
- 📱 Blog Platform (Posts, comments, auth)
- 💬 Chat Application (Real-time)
- 🎬 Movie Database (API integration)

**Başarılar! 🚀**
