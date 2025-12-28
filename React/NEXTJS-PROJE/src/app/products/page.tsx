// Products Page - Client Component
// C# analojisi: Products.cshtml (Razor Page)

'use client';

import { useProducts } from '@/lib/contexts/ProductContext';
import { useCart } from '@/lib/contexts/CartContext';
import { useAuth } from '@/lib/contexts/AuthContext';
import type { Product } from '@/lib/types';

export default function ProductsPage() {
    const { filteredProducts, filter, setFilter, categories, loading } = useProducts();
    const { addToCart, isInCart } = useCart();
    const { isAuthenticated } = useAuth();

    const handleAddToCart = (product: Product): void => {
        if (!isAuthenticated) {
            alert('Sepete ürün eklemek için giriş yapmalısınız!');
            return;
        }
        addToCart(product, 1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                🛍️ Ürünler
            </h1>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            🔍 Ürün Ara
                        </label>
                        <input
                            type="text"
                            value={filter.search}
                            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                            placeholder="Ürün adı veya açıklama..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📁 Kategori
                        </label>
                        <select
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Tüm Kategoriler</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-12">
                    <p className="text-gray-600">Yükleniyor...</p>
                </div>
            )}

            {/* Products Grid */}
            {!loading && (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                            {/* Image */}
                            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                                {product.image}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl font-bold text-blue-600">
                                        ₺{product.price.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Stok: {product.stock}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={!isAuthenticated || isInCart(product.id)}
                                    className={`w-full py-2 rounded-lg font-semibold transition ${isInCart(product.id)
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
                                        }`}
                                >
                                    {isInCart(product.id) ? '✓ Sepette' : '🛒 Sepete Ekle'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                        Ürün bulunamadı
                    </p>
                </div>
            )}
        </div>
    );
}
