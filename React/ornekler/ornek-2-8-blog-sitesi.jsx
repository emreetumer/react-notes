// Ders 2 - Örnek 8: Gerçek Dünya Örneği - Blog Sitesi

// Blog Kartı Component'i
function BlogKarti({ baslik, yazar, tarih, ozet, okunmaSuresi, kategori, begeniSayisi }) {
    return (
        <article style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '25px',
            margin: '20px 0',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
        }}>
            {/* Kategori Badge */}
            <span style={{
                display: 'inline-block',
                backgroundColor: '#3498db',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                marginBottom: '10px'
            }}>
                {kategori}
            </span>

            {/* Başlık */}
            <h2 style={{
                color: '#2c3e50',
                marginBottom: '10px',
                fontSize: '24px'
            }}>
                {baslik}
            </h2>

            {/* Meta Bilgiler */}
            <div style={{
                display: 'flex',
                gap: '15px',
                color: '#7f8c8d',
                fontSize: '14px',
                marginBottom: '15px'
            }}>
                <span>✍️ {yazar}</span>
                <span>📅 {tarih}</span>
                <span>⏱️ {okunmaSuresi} dk okuma</span>
                <span>❤️ {begeniSayisi} beğeni</span>
            </div>

            {/* Özet */}
            <p style={{
                color: '#555',
                lineHeight: '1.6',
                marginBottom: '15px'
            }}>
                {ozet}
            </p>

            {/* Devamını Oku Butonu */}
            <button style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
            }}>
                Devamını Oku →
            </button>
        </article>
    );
}

// Yazar Kartı Component'i
function YazarKarti({ isim, unvan, makalesSayisi, avatarRenk = "#9b59b6" }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '10px'
        }}>
            {/* Avatar (İlk harf) */}
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: avatarRenk,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>
                {isim.charAt(0)}
            </div>

            {/* Bilgiler */}
            <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{isim}</h4>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                    {unvan} • {makalesSayisi} makale
                </p>
            </div>
        </div>
    );
}

// Ana Blog Sayfası
function BlogSayfasi() {
    // Blog yazıları verisi
    const yazilar = [
        {
            id: 1,
            baslik: "React'a Giriş: Başlangıç Rehberi",
            yazar: "Emre",
            tarih: "30 Kasım 2025",
            ozet: "React öğrenmeye başlarken bilmeniz gereken temel kavramlar. Component'ler, JSX, Props ve daha fazlası...",
            okunmaSuresi: 5,
            kategori: "React",
            begeniSayisi: 42
        },
        {
            id: 2,
            baslik: "Props ile Veri Aktarımı",
            yazar: "Emre",
            tarih: "30 Kasım 2025",
            ozet: "Component'ler arası veri aktarımını öğrenin. Props kullanımı, destructuring ve best practices.",
            okunmaSuresi: 8,
            kategori: "React",
            begeniSayisi: 38
        },
        {
            id: 3,
            baslik: ".NET'ten React'a Geçiş",
            yazar: "Emre",
            tarih: "29 Kasım 2025",
            ozet: ".NET Developer'lar için React! C# bilginizi kullanarak React'ı daha kolay öğrenin.",
            okunmaSuresi: 12,
            kategori: "Tutorial",
            begeniSayisi: 67
        },
        {
            id: 4,
            baslik: "JavaScript ES6+ Özellikleri",
            yazar: "Ahmet",
            tarih: "28 Kasım 2025",
            ozet: "Modern JavaScript özellikleri: Arrow functions, destructuring, spread operator ve daha fazlası.",
            okunmaSuresi: 10,
            kategori: "JavaScript",
            begeniSayisi: 55
        }
    ];

    // Yazarlar verisi
    const yazarlar = [
        { id: 1, isim: "Emre", unvan: ".NET Developer", makalesSayisi: 15, avatarRenk: "#3498db" },
        { id: 2, isim: "Ahmet", unvan: "Frontend Developer", makalesSayisi: 23, avatarRenk: "#27ae60" },
        { id: 3, isim: "Ayşe", unvan: "Full Stack Developer", makalesSayisi: 18, avatarRenk: "#e74c3c" }
    ];

    // İstatistikler
    const toplamMakale = yazilar.length;
    const toplamBeğeni = yazilar.reduce((toplam, yazi) => toplam + yazi.begeniSayisi, 0);

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Header */}
            <header style={{
                textAlign: 'center',
                marginBottom: '40px',
                padding: '40px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                color: 'white'
            }}>
                <h1 style={{ fontSize: '48px', margin: '0 0 10px 0' }}>
                    📚 React Blog
                </h1>
                <p style={{ fontSize: '18px', margin: 0 }}>
                    React, JavaScript ve Web Geliştirme Üzerine
                </p>
            </header>

            {/* İstatistikler */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginBottom: '40px'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '2px solid #3498db'
                }}>
                    <h3 style={{ fontSize: '36px', margin: '0', color: '#3498db' }}>
                        {toplamMakale}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>Toplam Makale</p>
                </div>

                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '2px solid #27ae60'
                }}>
                    <h3 style={{ fontSize: '36px', margin: '0', color: '#27ae60' }}>
                        {yazarlar.length}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>Aktif Yazar</p>
                </div>

                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '2px solid #e74c3c'
                }}>
                    <h3 style={{ fontSize: '36px', margin: '0', color: '#e74c3c' }}>
                        {toplamBeğeni}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>Toplam Beğeni</p>
                </div>
            </div>

            {/* Ana İçerik Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Sol Taraf - Blog Yazıları */}
                <div>
                    <h2 style={{ marginBottom: '20px' }}>📝 Son Yazılar</h2>
                    {yazilar.map(yazi => (
                        <BlogKarti
                            key={yazi.id}
                            baslik={yazi.baslik}
                            yazar={yazi.yazar}
                            tarih={yazi.tarih}
                            ozet={yazi.ozet}
                            okunmaSuresi={yazi.okunmaSuresi}
                            kategori={yazi.kategori}
                            begeniSayisi={yazi.begeniSayisi}
                        />
                    ))}
                </div>

                {/* Sağ Taraf - Sidebar */}
                <div>
                    <h2 style={{ marginBottom: '20px' }}>✍️ Yazarlar</h2>
                    {yazarlar.map(yazar => (
                        <YazarKarti
                            key={yazar.id}
                            isim={yazar.isim}
                            unvan={yazar.unvan}
                            makalesSayisi={yazar.makalesSayisi}
                            avatarRenk={yazar.avatarRenk}
                        />
                    ))}

                    {/* Kategoriler */}
                    <div style={{
                        marginTop: '30px',
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <h3>📁 Kategoriler</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {['React', 'JavaScript', 'Tutorial', 'CSS'].map(kategori => (
                                <button
                                    key={kategori}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: 'white',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    {kategori}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogSayfasi;

/*
GERÇEK DÜNYA UYGULAMASI ÖZETİ:

Bu örnekte kullandıklarımız:
✅ Birden fazla component (BlogKarti, YazarKarti)
✅ Props ile veri aktarımı
✅ Destructuring
✅ Array.map() ile liste render
✅ Array.reduce() ile hesaplama
✅ Koşullu stillendirme
✅ Grid ve Flexbox layout
✅ Component composition

Bu, gerçek bir blog sitesinin basitleştirilmiş hali!

Sıradaki dersimizde STATE öğreneceğiz.
State ile bu kartları interaktif yapacağız:
- Beğeni butonuna tıklama
- Yorüm ekleme
- Filtreleme
- Arama

Heyecanlı mısın? 🚀
*/
