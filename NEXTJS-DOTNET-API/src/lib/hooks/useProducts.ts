// lib/hooks/useProducts.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/lib/api/services/product.service';
import type {
    Product,
    ProductListQuery,
    CreateProductRequest,
    UpdateProductRequest,
} from '@/lib/types/product.types';
import type { PaginatedResponse } from '@/lib/types/common.types';

interface UseProductsReturn {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    pagination: Omit<PaginatedResponse<Product>, 'data'> | null;
    refetch: () => Promise<void>;
    createProduct: (data: CreateProductRequest) => Promise<Product>;
    updateProduct: (id: string, data: UpdateProductRequest) => Promise<Product>;
    deleteProduct: (id: string) => Promise<void>;
    clearError: () => void;
}

/**
 * Products Hook
 * Ürün listesi ve CRUD işlemlerini yönetir
 */
export function useProducts(query?: ProductListQuery): UseProductsReturn {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Omit<PaginatedResponse<Product>, 'data'> | null>(null);

    /**
     * Ürünleri getir
     */
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await productService.getProducts(query);
            setProducts(response.data);

            setPagination({
                totalCount: response.totalCount,
                pageNumber: response.pageNumber,
                pageSize: response.pageSize,
                totalPages: response.totalPages,
                hasNextPage: response.hasNextPage,
                hasPreviousPage: response.hasPreviousPage,
            });
        } catch (err: any) {
            setError(err.message || 'Ürünler yüklenirken bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    /**
     * Yeni ürün oluştur
     */
    const createProduct = useCallback(async (data: CreateProductRequest): Promise<Product> => {
        setError(null);

        try {
            const newProduct = await productService.createProduct(data);

            // Listeyi yenile
            await fetchProducts();

            return newProduct;
        } catch (err: any) {
            setError(err.message || 'Ürün oluşturulamadı');
            throw err;
        }
    }, [fetchProducts]);

    /**
     * Ürünü güncelle
     */
    const updateProduct = useCallback(async (id: string, data: UpdateProductRequest): Promise<Product> => {
        setError(null);

        try {
            const updatedProduct = await productService.updateProduct(id, data);

            // Local state'i güncelle
            setProducts(prev =>
                prev.map(p => p.id === id ? updatedProduct : p)
            );

            return updatedProduct;
        } catch (err: any) {
            setError(err.message || 'Ürün güncellenemedi');
            throw err;
        }
    }, []);

    /**
     * Ürünü sil
     */
    const deleteProduct = useCallback(async (id: string): Promise<void> => {
        setError(null);

        try {
            await productService.deleteProduct(id);

            // Local state'den çıkar
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err: any) {
            setError(err.message || 'Ürün silinemedi');
            throw err;
        }
    }, []);

    /**
     * Hata mesajını temizle
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // İlk yükleme ve query değiştiğinde
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        isLoading,
        error,
        pagination,
        refetch: fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        clearError,
    };
}

/**
 * Single Product Hook
 * Tek bir ürünü getir ve yönet
 */
interface UseProductReturn {
    product: Product | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    updateProduct: (data: UpdateProductRequest) => Promise<Product>;
    deleteProduct: () => Promise<void>;
    clearError: () => void;
}

export function useProduct(id: string): UseProductReturn {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Ürünü getir
     */
    const fetchProduct = useCallback(async () => {
        if (!id) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await productService.getProduct(id);
            setProduct(data);
        } catch (err: any) {
            setError(err.message || 'Ürün yüklenirken bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    /**
     * Ürünü güncelle
     */
    const updateProduct = useCallback(async (data: UpdateProductRequest): Promise<Product> => {
        setError(null);

        try {
            const updatedProduct = await productService.updateProduct(id, data);
            setProduct(updatedProduct);
            return updatedProduct;
        } catch (err: any) {
            setError(err.message || 'Ürün güncellenemedi');
            throw err;
        }
    }, [id]);

    /**
     * Ürünü sil
     */
    const deleteProduct = useCallback(async (): Promise<void> => {
        setError(null);

        try {
            await productService.deleteProduct(id);
            setProduct(null);
        } catch (err: any) {
            setError(err.message || 'Ürün silinemedi');
            throw err;
        }
    }, [id]);

    /**
     * Hata mesajını temizle
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // İlk yükleme
    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return {
        product,
        isLoading,
        error,
        refetch: fetchProduct,
        updateProduct,
        deleteProduct,
        clearError,
    };
}
