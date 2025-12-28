// Ders 4 - Örnek 2: Timer ve Cleanup

import { useState, useEffect } from 'react';

function Kronomettre() {
    const [saniye, setSaniye] = useState(0);
    const [calisiyor, setCalisiyor] = useState(false);

    useEffect(() => {
        let interval = null;

        if (calisiyor) {
            // Timer başlat
            interval = setInterval(() => {
                setSaniye(prevSaniye => prevSaniye + 1);
            }, 1000);

            console.log('⏱️ Timer başlatıldı');
        }

        // CLEANUP: Timer'ı durdur
        return () => {
            if (interval) {
                clearInterval(interval);
                console.log('🛑 Timer durduruldu');
            }
        };
    }, [calisiyor]);  // calisiyor değişince effect yeniden çalış

    const baslatDurdur = () => {
        setCalisiyor(!calisiyor);
    };

    const sifirla = () => {
        setCalisiyor(false);
        setSaniye(0);
    };

    // Saniyeyi formatla (HH:MM:SS)
    const formatla = (toplamSaniye) => {
        const saat = Math.floor(toplamSaniye / 3600);
        const dakika = Math.floor((toplamSaniye % 3600) / 60);
        const saniye = toplamSaniye % 60;

        return `${saat.toString().padStart(2, '0')}:${dakika.toString().padStart(2, '0')}:${saniye.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            textAlign: 'center',
            padding: '50px',
            backgroundColor: '#2c3e50',
            borderRadius: '20px',
            maxWidth: '500px',
            margin: '20px auto',
            color: 'white'
        }}>
            <h1 style={{ marginBottom: '30px' }}>⏱️ Kronomettre</h1>

            {/* Dijital Ekran */}
            <div style={{
                backgroundColor: '#34495e',
                padding: '40px',
                borderRadius: '15px',
                marginBottom: '30px',
                boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.3)'
            }}>
                <div style={{
                    fontSize: '72px',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    color: calisiyor ? '#2ecc71' : '#ecf0f1',
                    textShadow: calisiyor ? '0 0 20px rgba(46, 204, 113, 0.5)' : 'none',
                    transition: 'all 0.3s'
                }}>
                    {formatla(saniye)}
                </div>
            </div>

            {/* Kontrol Butonları */}
            <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center'
            }}>
                <button
                    onClick={baslatDurdur}
                    style={{
                        flex: 1,
                        maxWidth: '200px',
                        backgroundColor: calisiyor ? '#e74c3c' : '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '20px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                    }}
                >
                    {calisiyor ? '⏸️ Durdur' : '▶️ Başlat'}
                </button>

                <button
                    onClick={sifirla}
                    style={{
                        flex: 1,
                        maxWidth: '200px',
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        padding: '20px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                    }}
                >
                    🔄 Sıfırla
                </button>
            </div>

            {/* Durum Göstergesi */}
            <div style={{
                marginTop: '30px',
                padding: '15px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '14px'
            }}>
                Durum: {calisiyor ? '🟢 Çalışıyor' : '🔴 Durdu'}
            </div>
        </div>
    );
}

export default Kronomettre;

/*
TIMER VE CLEANUP PATTERN:

1. TIMER BAŞLATMA:
   const interval = setInterval(() => {
       // Her saniye çalışır
   }, 1000);

2. CLEANUP (ÖNEMLİ!):
   return () => {
       clearInterval(interval);
   };
   
   Neden gerekli?
   - Component kaldırılınca timer devam etmesin
   - Memory leak olmasın
   - Performans sorunları olmasın

3. FUNCTIONAL UPDATE:
   setSaniye(prevSaniye => prevSaniye + 1)
   
   Neden prev kullanıyoruz?
   - Closure problemi önlemek için
   - Her zaman güncel değeri almak için

C# KARŞILAŞTIRMA:

C# Timer:
---------
var timer = new Timer(1000);
timer.Elapsed += (s, e) => { saniye++; };
timer.Start();

// Dispose
timer.Dispose();

React useEffect:
----------------
useEffect(() => {
    const interval = setInterval(() => {
        setSaniye(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval);  // Cleanup
}, []);

ÖĞRENDIĞIMIZ:
✅ setInterval kullanımı
✅ Cleanup function önemi
✅ Functional state update
✅ Conditional styling
✅ Memory leak önleme

Gerçek dünyada:
- Geri sayım zamanlayıcıları
- Canlı saat
- Oyun süreleri
- Animasyon timer'ları
*/
