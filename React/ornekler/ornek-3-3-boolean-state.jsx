// Ders 3 - Örnek 3: Boolean State - Işık Anahtarı

import { useState } from 'react';

function IsikAnahtari() {
    const [acik, setAcik] = useState(false);

    const toggleAnahtar = () => {
        setAcik(!acik);  // true ise false, false ise true yap
    };

    return (
        <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: acik ? '#fff9e6' : '#2c3e50',
            borderRadius: '15px',
            maxWidth: '400px',
            margin: '20px auto',
            transition: 'all 0.3s ease',
            boxShadow: acik ? '0 0 50px rgba(255, 215, 0, 0.5)' : '0 2px 10px rgba(0,0,0,0.3)'
        }}>
            <div style={{
                fontSize: '120px',
                marginBottom: '30px',
                transition: 'all 0.3s ease'
            }}>
                {acik ? '💡' : '🌙'}
            </div>

            <h2 style={{
                color: acik ? '#333' : '#fff',
                marginBottom: '20px'
            }}>
                {acik ? "Işık Yanıyor!" : "Işık Kapalı"}
            </h2>

            <button
                onClick={toggleAnahtar}
                style={{
                    backgroundColor: acik ? '#e74c3c' : '#27ae60',
                    color: 'white',
                    border: 'none',
                    padding: '15px 40px',
                    fontSize: '18px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                }}
            >
                {acik ? '🔴 Kapat' : '🟢 Aç'}
            </button>

            <div style={{
                marginTop: '30px',
                padding: '15px',
                backgroundColor: acik ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: acik ? '#666' : '#fff'
            }}>
                <p style={{ margin: 0 }}>
                    Durum: <strong>{acik ? "Açık ⚡" : "Kapalı 💤"}</strong>
                </p>
            </div>
        </div>
    );
}

export default IsikAnahtari;

/*
BOOLEAN STATE KULLANIMI:

1. Toggle Pattern (Değiştirme):
   setAcik(!acik)
   - true → false
   - false → true

2. Conditional Styling:
   backgroundColor: acik ? '#fff9e6' : '#2c3e50'
   - acik ise sarı, değilse koyu

3. Conditional Content:
   {acik ? '💡' : '🌙'}
   - acik ise ampul, değilse ay

GERÇEK DÜNYA KULLANIMI:
- Modal açma/kapama
- Menü göster/gizle
- Dark mode toggle
- Accordion açma/kapama
- Favorilere ekleme/çıkarma
*/
