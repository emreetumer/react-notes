// Login Page - Client Component
// C# analojisi: Login.cshtml (Razor Page) + LoginModel

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                router.push('/products');
            } else {
                setError(result.error || 'Giriş başarısız');
            }
        } catch (err) {
            setError('Bir hata oluştu!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        🔐 Giriş Yap
                    </h2>
                    <p className="text-gray-600 mt-2">
                        E-Shop hesabınıza giriş yapın
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                E-posta
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="ornek@email.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Şifre
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                                ❌ {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                        >
                            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Hesabınız yok mu?{' '}
                            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Kayıt Ol
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Accounts */}
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                        🧪 Test Hesapları:
                    </p>
                    <div className="text-xs text-gray-600 space-y-1">
                        <p><strong>Admin:</strong> admin@test.com / admin123</p>
                        <p><strong>User:</strong> user@test.com / 123456</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
