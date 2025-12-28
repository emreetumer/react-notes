// Ders 3 - Örnek 6: Gerçek Dünya - Beğeni ve Yorum Sistemi

import { useState } from 'react';

function SosyalMedyaKarti() {
    // State tanımlamaları
    const [begenildi, setBegenildi] = useState(false);
    const [begeniSayisi, setBegeniSayisi] = useState(42);
    const [yorumlar, setYorumlar] = useState([
        { id: 1, isim: "Ahmet", metin: "Harika bir paylaşım! 👍" },
        { id: 2, isim: "Ayşe", metin: "Çok faydalı olmuş, teşekkürler!" }
    ]);
    const [yeniYorum, setYeniYorum] = useState("");
    const [yorumGoster, setYorumGoster] = useState(false);

    // Beğeni toggle
    const begeniToggle = () => {
        if (begenildi) {
            setBegenildi(false);
            setBegeniSayisi(begeniSayisi - 1);
        } else {
            setBegenildi(true);
            setBegeniSayisi(begeniSayisi + 1);
        }
    };

    // Yorum ekleme
    const yorumEkle = () => {
        if (yeniYorum.trim()) {
            const yorum = {
                id: Date.now(),
                isim: "Emre",  // Normalde login olan kullanıcı
                metin: yeniYorum
            };
            setYorumlar([...yorumlar, yorum]);
            setYeniYorum("");
        }
    };

    // Enter tuşu ile yorum ekle
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            yorumEkle();
        }
    };

    // Yorum silme
    const yorumSil = (id) => {
        setYorumlar(yorumlar.filter(yorum => yorum.id !== id));
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '20px auto',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
            overflow: 'hidden'
        }}>
            {/* Post Header */}
            <div style={{
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#3498db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    E
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>Emre Yılmaz</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                        2 saat önce
                    </p>
                </div>
            </div>

            {/* Post Content */}
            <div style={{ padding: '20px' }}>
                <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#333',
                    margin: 0
                }}>
                    React öğrenmek harika! 🚀 State ve Props kullanarak
                    interaktif uygulamalar yapmak çok eğlenceli. .NET'ten
                    geliyorsanız çok kolay adapte olacaksınız! 💻
                </p>
            </div>

            {/* Post Image (Placeholder) */}
            <div style={{
                width: '100%',
                height: '300px',
                backgroundColor: '#ecf0f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
            }}>
                ⚛️
            </div>

            {/* Interaction Bar */}
            <div style={{
                padding: '12px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                    {begeniSayisi} beğeni
                </span>
                <span style={{ fontSize: '14px', color: '#666' }}>
                    {yorumlar.length} yorum
                </span>
            </div>

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                padding: '8px'
            }}>
                <button
                    onClick={begeniToggle}
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        backgroundColor: begenildi ? '#ffe4e4' : 'transparent',
                        color: begenildi ? '#e74c3c' : '#666',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: begenildi ? 'bold' : 'normal',
                        transition: 'all 0.2s'
                    }}
                >
                    <span style={{ fontSize: '20px' }}>
                        {begenildi ? '❤️' : '🤍'}
                    </span>
                    Beğen
                </button>

                <button
                    onClick={() => setYorumGoster(!yorumGoster)}
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        backgroundColor: yorumGoster ? '#e3f2fd' : 'transparent',
                        color: yorumGoster ? '#3498db' : '#666',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: yorumGoster ? 'bold' : 'normal',
                        transition: 'all 0.2s'
                    }}
                >
                    <span style={{ fontSize: '20px' }}>💬</span>
                    Yorum
                </button>

                <button
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        backgroundColor: 'transparent',
                        color: '#666',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px'
                    }}
                >
                    <span style={{ fontSize: '20px' }}>🔗</span>
                    Paylaş
                </button>
            </div>

            {/* Comments Section */}
            {yorumGoster && (
                <div style={{
                    borderTop: '1px solid #e0e0e0',
                    backgroundColor: '#f8f9fa'
                }}>
                    {/* Yorum Input */}
                    <div style={{
                        padding: '15px',
                        display: 'flex',
                        gap: '10px',
                        borderBottom: '1px solid #e0e0e0'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#27ae60',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            flexShrink: 0
                        }}>
                            E
                        </div>
                        <div style={{ flex: 1 }}>
                            <textarea
                                value={yeniYorum}
                                onChange={(e) => setYeniYorum(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Yorumunuzu yazın..."
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    resize: 'none',
                                    fontFamily: 'Arial',
                                    boxSizing: 'border-box'
                                }}
                                rows="2"
                            />
                            <button
                                onClick={yorumEkle}
                                disabled={!yeniYorum.trim()}
                                style={{
                                    marginTop: '8px',
                                    backgroundColor: yeniYorum.trim() ? '#3498db' : '#ccc',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 20px',
                                    borderRadius: '20px',
                                    cursor: yeniYorum.trim() ? 'pointer' : 'not-allowed',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Gönder
                            </button>
                        </div>
                    </div>

                    {/* Yorumlar Listesi */}
                    <div style={{ padding: '15px' }}>
                        {yorumlar.length === 0 ? (
                            <p style={{
                                textAlign: 'center',
                                color: '#999',
                                padding: '20px'
                            }}>
                                Henüz yorum yok. İlk yorumu siz yapın! 💬
                            </p>
                        ) : (
                            yorumlar.map(yorum => (
                                <div
                                    key={yorum.id}
                                    style={{
                                        display: 'flex',
                                        gap: '12px',
                                        marginBottom: '15px',
                                        padding: '12px',
                                        backgroundColor: '#fff',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        backgroundColor: '#9b59b6',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        flexShrink: 0
                                    }}>
                                        {yorum.isim.charAt(0)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            backgroundColor: '#f0f2f5',
                                            padding: '10px 12px',
                                            borderRadius: '12px'
                                        }}>
                                            <p style={{
                                                margin: '0 0 4px 0',
                                                fontWeight: 'bold',
                                                fontSize: '14px'
                                            }}>
                                                {yorum.isim}
                                            </p>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '14px',
                                                color: '#333'
                                            }}>
                                                {yorum.metin}
                                            </p>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            gap: '15px',
                                            marginTop: '6px',
                                            paddingLeft: '12px'
                                        }}>
                                            <button style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#666',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}>
                                                Beğen
                                            </button>
                                            <button
                                                onClick={() => yorumSil(yorum.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#e74c3c',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Sil
                                            </button>
                                            <span style={{
                                                fontSize: '12px',
                                                color: '#999'
                                            }}>
                                                Az önce
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SosyalMedyaKarti;

/*
GERÇEK DÜNYA STATE YÖNETİMİ:

Bu örnekte kullanılanlar:
✅ Boolean state (begenildi, yorumGoster)
✅ Number state (begeniSayisi)
✅ String state (yeniYorum)
✅ Array state (yorumlar)
✅ Object array manipulation
✅ Conditional rendering
✅ Event handling (onClick, onChange, onKeyPress)
✅ State güncelleme pattern'leri

Bu, Facebook/Instagram benzeri bir post kartının basitleştirilmiş hali!

ÖĞRENDIĞIMIZ PATTERN'LER:

1. Toggle Pattern:
   setBegenildi(!begenildi)

2. Conditional Increment/Decrement:
   if (begenildi) setBegeniSayisi(n - 1)
   else setBegeniSayisi(n + 1)

3. Array'e Ekleme:
   setYorumlar([...yorumlar, yeniYorum])

4. Array'den Silme:
   setYorumlar(yorumlar.filter(y => y.id !== id))

5. Input Clearing:
   setYeniYorum("")

6. Conditional Styling:
   backgroundColor: begenildi ? 'red' : 'gray'

Bu pattern'leri gerçek projelerde sürekli kullanacaksın! 🚀
*/
