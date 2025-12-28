// lib/types/common.types.ts

/**
 * Sayfalama yanıtı (Pagination)
 */
export interface PaginatedResponse<T> {
    data: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/**
 * Generic API yanıtı
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    errors?: ValidationError[];
}

/**
 * Validation hatası
 */
export interface ValidationError {
    field: string;
    message: string;
}

/**
 * Sort parametresi
 */
export interface SortParam {
    field: string;
    order: 'asc' | 'desc';
}

/**
 * Filter parametresi
 */
export interface FilterParam {
    field: string;
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith';
    value: any;
}

/**
 * Query parametreleri (Genel)
 */
export interface BaseQuery {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * Dropdown option
 */
export interface SelectOption<T = string> {
    label: string;
    value: T;
    disabled?: boolean;
}

/**
 * File upload progress
 */
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

/**
 * HTTP Status Codes
 */
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}
