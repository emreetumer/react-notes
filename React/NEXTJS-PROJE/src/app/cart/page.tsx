// Cart Page - Client Component
// C# analojisi: Cart.cshtml (Razor Page)

'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/contexts/CartContext';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, itemCount } = useCart();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    🔐 Lütfen Giriş Yapın
                </h2>
                <p className="text-gray-600 mb-6">
                    Sepetinizi görüntülemek için giriş yapmalısınız.
                </p>
                <button
                    onClick={() => router.push('/login')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                    Giriş Yap
                </button>
            </div>
        );
    }

    const handleCheckout = (): void => {
        if (cartItems.length === 0) return;

        alert(`Sipariş tamamlandı! Toplam: ₺${totalPrice.toLocaleString()}`);
        clearCart();
        router.push('/products');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                🛒 Sepetim
            </h1>

            {cartItems.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <p className="text-gray-600 text-lg mb-4">
                        Sepetiniz boş
                    </p>
                    <button
                        onClick={() => router.push('/products')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Alışverişe Başla
                    </button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md p-6 flex items-center gap-6"
                            >
                                {/* Image */}
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                                    {item.image}
                                </div>

                                {/* Info */}
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {item.description}
                                    </p>
                                    <p className="text-blue-600 font-bold">
                                        ₺{item.price.toLocaleString()}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-semibold">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.stock}
                                        className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Subtotal */}
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-800">
                                        ₺{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-600 hover:text-red-700 font-semibold"
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Sipariş Özeti
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Ürün Sayısı:</span>
                                    <span className="font-semibold">{itemCount}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Ara Toplam:</span>
                                    <span className="font-semibold">₺{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Kargo:</span>
                                    <span className="font-semibold text-green-600">Ücretsiz</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                    <span>Toplam:</span>
                                    <span className="text-blue-600">₺{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 mb-3"
                            >
                                ✓ Siparişi Tamamla
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                            >
                                🗑️ Sepeti Temizle
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
