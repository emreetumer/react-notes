// lib/hooks/useAuth.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api/services/auth.service';
import type {
    User,
    LoginRequest,
    RegisterRequest,
    ChangePasswordRequest,
    UpdateProfileRequest
} from '@/lib/types/auth.types';

interface UseAuthReturn {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    changePassword: (data: ChangePasswordRequest) => Promise<void>;
    updateProfile: (data: UpdateProfileRequest) => Promise<void>;
    refreshUser: () => Promise<void>;
    clearError: () => void;
}

/**
 * Authentication Hook
 * Kullanıcı girişi, kayıt, çıkış ve profil işlemlerini yönetir
 */
export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Sayfa yüklendiğinde kullanıcı durumunu kontrol et
    useEffect(() => {
        checkAuthStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Auth durumunu kontrol et
     */
    const checkAuthStatus = useCallback(async () => {
        try {
            // Local storage'dan kullanıcıyı al
            const storedUser = authService.getStoredUser();

            if (storedUser) {
                setUser(storedUser);

                // Token'ı doğrula (arka planda)
                const isValid = await authService.validateToken();

                if (!isValid) {
                    // Token geçersiz - temizle
                    setUser(null);
                    authService.logout();
                }
            }
        } catch (err) {
            console.error('Auth check error:', err);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Kullanıcı girişi
     */
    const login = useCallback(async (credentials: LoginRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login(credentials);
            setUser(response.user);

            // Redirect varsa oraya git, yoksa dashboard'a
            const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
            sessionStorage.removeItem('redirectAfterLogin');

            router.push(redirectPath);
        } catch (err: any) {
            const errorMessage = err.message || 'Giriş yapılamadı';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    /**
     * Kullanıcı kaydı
     */
    const register = useCallback(async (data: RegisterRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.register(data);
            setUser(response.user);

            router.push('/dashboard');
        } catch (err: any) {
            const errorMessage = err.message || 'Kayıt oluşturulamadı';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    /**
     * Çıkış yap
     */
    const logout = useCallback(async () => {
        setIsLoading(true);

        try {
            await authService.logout();
            setUser(null);
            router.push('/login');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    /**
     * Şifre değiştir
     */
    const changePassword = useCallback(async (data: ChangePasswordRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await authService.changePassword(data);
        } catch (err: any) {
            const errorMessage = err.message || 'Şifre değiştirilemedi';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Profil güncelle
     */
    const updateProfile = useCallback(async (data: UpdateProfileRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const updatedUser = await authService.updateProfile(data);
            setUser(updatedUser);
        } catch (err: any) {
            const errorMessage = err.message || 'Profil güncellenemedi';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Kullanıcı bilgilerini yenile
     */
    const refreshUser = useCallback(async () => {
        try {
            const updatedUser = await authService.getCurrentUser();
            setUser(updatedUser);

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (err) {
            console.error('Refresh user error:', err);
        }
    }, []);

    /**
     * Hata mesajını temizle
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        register,
        logout,
        changePassword,
        updateProfile,
        refreshUser,
        clearError,
    };
}
