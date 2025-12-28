# 🚀 Next.js ile .NET Web API Entegrasyonu - Kapsamlı Rehber

## 📋 İçindekiler

1. [Temel Kavramlar](#1-temel-kavramlar)
2. [Proje Mimarisi](#2-proje-mimarisi)
3. [API Service Katmanı](#3-api-service-katmanı)
4. [Authentication (Kimlik Doğrulama)](#4-authentication-kimlik-doğrulama)
5. [CRUD İşlemleri](#5-crud-işlemleri)
6. [Error Handling (Hata Yönetimi)](#6-error-handling-hata-yönetimi)
7. [Environment Variables](#7-environment-variables)
8. [Best Practices](#8-best-practices)
9. [Deployment](#9-deployment)

---

## 1. Temel Kavramlar

### 🎯 Next.js Nedir?

Next.js, React tabanlı bir framework'tür ve aşağıdaki özellikleri sunar:
- **Server-Side Rendering (SSR)** - Sunucu tarafında render
- **Static Site Generation (SSG)** - Statik sayfa oluşturma
- **API Routes** - Backend endpoint'leri oluşturma
- **File-based Routing** - Dosya sistemine dayalı routing
- **Automatic Code Splitting** - Otomatik kod bölme

### 🔌 .NET Web API Nedir?

.NET Web API, Microsoft'un modern web API'leri oluşturmak için geliştirdiği framework'tür:
- **RESTful** mimarisini destekler
- **JSON** formatında veri iletişimi
- **JWT Authentication** desteği
- **CORS** yapılandırması
- **Swagger/OpenAPI** dokümantasyonu

### 🤝 Neden Next.js + .NET API?

| Özellik | Açıklama |
|---------|----------|
| **Separation of Concerns** | Frontend ve backend tamamen ayrı gelişir |
| **Scalability** | Her katman bağımsız olarak ölçeklenebilir |
| **Team Structure** | Farklı ekipler üzerinde çalışabilir |
| **Technology Freedom** | En iyi teknolojileri seçme özgürlüğü |
| **Security** | Backend güvenliği frontend'den ayrı |

---

## 2. Proje Mimarisi

### 📁 Önerilebilir Klasör Yapısı

```
nextjs-project/
├── src/
│   ├── app/                    # Next.js 14+ App Router
│   │   ├── (auth)/            # Auth grubu
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── products/
│   │   └── layout.tsx
│   │
│   ├── components/            # React bileşenleri
│   │   ├── ui/               # Genel UI bileşenleri
│   │   ├── forms/            # Form bileşenleri
│   │   └── layout/           # Layout bileşenleri
│   │
│   ├── lib/                   # Kütüphane kodları
│   │   ├── api/              # API servisleri
│   │   │   ├── client.ts     # API istemcisi
│   │   │   ├── services/     # Servis katmanı
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   └── user.service.ts
│   │   │   └── interceptors/ # Request/Response interceptor
│   │   │
│   │   ├── types/            # TypeScript tipleri
│   │   │   ├── api.types.ts
│   │   │   ├── auth.types.ts
│   │   │   └── product.types.ts
│   │   │
│   │   ├── hooks/            # Custom React Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useApi.ts
│   │   │   └── useProducts.ts
│   │   │
│   │   ├── utils/            # Yardımcı fonksiyonlar
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   └── storage.ts
│   │   │
│   │   └── contexts/         # React Context
│   │       ├── AuthContext.tsx
│   │       └── ThemeContext.tsx
│   │
│   └── middleware.ts          # Next.js middleware (Auth guard)
│
├── public/                    # Statik dosyalar
├── .env.local                # Environment variables
├── .env.development
├── .env.production
├── next.config.js            # Next.js config
├── tsconfig.json             # TypeScript config
└── package.json
```

### 🔄 Veri Akışı

```
┌─────────────┐      HTTP      ┌──────────────┐
│             │   Request      │              │
│  Next.js    │──────────────▶ │  .NET API    │
│  Frontend   │                │  Backend     │
│             │ ◀──────────────│              │
└─────────────┘   JSON Response└──────────────┘
      │                              │
      │                              │
   Browser                     SQL Server/DB
```

---

## 3. API Service Katmanı

### 🏗️ API Client Oluşturma

API isteklerini merkezi bir yerden yönetmek için bir client oluşturacağız.

#### **3.1. Base API Client (`lib/api/client.ts`)**

```typescript
// lib/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

// API yanıt tipi
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// API error tipi
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001/api';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  // Request ve Response interceptor'larını ayarla
  private setupInterceptors() {
    // Request Interceptor - Her istekte token ekle
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response Interceptor - Hataları yakala
    this.client.interceptors.response.use(
      (response) => {
        console.log(`📥 API Response: ${response.config.url}`, response.status);
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // 401 Unauthorized - Token süresi dolmuş
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Refresh token ile yeni token al
            const newToken = await this.refreshToken();
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh başarısız - Login sayfasına yönlendir
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  // Token'ı localStorage'dan al
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  // Token'ı kaydet
  public setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  // Token'ı sil
  public removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  // Refresh token
  private async refreshToken(): Promise<string | null> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refresh_token') 
      : null;

    if (!refreshToken) return null;

    try {
      const response = await axios.post(`${this.baseURL}/auth/refresh`, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      this.setToken(accessToken);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', newRefreshToken);
      }

      return accessToken;
    } catch (error) {
      return null;
    }
  }

  // Auth hatası - Login'e yönlendir
  private handleAuthError(): void {
    this.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  // Error handling
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server yanıt verdi ama hata döndü
      const data = error.response.data as any;
      return {
        message: data.message || 'Bir hata oluştu',
        statusCode: error.response.status,
        errors: data.errors,
      };
    } else if (error.request) {
      // İstek gönderildi ama yanıt alınamadı
      return {
        message: 'Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.',
        statusCode: 0,
      };
    } else {
      // İstek hazırlanırken hata oluştu
      return {
        message: error.message || 'Beklenmeyen bir hata oluştu',
        statusCode: -1,
      };
    }
  }

  // GET isteği
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // POST isteği
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // PUT isteği
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  // DELETE isteği
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // PATCH isteği
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

// Singleton instance
export const apiClient = new ApiClient();
```

### 🎯 Client Özellikleri

✅ **Token Management** - Otomatik token ekleme  
✅ **Error Handling** - Merkezi hata yönetimi  
✅ **Request/Response Logging** - Console'da takip  
✅ **Token Refresh** - Otomatik token yenileme  
✅ **Type Safety** - TypeScript ile tip güvenliği

---

## 4. Authentication (Kimlik Doğrulama)

### 🔐 Auth Service Oluşturma

#### **4.1. Auth Types (`lib/types/auth.types.ts`)**

```typescript
// lib/types/auth.types.ts
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdAt: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
```

#### **4.2. Auth Service (`lib/api/services/auth.service.ts`)**

```typescript
// lib/api/services/auth.service.ts
import { apiClient } from '../client';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from '@/lib/types/auth.types';

class AuthService {
  private readonly AUTH_PREFIX = '/auth';

  /**
   * Kullanıcı girişi
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.AUTH_PREFIX}/login`,
      credentials
    );

    // Token'ları kaydet
    if (response.accessToken) {
      apiClient.setToken(response.accessToken);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }

    return response;
  }

  /**
   * Kullanıcı kaydı
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.AUTH_PREFIX}/register`,
      data
    );

    // Token'ları kaydet
    if (response.accessToken) {
      apiClient.setToken(response.accessToken);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }

    return response;
  }

  /**
   * Çıkış yap
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.AUTH_PREFIX}/logout`);
    } finally {
      // Token ve user bilgilerini temizle
      apiClient.removeToken();
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    }
  }

  /**
   * Mevcut kullanıcı bilgilerini al
   */
  async getCurrentUser(): Promise<User> {
    return await apiClient.get<User>(`${this.AUTH_PREFIX}/me`);
  }

  /**
   * Token'ı doğrula
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
   * Şifre sıfırlama isteği
   */
  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(`${this.AUTH_PREFIX}/forgot-password`, { email });
  }

  /**
   * Şifre sıfırlama
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post(`${this.AUTH_PREFIX}/reset-password`, {
      token,
      newPassword,
    });
  }
}

export const authService = new AuthService();
```

#### **4.3. Auth Context (`lib/contexts/AuthContext.tsx`)**

```typescript
// lib/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api/services/auth.service';
import type { User, LoginRequest, RegisterRequest } from '@/lib/types/auth.types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Sayfa yüklendiğinde kullanıcı bilgilerini kontrol et
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        
        // Token'ı doğrula
        const isValid = await authService.validateToken();
        if (!isValid) {
          setUser(null);
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.user);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const updatedUser = await authService.getCurrentUser();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

---

## 5. CRUD İşlemleri

### 📦 Product Service Örneği

#### **5.1. Product Types (`lib/types/product.types.ts`)**

```typescript
// lib/types/product.types.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

#### **5.2. Product Service (`lib/api/services/product.service.ts`)**

```typescript
// lib/api/services/product.service.ts
import { apiClient } from '../client';
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductListQuery,
  PaginatedResponse,
} from '@/lib/types/product.types';

class ProductService {
  private readonly PRODUCT_PREFIX = '/products';

  /**
   * Tüm ürünleri getir (Sayfalama ile)
   */
  async getProducts(query?: ProductListQuery): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const url = `${this.PRODUCT_PREFIX}?${params.toString()}`;
    return await apiClient.get<PaginatedResponse<Product>>(url);
  }

  /**
   * Tek bir ürünü getir
   */
  async getProduct(id: string): Promise<Product> {
    return await apiClient.get<Product>(`${this.PRODUCT_PREFIX}/${id}`);
  }

  /**
   * Yeni ürün oluştur
   */
  async createProduct(data: CreateProductRequest): Promise<Product> {
    return await apiClient.post<Product>(this.PRODUCT_PREFIX, data);
  }

  /**
   * Ürünü güncelle
   */
  async updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
    return await apiClient.put<Product>(`${this.PRODUCT_PREFIX}/${id}`, data);
  }

  /**
   * Ürünü sil
   */
  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`${this.PRODUCT_PREFIX}/${id}`);
  }

  /**
   * Ürün stok güncelle
   */
  async updateStock(id: string, quantity: number): Promise<Product> {
    return await apiClient.patch<Product>(
      `${this.PRODUCT_PREFIX}/${id}/stock`,
      { quantity }
    );
  }

  /**
   * Ürün durumunu değiştir (Aktif/Pasif)
   */
  async toggleStatus(id: string): Promise<Product> {
    return await apiClient.patch<Product>(
      `${this.PRODUCT_PREFIX}/${id}/toggle-status`
    );
  }
}

export const productService = new ProductService();
```

#### **5.3. Custom Hook - useProducts (`lib/hooks/useProducts.ts`)**

```typescript
// lib/hooks/useProducts.ts
'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/lib/api/services/product.service';
import type { Product, ProductListQuery, PaginatedResponse } from '@/lib/types/product.types';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  pagination: Omit<PaginatedResponse<Product>, 'data'> | null;
  refetch: () => Promise<void>;
}

