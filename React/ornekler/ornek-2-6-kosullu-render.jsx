// Ders 2 - Örnek 6: Koşullu Render (Conditional Rendering)

// Örnek 1: Ternary Operator
function DurumGostergesi({ aktif }) {
    return (
        <div style={{
            padding: '15px',
            margin: '10px',
            borderRadius: '8px',
            backgroundColor: aktif ? '#d5f4e6' : '#fadbd8',
            border: `2px solid ${aktif ? '#27ae60' : '#e74c3c'}`
        }}>
            <h3>Durum: {aktif ? "✅ Aktif" : "❌ Pasif"}</h3>
            <p>
                {aktif
                    ? "Sistem çalışıyor!"
                    : "Sistem kapalı!"}
            </p>
        </div>
    );
}

// Örnek 2: && Operatörü (Sadece true ise göster)
function Bildirim({ mesajSayisi }) {
    return (
        <div style={{
            padding: '15px',
            margin: '10px',
            border: '2px solid #3498db',
            borderRadius: '8px'
        }}>
            <h3>Bildirimler</h3>

            {/* Sadece mesaj varsa göster */}
            {mesajSayisi > 0 && (
                <div style={{
                    backgroundColor: '#fff3cd',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px'
                }}>
                    🔔 {mesajSayisi} yeni mesajınız var!
                </div>
            )}

            {/* Mesaj yoksa bu göster */}
            {mesajSayisi === 0 && (
                <p style={{ color: '#999' }}>Yeni mesaj yok</p>
            )}
        </div>
    );
}

// Örnek 3: Yaş Kontrolü
function YasKontrol({ yas }) {
    return (
        <div style={{
            padding: '15px',
            margin: '10px',
            border: '2px solid #9b59b6',
            borderRadius: '8px'
        }}>
            <h3>Yaş Kontrolü</h3>
            <p>Yaş: {yas}</p>

            {yas >= 18 ? (
                <div style={{ color: 'green' }}>
                    ✅ Yetişkinsiniz! Tüm içeriğe erişebilirsiniz.
                </div>
            ) : (
                <div style={{ color: 'red' }}>
                    ❌ 18 yaşından küçüksünüz. Erişim kısıtlı.
                </div>
            )}

            {/* Kategorilere göre */}
            {yas < 13 && <p>👶 Kategori: Çocuk</p>}
            {yas >= 13 && yas < 18 && <p>🧒 Kategori: Genç</p>}
            {yas >= 18 && yas < 65 && <p>👨 Kategori: Yetişkin</p>}
            {yas >= 65 && <p>👴 Kategori: Emekli</p>}
        </div>
    );
}

// Örnek 4: Kullanıcı Durumu
function KullaniciDurumu({ girisYapti, isim, rol }) {
    return (
        <div style={{
            padding: '20px',
            margin: '10px',
            border: '2px solid #34495e',
            borderRadius: '8px',
            backgroundColor: '#ecf0f1'
        }}>
            <h3>Kullanıcı Paneli</h3>

            {girisYapti ? (
                <div>
                    <p>Hoşgeldin, <strong>{isim}</strong>! 👋</p>
                    <p>Rol: {rol}</p>

                    {/* Admin ise ekstra özellikler göster */}
                    {rol === "Admin" && (
                        <div style={{
                            backgroundColor: '#ffe4b5',
                            padding: '10px',
                            borderRadius: '5px',
                            marginTop: '10px'
                        }}>
                            ⚙️ Admin Paneline Erişiminiz Var
                        </div>
                    )}

                    <button style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '8px 15px',
                        borderRadius: '5px',
                        marginTop: '10px',
                        cursor: 'pointer'
                    }}>
                        Çıkış Yap
                    </button>
                </div>
            ) : (
                <div>
                    <p>Lütfen giriş yapın</p>
                    <button style={{
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '8px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        Giriş Yap
                    </button>
                </div>
            )}
        </div>
    );
}

// Ana Component - Tüm örnekleri gösterir
function App() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Koşullu Render Örnekleri</h1>

            <h2>1. Ternary Operator:</h2>
            <DurumGostergesi aktif={true} />
            <DurumGostergesi aktif={false} />

            <h2>2. && Operatörü:</h2>
            <Bildirim mesajSayisi={5} />
            <Bildirim mesajSayisi={0} />

            <h2>3. Yaş Kontrolü:</h2>
            <YasKontrol yas={10} />
            <YasKontrol yas={16} />
            <YasKontrol yas={22} />
            <YasKontrol yas={70} />

            <h2>4. Kullanıcı Durumu:</h2>
            <KullaniciDurumu
                girisYapti={true}
                isim="Emre"
                rol="Admin"
            />
            <KullaniciDurumu
                girisYapti={false}
            />
        </div>
    );
}

export default App;

/*
KOŞULLU RENDER YÖNTEMLERİ:

1. TERNARY OPERATOR (? :)
   Kullanım: koşul ? doğruysa : yanlışsa
   {aktif ? "Açık" : "Kapalı"}

2. && OPERATÖRÜ
   Kullanım: koşul && gösterilecek
   {mesajVar && <div>Mesaj!</div>}

3. IF-ELSE (Component içinde)
   if (koşul) return <div>A</div>;
   return <div>B</div>;

C# İLE KARŞILAŞTIRMA:

C#:
---
string durum = aktif ? "Açık" : "Kapalı";

if (mesajVar) {
    Console.WriteLine("Mesaj!");
}

JSX:
----
<p>{aktif ? "Açık" : "Kapalı"}</p>

{mesajVar && <p>Mesaj!</p>}

Tamamen aynı mantık! 🎯
*/
