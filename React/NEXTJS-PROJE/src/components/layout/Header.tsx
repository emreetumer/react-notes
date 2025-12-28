// Header Component (Client Component)
// Navigation + User info

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useCart } from '@/lib/contexts/CartContext';

export default function Header() {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const { itemCount } = useCart();
    const pathname = usePathname();

    const isActive = (path: string): boolean => pathname === path;

    return (
        <header className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold hover:text-blue-200">
                        🛒 E-Shop
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-6">
                        <Link
                            href="/"
                            className={`hover:text-blue-200 transition ${isActive('/') ? 'text-blue-200 font-semibold' : ''
                                }`}
                        >
                            Ana Sayfa
                        </Link>

                        <Link
                            href="/products"
                            className={`hover:text-blue-200 transition ${isActive('/products') ? 'text-blue-200 font-semibold' : ''
                                }`}
                        >
                            Ürünler
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/cart"
                                    className={`relative hover:text-blue-200 transition ${isActive('/cart') ? 'text-blue-200 font-semibold' : ''
                                        }`}
                                >
                                    🛒 Sepet
                                    {itemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {itemCount}
                                        </span>
                                    )}
                                </Link>

                                {isAdmin && (
                                    <Link
                                        href="/admin"
                                        className={`hover:text-blue-200 transition ${isActive('/admin') ? 'text-blue-200 font-semibold' : ''
                                            }`}
                                    >
                                        ⚙️ Admin
                                    </Link>
                                )}

                                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-blue-400">
                                    <span className="text-sm">👤 {user?.name}</span>
                                    <button
                                        onClick={logout}
                                        className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition"
                                    >
                                        Çıkış
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition"
                            >
                                Giriş Yap
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
