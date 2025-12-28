// Ders 2 - Örnek 5: Farklı Veri Tipleriyle Props

function VeriTipleriOrnegi({
    // String
    metin,

    // Number
    sayi,

    // Boolean
    aktif,

    // Array
    liste,

    // Object
    kullanici,

    // Function
    tiklamaFonksiyonu
}) {
    return (
        <div style={{
            border: '2px solid #9b59b6',
            borderRadius: '10px',
            padding: '20px',
            margin: '20px',
            backgroundColor: '#f4ecf7'
        }}>
            <h2>Farklı Veri Tipleri</h2>

            {/* String */}
            <div>
                <h3>📝 String:</h3>
                <p>{metin}</p>
            </div>

            {/* Number */}
            <div>
                <h3>🔢 Number:</h3>
                <p>Sayı: {sayi}</p>
                <p>Karesi: {sayi * sayi}</p>
            </div>

            {/* Boolean */}
            <div>
                <h3>✅ Boolean:</h3>
                <p>Aktif mi? {aktif ? "Evet ✅" : "Hayır ❌"}</p>
            </div>

            {/* Array */}
            <div>
                <h3>📋 Array:</h3>
                <ul>
                    {liste.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Object */}
            <div>
                <h3>👤 Object:</h3>
                <p>İsim: {kullanici.isim}</p>
                <p>Yaş: {kullanici.yas}</p>
                <p>Email: {kullanici.email}</p>
            </div>

            {/* Function */}
            <div>
                <h3>⚡ Function:</h3>
                <button
                    onClick={tiklamaFonksiyonu}
                    style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Tıkla!
                </button>
            </div>
        </div>
    );
}

// Kullanım
function App() {
    // Function tanımı
    const butonaTiklandi = () => {
        alert('Butona tıklandı! 🎉');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Veri Tipleri ile Props</h1>

            <VeriTipleriOrnegi
                metin="Merhaba React!"
                sayi={42}
                aktif={true}
                liste={["Elma", "Armut", "Muz", "Çilek"]}
                kullanici={{
                    isim: "Emre",
                    yas: 22,
                    email: "emre@example.com"
                }}
                tiklamaFonksiyonu={butonaTiklandi}
            />
        </div>
    );
}

export default App;

/*
VERİ TİPLERİ KULLANIMI:

1. String:    metin="değer"                    (tırnak içinde)
2. Number:    sayi={42}                        (süslü parantez)
3. Boolean:   aktif={true}                     (süslü parantez)
4. Array:     liste={[1, 2, 3]}                (süslü parantez)
5. Object:    obj={{ key: "value" }}           (çift süslü parantez!)
6. Function:  func={() => alert("Merhaba")}    (süslü parantez)

ÖNEMLİ: String dışındaki her şey süslü parantez içinde!

C# İLE KARŞILAŞTIRMA:

C# Method:
----------
public void Goster(
    string metin,
    int sayi,
    bool aktif,
    List<string> liste,
    User kullanici,
    Action tiklamaFonksiyonu
) { }

React Component:
----------------
function Goster({
    metin,
    sayi,
    aktif,
    liste,
    kullanici,
    tiklamaFonksiyonu
}) { }

Veri tipleri konsepti aynı! 🎯
*/
