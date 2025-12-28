// Ders 4 - Örnek 4: API Fetch ile Veri Çekme

import { useState, useEffect } from 'react';

function KullaniciListesiAPI() {
    const [kullanicilar, setKullanicilar] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [hata, setHata] = useState(null);
    const [secilenKullanici, setSecilenKullanici] = useState(null);

    // İlk yüklemede veri çek
    useEffect(() => {
        const veriCek = async () => {
            try {
                setYukleniyor(true);
                setHata(null);

                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                if (!response.ok) {
                    throw new Error('Veri yüklenemedi!');
                }

                const data = await response.json();
                setKullanicilar(data);

                console.log('✅ Veri başarıyla yüklendi:', data.length, 'kullanıcı');
            } catch (err) {
                setHata(err.message);
                console.error('❌ Hata:', err);
            } finally {
                setYukleniyor(false);
            }
        };

        veriCek();
    }, []);  // Sadece ilk yüklemede

    // Seçilen kullanıcı değiştiğinde detayları logla
    useEffect(() => {
        if (secilenKullanici) {
            console.log('👤 Seçilen kullanıcı:', secilenKullanici);
        }
    }, [secilenKullanici]);

    const yenidenYukle = () => {
        setYukleniyor(true);
        setHata(null);
        setSecilenKullanici(null);

        // Sayfa yenileme simülasyonu
        setTimeout(() => {
            window.location.reload();
        }, 300);
    };

    // Yükleniyor durumu
    if (yukleniyor) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '100px 20px',
                fontFamily: 'Arial'
            }}>
                <div style={{
                    display: 'inline-block',
                    width: '50px',
                    height: '50px',
                    border: '5px solid #f3f3f3',
                    borderTop: '5px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <h2 style={{ marginTop: '20px', color: '#7f8c8d' }}>
                    Yükleniyor...
                </h2>
            </div>
        );
    }

    // Hata durumu
    if (hata) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '100px 20px',
                fontFamily: 'Arial'
            }}>
                <div style={{ fontSize: '72px', marginBottom: '20px' }}>❌</div>
                <h2 style={{ color: '#e74c3c', marginBottom: '10px' }}>
                    Hata Oluştu!
                </h2>
                <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
                    {hata}
                </p>
                <button
                    onClick={yenidenYukle}
                    style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    🔄 Yeniden Dene
                </button>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '20px auto',
            padding: '30px',
            fontFamily: 'Arial'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <h1 style={{ margin: 0 }}>
                    👥 Kullanıcı Listesi ({kullanicilar.length})
                </h1>
                <button
                    onClick={yenidenYukle}
                    style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    🔄 Yenile
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                {kullanicilar.map(kullanici => (
                    <div
                        key={kullanici.id}
                        onClick={() => setSecilenKullanici(kullanici)}
                        style={{
                            padding: '20px',
                            backgroundColor: secilenKullanici?.id === kullanici.id ? '#e3f2fd' : '#fff',
                            border: `2px solid ${secilenKullanici?.id === kullanici.id ? '#3498db' : '#e0e0e0'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: secilenKullanici?.id === kullanici.id
                                ? '0 4px 15px rgba(52, 152, 219, 0.3)'
                                : '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: '#3498db',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            marginBottom: '15px'
                        }}>
                            {kullanici.name.charAt(0)}
                        </div>

                        <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                            {kullanici.name}
                        </h3>

                        <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                            <p style={{ margin: '5px 0' }}>
                                👤 @{kullanici.username}
                            </p>
                            <p style={{ margin: '5px 0' }}>
                                📧 {kullanici.email}
                            </p>
                            <p style={{ margin: '5px 0' }}>
                                📞 {kullanici.phone}
                            </p>
                            <p style={{ margin: '5px 0' }}>
                                🏢 {kullanici.company.name}
                            </p>
                            <p style={{ margin: '5px 0' }}>
                                🌐 {kullanici.website}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detay Modal */}
            {secilenKullanici && (
                <div
                    onClick={() => setSecilenKullanici(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '15px',
                            maxWidth: '500px',
                            width: '90%',
                            maxHeight: '80vh',
                            overflow: 'auto'
                        }}
                    >
                        <h2 style={{ marginTop: 0 }}>
                            {secilenKullanici.name}
                        </h2>

                        <h3>📍 Adres</h3>
                        <p>{secilenKullanici.address.street}, {secilenKullanici.address.suite}</p>
                        <p>{secilenKullanici.address.city}, {secilenKullanici.address.zipcode}</p>

                        <h3>🏢 Şirket</h3>
                        <p><strong>{secilenKullanici.company.name}</strong></p>
                        <p style={{ fontStyle: 'italic', color: '#7f8c8d' }}>
                            "{secilenKullanici.company.catchPhrase}"
                        </p>

                        <button
                            onClick={() => setSecilenKullanici(null)}
                            style={{
                                width: '100%',
                                marginTop: '20px',
                                backgroundColor: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            ❌ Kapat
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default KullaniciListesiAPI;

/*
API FETCH PATTERN:

1. STATE YÖNETİMİ:
   - data: API'den gelen veri
   - loading: Yükleniyor durumu
   - error: Hata mesajı

2. ASYNC FUNCTION İÇİNDE:
   useEffect(() => {
       const fetchData = async () => {
           try {
               setLoading(true);
               const response = await fetch(url);
               const data = await response.json();
               setData(data);
           } catch (error) {
               setError(error.message);
           } finally {
               setLoading(false);
           }
       };
       fetchData();
   }, []);

3. CONDITIONAL RENDERING:
   - Loading → Spinner göster
   - Error → Hata mesajı
   - Success → Data göster

C# KARŞILAŞTIRMA:

C# (ASP.NET):
-------------
[HttpGet]
public async Task<ActionResult> GetUsers() {
    try {
        var users = await _service.GetUsersAsync();
        return Ok(users);
    } catch (Exception ex) {
        return BadRequest(ex.Message);
    }
}

React:
------
useEffect(() => {
    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };
    fetchUsers();
}, []);

ÖĞRENDIĞIMIZ:
✅ Async/Await kullanımı
✅ Try-catch error handling
✅ Loading states
✅ Conditional rendering
✅ Modal component
✅ Grid layout
✅ Click events

Gerçek projelerde sürekli kullanacağın bir pattern! 🚀
*/
