// lib/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { env } from '../config/env';

/**
 * API yanıt tipi
 */
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
}

/**
 * API error tipi
 */
export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

/**
 * API Client Sınıfı
 * .NET Web API ile iletişim kurmak için merkezi client
 */
class ApiClient {
    private client: AxiosInstance;
    private baseURL: string;

    constructor() {
        this.baseURL = env.apiUrl;

        // Axios instance oluştur
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: env.apiTimeout,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        // Interceptor'ları ayarla
        this.setupInterceptors();

        if (env.enableLogging) {
            console.log('🚀 API Client initialized:', this.baseURL);
        }
    }

    /**
     * Request ve Response interceptor'larını ayarla
     */
    private setupInterceptors() {
        // ============================================
        // REQUEST INTERCEPTOR
        // ============================================
        this.client.interceptors.request.use(
            (config) => {
                // Token'ı header'a ekle
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Request logla (development)
                if (env.enableLogging) {
                    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
                    if (config.data) {
                        console.log('  Data:', config.data);
                    }
                }

                return config;
            },
            (error) => {
                console.error('❌ Request Error:', error);
                return Promise.reject(error);
            }
        );

        // ============================================
        // RESPONSE INTERCEPTOR
        // ============================================
        this.client.interceptors.response.use(
            (response) => {
                // Response logla (development)
                if (env.enableLogging) {
                    console.log(`📥 API Response: ${response.config.url}`, response.status);
                    console.log('  Data:', response.data);
                }

                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // 401 Unauthorized - Token süresi dolmuş olabilir
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    if (env.enableLogging) {
                        console.log('🔄 Token expired, trying to refresh...');
                    }

                    try {
                        // Refresh token ile yeni token al
                        const newToken = await this.refreshToken();

                        if (newToken && originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return this.client(originalRequest);
                        }
                    } catch (refreshError) {
                        // Refresh başarısız - Login sayfasına yönlendir
                        console.error('❌ Token refresh failed');
                        this.handleAuthError();
                        return Promise.reject(refreshError);
                    }
                }

                // Hataları işle
                return Promise.reject(this.handleError(error));
            }
        );
    }

    /**
     * Token'ı localStorage'dan al
     */
    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(env.tokenKey);
        }
        return null;
    }

    /**
     * Token'ı localStorage'a kaydet
     */
    public setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(env.tokenKey, token);
            if (env.enableLogging) {
                console.log('✅ Token saved');
            }
        }
    }

    /**
     * Token'ı localStorage'dan sil
     */
    public removeToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(env.tokenKey);
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            if (env.enableLogging) {
                console.log('🗑️ Token removed');
            }
        }
    }

    /**
     * Refresh token ile yeni access token al
     */
    private async refreshToken(): Promise<string | null> {
        const refreshToken = typeof window !== 'undefined'
            ? localStorage.getItem('refresh_token')
            : null;

        if (!refreshToken) {
            console.log('❌ No refresh token found');
            return null;
        }

        try {
            const response = await axios.post(`${this.baseURL}/auth/refresh`, {
                refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;

            // Yeni token'ları kaydet
            this.setToken(accessToken);

            if (typeof window !== 'undefined') {
                localStorage.setItem('refresh_token', newRefreshToken);
            }

            console.log('✅ Token refreshed successfully');
            return accessToken;
        } catch (error) {
            console.error('❌ Token refresh error:', error);
            return null;
        }
    }

    /**
     * Auth hatası - Login'e yönlendir
     */
    private handleAuthError(): void {
        this.removeToken();

        if (typeof window !== 'undefined') {
            // Mevcut URL'i kaydet (login sonrası geri dönmek için)
            const currentPath = window.location.pathname;
            if (currentPath !== '/login') {
                sessionStorage.setItem('redirectAfterLogin', currentPath);
            }

            window.location.href = '/login';
        }
    }

    /**
     * Error handling - Axios hatasını anlamlı hale getir
     */
    private handleError(error: AxiosError): ApiError {
        if (error.response) {
            // Server yanıt verdi ama hata döndü (4xx, 5xx)
            const data = error.response.data as any;

            const apiError: ApiError = {
                message: data.message || data.title || 'Bir hata oluştu',
                statusCode: error.response.status,
                errors: data.errors,
            };

            console.error('❌ API Error:', apiError);
            return apiError;

        } else if (error.request) {
            // İstek gönderildi ama yanıt alınamadı (network error)
            const apiError: ApiError = {
                message: 'Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.',
                statusCode: 0,
            };

            console.error('❌ Network Error:', apiError);
            return apiError;

        } else {
            // İstek hazırlanırken hata oluştu
            const apiError: ApiError = {
                message: error.message || 'Beklenmeyen bir hata oluştu',
                statusCode: -1,
            };

            console.error('❌ Request Setup Error:', apiError);
            return apiError;
        }
    }

    // ============================================
    // HTTP METHODS
    // ============================================

    /**
     * GET isteği
     */
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }

    /**
     * POST isteği
     */
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        return response.data;
    }

    /**
     * PUT isteği
     */
    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.put<T>(url, data, config);
        return response.data;
    }

    /**
     * DELETE isteği
     */
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.delete<T>(url, config);
        return response.data;
    }

    /**
     * PATCH isteği
     */
    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.patch<T>(url, data, config);
        return response.data;
    }

    /**
     * File upload için multipart/form-data POST
     */
    async uploadFile<T>(url: string, formData: FormData, onProgress?: (progress: number) => void): Promise<T> {
        const response = await this.client.post<T>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        });

        return response.data;
    }
}

// Singleton instance - Tüm uygulama boyunca aynı instance kullanılır
export const apiClient = new ApiClient();
