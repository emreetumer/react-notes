// Ders 2 - Örnek 1: JSX İçinde JavaScript

function JSXOrnegi() {
    const isim = "Emre";
    const yas = 22;
    const meslek = ".NET Developer";
    const hobiler = ["Kodlama", "Spor", "Müzik"];

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>JSX İçinde JavaScript Kullanımı</h1>

            {/* Değişken kullanımı */}
            <p>İsim: {isim}</p>
            <p>Yaş: {yas}</p>
            <p>Meslek: {meslek}</p>

            {/* Matematiksel işlem */}
            <p>5 yıl sonra yaşım: {yas + 5}</p>
            <p>2 * 3 = {2 * 3}</p>

            {/* Ternary operator */}
            <p>Yetişkin mi? {yas >= 18 ? "✅ Evet" : "❌ Hayır"}</p>

            {/* String method */}
            <p>İsim büyük harfle: {isim.toUpperCase()}</p>

            {/* Array length */}
            <p>Hobi sayısı: {hobiler.length}</p>

            {/* Template literal */}
            <p>{`Merhaba ben ${isim}, ${yas} yaşındayım!`}</p>
        </div>
    );
}

export default JSXOrnegi;

/*
C# STRING INTERPOLATION İLE KARŞILAŞTIRMA:

C#:
---
var mesaj = $"Merhaba {isim}, {yas} yaşındasın!";
var sonuc = $"Toplam: {sayi1 + sayi2}";
var durum = $"Aktif mi? {aktif ? "Evet" : "Hayır"}";

JSX:
----
<p>Merhaba {isim}, {yas} yaşındasın!</p>
<p>Toplam: {sayi1 + sayi2}</p>
<p>Aktif mi? {aktif ? "Evet" : "Hayır"}</p>

Çok benzer, değil mi? 😊
*/
