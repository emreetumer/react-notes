// Ders 3 - Örnek 5: Object State - Kullanıcı Profili

import { useState } from 'react';

function KullaniciProfili() {
    const [kullanici, setKullanici] = useState({
        isim: "Emre",
        soyisim: "Yılmaz",
        yas: 22,
        meslek: ".NET Developer",
        email: "emre@example.com",
        sehir: "İstanbul",
        aktif: true
    });

    const [duzenlemeModu, setDuzenlemeModu] = useState(false);

    // Tek bir alan güncelleme
    const alanGuncelle = (alan, deger) => {
        setKullanici({
            ...kullanici,  // Diğer özellikleri koru (Spread)
            [alan]: deger  // Sadece bu alanı güncelle
        });
    };

    // Yaş artırma
    const yasArtir = () => {
        setKullanici(prev => ({
            ...prev,
            yas: prev.yas + 1
        }));
    };

    // Durum toggle
    const durumDegistir = () => {
        setKullanici(prev => ({
            ...prev,
            aktif: !prev.aktif
        }));
    };

    // Profili sıfırla
    const profilSifirla = () => {
        setKullanici({
            isim: "",
            soyisim: "",
            yas: 0,
            meslek: "",
            email: "",
            sehir: "",
            aktif: false
        });
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '20px auto',
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <h1 style={{ margin: 0 }}>👤 Kullanıcı Profili</h1>
                <button
                    onClick={() => setDuzenlemeModu(!duzenlemeModu)}
                    style={{
                        backgroundColor: duzenlemeModu ? '#e74c3c' : '#3498db',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {duzenlemeModu ? '❌ İptal' : '✏️ Düzenle'}
                </button>
            </div>

            {/* Durum göstergesi */}
            <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: kullanici.aktif ? '#d5f4e6' : '#fadbd8',
                color: kullanici.aktif ? '#27ae60' : '#e74c3c',
                fontWeight: 'bold',
                marginBottom: '20px'
            }}>
                {kullanici.aktif ? '🟢 Aktif' : '🔴 Pasif'}
            </div>

            {/* Profil Kartı */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: duzenlemeModu ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px',
                marginBottom: '20px'
            }}>
                {/* İsim */}
                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#555'
                    }}>
                        İsim:
                    </label>
                    {duzenlemeModu ? (
                        <input
                            type="text"
                            value={kullanici.isim}
                            onChange={(e) => alanGuncelle('isim', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                border: '2px solid #3498db',
                                borderRadius: '8px',
                                boxSizing: 'border-box'
                            }}
                        />
                    ) : (
                        <div style={{
                            fontSize: '18px',
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            {kullanici.isim || '---'}
                        </div>
                    )}
                </div>

                {/* Soyisim */}
                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#555'
                    }}>
                        Soyisim:
                    </label>
                    {duzenlemeModu ? (
                        <input
                            type="text"
                            value={kullanici.soyisim}
                            onChange={(e) => alanGuncelle('soyisim', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                border: '2px solid #3498db',
                                borderRadius: '8px',
                                boxSizing: 'border-box'
                            }}
                        />
                    ) : (
                        <div style={{
                            fontSize: '18px',
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            {kullanici.soyisim || '---'}
                        </div>
                    )}
                </div>

                {/* Yaş */}
                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#555'
                    }}>
                        Yaş:
                    </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {duzenlemeModu ? (
                            <input
                                type="number"
                                value={kullanici.yas}
                                onChange={(e) => alanGuncelle('yas', parseInt(e.target.value) || 0)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '2px solid #3498db',
                                    borderRadius: '8px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        ) : (
                            <div style={{
                                flex: 1,
                                fontSize: '18px',
                                padding: '10px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px'
                            }}>
                                {kullanici.yas}
                            </div>
                        )}
                        <button
                            onClick={yasArtir}
                            style={{
                                backgroundColor: '#27ae60',
                                color: 'white',
                                border: 'none',
                                padding: '10px 15px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            🎂 +1
                        </button>
                    </div>
                </div>

                {/* Meslek */}
                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#555'
                    }}>
                        Meslek:
                    </label>
                    {duzenlemeModu ? (
                        <input
                            type="text"
                            value={kullanici.meslek}
                            onChange={(e) => alanGuncelle('meslek', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                border: '2px solid #3498db',
                                borderRadius: '8px',
                                boxSizing: 'border-box'
                            }}
                        />
                    ) : (
                        <div style={{
                            fontSize: '18px',
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            {kullanici.meslek || '---'}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#555'
                    }}>
                        Email:
                    </label>
                    {duzenlemeModu ? (
                        <input
                            type="email"
                            value={kullanici.email}
                            onChange={(e) => alanGuncelle('email', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                border: '2px solid #3498db',
                                borderRadius: '8px',
                                boxSizing: 'border-box'
                            }}
                        />
                    ) : (
                        <div style={{
                            fontSize: '18px',
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            {kullanici.email || '---'}
                        </div>
                    )}
                </div>

                {/* Şehir */}
                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#555'
                    }}>
                        Şehir:
                    </label>
                    {duzenlemeModu ? (
                        <select
                            value={kullanici.sehir}
                            onChange={(e) => alanGuncelle('sehir', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                border: '2px solid #3498db',
                                borderRadius: '8px',
                                boxSizing: 'border-box'
                            }}
                        >
                            <option value="">Şehir seçin</option>
                            <option value="İstanbul">İstanbul</option>
                            <option value="Ankara">Ankara</option>
                            <option value="İzmir">İzmir</option>
                            <option value="Bursa">Bursa</option>
                            <option value="Antalya">Antalya</option>
                        </select>
                    ) : (
                        <div style={{
                            fontSize: '18px',
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            {kullanici.sehir || '---'}
                        </div>
                    )}
                </div>
            </div>

            {/* Aksiyon Butonları */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '30px'
            }}>
                <button
                    onClick={durumDegistir}
                    style={{
                        flex: 1,
                        backgroundColor: kullanici.aktif ? '#e74c3c' : '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }}
                >
                    {kullanici.aktif ? '🔴 Pasif Yap' : '🟢 Aktif Yap'}
                </button>

                <button
                    onClick={profilSifirla}
                    style={{
                        flex: 1,
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }}
                >
                    🔄 Sıfırla
                </button>
            </div>

            {/* JSON Önizleme */}
            <details style={{ marginTop: '30px' }}>
                <summary style={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    🔍 State'i Görüntüle (JSON)
                </summary>
                <pre style={{
                    backgroundColor: '#2c3e50',
                    color: '#2ecc71',
                    padding: '15px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    marginTop: '10px',
                    fontSize: '14px'
                }}>
                    {JSON.stringify(kullanici, null, 2)}
                </pre>
            </details>
        </div>
    );
}

export default KullaniciProfili;

/*
OBJECT STATE YÖNETİMİ:

1. TEK ALAN GÜNCELLEME (Spread Operator):
   setKullanici({
       ...kullanici,      // Diğerlerini koru
       isim: "Yeni İsim"  // Sadece bunu değiştir
   })

2. DİNAMİK ALAN GÜNCELLEME:
   setKullanici({
       ...kullanici,
       [alan]: deger  // Computed property
   })

3. NESTED OBJECT (İç içe):
   setKullanici({
       ...kullanici,
       adres: {
           ...kullanici.adres,
           sehir: "İstanbul"
       }
   })

4. FUNCTIONAL UPDATE (Önceki state'e göre):
   setKullanici(prev => ({
       ...prev,
       yas: prev.yas + 1
   }))

C# İLE KARŞILAŞTIRMA:

C#:
---
var kullanici = new User {
    Isim = "Emre",
    Yas = 22
};
kullanici.Yas++;  // Direkt değiştir

React:
------
setKullanici({
    ...kullanici,
    yas: kullanici.yas + 1
});
// Yeni object oluştur!

ÖNEMLİ: Immutability (Değişmezlik)
React'te state'i direkt değiştirme, yeni oluştur! 🎯
*/
