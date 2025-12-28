// lib/api/services/auth.service.ts
import { apiClient } from '../client';
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    User,
    ChangePasswordRequest,
    UpdateProfileRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
} from '@/lib/types/auth.types';

/**
 * Authentication Service
 * Tüm kimlik doğrulama işlemlerini yönetir
 */
class AuthService {
    private readonly AUTH_PREFIX = '/auth';
    private readonly USER_KEY = 'user';
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';

    /**
     * Kullanıcı girişi yap
     * @param credentials - Email ve şifre bilgileri
     * @returns AuthResponse - Token ve kullanıcı bilgileri
     */
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        console.log('🔐 Login request:', credentials.email);

        const response = await apiClient.post<AuthResponse>(
            `${this.AUTH_PREFIX}/login`,
            credentials
        );

        // Token'ları ve kullanıcı bilgilerini kaydet
        this.saveAuthData(response);

        console.log('✅ Login successful');
        return response;
    }

    /**
     * Yeni kullanıcı kaydı oluştur
     * @param data - Kullanıcı kayıt bilgileri
     * @returns AuthResponse - Token ve kullanıcı bilgileri
     */
    async register(data: RegisterRequest): Promise<AuthResponse> {
        console.log('📝 Register request:', data.email);

        const response = await apiClient.post<AuthResponse>(
            `${this.AUTH_PREFIX}/register`,
            data
        );

        // Token'ları ve kullanıcı bilgilerini kaydet
        this.saveAuthData(response);

        console.log('✅ Registration successful');
        return response;
    }

    /**
     * Çıkış yap
     */
    async logout(): Promise<void> {
        console.log('👋 Logout request');

        try {
            // Backend'e logout isteği gönder (token blacklist için)
            await apiClient.post(`${this.AUTH_PREFIX}/logout`);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Her durumda local storage'ı temizle
            this.clearAuthData();
            console.log('✅ Logout successful');
        }
    }

    /**
     * Mevcut kullanıcı bilgilerini al (Backend'den)
     */
    async getCurrentUser(): Promise<User> {
        console.log('👤 Get current user');
        return await apiClient.get<User>(`${this.AUTH_PREFIX}/me`);
    }

    /**
     * Token'ı doğrula (Backend kontrolü)
     */
    async validateToken(): Promise<boolean> {
        try {
            await this.getCurrentUser();
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Şifre değiştir
     */
    async changePassword(data: ChangePasswordRequest): Promise<void> {
        console.log('🔒 Change password request');

        await apiClient.post(`${this.AUTH_PREFIX}/change-password`, data);

        console.log('✅ Password changed successfully');
    }

    /**
     * Profil bilgilerini güncelle
     */
    async updateProfile(data: UpdateProfileRequest): Promise<User> {
        console.log('📝 Update profile request');

        const updatedUser = await apiClient.put<User>(
            `${this.AUTH_PREFIX}/profile`,
            data
        );

        // Local storage'daki kullanıcı bilgilerini güncelle
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
        }

        console.log('✅ Profile updated successfully');
        return updatedUser;
    }

    /**
     * Şifre sıfırlama isteği (Email gönder)
     */
    async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
        console.log('📧 Forgot password request:', data.email);

        await apiClient.post(`${this.AUTH_PREFIX}/forgot-password`, data);

        console.log('✅ Password reset email sent');
    }

    /**
     * Şifre sıfırlama (Yeni şifre belirle)
     */
    async resetPassword(data: ResetPasswordRequest): Promise<void> {
        console.log('🔒 Reset password request');

        await apiClient.post(`${this.AUTH_PREFIX}/reset-password`, data);

        console.log('✅ Password reset successfully');
    }

    /**
     * Email doğrulama
     */
    async verifyEmail(data: VerifyEmailRequest): Promise<void> {
        console.log('✉️ Verify email request');

        await apiClient.post(`${this.AUTH_PREFIX}/verify-email`, data);

        console.log('✅ Email verified successfully');
    }

    /**
     * Email doğrulama isteği gönder
     */
    async resendVerificationEmail(): Promise<void> {
        console.log('📧 Resend verification email');

        await apiClient.post(`${this.AUTH_PREFIX}/resend-verification`);

        console.log('✅ Verification email sent');
    }

    // ============================================
    // HELPER METHODS (Private)
    // ============================================

    /**
     * Auth verilerini kaydet (Token + User)
     */
    private saveAuthData(response: AuthResponse): void {
        if (typeof window === 'undefined') return;

        // Access token'ı kaydet (apiClient üzerinden)
        apiClient.setToken(response.accessToken);

        // Refresh token'ı kaydet
        localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);

        // Kullanıcı bilgilerini kaydet
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    }

    /**
     * Auth verilerini temizle
     */
    private clearAuthData(): void {
        if (typeof window === 'undefined') return;

        // Token'ları temizle
        apiClient.removeToken();

        // Kullanıcı bilgilerini temizle
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    // ============================================
    // PUBLIC GETTERS (Client-side only)
    // ============================================

    /**
     * Local storage'dan kullanıcı bilgilerini al
     */
    getStoredUser(): User | null {
        if (typeof window === 'undefined') return null;

        const userJson = localStorage.getItem(this.USER_KEY);
        if (!userJson) return null;

        try {
            return JSON.parse(userJson) as User;
        } catch {
            return null;
        }
    }

    /**
     * Kullanıcı giriş yapmış mı kontrol et (Local)
     */
    isAuthenticated(): boolean {
        if (typeof window === 'undefined') return false;

        const token = localStorage.getItem('access_token');
        const user = this.getStoredUser();

        return !!token && !!user;
    }

    /**
     * Kullanıcının belirli bir rolü var mı kontrol et
     */
    hasRole(role: string): boolean {
        const user = this.getStoredUser();
        return user?.roles?.includes(role) ?? false;
    }

    /**
     * Kullanıcının herhangi bir rolü var mı kontrol et
     */
    hasAnyRole(roles: string[]): boolean {
        const user = this.getStoredUser();
        if (!user?.roles) return false;

        return roles.some(role => user.roles.includes(role));
    }
}

// Singleton instance
export const authService = new AuthService();
