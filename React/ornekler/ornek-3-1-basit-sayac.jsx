// Ders 3 - Örnek 1: Basit Sayaç

import { useState } from 'react';

function BasitSayac() {
    // State tanımla - başlangıç değeri 0
    const [sayac, setSayac] = useState(0);

    // Event handler fonksiyonları
    const artir = () => {
        setSayac(sayac + 1);
    };

    const azalt = () => {
        setSayac(sayac - 1);
    };

    const sifirla = () => {
        setSayac(0);
    };

    return (
        <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            maxWidth: '400px',
            margin: '20px auto'
        }}>
            <h1 style={{
                fontSize: '72px',
                margin: '20px 0',
                color: sayac > 0 ? '#27ae60' : sayac < 0 ? '#e74c3c' : '#333'
            }}>
                {sayac}
            </h1>

            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
            }}>
                <button
                    onClick={azalt}
                    style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        fontSize: '24px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    ➖
                </button>

                <button
                    onClick={sifirla}
                    style={{
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        fontSize: '18px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    🔄 Sıfırla
                </button>

                <button
                    onClick={artir}
                    style={{
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        fontSize: '24px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    ➕
                </button>
            </div>
        </div>
    );
}

export default BasitSayac;

/*
STATE NASIL ÇALIŞIYOR?

1. İlk Render:
   - useState(0) → sayac = 0
   - Component render edilir, ekranda "0" görünür

2. Butona Tıklama:
   - onClick tetiklenir → artir() çalışır
   - setSayac(sayac + 1) → sayac = 1
   - React component'i YENİDEN render eder
   - Ekranda "1" görünür

3. Her State Değişiminde:
   - Component tamamen yeniden çalışır
   - Yeni değerlerle render edilir

C# İLE KARŞILAŞTIRMA:

C# (WinForms):
--------------
int sayac = 0;

void ArtirButton_Click(object sender, EventArgs e) {
    sayac++;
    label.Text = sayac.ToString();  // UI'ı manuel güncelle
}

React:
------
const [sayac, setSayac] = useState(0);

const artir = () => {
    setSayac(sayac + 1);  // UI otomatik güncellenir!
};

React'te UI otomatik güncellenir! 🎉
*/
