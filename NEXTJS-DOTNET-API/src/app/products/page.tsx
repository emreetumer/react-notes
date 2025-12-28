'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProducts } from '@/lib/hooks/useProducts';
import type { ProductListQuery } from '@/lib/types/product.types';

export default function ProductsPage() {
    const [query, setQuery] = useState<ProductListQuery>({
        page: 1,
        pageSize: 12,
        sortBy: 'name',
        sortOrder: 'asc',
    });

    const { products, isLoading, error, pagination } = useProducts(query);

    const handleSearch = (search: string) => {
        setQuery({ ...query, search, page: 1 });
    };

    const handlePageChange = (newPage: number) => {
        setQuery({ ...query, page: newPage });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Ürünler</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        .NET API&apos;den gelen ürün listesi
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Filter */}
                <div className="mb-6 space-y-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Ürün ara..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={`${query.sortBy}-${query.sortOrder}`}
                            onChange={(e) => {
                                const [sortBy, sortOrder] = e.target.value.split('-');
                                setQuery({ ...query, sortBy: sortBy as any, sortOrder: sortOrder as any });
                            }}
                        >
                            <option value="name-asc">İsim (A-Z)</option>
                            <option value="name-desc">İsim (Z-A)</option>
                            <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
                            <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
                            <option value="createdAt-desc">En Yeni</option>
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Hata!</h3>
                                <div className="mt-2 text-sm text-red-700">{error}</div>
                                <div className="mt-4">
                                    <p className="text-xs text-red-600">
                                        💡 .NET API&apos;nizin çalıştığından ve CORS ayarlarının yapıldığından emin olun.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {!isLoading && !error && products.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                                        {product.imageUrl ? (
                                            <div className="relative w-full h-48">
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                                                <span className="text-gray-400 text-4xl">📦</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-blue-600">
                                                ₺{product.price.toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Stok: {product.stock}
                                            </span>
                                        </div>
                                        {product.categoryName && (
                                            <div className="mt-2">
                                                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                                    {product.categoryName}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="mt-8 flex justify-center items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(query.page! - 1)}
                                    disabled={!pagination.hasPreviousPage}
                                    className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Önceki
                                </button>
                                <span className="px-4 py-2 text-gray-700">
                                    Sayfa {pagination.pageNumber} / {pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(query.page! + 1)}
                                    disabled={!pagination.hasNextPage}
                                    className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Sonraki
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Empty State */}
                {!isLoading && !error && products.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Ürün bulunamadı</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            .NET API&apos;nizde ürün oluşturun veya arama kriterlerinizi değiştirin.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
