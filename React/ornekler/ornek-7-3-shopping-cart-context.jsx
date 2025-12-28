// DERS 7 - ÖRNEK 3: Shopping Cart Context
// E-commerce sepet yönetimi - Global state

import { createContext, useContext, useState } from 'react';

// 1. CART CONTEXT
const CartContext = createContext();

// 2. CART PROVIDER
function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Ürün ekle
    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);

            if (existingItem) {
                // Zaten varsa miktarı artır
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Yoksa ekle
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    // Ürün çıkar
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    // Miktarı güncelle
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(prev =>
                prev.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    // Sepeti temizle
    const clearCart = () => {
        setCartItems([]);
    };

    // Toplam fiyat
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    // Toplam ürün sayısı
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalPrice,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

// 3. CUSTOM HOOK
function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}

// 4. ÜRÜN KARTLARI
const products = [
    { id: 1, name: 'Laptop', price: 15000, emoji: '💻' },
    { id: 2, name: 'Telefon', price: 8000, emoji: '📱' },
    { id: 3, name: 'Kulaklık', price: 500, emoji: '🎧' },
    { id: 4, name: 'Klavye', price: 1000, emoji: '⌨️' },
    { id: 5, name: 'Mouse', price: 300, emoji: '🖱️' },
    { id: 6, name: 'Monitör', price: 5000, emoji: '🖥️' }
];

function ProductCard({ product }) {
    const { addToCart, cartItems } = useCart();

    const itemInCart = cartItems.find(item => item.id === product.id);

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            background: 'white'
        }}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>
                {product.emoji}
            </div>
            <h3>{product.name}</h3>
            <p style={{ fontSize: '20px', color: '#2ecc71', fontWeight: 'bold' }}>
                ₺{product.price}
            </p>

            <button
                onClick={() => addToCart(product)}
                style={{
                    padding: '10px 20px',
                    background: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                Sepete Ekle
            </button>

            {itemInCart && (
                <p style={{
                    marginTop: '10px',
                    color: '#2ecc71',
                    fontWeight: 'bold'
                }}>
                    ✓ Sepette: {itemInCart.quantity} adet
                </p>
            )}
        </div>
    );
}

// 5. ÜRÜN LİSTESİ
function ProductList() {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Ürünler</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

// 6. NAVBAR (Sepet ikonu)
function Navbar() {
    const { itemCount, totalPrice } = useCart();

    return (
        <nav style={{
            padding: '15px 30px',
            background: '#2c3e50',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <h2 style={{ margin: 0 }}>🛒 E-Ticaret</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                    background: '#3498db',
                    padding: '8px 15px',
                    borderRadius: '20px'
                }}>
                    🛒 {itemCount} ürün
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Toplam: ₺{totalPrice.toLocaleString()}
                </div>
            </div>
        </nav>
    );
}

// 7. SEPET (Sidebar)
function CartSidebar() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

    return (
        <div style={{
            width: '350px',
            background: '#ecf0f1',
            padding: '20px',
            borderLeft: '1px solid #ddd',
            minHeight: 'calc(100vh - 70px)'
        }}>
            <h2>Sepetim</h2>

            {cartItems.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', marginTop: '50px' }}>
                    Sepetiniz boş 🛒
                </p>
            ) : (
                <>
                    <div>
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    background: 'white',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    marginBottom: '10px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                                        <strong style={{ marginLeft: '10px' }}>{item.name}</strong>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{
                                            background: '#e74c3c',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '10px'
                                }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{
                                                background: '#95a5a6',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '3px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            −
                                        </button>
                                        <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{
                                                background: '#95a5a6',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '3px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span style={{ fontWeight: 'bold', color: '#2ecc71' }}>
                                        ₺{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#2ecc71',
                        color: 'white',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>TOPLAM</h3>
                        <p style={{ fontSize: '24px', margin: 0, fontWeight: 'bold' }}>
                            ₺{totalPrice.toLocaleString()}
                        </p>
                    </div>

                    <button
                        onClick={clearCart}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Sepeti Temizle
                    </button>
                </>
            )}
        </div>
    );
}

// 8. ANA APP
export default function ShoppingCartExample() {
    return (
        <CartProvider>
            <div>
                <Navbar />
                <div style={{ display: 'flex' }}>
                    <ProductList />
                    <CartSidebar />
                </div>
            </div>
        </CartProvider>
    );
}
