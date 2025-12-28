// Ders 1 - Örnek 5: Fragment Kullanımı

function FragmentOrnegi() {
    // Fragment ile sarmalama - ekstra div oluşturmaz
    return (
        <>
            <h1>Başlık</h1>
            <p>Bu bir paragraf</p>
            <p>Bu başka bir paragraf</p>
        </>
    );
}

export default FragmentOrnegi;

/*
NEDEN FRAGMENT?

❌ YANLIŞ - İki ayrı eleman return edilemez:
function Yanlis() {
    return (
        <h1>Başlık</h1>
        <p>Paragraf</p>
    );
}

✅ DOĞRU - Ama ekstra div oluşturur:
function DivIle() {
    return (
        <div>
            <h1>Başlık</h1>
            <p>Paragraf</p>
        </div>
    );
}

✅ EN İYİSİ - Fragment kullan, ekstra DOM oluşturmaz:
function FragmentIle() {
    return (
        <>
            <h1>Başlık</h1>
            <p>Paragraf</p>
        </>
    );
}
*/
