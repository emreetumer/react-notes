// Ders 1 - Örnek 6: Tam Bir Sayfa Yapısı

import Header from './ornek-1-3-header';
import Footer from './ornek-1-4-footer';
import KullaniciKarti from './ornek-1-2-kullanici-karti';

function TamSayfa() {
    return (
        <div className="sayfa">
            {/* Header component'i */}
            <Header />

            {/* Ana içerik */}
            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px'
            }}>
                <h2>Hoşgeldiniz!</h2>
                <p>Bu, component'leri birleştirerek oluşturduğumuz bir sayfa.</p>

                <section>
                    <h3>Kullanıcılar</h3>
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        {/* Aynı component'i 3 kez kullandık */}
                        <KullaniciKarti />
                        <KullaniciKarti />
                        <KullaniciKarti />
                    </div>
                </section>
            </main>

            {/* Footer component'i */}
            <Footer />
        </div>
    );
}

export default TamSayfa;

/*
COMPONENT YAPISI ANALOJİSİ (.NET Developer için):

C# Class Composition:
--------------------
public class Sayfa {
    private Header header = new Header();
    private Footer footer = new Footer();
    private List<KullaniciKarti> kartlar = new List<KullaniciKarti>();
}

React Component Composition:
---------------------------
function Sayfa() {
    return (
        <div>
            <Header />
            <KullaniciKarti />
            <KullaniciKarti />
            <Footer />
        </div>
    );
}

Her ikisi de küçük parçaları birleştirerek büyük yapılar oluşturur!
*/
