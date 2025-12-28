// Ders 2 - Örnek 4: Destructuring ile Props

// ❌ Eski yol - Her yerde props. yazmak zorunda
function EskiYol(props) {
    return (
        <div>
            <h2>{props.isim}</h2>
            <p>{props.yas}</p>
            <p>{props.meslek}</p>
        </div>
    );
}

// ✅ Yeni yol - Destructuring (Önerilen!)
function YeniYol({ isim, yas, meslek, sehir }) {
    return (
        <div style={{
            border: '2px solid #27ae60',
            borderRadius: '8px',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#e8f8f5'
        }}>
            <h2>{isim}</h2>
            <p><strong>Yaş:</strong> {yas}</p>
            <p><strong>Meslek:</strong> {meslek}</p>
            <p><strong>Şehir:</strong> {sehir}</p>
        </div>
    );
}

// Default değerlerle destructuring
function DefaultDegerlerle({
    isim = "Misafir",
    yas = 0,
    meslek = "Belirtilmemiş",
    aktif = false
}) {
    return (
        <div style={{
            border: '2px solid #e74c3c',
            borderRadius: '8px',
            padding: '20px',
            margin: '10px'
        }}>
            <h2>{isim}</h2>
            <p>Yaş: {yas}</p>
            <p>Meslek: {meslek}</p>
            <p>Durum: {aktif ? "✅ Aktif" : "❌ Pasif"}</p>
        </div>
    );
}

// Kullanım
function App() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Destructuring Örnekleri</h1>

            <h3>Normal Kullanım:</h3>
            <YeniYol
                isim="Emre"
                yas={22}
                meslek=".NET Developer"
                sehir="İstanbul"
            />

            <h3>Default Değerler (Props verilmedi):</h3>
            <DefaultDegerlerle />

            <h3>Bazı Props verildi:</h3>
            <DefaultDegerlerle isim="Ahmet" aktif={true} />
        </div>
    );
}

export default App;

/*
DESTRUCTURING AVANTAJLARI:

1. Daha temiz kod
2. props. yazmaya gerek yok
3. Hangi props'ların kullanıldığı açıkça görünür
4. Default değerler kolayca verilebilir

C# İLE KARŞILAŞTIRMA:

C# (Named Parameters & Default Values):
----------------------------------------
public void Goster(
    string isim = "Misafir",
    int yas = 0,
    bool aktif = false
) {
    Console.WriteLine($"{isim}, {yas}, {aktif}");
}

// Kullanım
Goster(isim: "Emre", yas: 22, aktif: true);

React (Destructuring & Default Values):
----------------------------------------
function Goster({ 
    isim = "Misafir", 
    yas = 0, 
    aktif = false 
}) {
    return <p>{isim}, {yas}, {aktif}</p>;
}

// Kullanım
<Goster isim="Emre" yas={22} aktif={true} />

Konsept tamamen aynı! 🎯
*/
