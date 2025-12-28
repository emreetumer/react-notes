// Ders 2 - Örnek 2: Basit Props Kullanımı

// Component tanımı
function Karsilama(props) {
    return (
        <div style={{
            border: '2px solid #3498db',
            borderRadius: '8px',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#ecf0f1'
        }}>
            <h2>Merhaba {props.isim}! 👋</h2>
            <p>Hoşgeldin!</p>
        </div>
    );
}

// Ana component
function App() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Props Örneği</h1>

            {/* Aynı component, farklı props'larla */}
            <Karsilama isim="Emre" />
            <Karsilama isim="Ahmet" />
            <Karsilama isim="Ayşe" />
            <Karsilama isim="Mehmet" />
        </div>
    );
}

export default App;

/*
C# METHOD PARAMETRELERİ İLE KARŞILAŞTIRMA:

C#:
---
public string Karsilama(string isim) {
    return $"Merhaba {isim}!";
}

// Kullanım
Karsilama("Emre");
Karsilama("Ahmet");

React:
------
function Karsilama(props) {
    return <h2>Merhaba {props.isim}!</h2>;
}

// Kullanım
<Karsilama isim="Emre" />
<Karsilama isim="Ahmet" />

Mantık aynı: Farklı parametrelerle aynı fonksiyonu/component'i kullanıyoruz!
*/
