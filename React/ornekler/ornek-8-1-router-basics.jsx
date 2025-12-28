// DERS 8 - ÖRNEK 1: React Router Temel Kullanım
// NOT: Bu örneği çalıştırmak için önce "npm install react-router-dom" yapmalısın
// Tek başına çalışmaz, App.jsx'de BrowserRouter ile sarmalanmalı

import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// ANA SAYFA
function AnaSayfa() {
    return (
        <div style={{ padding: '40px' }}>
            <h1>🏠 Ana Sayfa</h1>
            <p>React Router örneğine hoşgeldin!</p>
            <p>Yukarıdaki menüden sayfalar arasında gezin.</p>

            <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#e8f5e9',
                borderRadius: '8px'
            }}>
                <h3>✨ Özellikler:</h3>
                <ul>
                    <li>✅ Sayfa yenilemeden gezinme (SPA)</li>
                    <li>✅ URL parametreleri</li>
                    <li>✅ Programmatic navigation</li>
                    <li>✅ 404 page</li>
                </ul>
            </div>
        </div>
    );
}

// HAKKIMIZDA
function Hakkimizda() {
    return (
        <div style={{ padding: '40px' }}>
            <h1>ℹ️ Hakkımızda</h1>
            <p>Bu bir React Router demo uygulamasıdır.</p>
            <p>Single Page Application (SPA) konseptini gösteriyor.</p>
        </div>
    );
}

// ÜRÜNLER LİSTESİ
const urunler = [
    { id: 1, name: 'Laptop', price: 15000, stock: 10 },
    { id: 2, name: 'Telefon', price: 8000, stock: 25 },
    { id: 3, name: 'Tablet', price: 5000, stock: 15 },
    { id: 4, name: 'Kulaklık', price: 500, stock: 50 }
];

function Urunler() {
    return (
        <div style={{ padding: '40px' }}>
            <h1>🛍️ Ürünler</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '30px'
            }}>
                {urunler.map(urun => (
                    <Link
                        key={urun.id}
                        to={`/urun/${urun.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div style={{
                            padding: '20px',
                            border: '2px solid #3498db',
                            borderRadius: '8px',
                            background: 'white',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                                {urun.name}
                            </h3>
                            <p style={{
                                fontSize: '20px',
                                color: '#2ecc71',
                                fontWeight: 'bold',
                                margin: '10px 0'
                            }}>
                                ₺{urun.price.toLocaleString()}
                            </p>
                            <p style={{ color: '#666', margin: 0 }}>
                                Stok: {urun.stock}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// ÜRÜN DETAY (Dynamic Route)
function UrunDetay() {
    const { id } = useParams();  // URL'den id'yi al
    const navigate = useNavigate();  // Programmatic navigation

    const urun = urunler.find(u => u.id === parseInt(id));

    if (!urun) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>❌ Ürün bulunamadı!</h1>
                <button
                    onClick={() => navigate('/urunler')}
                    style={buttonStyle}
                >
                    Ürünlere Dön
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/urunler')}
                style={{
                    ...buttonStyle,
                    marginBottom: '20px'
                }}
            >
                ← Geri
            </button>

            <div style={{
                padding: '40px',
                border: '2px solid #3498db',
                borderRadius: '12px',
                background: 'white'
            }}>
                <h1>{urun.name}</h1>

                <div style={{ marginTop: '30px' }}>
                    <p style={{ fontSize: '14px', color: '#666' }}>Ürün ID:</p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{urun.id}</p>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#666' }}>Fiyat:</p>
                    <p style={{ fontSize: '32px', color: '#2ecc71', fontWeight: 'bold' }}>
                        ₺{urun.price.toLocaleString()}
                    </p>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#666' }}>Stok Durumu:</p>
                    <p style={{
                        fontSize: '20px',
                        color: urun.stock > 0 ? '#2ecc71' : '#e74c3c',
                        fontWeight: 'bold'
                    }}>
                        {urun.stock > 0 ? `${urun.stock} adet mevcut` : 'Stokta yok'}
                    </p>
                </div>

                <button
                    style={{
                        ...buttonStyle,
                        background: '#2ecc71',
                        width: '100%',
                        marginTop: '30px',
                        fontSize: '18px',
                        padding: '15px'
                    }}
                    disabled={urun.stock === 0}
                >
                    {urun.stock > 0 ? 'Sepete Ekle 🛒' : 'Stokta Yok'}
                </button>
            </div>
        </div>
    );
}

// İLETİŞİM FORMU
function Iletisim() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mesajınız gönderildi!');
        navigate('/');  // Ana sayfaya yönlendir
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>📧 İletişim</h1>

            <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>İsim:</label>
                    <input
                        type="text"
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input
                        type="email"
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Mesaj:</label>
                    <textarea
                        required
                        rows="5"
                        style={inputStyle}
                    />
                </div>

                <button type="submit" style={{ ...buttonStyle, width: '100%' }}>
                    Gönder
                </button>
            </form>
        </div>
    );
}

// 404 - NOT FOUND
function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '72px', margin: 0 }}>404</h1>
            <h2>Sayfa Bulunamadı</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
            <button
                onClick={() => navigate('/')}
                style={buttonStyle}
            >
                Ana Sayfaya Dön
            </button>
        </div>
    );
}

// NAVBAR
function Navbar() {
    return (
        <nav style={{
            padding: '15px 30px',
            background: '#2c3e50',
            color: 'white'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h2 style={{ margin: 0 }}>My Shop</h2>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/" style={linkStyle}>Ana Sayfa</Link>
                    <Link to="/hakkimizda" style={linkStyle}>Hakkımızda</Link>
                    <Link to="/urunler" style={linkStyle}>Ürünler</Link>
                    <Link to="/iletisim" style={linkStyle}>İletişim</Link>
                </div>
            </div>
        </nav>
    );
}

// ANA APP (ROUTER SETUP)
export default function RouterExample() {
    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<AnaSayfa />} />
                <Route path="/hakkimizda" element={<Hakkimizda />} />
                <Route path="/urunler" element={<Urunler />} />
                <Route path="/urun/:id" element={<UrunDetay />} />
                <Route path="/iletisim" element={<Iletisim />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

// Styles
const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'opacity 0.2s'
};

const buttonStyle = {
    padding: '10px 20px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
};
