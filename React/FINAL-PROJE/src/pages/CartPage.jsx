// CartPage - Shopping cart management
// C# analojisi: Cart/Index.cshtml

import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Sepetiniz boş!');
            return;
        }

        // Sipariş oluştur (simülasyon)
        alert(`Sipariş oluşturuldu!\n\nToplam: ₺${totalPrice.toLocaleString()}\nÜrün sayısı: ${cartItems.length}\n\nTeşekkürler ${user.name}!`);
        clearCart();
        navigate('/products');
    };

    if (cartItems.length === 0) {
        return (
            <div style={styles.emptyCart}>
                <div style={styles.emptyIcon}>🛒</div>
                <h2>Sepetiniz Boş</h2>
                <p>Alışverişe başlamak için ürünleri inceleyin!</p>
                <button onClick={() => navigate('/products')} style={styles.shopButton}>
                    Alışverişe Başla
                </button>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Sepetim</h1>

                <div style={styles.layout}>
                    {/* Cart Items */}
                    <div style={styles.items}>
                        {cartItems.map(item => (
                            <div key={item.id} style={styles.item}>
                                <div style={styles.itemImage}>{item.image}</div>

                                <div style={styles.itemInfo}>
                                    <h3 style={styles.itemName}>{item.name}</h3>
                                    <p style={styles.itemPrice}>₺{item.price.toLocaleString()}</p>
                                </div>

                                <div style={styles.itemActions}>
                                    <div style={styles.quantity}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={styles.quantityBtn}
                                        >
                                            −
                                        </button>
                                        <span style={styles.quantityText}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={styles.quantityBtn}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p style={styles.subtotal}>
                                        Ara Toplam: ₺{(item.price * item.quantity).toLocaleString()}
                                    </p>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={styles.removeBtn}
                                    >
                                        🗑️ Kaldır
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div style={styles.summary}>
                        <h3 style={styles.summaryTitle}>Sipariş Özeti</h3>

                        <div style={styles.summaryRow}>
                            <span>Ürün Sayısı:</span>
                            <span>{cartItems.length}</span>
                        </div>

                        <div style={styles.summaryRow}>
                            <span>Ara Toplam:</span>
                            <span>₺{totalPrice.toLocaleString()}</span>
                        </div>

                        <div style={styles.summaryRow}>
                            <span>Kargo:</span>
                            <span style={{ color: '#2ecc71' }}>Ücretsiz</span>
                        </div>

                        <hr style={{ margin: '15px 0' }} />

                        <div style={styles.summaryTotal}>
                            <strong>TOPLAM:</strong>
                            <strong style={{ fontSize: '24px', color: '#2ecc71' }}>
                                ₺{totalPrice.toLocaleString()}
                            </strong>
                        </div>

                        <button onClick={handleCheckout} style={styles.checkoutBtn}>
                            Sipariş Tamamla 🎉
                        </button>

                        <button onClick={clearCart} style={styles.clearBtn}>
                            Sepeti Temizle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: 'calc(100vh - 140px)',
        background: '#f5f5f5',
        padding: '40px 20px'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    title: {
        fontSize: '32px',
        marginBottom: '30px',
        color: '#2c3e50'
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px'
    },
    items: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    item: {
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        gap: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    itemImage: {
        fontSize: '60px',
        width: '100px',
        textAlign: 'center'
    },
    itemInfo: {
        flex: 1
    },
    itemName: {
        fontSize: '18px',
        marginBottom: '10px'
    },
    itemPrice: {
        fontSize: '20px',
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    itemActions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end'
    },
    quantity: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    quantityBtn: {
        width: '35px',
        height: '35px',
        border: '1px solid #ddd',
        background: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '18px'
    },
    quantityText: {
        fontSize: '18px',
        fontWeight: 'bold',
        minWidth: '30px',
        textAlign: 'center'
    },
    subtotal: {
        fontWeight: 'bold'
    },
    removeBtn: {
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    summary: {
        background: 'white',
        borderRadius: '10px',
        padding: '25px',
        height: 'fit-content',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: '20px'
    },
    summaryTitle: {
        marginBottom: '20px',
        fontSize: '20px'
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    summaryTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '18px'
    },
    checkoutBtn: {
        width: '100%',
        background: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
    },
    clearBtn: {
        width: '100%',
        background: '#95a5a6',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '14px',
        cursor: 'pointer',
        marginTop: '10px'
    },
    emptyCart: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 140px)',
        textAlign: 'center'
    },
    emptyIcon: {
        fontSize: '100px',
        marginBottom: '20px'
    },
    shopButton: {
        background: '#3498db',
        color: 'white',
        border: 'none',
        padding: '15px 40px',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
    }
};
