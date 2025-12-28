// Ders 2 - Örnek 3: Çoklu Props Kullanımı

function KullaniciKarti(props) {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            margin: '15px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            maxWidth: '300px'
        }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                {props.isim}
            </h2>

            <div style={{ fontSize: '14px', color: '#555' }}>
                <p><strong>👤 Yaş:</strong> {props.yas}</p>
                <p><strong>💼 Meslek:</strong> {props.meslek}</p>
                <p><strong>📍 Şehir:</strong> {props.sehir}</p>
                <p><strong>📧 Email:</strong> {props.email}</p>
            </div>

            <button style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                marginTop: '15px',
                cursor: 'pointer'
            }}>
                Profili Görüntüle
            </button>
        </div>
    );
}

// Kullanım
function App() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Kullanıcı Kartları</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <KullaniciKarti
                    isim="Emre"
                    yas={22}
                    meslek=".NET Developer"
                    sehir="İstanbul"
                    email="emre@example.com"
                />

                <KullaniciKarti
                    isim="Ahmet"
                    yas={28}
                    meslek="Frontend Developer"
                    sehir="Ankara"
                    email="ahmet@example.com"
                />

                <KullaniciKarti
                    isim="Ayşe"
                    yas={25}
                    meslek="UX Designer"
                    sehir="İzmir"
                    email="ayse@example.com"
                />
            </div>
        </div>
    );
}

export default App;

/*
ÖNEMLİ NOTLAR:

1. String props: isim="Emre" (tırnak içinde)
2. Number props: yas={22} (süslü parantez içinde!)
3. Her veri tipi için süslü parantez kullan (string hariç)

C# Method ile karşılaştırma:
-----------------------------
C#:
public void GosterKullanici(
    string isim, 
    int yas, 
    string meslek
) { }

React:
<KullaniciKarti 
    isim="Emre"
    yas={22}
    meslek=".NET Developer"
/>
*/
