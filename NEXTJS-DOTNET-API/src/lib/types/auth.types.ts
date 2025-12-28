// lib/types/auth.types.ts

/**
 * Login isteği için tip
 */
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

/**
 * Register isteği için tip
 */
export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
}

/**
 * Auth yanıtı (Login/Register sonrası)
 */
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
    expiresIn: number; // Seconds
}

/**
 * Kullanıcı bilgileri
 */
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phoneNumber?: string;
    roles: string[];
    isEmailVerified: boolean;
    profileImageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Refresh token isteği
 */
export interface RefreshTokenRequest {
    refreshToken: string;
}

/**
 * Refresh token yanıtı
 */
export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

/**
 * Şifre değiştirme isteği
 */
export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

/**
 * Profil güncelleme isteği
 */
export interface UpdateProfileRequest {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
}

/**
 * Email doğrulama isteği
 */
export interface VerifyEmailRequest {
    token: string;
}

/**
 * Şifre sıfırlama isteği (Email gönderme)
 */
export interface ForgotPasswordRequest {
    email: string;
}

/**
 * Şifre sıfırlama (Yeni şifre belirleme)
 */
export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmPassword: string;
}
