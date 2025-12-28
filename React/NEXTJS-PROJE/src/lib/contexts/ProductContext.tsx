// Product Context - TypeScript version

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { productsApi } from '../api/mockApi';
import type {
    Product,
    ProductContextType,
    ProductFilter,
    CreateProductDto,
    UpdateProductDto,
    ApiResponse
} from '../types';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<ProductFilter>({
        category: '',
        search: ''
    });

    // Load products on mount
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await productsApi.getAll();
            if (response.data) {
                setProducts(response.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    // Filtered products
    const filteredProducts = products.filter((product: Product) => {
        const matchesCategory = !filter.category || product.category === filter.category;
        const matchesSearch = !filter.search ||
            product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            product.description.toLowerCase().includes(filter.search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Add product
    const addProduct = async (productData: CreateProductDto): Promise<ApiResponse<Product>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await productsApi.create(productData);
            if (response.data) {
                setProducts((prev: Product[]) => [...prev, response.data!]);
            }
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to add product';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Update product
    const updateProduct = async (id: number, productData: UpdateProductDto): Promise<ApiResponse<Product>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await productsApi.update(id, productData);
            if (response.data) {
                setProducts((prev: Product[]) =>
                    prev.map((p: Product) => p.id === id ? response.data! : p)
                );
            }
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Delete product
    const deleteProduct = async (id: number): Promise<ApiResponse<void>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await productsApi.delete(id);
            setProducts((prev: Product[]) => prev.filter((p: Product) => p.id !== id));
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete product';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Get product by id
    const getProductById = (id: number): Product | undefined => {
        return products.find((p: Product) => p.id === id);
    };

    // Get categories
    const categories: string[] = Array.from(new Set(products.map((p: Product) => p.category)));

    const value: ProductContextType = {
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
export function useProducts(): ProductContextType {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within ProductProvider');
    }
    return context;
}

export default ProductContext;