export function useProducts(query?: ProductListQuery): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<Product>, 'data'> | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await productService.getProducts(query);
      setProducts(response.data);
      
      setPagination({
        totalCount: response.totalCount,
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        hasNextPage: response.hasNextPage,
        hasPreviousPage: response.hasPreviousPage,
      });
    } catch (err: any) {
      setError(err.message || 'Ürünler yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(query)]);

  return {
    products,
    isLoading,
    error,
    pagination,
    refetch: fetchProducts,
  };
}

// Tek ürün için hook
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await productService.getProduct(id);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Ürün yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {
    product,
    isLoading,
    error,
    refetch: fetchProduct,
  };
}
```

---

## 6. Error Handling (Hata Yönetimi)

### ⚠️ Centralized Error Handling

#### **6.1. Error Types (`lib/types/error.types.ts`)**

```typescript
// lib/types/error.types.ts
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
```

#### **6.2. Error Handler (`lib/utils/errorHandler.ts`)**

```typescript
// lib/utils/errorHandler.ts
import { ApiError } from '../api/client';
import { AppError, ErrorType } from '../types/error.types';

export function handleApiError(error: ApiError): AppError {
  const statusCode = error.statusCode;

  if (statusCode === 0) {
    return {
      type: ErrorType.NETWORK,
      message: 'İnternet bağlantınızı kontrol edin.',
    };
  }

  if (statusCode === 400) {
    return {
      type: ErrorType.VALIDATION,
      message: error.message,
      errors: error.errors,
      statusCode,
    };
  }

  if (statusCode === 401) {
    return {
      type: ErrorType.AUTHENTICATION,
      message: 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.',
      statusCode,
    };
  }

  if (statusCode === 403) {
    return {
      type: ErrorType.AUTHORIZATION,
      message: 'Bu işlem için yetkiniz yok.',
      statusCode,
    };
  }

  if (statusCode === 404) {
    return {
      type: ErrorType.NOT_FOUND,
      message: 'Aradığınız kaynak bulunamadı.',
      statusCode,
    };
  }

  if (statusCode >= 500) {
    return {
      type: ErrorType.SERVER,
      message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
      statusCode,
    };
  }

  return {
    type: ErrorType.UNKNOWN,
    message: error.message || 'Beklenmeyen bir hata oluştu.',
    statusCode,
  };
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Bir hata oluştu';
}
```

#### **6.3. Toast Notification Component**

```typescript
// components/ui/Toast.tsx
'use client';

