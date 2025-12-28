// lib/api/services/product.service.ts
import { apiClient } from '../client';
import type {
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    ProductListQuery,
    Category,
    ProductReview,
} from '@/lib/types/product.types';
import type { PaginatedResponse } from '@/lib/types/common.types';

/**
 * Product Service
 * Tüm ürün işlemlerini yönetir (CRUD + Extra)
 */
class ProductService {
    private readonly PRODUCT_PREFIX = '/products';
    private readonly CATEGORY_PREFIX = '/categories';

    // ============================================
    // PRODUCT CRUD OPERATIONS
    // ============================================

    /**
     * Tüm ürünleri getir (Sayfalama ve filtreleme ile)
     */
    async getProducts(query?: ProductListQuery): Promise<PaginatedResponse<Product>> {
        console.log('📦 Get products with query:', query);

        // Query parametrelerini oluştur
        const params = new URLSearchParams();

        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        // Array parametreler için (tags gibi)
                        value.forEach(v => params.append(key, v.toString()));
                    } else {
                        params.append(key, value.toString());
                    }
                }
            });
        }

        const url = params.toString()
            ? `${this.PRODUCT_PREFIX}?${params.toString()}`
            : this.PRODUCT_PREFIX;

        const response = await apiClient.get<PaginatedResponse<Product>>(url);

        console.log(`✅ Fetched ${response.data.length} products`);
        return response;
    }

    /**
     * Tek bir ürünü ID ile getir
     */
    async getProduct(id: string): Promise<Product> {
        console.log('📦 Get product:', id);

        const product = await apiClient.get<Product>(`${this.PRODUCT_PREFIX}/${id}`);

        console.log('✅ Product fetched:', product.name);
        return product;
    }

    /**
     * Ürün slug'ı ile getir (SEO friendly URL için)
     */
    async getProductBySlug(slug: string): Promise<Product> {
        console.log('📦 Get product by slug:', slug);

        return await apiClient.get<Product>(`${this.PRODUCT_PREFIX}/slug/${slug}`);
    }

    /**
     * Yeni ürün oluştur
     */
    async createProduct(data: CreateProductRequest): Promise<Product> {
        console.log('➕ Create product:', data.name);

        const product = await apiClient.post<Product>(this.PRODUCT_PREFIX, data);

        console.log('✅ Product created:', product.id);
        return product;
    }

    /**
     * Ürünü güncelle
     */
    async updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
        console.log('✏️ Update product:', id);

        const product = await apiClient.put<Product>(
            `${this.PRODUCT_PREFIX}/${id}`,
            data
        );

        console.log('✅ Product updated');
        return product;
    }

    /**
     * Ürünü sil
     */
    async deleteProduct(id: string): Promise<void> {
        console.log('🗑️ Delete product:', id);

        await apiClient.delete(`${this.PRODUCT_PREFIX}/${id}`);

        console.log('✅ Product deleted');
    }

    // ============================================
    // PRODUCT SPECIFIC OPERATIONS
    // ============================================

    /**
     * Ürün stok güncelle
     */
    async updateStock(id: string, quantity: number): Promise<Product> {
        console.log('📊 Update stock:', id, quantity);

        return await apiClient.patch<Product>(
            `${this.PRODUCT_PREFIX}/${id}/stock`,
            { quantity }
        );
    }

    /**
     * Ürün fiyat güncelle
     */
    async updatePrice(id: string, price: number, discountPrice?: number): Promise<Product> {
        console.log('💰 Update price:', id, price);

        return await apiClient.patch<Product>(
            `${this.PRODUCT_PREFIX}/${id}/price`,
            { price, discountPrice }
        );
    }

    /**
     * Ürün durumunu değiştir (Aktif/Pasif)
     */
    async toggleStatus(id: string): Promise<Product> {
        console.log('🔄 Toggle product status:', id);

        return await apiClient.patch<Product>(
            `${this.PRODUCT_PREFIX}/${id}/toggle-status`
        );
    }

    /**
     * Ürünü featured yap/çıkar
     */
    async toggleFeatured(id: string): Promise<Product> {
        console.log('⭐ Toggle featured:', id);

        return await apiClient.patch<Product>(
            `${this.PRODUCT_PREFIX}/${id}/toggle-featured`
        );
    }

    /**
     * Ürün görseli yükle
     */
    async uploadProductImage(
        id: string,
        file: File,
        onProgress?: (progress: number) => void
    ): Promise<Product> {
        console.log('📸 Upload product image:', id);

        const formData = new FormData();
        formData.append('image', file);

        return await apiClient.uploadFile<Product>(
            `${this.PRODUCT_PREFIX}/${id}/image`,
            formData,
            onProgress
        );
    }

    /**
     * Ürün görselini sil
     */
    async deleteProductImage(productId: string, imageId: string): Promise<Product> {
        console.log('🗑️ Delete product image:', productId, imageId);

        return await apiClient.delete<Product>(
            `${this.PRODUCT_PREFIX}/${productId}/images/${imageId}`
        );
    }

    // ============================================
    // PRODUCT SEARCH & FILTER
    // ============================================

    /**
     * Ürün ara (Full-text search)
     */
    async searchProducts(searchTerm: string, page = 1, pageSize = 20): Promise<PaginatedResponse<Product>> {
        console.log('🔍 Search products:', searchTerm);

        return await this.getProducts({
            search: searchTerm,
            page,
            pageSize,
        });
    }

    /**
     * Kategoriye göre ürünleri getir
     */
    async getProductsByCategory(
        categoryId: string,
        page = 1,
        pageSize = 20
    ): Promise<PaginatedResponse<Product>> {
        console.log('📁 Get products by category:', categoryId);

        return await this.getProducts({
            categoryId,
            page,
            pageSize,
        });
    }

    /**
     * Öne çıkan ürünleri getir
     */
    async getFeaturedProducts(limit = 10): Promise<Product[]> {
        console.log('⭐ Get featured products');

        const response = await this.getProducts({
            isFeatured: true,
            pageSize: limit,
            page: 1,
        });

        return response.data;
    }

    /**
     * Yeni ürünleri getir
     */
    async getNewProducts(limit = 10): Promise<Product[]> {
        console.log('🆕 Get new products');

        const response = await this.getProducts({
            sortBy: 'createdAt',
            sortOrder: 'desc',
            pageSize: limit,
            page: 1,
        });

        return response.data;
    }

    /**
     * En çok satılan ürünleri getir
     */
    async getBestSellingProducts(limit = 10): Promise<Product[]> {
        console.log('🔥 Get best selling products');

        return await apiClient.get<Product[]>(
            `${this.PRODUCT_PREFIX}/best-selling?limit=${limit}`
        );
    }

    /**
     * İlgili ürünleri getir
     */
    async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
        console.log('🔗 Get related products for:', productId);

        return await apiClient.get<Product[]>(
            `${this.PRODUCT_PREFIX}/${productId}/related?limit=${limit}`
        );
    }

    // ============================================
    // CATEGORY OPERATIONS
    // ============================================

    /**
     * Tüm kategorileri getir
     */
    async getCategories(): Promise<Category[]> {
        console.log('📁 Get categories');

        return await apiClient.get<Category[]>(this.CATEGORY_PREFIX);
    }

    /**
     * Tek bir kategoriyi getir
     */
    async getCategory(id: string): Promise<Category> {
        console.log('📁 Get category:', id);

        return await apiClient.get<Category>(`${this.CATEGORY_PREFIX}/${id}`);
    }

    /**
     * Yeni kategori oluştur
     */
    async createCategory(data: Omit<Category, 'id' | 'productCount' | 'createdAt'>): Promise<Category> {
        console.log('➕ Create category:', data.name);

        return await apiClient.post<Category>(this.CATEGORY_PREFIX, data);
    }

    // ============================================
    // PRODUCT REVIEWS
    // ============================================

    /**
     * Ürün yorumlarını getir
     */
    async getProductReviews(productId: string, page = 1, pageSize = 10): Promise<PaginatedResponse<ProductReview>> {
        console.log('💬 Get product reviews:', productId);

        return await apiClient.get<PaginatedResponse<ProductReview>>(
            `${this.PRODUCT_PREFIX}/${productId}/reviews?page=${page}&pageSize=${pageSize}`
        );
    }

    /**
     * Ürüne yorum yap
     */
    async createReview(productId: string, data: { rating: number; comment: string }): Promise<ProductReview> {
        console.log('✍️ Create review for:', productId);

        return await apiClient.post<ProductReview>(
            `${this.PRODUCT_PREFIX}/${productId}/reviews`,
            data
        );
    }

    /**
     * Yorumu güncelle
     */
    async updateReview(productId: string, reviewId: string, data: { rating: number; comment: string }): Promise<ProductReview> {
        console.log('✏️ Update review:', reviewId);

        return await apiClient.put<ProductReview>(
            `${this.PRODUCT_PREFIX}/${productId}/reviews/${reviewId}`,
            data
        );
    }

    /**
     * Yorumu sil
     */
    async deleteReview(productId: string, reviewId: string): Promise<void> {
        console.log('🗑️ Delete review:', reviewId);

        await apiClient.delete(`${this.PRODUCT_PREFIX}/${productId}/reviews/${reviewId}`);
    }

    // ============================================
    // BULK OPERATIONS
    // ============================================

    /**
     * Toplu ürün oluştur (Excel/CSV import için)
     */
    async bulkCreateProducts(products: CreateProductRequest[]): Promise<Product[]> {
        console.log('📦 Bulk create products:', products.length);

        return await apiClient.post<Product[]>(
            `${this.PRODUCT_PREFIX}/bulk`,
            products
        );
    }

    /**
     * Toplu ürün güncelle
     */
    async bulkUpdateProducts(updates: UpdateProductRequest[]): Promise<Product[]> {
        console.log('✏️ Bulk update products:', updates.length);

        return await apiClient.put<Product[]>(
            `${this.PRODUCT_PREFIX}/bulk`,
            updates
        );
    }

    /**
     * Toplu ürün sil
     */
    async bulkDeleteProducts(ids: string[]): Promise<void> {
        console.log('🗑️ Bulk delete products:', ids.length);

        await apiClient.post(`${this.PRODUCT_PREFIX}/bulk-delete`, { ids });
    }
}

// Singleton instance
export const productService = new ProductService();
