import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-4xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold text-gray-900">
                        🚀 Next.js + .NET API
                    </h1>
                    <p className="text-xl text-gray-600">
                        Next.js ile .NET Web API Entegrasyonu Örnek Projesi
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    <FeatureCard
                        icon="🔐"
                        title="Authentication"
                        description="JWT tabanlı kimlik doğrulama sistemi"
                        href="/login"
                    />
                    <FeatureCard
                        icon="📦"
                        title="CRUD İşlemleri"
                        description="Product yönetimi ve API entegrasyonu"
                        href="/products"
                    />
                    <FeatureCard
                        icon="🎯"
                        title="Type Safety"
                        description="TypeScript ile tip güvenli geliştirme"
                        href="/docs"
                    />
                    <FeatureCard
                        icon="⚡"
                        title="Best Practices"
                        description="Modern React ve Next.js pratikleri"
                        href="/docs"
                    />
                </div>

                {/* Quick Links */}
                <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Hızlı Başlangıç</h2>
                    <div className="space-y-3">
                        <QuickLink href="/login" text="Giriş Yap" />
                        <QuickLink href="/register" text="Kayıt Ol" />
                        <QuickLink href="/products" text="Ürünleri Görüntüle" />
                        <QuickLink href="/dashboard" text="Dashboard" protected />
                    </div>
                </div>

                {/* Documentation Link */}
                <div className="text-center mt-8">
                    <Link
                        href="/docs"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        📚 Dokümantasyonu İncele →
                    </Link>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    href
}: {
    icon: string;
    title: string;
    description: string;
    href: string;
}) {
    return (
        <Link href={href}>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </Link>
    );
}

function QuickLink({
    href,
    text,
    protected: isProtected = false
}: {
    href: string;
    text: string;
    protected?: boolean;
}) {
    return (
        <Link
            href={href}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
            <span className="text-gray-700">{text}</span>
            <span className="text-sm text-gray-500">
                {isProtected && '🔒'} →
            </span>
        </Link>
    );
}
