// HomePage - Landing page
// C# analojisi: Index.cshtml

import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';

export default function HomePage() {
    const { isAuthenticated, user } = useAuth();
    const { products } = useProducts();

    // Featured products (ilk 3)
    const featuredProducts = products.slice(0, 3);

    return (
        <div style={styles.page}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        {isAuthenticated
                            ? `Hoşgeldin, ${user.name}! 👋`
                            : 'E-Ticaret Platformuna Hoşgeldin! 🛒'}
                    </h1>
                    <p style={styles.heroText}>
                        En iyi elektronik ürünleri en uygun fiyatlarla!
                    </p>
                    <Link to="/products">
                        <button style={styles.heroButton}>
                            Ürünleri İncele →
                        </button>
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section style={styles.features}>
                <h2 style={styles.sectionTitle}>Neden Biz?</h2>
                <div style={styles.featureGrid}>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🚚</div>
                        <h3>Hızlı Kargo</h3>
                        <p>Tüm siparişlerinizde ücretsiz kargo</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>💳</div>
                        <h3>Güvenli Ödeme</h3>
                        <p>SSL sertifikalı güvenli ödeme</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🎁</div>
                        <h3>Kampanyalar</h3>
                        <p>Sürekli yeni kampanyalar</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>⭐</div>
                        <h3>Kaliteli Ürünler</h3>
                        <p>Orijinal ve garantili ürünler</p>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section style={styles.featured}>
                    <h2 style={styles.sectionTitle}>Öne Çıkan Ürünler</h2>
                    <div style={styles.productGrid}>
                        {featuredProducts.map(product => (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div style={styles.productCard}>
                                    <div style={styles.productImage}>{product.image}</div>
                                    <h3 style={styles.productName}>{product.name}</h3>
                                    <p style={styles.productPrice}>₺{product.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA Section */}
            {!isAuthenticated && (
                <section style={styles.cta}>
                    <h2>Hemen Üye Ol, Alışverişe Başla!</h2>
                    <p>Üye olarak özel kampanyalardan faydalanabilirsin.</p>
                    <Link to="/register">
                        <button style={styles.ctaButton}>
                            Ücretsiz Kayıt Ol
                        </button>
                    </Link>
                </section>
            )}
        </div>
    );
}

const styles = {
    page: {
        minHeight: 'calc(100vh - 140px)'
    },
    hero: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
    },
    heroContent: {
        maxWidth: '800px',
        margin: '0 auto'
    },
    heroTitle: {
        fontSize: '42px',
        marginBottom: '20px'
    },
    heroText: {
        fontSize: '20px',
        marginBottom: '30px',
        opacity: 0.9
    },
    heroButton: {
        background: 'white',
        color: '#667eea',
        border: 'none',
        padding: '15px 40px',
        fontSize: '18px',
        borderRadius: '50px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    features: {
        padding: '60px 20px',
        background: '#f8f9fa'
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: '32px',
        marginBottom: '40px'
    },
    featureGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    featureCard: {
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    featureIcon: {
        fontSize: '48px',
        marginBottom: '15px'
    },
    featured: {
        padding: '60px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '30px'
    },
    productCard: {
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        cursor: 'pointer'
    },
    productImage: {
        fontSize: '80px',
        marginBottom: '15px'
    },
    productName: {
        fontSize: '18px',
        color: '#2c3e50',
        marginBottom: '10px'
    },
    productPrice: {
        fontSize: '24px',
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    cta: {
        background: '#3498db',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
    },
    ctaButton: {
        background: 'white',
        color: '#3498db',
        border: 'none',
        padding: '15px 40px',
        fontSize: '18px',
        borderRadius: '50px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '20px'
    }
};
