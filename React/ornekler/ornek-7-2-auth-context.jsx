// DERS 7 - ÖRNEK 2: Auth Context (Kullanıcı Kimlik Doğrulama)
// Global authentication state management

import { createContext, useContext, useState } from 'react';

// 1. AUTH CONTEXT
const AuthContext = createContext();

// 2. AUTH PROVIDER
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Gerçek uygulamada API çağrısı yapılır
        if (password === '123456') {
            const userData = {
                id: 1,
                email: email,
                name: email.split('@')[0],
                role: 'user'
            };
            setUser(userData);
            return { success: true };
        }
        return { success: false, error: 'Hatalı şifre!' };
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. CUSTOM HOOK
function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// 4. LOGIN FORM
function LoginForm() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const result = login(email, password);
        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '40px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>🔐 Giriş Yap</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Şifre:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px'
                        }}
                    />
                </div>

                {error && (
                    <div style={{
                        padding: '10px',
                        background: '#fee',
                        color: '#c33',
                        borderRadius: '5px',
                        marginBottom: '15px'
                    }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Giriş
                </button>
            </form>

            <p style={{
                marginTop: '20px',
                textAlign: 'center',
                color: '#666',
                fontSize: '14px'
            }}>
                💡 İpucu: Şifre = 123456
            </p>
        </div>
    );
}

// 5. NAVBAR (Authentication aware)
function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav style={{
            padding: '15px 30px',
            background: '#2c3e50',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <h2 style={{ margin: 0 }}>My App</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span>Hoşgeldin, {user.name}! 👋</span>
                <button
                    onClick={logout}
                    style={{
                        padding: '8px 15px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Çıkış
                </button>
            </div>
        </nav>
    );
}

// 6. DASHBOARD (Protected content)
function Dashboard() {
    const { user } = useAuth();

    return (
        <div style={{ padding: '40px' }}>
            <h1>Dashboard</h1>

            <div style={{
                padding: '20px',
                background: '#ecf0f1',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h3>Kullanıcı Bilgileri</h3>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>İsim:</strong> {user.name}</p>
                <p><strong>Rol:</strong> {user.role}</p>
            </div>

            <div style={{
                padding: '20px',
                background: '#d5f4e6',
                borderRadius: '8px'
            }}>
                <h3>✅ Başarılı!</h3>
                <p>Context API sayesinde kullanıcı bilgilerine her yerden erişebiliyoruz!</p>
                <ul>
                    <li>Login state global</li>
                    <li>Navbar kullanıcı bilgisini biliyor</li>
                    <li>Dashboard korumalı</li>
                    <li>Prop drilling yok!</li>
                </ul>
            </div>
        </div>
    );
}

// 7. ANA APP
export default function AuthExample() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <Navbar />
                    <Dashboard />
                </>
            ) : (
                <LoginForm />
            )}
        </div>
    );
}
