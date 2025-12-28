// TypeScript Types & Interfaces
// C# analojisi: Models, DTOs, Entities

// =============================================
// USER TYPES
// =============================================

export interface User {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'user'; // C#: enum UserRole { Admin, User }
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    success: boolean;
    data?: {
        user: User;
        token: string;
    };
    error?: string;
}

// =============================================
// PRODUCT TYPES
// =============================================

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateProductDto {
    name: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    description: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
    // C#: Partial gibi - tüm alanlar optional
}

// =============================================
// CART TYPES
// =============================================

export interface CartItem extends Product {
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    totalPrice: number;
    itemCount: number;
}

// =============================================
// ORDER TYPES
// =============================================

export interface Order {
    id: number;
    userId: number;
    items: CartItem[];
    totalPrice: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: string;
}

export interface CreateOrderDto {
    userId: number;
    items: CartItem[];
    totalPrice: number;
}

// =============================================
// API RESPONSE TYPES
// =============================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Generic API Response - C#: ApiResponse<T>
export type ProductResponse = ApiResponse<Product>;
export type ProductsResponse = ApiResponse<Product[]>;
export type UserResponse = ApiResponse<User>;

// =============================================
// FILTER & PAGINATION TYPES
// =============================================

export interface ProductFilter {
    category: string;
    search: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface PaginationParams {
    page: number;
    pageSize: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// =============================================
// CONTEXT TYPES
// =============================================

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (email: string, password: string, name: string) => Promise<AuthResponse>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading: boolean;
}

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    totalPrice: number;
    isInCart: (productId: number) => boolean;
    getItemQuantity: (productId: number) => number;
}

export interface ProductContextType {
    products: Product[];
    filteredProducts: Product[];
    loading: boolean;
    error: string | null;
    filter: ProductFilter;
    setFilter: (filter: ProductFilter) => void;
    addProduct: (product: CreateProductDto) => Promise<ApiResponse<Product>>;
    updateProduct: (id: number, product: UpdateProductDto) => Promise<ApiResponse<Product>>;
    deleteProduct: (id: number) => Promise<ApiResponse<void>>;
    getProductById: (id: number) => Product | undefined;
    categories: string[];
    refreshProducts: () => Promise<void>;
}

// =============================================
// COMPONENT PROPS TYPES
// =============================================

export interface ProductCardProps {
    product: Product;
}

export interface ProductFormProps {
    product?: Product; // Optional - edit mode için
    onSubmit: (data: CreateProductDto) => void;
    onCancel: () => void;
}

// =============================================
// UTILITY TYPES
// =============================================

// C#: Omit<T, K> gibi
export type ProductWithoutId = Omit<Product, 'id'>;

// C#: Pick<T, K> gibi
export type ProductBasicInfo = Pick<Product, 'id' | 'name' | 'price'>;

// C#: Required<T> gibi - tüm alanlar zorunlu
export type RequiredProduct = Required<Product>;
