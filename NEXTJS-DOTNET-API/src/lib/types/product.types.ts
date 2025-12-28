// lib/types/product.types.ts

/**
 * Ürün bilgileri
 */
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    stock: number;
    categoryId: string;
    categoryName: string;
    imageUrl: string;
    images: ProductImage[];
    tags: string[];
    isActive: boolean;
    isFeatured: boolean;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * Ürün görseli
 */
export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
}

/**
 * Yeni ürün oluşturma isteği
 */
export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    stock: number;
    categoryId: string;
    imageUrl?: string;
    tags?: string[];
}

/**
 * Ürün güncelleme isteği
 */
export interface UpdateProductRequest extends Partial<CreateProductRequest> {
    id: string;
}

/**
 * Ürün listesi query parametreleri
 */
export interface ProductListQuery {
    page?: number;
    pageSize?: number;
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    tags?: string[];
    isActive?: boolean;
    isFeatured?: boolean;
    sortBy?: 'name' | 'price' | 'rating' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
}

/**
 * Kategori bilgileri
 */
export interface Category {
    id: string;
    name: string;
    description: string;
    slug: string;
    parentId?: string;
    imageUrl?: string;
    productCount: number;
    isActive: boolean;
    createdAt: string;
}

/**
 * Ürün review
 */
export interface ProductReview {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    isVerifiedPurchase: boolean;
    createdAt: string;
}