import { useEffect } from 'react';
import { ErrorType } from '@/lib/types/error.types';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  errorType?: ErrorType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'info', duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-up`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 hover:opacity-80">
          ✕
        </button>
      </div>
    </div>
  );
}
```

---

## 7. Environment Variables

### 🔐 Environment Setup

#### **7.1. .env.local (Development)**

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://localhost:7001/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_TOKEN_STORAGE_KEY=access_token

# App Configuration
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_APP_VERSION=1.0.0

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_LOGGING=true
```

#### **7.2. .env.production**

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_TOKEN_STORAGE_KEY=access_token

# App Configuration
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_APP_VERSION=1.0.0

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_LOGGING=false
```

#### **7.3. Environment Config (`lib/config/env.ts`)**

```typescript
// lib/config/env.ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'My App',
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableLogging: process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true',
} as const;

// Type-safe environment validator
export function validateEnv() {
  const required = ['NEXT_PUBLIC_API_URL'];
  
  const missing = required.filter((key) => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
```

---

## 8. Best Practices

### ✅ Önerilen Pratikler

#### **8.1. API İstekleri**

```typescript
// ❌ YANLIŞ - Component içinde direkt API çağrısı
function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
}

// ✅ DOĞRU - Service katmanı ve custom hook kullanımı
function ProductList() {
  const { products, isLoading, error } = useProducts();
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;
  
  return <ProductGrid products={products} />;
}
```

