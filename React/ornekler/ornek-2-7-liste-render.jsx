// Ders 2 - Örnek 7: Liste Render (Map kullanımı)

// Örnek 1: Basit Liste
function BasitListe() {
    const meyveler = ["Elma", "Armut", "Muz", "Çilek", "Portakal"];

    return (
        <div style={{
            padding: '20px',
            margin: '10px',
            border: '2px solid #27ae60',
            borderRadius: '8px'
        }}>
            <h2>🍎 Meyve Listesi</h2>
            <ul>
                {meyveler.map((meyve, index) => (
                    <li key={index}>{meyve}</li>
                ))}
            </ul>
        </div>
    );
}

// Örnek 2: Object Array - Kullanıcı Listesi
function KullaniciListesi() {
    const kullanicilar = [
        { id: 1, isim: "Emre", meslek: ".NET Developer", yas: 22 },
        { id: 2, isim: "Ahmet", meslek: "Frontend Developer", yas: 28 },
        { id: 3, isim: "Ayşe", meslek: "UX Designer", yas: 25 },
        { id: 4, isim: "Mehmet", meslek: "Backend Developer", yas: 30 }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>👥 Kullanıcı Listesi</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {kullanicilar.map(kullanici => (
                    <div
                        key={kullanici.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            width: '200px',
                            backgroundColor: '#f8f9fa'
                        }}
                    >
                        <h3>{kullanici.isim}</h3>
                        <p><strong>Meslek:</strong> {kullanici.meslek}</p>
                        <p><strong>Yaş:</strong> {kullanici.yas}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Örnek 3: Ürün Kartları
function UrunListesi() {
    const urunler = [
        {
            id: 1,
            isim: "Laptop",
            fiyat: 15000,
            stokta: true,
            kategori: "Elektronik"
        },
        {
            id: 2,
            isim: "Mouse",
            fiyat: 250,
            stokta: true,
            kategori: "Aksesuar"
        },
        {
            id: 3,
            isim: "Klavye",
            fiyat: 800,
            stokta: false,
            kategori: "Aksesuar"
        },
        {
            id: 4,
            isim: "Monitör",
            fiyat: 3500,
            stokta: true,
            kategori: "Elektronik"
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>🛍️ Ürün Listesi</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {urunler.map(urun => (
                    <div
                        key={urun.id}
                        style={{
                            border: '2px solid #3498db',
                            borderRadius: '10px',
                            padding: '20px',
                            backgroundColor: urun.stokta ? '#fff' : '#f5f5f5'
                        }}
                    >
                        <h3>{urun.isim}</h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            📁 {urun.kategori}
                        </p>
                        <p style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#27ae60'
                        }}>
                            ₺{urun.fiyat}
                        </p>

                        {urun.stokta ? (
                            <span style={{
                                color: 'green',
                                backgroundColor: '#d5f4e6',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                fontSize: '12px'
                            }}>
                                ✅ Stokta Var
                            </span>
                        ) : (
                            <span style={{
                                color: 'red',
                                backgroundColor: '#fadbd8',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                fontSize: '12px'
                            }}>
                                ❌ Stokta Yok
                            </span>
                        )}

                        <button
                            disabled={!urun.stokta}
                            style={{
                                width: '100%',
                                marginTop: '15px',
                                padding: '10px',
                                backgroundColor: urun.stokta ? '#3498db' : '#ccc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: urun.stokta ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {urun.stokta ? 'Sepete Ekle' : 'Tükendi'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Örnek 4: Filtreleme ile Liste
function FiltreliListe() {
    const kisiler = [
        { id: 1, isim: "Emre", yas: 22, sehir: "İstanbul" },
        { id: 2, isim: "Ahmet", yas: 17, sehir: "Ankara" },
        { id: 3, isim: "Ayşe", yas: 25, sehir: "İzmir" },
        { id: 4, isim: "Mehmet", yas: 16, sehir: "İstanbul" },
        { id: 5, isim: "Fatma", yas: 30, sehir: "Ankara" }
    ];

    // Sadece yetişkinleri filtrele
    const yetiskinler = kisiler.filter(kisi => kisi.yas >= 18);

    // İstanbul'dakileri filtrele
    const istanbuldakiler = kisiler.filter(kisi => kisi.sehir === "İstanbul");

    return (
        <div style={{ padding: '20px' }}>
            <h2>📋 Filtrelenmiş Listeler</h2>

            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{
                    flex: 1,
                    border: '2px solid #27ae60',
                    borderRadius: '8px',
                    padding: '15px'
                }}>
                    <h3>Yetişkinler (18+)</h3>
                    <ul>
                        {yetiskinler.map(kisi => (
                            <li key={kisi.id}>
                                {kisi.isim} ({kisi.yas} yaş) - {kisi.sehir}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{
                    flex: 1,
                    border: '2px solid #3498db',
                    borderRadius: '8px',
                    padding: '15px'
                }}>
                    <h3>İstanbul'dakiler</h3>
                    <ul>
                        {istanbuldakiler.map(kisi => (
                            <li key={kisi.id}>
                                {kisi.isim} ({kisi.yas} yaş)
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

// Ana Component
function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Liste Render Örnekleri</h1>

            <BasitListe />
            <hr />

            <KullaniciListesi />
            <hr />

            <UrunListesi />
            <hr />

            <FiltreliListe />
        </div>
    );
}

export default App;

/*
LİSTE RENDER - MAP KULLANIMI:

JavaScript Array.map():
-----------------------
array.map((item, index) => {
    // Her item için ne yapılacak
    return <Component />;
})

ÖNEMLİ: KEY PROP!
-----------------
Her liste elemanında UNIQUE bir 'key' olmalı!
✅ DOĞRU: <div key={urun.id}>
❌ YANLIŞ: <div> (key yok)

Key neden önemli?
React, değişiklikleri hızlı tespit etmek için key kullanır.

C# LINQ İLE KARŞILAŞTIRMA:

C# LINQ:
--------
var liste = urunler
    .Select(u => new { u.Isim, u.Fiyat })
    .ToList();

var filtrelenmis = kisiler
    .Where(k => k.Yas >= 18)
    .ToList();

React:
------
const liste = urunler.map(u => ({ isim: u.isim, fiyat: u.fiyat }));

const filtrelenmis = kisiler.filter(k => k.yas >= 18);

Mantık tamamen aynı! 🎯

PERFORMANS İPUCU:
-----------------
Büyük listelerde index yerine unique ID kullan:
✅ key={item.id}
⚠️ key={index} (sadece statik listeler için)
*/
