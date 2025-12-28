// ProductsPage - Product listing with filters
// C# analojisi: Products/Index.cshtml

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function ProductsPage() {
    const { filteredProducts, loading, filter, setFilter, categories } = useProducts();
    const { addToCart, isInCart } = useCart();
    const { isAuthenticated } = useAuth();

    const handleCategoryChange = (category) => {
        setFilter({ ...filter, category });
    };

    const handleSearchChange = (e) => {
        setFilter({ ...filter, search: e.target.value });
    };

    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            alert('Sepete eklemek için giriş yapmalısınız!');
            return;
        }
        addToCart(product);
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.spinner}>⏳</div>
                <p>Ürünler yükleniyor...</p>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Ürünler</h1>

                {/* Filters */}
                <div style={styles.filters}>
                    {/* Search */}
                    <input
                        type="text"
                        value={filter.search}
                        onChange={handleSearchChange}
                        placeholder="Ürün ara..."
                        style={styles.searchInput}
                    />

                    {/* Category Filter */}
                    <div style={styles.categoryButtons}>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                style={{
                                    ...styles.categoryBtn,
                                    background: filter.category === category ? '#3498db' : '#ecf0f1',
                                    color: filter.category === category ? 'white' : '#2c3e50'
                                }}
                            >
                                {category === 'all' ? 'Tümü' : category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Count */}
                <p style={styles.count}>
                    {filteredProducts.length} ürün bulundu
                </p>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div style={styles.empty}>
                        <p>Ürün bulunamadı</p>
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {filteredProducts.map(product => (
                            <div key={product.id} style={styles.card}>
                                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <div style={styles.image}>{product.image}</div>
                                    <h3 style={styles.name}>{product.name}</h3>
                                    <p style={styles.description}>{product.description}</p>
                                    <p style={styles.category}>📁 {product.category}</p>
                                </Link>

                                <div style={styles.cardFooter}>
                                    <span style={styles.price}>₺{product.price.toLocaleString()}</span>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        style={{
                                            ...styles.addBtn,
                                            background: isInCart(product.id) ? '#2ecc71' : '#3498db'
                                        }}
                                        disabled={!isAuthenticated}
                                    >
                                        {isInCart(product.id) ? '✓ Sepette' : '🛒 Sepete Ekle'}
                                    </button>
                                </div>

                                <p style={styles.stock}>
                                    Stok: {product.stock > 0 ? `${product.stock} adet` : 'Tükendi'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
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
    filters: {
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    searchInput: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        marginBottom: '15px'
    },
    categoryButtons: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    },
    categoryBtn: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.2s'
    },
    count: {
        color: '#666',
        marginBottom: '20px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px'
    },
    card: {
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        cursor: 'pointer'
    },
    image: {
        fontSize: '80px',
        textAlign: 'center',
        marginBottom: '15px'
    },
    name: {
        fontSize: '18px',
        color: '#2c3e50',
        marginBottom: '10px'
    },
    description: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '10px'
    },
    category: {
        fontSize: '12px',
        color: '#95a5a6',
        marginBottom: '15px'
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px'
    },
    price: {
        fontSize: '24px',
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    addBtn: {
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    stock: {
        fontSize: '12px',
        color: '#95a5a6',
        marginTop: '10px'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#999'
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 140px)'
    },
    spinner: {
        fontSize: '48px',
        marginBottom: '20px'
    }
};
