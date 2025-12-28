// Root Layout - TypeScript
// C# analojisi: _Layout.cshtml (Razor)

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { ProductProvider } from '@/lib/contexts/ProductContext';
import { CartProvider } from '@/lib/contexts/CartContext';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'E-Shop - Next.js E-Commerce',
    description: 'Modern e-commerce uygulaması - Next.js 14 + TypeScript',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                <AuthProvider>
                    <ProductProvider>
                        <CartProvider>
                            <Header />
                            <main className="min-h-screen bg-gray-50">
                                {children}
                            </main>
                        </CartProvider>
                    </ProductProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
