// Product Context - Product management state
// C# analojisi: Repository pattern + Service layer

import { createContext, useContext, useState, useEffect } from 'react';
import { productsApi } from '../api/mockApi';

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ category: 'all', search: '' });

    // Load products
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await productsApi.getAll();
            setProducts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Get filtered products
    const filteredProducts = products.filter(product => {
        const matchesCategory = filter.category === 'all' || product.category === filter.category;
        const matchesSearch = product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            product.description.toLowerCase().includes(filter.search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Add product
    const addProduct = async (productData) => {
        try {
            const response = await productsApi.create(productData);
            setProducts(prev => [...prev, response.data]);
            return { success: true, data: response.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Update product
    const updateProduct = async (id, productData) => {
        try {
            const response = await productsApi.update(id, productData);
            setProducts(prev =>
                prev.map(p => p.id === id ? response.data : p)
            );
            return { success: true, data: response.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        try {
            await productsApi.delete(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Get product by id
    const getProductById = (id) => {
        return products.find(p => p.id === parseInt(id));
    };

    // Get categories
    const categories = ['all', ...new Set(products.map(p => p.category))];

    const value = {
        products,
        filteredProducts,
        loading,
        error,
        filter,
        setFilter,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        categories,
        refreshProducts: loadProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

// Custom hook
export function useProducts() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within ProductProvider');
    }
    return context;
}

export default ProductContext;
