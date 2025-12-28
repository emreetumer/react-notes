// App.jsx - Main application with routing
// C# analojisi: Program.cs + Startup.cs

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';

// Components
import Header from './components/layout/Header';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

// Protected Route Component
// C# analojisi: [Authorize] attribute
function ProtectedRoute({ children, adminOnly = false }) {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center'
            }}>
                <h1>⛔ Yetkisiz Erişim</h1>
                <p>Bu sayfaya erişim yetkiniz yok.</p>
                <p>Sadece admin kullanıcılar erişebilir.</p>
            </div>
        );
    }

    return children;
}

// Main App Component
function AppContent() {
    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Header />

            <main>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/products" element={<ProductsPage />} />

                    {/* Protected Routes */}
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <CartPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Only Route */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* 404 */}
                    <Route
                        path="*"
                        element={
                            <div style={{ padding: '40px', textAlign: 'center' }}>
                                <h1>404 - Sayfa Bulunamadı</h1>
                                <p>Aradığınız sayfa mevcut değil.</p>
                            </div>
                        }
                    />
                </Routes>
            </main>

            <footer style={{
                background: '#2c3e50',
                color: 'white',
                padding: '20px',
                textAlign: 'center',
                marginTop: '40px'
            }}>
                <p>© 2025 E-Shop - React + .NET Demo Project</p>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>
                    Mock API simülasyonu ile çalışır | LocalStorage kullanır
                </p>
            </footer>
        </div>
    );
}

// Root App with Providers
// C# analojisi: Dependency Injection Container
export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ProductProvider>
                    <CartProvider>
                        <AppContent />
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
