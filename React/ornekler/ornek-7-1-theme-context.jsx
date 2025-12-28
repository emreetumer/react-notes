// DERS 7 - ÖRNEK 1: Theme Context (Global Dark/Light Mode)
// Prop drilling olmadan tema yönetimi

import { createContext, useContext, useState } from 'react';

// 1. CONTEXT OLUŞTUR
const ThemeContext = createContext();

// 2. PROVIDER COMPONENT
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const colors = {
        light: {
            background: '#ffffff',
            text: '#000000',
            cardBg: '#f5f5f5',
            border: '#ddd'
        },
        dark: {
            background: '#1a1a1a',
            text: '#ffffff',
            cardBg: '#333333',
            border: '#555'
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors: colors[theme] }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. CUSTOM HOOK (kullanımı kolaylaştır)
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// 4. HEADER COMPONENT
function Header() {
    const { theme, toggleTheme, colors } = useTheme();

    return (
        <header style={{
            padding: '20px',
            background: colors.cardBg,
            borderBottom: `2px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <h1 style={{ color: colors.text, margin: 0 }}>My App</h1>
            <button
                onClick={toggleTheme}
                style={{
                    padding: '10px 20px',
                    background: theme === 'light' ? '#333' : '#fff',
                    color: theme === 'light' ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
        </header>
    );
}

// 5. CARD COMPONENT (deep nested - props gerekmez!)
function Card({ title, content }) {
    const { colors } = useTheme();

    return (
        <div style={{
            padding: '20px',
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            marginBottom: '15px'
        }}>
            <h3 style={{ color: colors.text, marginTop: 0 }}>{title}</h3>
            <p style={{ color: colors.text }}>{content}</p>
        </div>
    );
}

// 6. SIDEBAR COMPONENT
function Sidebar() {
    const { colors } = useTheme();

    const menuItems = ['Ana Sayfa', 'Profil', 'Ayarlar', 'Çıkış'];

    return (
        <aside style={{
            width: '200px',
            padding: '20px',
            background: colors.cardBg,
            borderRight: `2px solid ${colors.border}`,
            minHeight: '500px'
        }}>
            <h3 style={{ color: colors.text }}>Menü</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {menuItems.map(item => (
                    <li
                        key={item}
                        style={{
                            padding: '10px',
                            marginBottom: '5px',
                            background: colors.background,
                            color: colors.text,
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

// 7. MAIN CONTENT
function MainContent() {
    const { colors } = useTheme();

    return (
        <main style={{ flex: 1, padding: '20px' }}>
            <h2 style={{ color: colors.text }}>Dashboard</h2>

            <Card
                title="Hoşgeldin!"
                content="Bu bir theme context örneğidir. Sağ üstteki butona tıklayarak temayı değiştirebilirsin."
            />

            <Card
                title="Neden Context?"
                content="Context sayesinde tema bilgisini props ile her component'e geçirmemize gerek kalmadı!"
            />

            <Card
                title="Avantajlar"
                content="✅ Prop drilling yok ✅ Global state ✅ Kolay kullanım ✅ Performance"
            />
        </main>
    );
}

// 8. ANA APP COMPONENT
export default function ThemeExample() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
}

function App() {
    const { colors } = useTheme();

    return (
        <div style={{
            background: colors.background,
            minHeight: '100vh'
        }}>
            <Header />

            <div style={{ display: 'flex' }}>
                <Sidebar />
                <MainContent />
            </div>

            <div style={{
                padding: '20px',
                background: colors.cardBg,
                borderTop: `2px solid ${colors.border}`,
                color: colors.text,
                textAlign: 'center'
            }}>
                <p>📚 Context API ile Global Theme Management</p>
            </div>
        </div>
    );
}
