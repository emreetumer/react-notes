# Ders 7: Context API ve Global State 🌐

## 🤔 Prop Drilling Problemi

Prop drilling, props'ları birden fazla component katmanından geçirme sorunudur.

```jsx
// ❌ Prop Drilling
function App() {
    const [user, setUser] = useState({ name: "Emre" });
    return <PageLayout user={user} />;
}

function PageLayout({ user }) {
    return <Sidebar user={user} />;
}

function Sidebar({ user }) {
    return <UserProfile user={user} />;
}

function UserProfile({ user }) {
    return <h1>{user.name}</h1>;  // Burası için 3 katman geçtik!
}
```

**Çözüm: Context API** ✅

---

## 🌐 Context API Nedir?

Context API, component ağacının herhangi bir yerinden global state'e erişmeyi sağlar.

### .NET Analojisi:

```csharp
// C# Dependency Injection
services.AddScoped<IUserService, UserService>();

// Component'te kullanım
public class MyComponent {
    private readonly IUserService _userService;
    
    public MyComponent(IUserService userService) {
        _userService = userService;  // Inject
    }
}

// React Context
const UserContext = createContext();

function MyComponent() {
    const userService = useContext(UserContext);  // Consume
}
```

---

## 📝 Context Oluşturma ve Kullanma

### 1. Context Oluştur

```jsx
import { createContext, useState, useContext } from 'react';

// 1. Context oluştur
const ThemeContext = createContext();

// 2. Provider Component
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    const value = {
        theme,
        toggleTheme
    };
    
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Custom Hook (opsiyonel ama önerilen)
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
```

### 2. App'i Sarmalama

```jsx
import { ThemeProvider } from './ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Header />
            <Main />
            <Footer />
        </ThemeProvider>
    );
}
```

### 3. Context Kullanma

```jsx
import { useTheme } from './ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
            <h1>My App</h1>
            <button onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    );
}

function Footer() {
    const { theme } = useTheme();
    
    return (
        <footer style={{ background: theme === 'light' ? '#eee' : '#222' }}>
            <p>Footer</p>
        </footer>
    );
}
```

**Avantaj:** Header ve Footer prop drilling olmadan theme'e erişiyor! 🎉

---

## 👤 User Authentication Context

```jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const login = async (email, password) => {
        setLoading(true);
        try {
            // API call
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };
    
    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// Kullanım
function LoginButton() {
    const { login, loading } = useAuth();
    
    const handleLogin = () => {
        login('user@example.com', 'password');
    };
    
    return (
        <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
    );
}

function UserProfile() {
    const { user, logout, isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <p>Lütfen giriş yapın</p>;
    }
    
    return (
        <div>
            <h2>Hoşgeldin, {user.name}!</h2>
            <button onClick={logout}>Çıkış Yap</button>
        </div>
    );
}
```

---

## 🛒 Shopping Cart Context

```jsx
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);
    
    const addToCart = (product) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };
    
    const removeFromCart = (productId) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };
    
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };
    
    const clearCart = () => {
        setItems([]);
    };
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    const value = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount
    };
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}

// Kullanım
function ProductCard({ product }) {
    const { addToCart } = useCart();
    
    return (
        <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>
                Sepete Ekle
            </button>
        </div>
    );
}

function CartSummary() {
    const { items, total, itemCount, clearCart } = useCart();
    
    return (
        <div>
            <h2>Sepet ({itemCount} ürün)</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} x {item.quantity} = ${item.price * item.quantity}
                    </li>
                ))}
            </ul>
            <h3>Toplam: ${total}</h3>
            <button onClick={clearCart}>Sepeti Temizle</button>
        </div>
    );
}
```

---

## 🔄 Çoklu Context Kullanımı

```jsx
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    <MainApp />
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

// Veya tek bir provider
function AllProviders({ children }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

function App() {
    return (
        <AllProviders>
            <MainApp />
        </AllProviders>
    );
}
```

---

## ⚠️ Context API Dikkat Edilecekler

### 1. Performance
Context değeri değiştiğinde TÜM consumer'lar re-render olur!

```jsx
// ❌ YANLIŞ - Her render'da yeni object
function BadProvider({ children }) {
    const [state, setState] = useState(0);
    
    return (
        <Context.Provider value={{ state, setState }}>
            {children}
        </Context.Provider>
    );
}

// ✅ DOĞRU - useMemo kullan
function GoodProvider({ children }) {
    const [state, setState] = useState(0);
    
    const value = useMemo(() => ({ state, setState }), [state]);
    
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
```

### 2. Ne Zaman Kullanılır?

✅ **Context Kullan:**
- Theme (dark/light mode)
- User authentication
- Language/i18n
- Shopping cart
- Global settings

❌ **Context Kullanma:**
- Frequently changing data (Redux kullan)
- Component-specific state
- Props yeterli olan yerler

---

## 🎓 Öğrendiklerimiz

✅ Prop drilling problemi  
✅ Context API nedir  
✅ createContext, Provider, Consumer  
✅ useContext hook  
✅ Custom context hooks  
✅ Multiple contexts  
✅ Performance considerations  

---

## ➡️ Sırada Ne Var?

Bir sonraki derste **React Router** öğreneceğiz! Single Page Application (SPA) ve sayfa yönlendirme! 🗺️
