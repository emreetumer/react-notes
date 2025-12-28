// Ders 3 - Örnek 2: İnput ile State Kullanımı

import { useState } from 'react';

function IsimKarti() {
    const [isim, setIsim] = useState("");
    const [soyisim, setSoyisim] = useState("");
    const [yas, setYas] = useState("");

    // Her değişiklikte çalışır
    const handleIsimDegisimi = (event) => {
        setIsim(event.target.value);
    };

    const handleSoyisimDegisimi = (event) => {
        setSoyisim(event.target.value);
    };

    const handleYasDegisimi = (event) => {
        setYas(event.target.value);
    };

    const temizle = () => {
        setIsim("");
        setSoyisim("");
        setYas("");
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '20px auto',
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h2>👤 Kişi Bilgileri</h2>

            {/* Form */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    İsim:
                </label>
                <input
                    type="text"
                    value={isim}
                    onChange={handleIsimDegisimi}
                    placeholder="İsminizi girin"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Soyisim:
                </label>
                <input
                    type="text"
                    value={soyisim}
                    onChange={handleSoyisimDegisimi}
                    placeholder="Soyisminizi girin"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Yaş:
                </label>
                <input
                    type="number"
                    value={yas}
                    onChange={handleYasDegisimi}
                    placeholder="Yaşınızı girin"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <button
                onClick={temizle}
                style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                🗑️ Temizle
            </button>

            {/* Önizleme */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '2px solid #3498db'
            }}>
                <h3>📋 Önizleme</h3>
                <p><strong>Tam İsim:</strong> {isim} {soyisim || '...'}</p>
                <p><strong>Yaş:</strong> {yas || '...'}</p>

                {isim && soyisim && yas && (
                    <div style={{
                        marginTop: '15px',
                        padding: '15px',
                        backgroundColor: '#d5f4e6',
                        borderRadius: '5px',
                        color: '#27ae60'
                    }}>
                        ✅ Merhaba {isim} {soyisim}, {yas} yaşındasın!
                    </div>
                )}
            </div>
        </div>
    );
}

export default IsimKarti;

/*
INPUT İLE STATE KULLANIMI:

1. Controlled Component (Kontrollü Bileşen):
   - Input'un value'su state ile kontrol edilir
   - value={isim} → State değeri input'ta gösterilir
   - onChange={handleChange} → Her değişiklikte state güncellenir

2. Event Object:
   - onChange={(event) => ...}
   - event.target → Input elementi
   - event.target.value → Güncel değer

3. Two-Way Binding (İki Yönlü Bağlama):
   - State → Input (value)
   - Input → State (onChange)

C# İLE KARŞILAŞTIRMA:

C# (WPF/Blazor):
----------------
<input @bind="isim" />
// İki yönlü binding

React:
------
<input 
    value={isim}
    onChange={(e) => setIsim(e.target.value)}
/>
// Manuel iki yönlü binding

React'te daha açık ve kontrollü! 🎯
*/
