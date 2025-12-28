// Ders 4 - Örnek 1: Basit useEffect - Sayfa Başlığı

import { useState, useEffect } from 'react';

function SayfaBasligi() {
    const [sayac, setSayac] = useState(0);
    const [mesaj, setMesaj] = useState("Hoşgeldin!");

    // Sayac değiştiğinde sayfa başlığını güncelle
    useEffect(() => {
        document.title = `Sayaç: ${sayac}`;
        console.log('Sayfa başlığı güncellendi:', sayac);
    }, [sayac]);  // Sadece sayac değişince çalış

    // Mesaj değiştiğinde konsola yaz
    useEffect(() => {
        console.log('Yeni mesaj:', mesaj);
    }, [mesaj]);

    // Component ilk yüklendiğinde
    useEffect(() => {
        console.log('⚡ Component yüklendi!');

        // Cleanup - Component kaldırılınca
        return () => {
            console.log('👋 Component kaldırıldı!');
            document.title = 'React App';  // Başlığı sıfırla
        };
    }, []);  // Boş array = sadece mount/unmount

    return (
        <div style={{
            textAlign: 'center',
            padding: '40px',
            fontFamily: 'Arial'
        }}>
            <h1 style={{ color: '#2c3e50' }}>
                useEffect Örneği
            </h1>

            <div style={{
                backgroundColor: '#ecf0f1',
                padding: '30px',
                borderRadius: '10px',
                marginBottom: '20px'
            }}>
                <h2 style={{ fontSize: '48px', margin: '0' }}>
                    {sayac}
                </h2>
                <p style={{ color: '#7f8c8d' }}>
                    Tarayıcı sekmesindeki başlığa bak! 👆
                </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setSayac(sayac + 1)}
                    style={{
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                >
                    ➕ Artır
                </button>

                <button
                    onClick={() => setSayac(0)}
                    style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    🔄 Sıfırla
                </button>
            </div>

            <div style={{
                backgroundColor: '#fff3cd',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #ffc107'
            }}>
                <h3>💬 Mesaj</h3>
                <input
                    type="text"
                    value={mesaj}
                    onChange={(e) => setMesaj(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '10px',
                        fontSize: '16px',
                        border: '2px solid #ffc107',
                        borderRadius: '5px',
                        boxSizing: 'border-box'
                    }}
                />
                <p style={{ marginTop: '10px', color: '#856404' }}>
                    {mesaj}
                </p>
            </div>

            <div style={{
                marginTop: '30px',
                padding: '15px',
                backgroundColor: '#d1ecf1',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#0c5460'
            }}>
                💡 <strong>İpucu:</strong> Console'u aç (F12) ve useEffect çalışmalarını gör!
            </div>
        </div>
    );
}

export default SayfaBasligi;

/*
useEffect DEPENDENCY ARRAY:

1. useEffect(() => { }, [sayac])
   → sayac değiştiğinde çalışır
   → İlk render'da da çalışır

2. useEffect(() => { }, [])
   → Sadece ilk render'da çalışır (component mount)
   → Cleanup sadece unmount'ta çalışır

3. useEffect(() => { })
   → Her render'da çalışır (DİKKATLİ!)

CLEANUP FUNCTION:
-----------------
return () => {
    // Component kaldırılırken veya
    // Effect yeniden çalışmadan önce
    // Temizlik işlemleri burada
}

C# KARŞILAŞTIRMA:
-----------------
C# Component Lifecycle:
- OnInitialized() → useEffect(() => {}, [])
- OnParametersSet() → useEffect(() => {}, [param])
- Dispose() → return () => {}

React daha esnek ve kontrollu! 🎯
*/