#### **8.2. Error Handling**

```typescript
// ❌ YANLIŞ - Generic error handling
try {
  await productService.createProduct(data);
} catch (error) {
  alert('Hata oluştu');
}

// ✅ DOĞRU - Specific error handling
try {
  await productService.createProduct(data);
  toast.success('Ürün başarıyla oluşturuldu');
  router.push('/products');
} catch (error) {
  const appError = handleApiError(error as ApiError);
  
  if (appError.type === ErrorType.VALIDATION) {
    setValidationErrors(appError.errors);
  } else {
    toast.error(appError.message);
  }
}
```

#### **8.3. Type Safety**

```typescript
// ❌ YANLIŞ - Any kullanımı
function updateProduct(id: string, data: any) {
  return apiClient.put(`/products/${id}`, data);
}

// ✅ DOĞRU - Proper typing
function updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
  return apiClient.put<Product>(`/products/${id}`, data);
}
```

#### **8.4. Loading States**

```typescript
// ✅ DOĞRU - Proper loading states
function ProductDetail({ id }: { id: string }) {
  const { product, isLoading, error } = useProduct(id);
  
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }
  
  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }
  
  if (!product) {
    return <NotFound />;
  }
  
  return <ProductDetailContent product={product} />;
}
```

#### **8.5. Caching Strategy**

```typescript
// React Query kullanımı (önerilen)
import { useQuery } from '@tanstack/react-query';

function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
    staleTime: 5 * 60 * 1000, // 5 dakika
    cacheTime: 10 * 60 * 1000, // 10 dakika
  });
}
```

---

## 9. Deployment

### 🚀 Production Hazırlık

#### **9.1. Next.js Build**

```bash
# Build oluştur
npm run build

# Production sunucusunu başlat
npm run start
```

#### **9.2. CORS Ayarları (.NET)**

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs", policy =>
    {
        policy.WithOrigins("https://yourapp.com", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

app.UseCors("AllowNextJs");
```

#### **9.3. Security Headers**

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

---

## 🎓 Özet

Bu rehberde öğrendiklerimiz:

✅ **API Client** oluşturma ve yönetimi  
✅ **Authentication** sistemi kurulumu  
✅ **CRUD** işlemleri implementasyonu  
✅ **Error Handling** stratejileri  
✅ **Custom Hooks** ile state yönetimi  
✅ **TypeScript** ile tip güvenliği  
✅ **Best Practices** ve kod kalitesi  
✅ **Production** hazırlık

### 📚 Ek Kaynaklar

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [Axios Dokümantasyonu](https://axios-http.com/docs/intro)
- [React Query](https://tanstack.com/query/latest)
- [TypeScript Best Practices](https://typescript-handbook.com)

---

**Sonraki adım:** Örnek projeye geçelim! 🚀
