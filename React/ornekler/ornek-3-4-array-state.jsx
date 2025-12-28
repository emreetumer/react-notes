// Ders 3 - Örnek 4: Array State - Alışveriş Listesi

import { useState } from 'react';

function AlisverisListesi() {
    const [urunler, setUrunler] = useState([
        "Ekmek",
        "Süt",
        "Yumurta"
    ]);
    const [yeniUrun, setYeniUrun] = useState("");

    // Yeni ürün ekleme
    const urunEkle = () => {
        if (yeniUrun.trim()) {  // Boş değilse
            setUrunler([...urunler, yeniUrun]);  // Spread operator ile yeni array
            setYeniUrun("");  // Input'u temizle
        }
    };

    // Enter tuşuna basınca ekle
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            urunEkle();
        }
    };

    // Ürün silme
    const urunSil = (index) => {
        const yeniListe = urunler.filter((_, i) => i !== index);
        setUrunler(yeniListe);
    };

    // Tümünü temizle
    const hepsiniSil = () => {
        setUrunler([]);
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '20px auto',
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
            <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
                🛒 Alışveriş Listesi
            </h1>

            {/* Ürün sayısı */}
            <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#7f8c8d'
            }}>
                {urunler.length} ürün
            </div>

            {/* Yeni ürün ekleme */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px'
            }}>
                <input
                    type="text"
                    value={yeniUrun}
                    onChange={(e) => setYeniUrun(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ürün adı girin..."
                    style={{
                        flex: 1,
                        padding: '12px',
                        fontSize: '16px',
                        border: '2px solid #3498db',
                        borderRadius: '8px',
                        outline: 'none'
                    }}
                />
                <button
                    onClick={urunEkle}
                    style={{
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ➕ Ekle
                </button>
            </div>

            {/* Ürünler listesi */}
            {urunler.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#95a5a6',
                    fontSize: '18px'
                }}>
                    📝 Liste boş. Ürün ekleyin!
                </div>
            ) : (
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 20px 0'
                }}>
                    {urunler.map((urun, index) => (
                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '15px',
                                marginBottom: '10px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '16px' }}>
                                {index + 1}. {urun}
                            </span>
                            <button
                                onClick={() => urunSil(index)}
                                style={{
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                🗑️ Sil
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Hepsini sil butonu */}
            {urunler.length > 0 && (
                <button
                    onClick={hepsiniSil}
                    style={{
                        width: '100%',
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    🗑️ Tümünü Temizle
                </button>
            )}
        </div>
    );
}

export default AlisverisListesi;

/*
ARRAY STATE YÖNETİMİ:

1. EKLEME (Push yerine Spread):
   ❌ YANLIŞ: urunler.push(yeni) // Mutasyon!
   ✅ DOĞRU: setUrunler([...urunler, yeni])

2. SİLME (Filter kullan):
   setUrunler(urunler.filter((_, i) => i !== index))

3. GÜNCELLEME (Map kullan):
   setUrunler(urunler.map((item, i) => 
       i === index ? yeniDeger : item
   ))

4. TEMİZLEME:
   setUrunler([])

C# LINQ İLE KARŞILAŞTIRMA:

C# List:
--------
var urunler = new List<string>();
urunler.Add("Ekmek");              // Ekleme
urunler.RemoveAt(index);            // Silme
urunler = urunler.Where(...).ToList(); // Filtreleme
urunler.Clear();                    // Temizleme

React State:
------------
setUrunler([...urunler, "Ekmek"]);           // Ekleme
setUrunler(urunler.filter((_, i) => i !== index)); // Silme
setUrunler([]);                              // Temizleme

ÖNEMLİ: React'te ASLA orjinal array'i değiştirme!
Her zaman yeni bir array oluştur! 🎯
*/
