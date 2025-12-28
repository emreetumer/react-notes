# Ders 8: React Router - Sayfa Yönlendirme 🗺️

## 🤔 SPA (Single Page Application) Nedir?

**SPA:** Sayfa yenilemeden farklı "sayfalar" arasında gezinme.

### Traditional Web vs SPA

**Traditional (.NET MVC):**
```
Ana Sayfa → Server Request → Yeni HTML
Hakkımızda → Server Request → Yeni HTML
```

**React SPA:**
```
Ana Sayfa → Client-side Routing → Component değişir
Hakkımızda → Client-side Routing → Component değişir
(Sayfa yenilenmez! ⚡)
```

---

## 📦 React Router Kurulumu

```bash
npm install react-router-dom
```

---

## 🚀 Temel Kullanım

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Sayfa Component'leri
function AnaSayfa() {
    return <h1>Ana Sayfa</h1>;
}

function Hakkimizda() {
    return <h1>Hakkımızda</h1>;
}

function Iletisim() {
    return <h1>İletişim</h1>;
}

// App Component
function App() {
    return (
        <BrowserRouter>
            {/* Navigation */}
            <nav>
                <Link to="/">Ana Sayfa</Link>
                <Link to="/hakkimizda">Hakkımızda</Link>
                <Link to="/iletisim">İletişim</Link>
            </nav>
            
            {/* Routes */}
            <Routes>
                <Route path="/" element={<AnaSayfa />} />
                <Route path="/hakkimizda" element={<Hakkimizda />} />
                <Route path="/iletisim" element={<Iletisim />} />
            </Routes>
        </BrowserRouter>
    );
}
```

**Önemli:**
- `<BrowserRouter>`: Tüm app'i sarmalıyor
- `<Link>`: a tagı yerine (sayfa yenilenmez)
- `<Routes>`: Route'ları grupluyor
- `<Route>`: Path ve component eşleştirmesi

---

## 🎯 Dynamic Routes (Parametreli)

```jsx
import { useParams } from 'react-router-dom';

// Kullanıcı Detay Sayfası
function KullaniciDetay() {
    const { id } = useParams();  // URL'den id al
    
    return (
        <div>
            <h1>Kullanıcı ID: {id}</h1>
        </div>
    );
}

// Routes
<Routes>
    <Route path="/kullanici/:id" element={<KullaniciDetay />} />
</Routes>

// Kullanım
<Link to="/kullanici/1">Kullanıcı 1</Link>
<Link to="/kullanici/42">Kullanıcı 42</Link>
```

**C# MVC Analojisi:**
```csharp
// C# MVC Route
[Route("kullanici/{id}")]
public IActionResult KullaniciDetay(int id) {
    return View();
}

// React Router
<Route path="/kullanici/:id" element={<KullaniciDetay />} />
```

---

## 🧭 useNavigate - Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        // Login işlemi...
        
        // Başarılı → Dashboard'a git
        navigate('/dashboard');
        
        // Geri git
        // navigate(-1);
        
        // Replace (history'ye ekleme)
        // navigate('/dashboard', { replace: true });
    };
    
    return (
        <form onSubmit={handleLogin}>
            {/* Form alanları */}
            <button type="submit">Giriş Yap</button>
        </form>
    );
}
```

---

## 🔐 Protected Routes (Korumalı Rotalar)

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
}

// Kullanım
<Routes>
    <Route path="/login" element={<Login />} />
    
    <Route 
        path="/dashboard" 
        element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        } 
    />
    
    <Route 
        path="/profil" 
        element={
            <ProtectedRoute>
                <Profil />
            </ProtectedRoute>
        } 
    />
</Routes>
```

---

## 📂 Nested Routes (İç İçe Rotalar)

```jsx
import { Outlet } from 'react-router-dom';

// Layout Component
function DashboardLayout() {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="/dashboard/genel">Genel</Link>
                <Link to="/dashboard/ayarlar">Ayarlar</Link>
                <Link to="/dashboard/profil">Profil</Link>
            </nav>
            
            {/* Alt route'lar burada render edilir */}
            <Outlet />
        </div>
    );
}

function Genel() {
    return <h2>Genel Bakış</h2>;
}

function Ayarlar() {
    return <h2>Ayarlar</h2>;
}

// Routes
<Routes>
    <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="genel" element={<Genel />} />
        <Route path="ayarlar" element={<Ayarlar />} />
        <Route path="profil" element={<Profil />} />
    </Route>
</Routes>
```

---

## 🔍 Query Parameters (URL Parametreleri)

```jsx
import { useSearchParams } from 'react-router-dom';

function AramaSayfasi() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const query = searchParams.get('q');  // ?q=react
    const sayfa = searchParams.get('sayfa');  // &sayfa=2
    
    const handleSearch = (term) => {
        setSearchParams({ q: term, sayfa: 1 });
        // URL: /arama?q=react&sayfa=1
    };
    
    return (
        <div>
            <h1>Arama Sonuçları: {query}</h1>
            <p>Sayfa: {sayfa || 1}</p>
        </div>
    );
}
```

---

## 🚫 404 - Not Found Page

```jsx
function NotFound() {
    return (
        <div>
            <h1>404 - Sayfa Bulunamadı</h1>
            <Link to="/">Ana Sayfaya Dön</Link>
        </div>
    );
}

// Routes
<Routes>
    <Route path="/" element={<AnaSayfa />} />
    <Route path="/hakkimizda" element={<Hakkimizda />} />
    
    {/* Catch all - En sona koy */}
    <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 🎨 NavLink - Active Link Styling

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <NavLink 
                to="/"
                className={({ isActive }) => isActive ? 'active' : ''}
                style={({ isActive }) => ({
                    color: isActive ? 'red' : 'blue'
                })}
            >
                Ana Sayfa
            </NavLink>
            
            <NavLink 
                to="/hakkimizda"
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                Hakkımızda
            </NavLink>
        </nav>
    );
}

// CSS
.active {
    font-weight: bold;
    text-decoration: underline;
}
```

---

## 📱 Gerçek Dünya Örneği

```jsx
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout
function AppLayout() {
    const { isAuthenticated, user, logout } = useAuth();
    
    return (
        <div>
            <header>
                <nav>
                    <Link to="/">Ana Sayfa</Link>
                    <Link to="/urunler">Ürünler</Link>
                    
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <span>Hoşgeldin, {user.name}</span>
                            <button onClick={logout}>Çıkış</button>
                        </>
                    ) : (
                        <Link to="/login">Giriş Yap</Link>
                    )}
                </nav>
            </header>
            
            <main>
                <Outlet />
            </main>
        </div>
    );
}

// Protected Route Component
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

// App
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<AnaSayfa />} />
                        <Route path="/urunler" element={<UrunListesi />} />
                        <Route path="/urun/:id" element={<UrunDetay />} />
                        <Route path="/login" element={<Login />} />
                        
                        {/* Protected Routes */}
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } 
                        />
                        
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
```

---

## 🎓 Öğrendiklerimiz

✅ SPA nedir  
✅ React Router kurulumu  
✅ Routes, Route, Link  
✅ Dynamic routes (useParams)  
✅ Programmatic navigation (useNavigate)  
✅ Protected routes  
✅ Nested routes (Outlet)  
✅ Query parameters (useSearchParams)  
✅ 404 pages  
✅ NavLink  

---

## ➡️ Sırada Ne Var?

Son ders: **Best Practices ve Performance Optimization**! Profesyonel React yazmak için tüm ipuçları! 🚀
