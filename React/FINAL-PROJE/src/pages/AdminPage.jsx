// AdminPage - Product management (CRUD)
// C# analojisi: Admin/Products/Index.cshtml + [Authorize(Roles = "Admin")]

import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';

export default function AdminPage() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: 'Elektronik',
        image: '📦',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        };

        let result;
        if (editingProduct) {
            result = await updateProduct(editingProduct.id, productData);
        } else {
            result = await addProduct(productData);
        }

        if (result.success) {
            resetForm();
            alert(editingProduct ? 'Ürün güncellendi!' : 'Ürün eklendi!');
        } else {
            alert('Hata: ' + result.error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            image: product.image,
            description: product.description
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            return;
        }

        const result = await deleteProduct(id);
        if (result.success) {
            alert('Ürün silindi!');
        } else {
            alert('Hata: ' + result.error);
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            price: '',
            stock: '',
            category: 'Elektronik',
            image: '📦',
            description: ''
        });
        setShowForm(false);
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>⚙️ Admin Panel</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={styles.addButton}
                    >
                        {showForm ? '❌ İptal' : '➕ Yeni Ürün Ekle'}
                    </button>
                </div>

                {/* Product Form */}
                {showForm && (
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <h3>{editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün'}</h3>

                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label>Ürün Adı:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label>Fiyat (₺):</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label>Stok:</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label>Kategori:</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    style={styles.input}
                                >
                                    <option>Elektronik</option>
                                    <option>Aksesuar</option>
                                    <option>Tablet</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label>Emoji:</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    style={styles.input}
                                    maxLength="2"
                                />
                            </div>

                            <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                                <label>Açıklama:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        <div style={styles.formButtons}>
                            <button type="submit" style={styles.saveButton}>
                                {editingProduct ? '💾 Güncelle' : '➕ Ekle'}
                            </button>
                            <button type="button" onClick={resetForm} style={styles.cancelButton}>
                                İptal
                            </button>
                        </div>
                    </form>
                )}

                {/* Products Table */}
                <div style={styles.tableContainer}>
                    <h3>Ürün Listesi ({products.length})</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Emoji</th>
                                <th style={styles.th}>Ürün Adı</th>
                                <th style={styles.th}>Kategori</th>
                                <th style={styles.th}>Fiyat</th>
                                <th style={styles.th}>Stok</th>
                                <th style={styles.th}>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} style={styles.tableRow}>
                                    <td style={styles.td}>{product.id}</td>
                                    <td style={{ ...styles.td, fontSize: '24px' }}>{product.image}</td>
                                    <td style={styles.td}>{product.name}</td>
                                    <td style={styles.td}>{product.category}</td>
                                    <td style={styles.td}>₺{product.price.toLocaleString()}</td>
                                    <td style={styles.td}>{product.stock}</td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => handleEdit(product)}
                                            style={styles.editBtn}
                                        >
                                            ✏️ Düzenle
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            style={styles.deleteBtn}
                                        >
                                            🗑️ Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
        maxWidth: '1400px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
    },
    title: {
        fontSize: '32px',
        color: '#2c3e50'
    },
    addButton: {
        background: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    form: {
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '14px',
        marginTop: '5px'
    },
    formButtons: {
        display: 'flex',
        gap: '10px',
        marginTop: '20px'
    },
    saveButton: {
        background: '#3498db',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    cancelButton: {
        background: '#95a5a6',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    tableContainer: {
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    tableHeader: {
        background: '#34495e',
        color: 'white'
    },
    th: {
        padding: '15px',
        textAlign: 'left'
    },
    tableRow: {
        borderBottom: '1px solid #ddd'
    },
    td: {
        padding: '12px'
    },
    editBtn: {
        background: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '5px',
        fontSize: '12px'
    },
    deleteBtn: {
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px'
    }
};
