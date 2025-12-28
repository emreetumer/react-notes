// Home Page - Server Component
// C# analojisi: Index.cshtml (Razor Page)

import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    🛍️ E-Shop'a Hoş Geldiniz!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Modern, hızlı ve güvenli alışveriş deneyimi
                </p>
                <Link
                    href="/products"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-block"
                >
                    Alışverişe Başla 🚀
                </Link>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="text-xl font-semibold mb-2">Hızlı Teslimat</h3>
                    <p className="text-gray-600">
                        Siparişleriniz aynı gün kargoda
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-xl font-semibold mb-2">Güvenli Ödeme</h3>
                    <p className="text-gray-600">
                        256-bit SSL şifreleme ile korumalı
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-4xl mb-4">💯</div>
                    <h3 className="text-xl font-semibold mb-2">%100 Memnuniyet</h3>
                    <p className="text-gray-600">
                        30 gün koşulsuz iade garantisi
                    </p>
                </div>
            </section>

            {/* Tech Stack Info */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">
                    🚀 Modern Teknolojilerle Geliştirildi
                </h2>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-2xl mb-2">⚛️</div>
                        <p className="font-semibold">Next.js 14</p>
                        <p className="text-sm text-blue-100">App Router</p>
                    </div>
                    <div>
                        <div className="text-2xl mb-2">📘</div>
                        <p className="font-semibold">TypeScript</p>
                        <p className="text-sm text-blue-100">Type Safety</p>
                    </div>
                    <div>
                        <div className="text-2xl mb-2">🎨</div>
                        <p className="font-semibold">Tailwind CSS</p>
                        <p className="text-sm text-blue-100">Modern UI</p>
                    </div>
                    <div>
                        <div className="text-2xl mb-2">🔐</div>
                        <p className="font-semibold">Authentication</p>
                        <p className="text-sm text-blue-100">Secure</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
