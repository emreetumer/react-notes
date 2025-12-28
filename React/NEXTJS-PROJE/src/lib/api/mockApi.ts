// Mock API - TypeScript version
// C# analojisi: Repository Pattern + Service Layer

import type {
    User,
    Product,
    AuthResponse,
    ApiResponse,
    CreateProductDto,
    UpdateProductDto,
    Order,
    CreateOrderDto
} from '../types';

// Fake delay simülasyonu
const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage helper with TypeScript
const storage = {
    get: <T>(key: string): T | null => {
        if (typeof window === 'undefined') return null; // Next.js SSR check
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    set: <T>(key: string, value: T): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Initialize data
const initializeData = (): void => {
    if (typeof window === 'undefined') return;

    if (!storage.get<User[]>('users')) {
        storage.set<User[]>('users', [
            {
                id: 1,
                email: 'admin@test.com',
                password: 'admin123',
                name: 'Admin User',
                role: 'admin'
            } as any,
            {
                id: 2,
                email: 'user@test.com',
                password: '123456',
                name: 'Test User',
                role: 'user'
            } as any
        ]);
    }

    if (!storage.get<Product[]>('products')) {
        storage.set<Product[]>('products', [
            {
                id: 1,
                name: 'Laptop Dell XPS 15',
                price: 45000,
                stock: 10,
                category: 'Elektronik',
                image: '💻',
                description: 'Yüksek performanslı laptop'
            },
            {
                id: 2,
                name: 'iPhone 15 Pro',
                price: 65000,
                stock: 15,
                category: 'Elektronik',
                image: '📱',
                description: 'Son model iPhone'
            },
            {
                id: 3,
                name: 'Sony WH-1000XM5',
                price: 12000,
                stock: 25,
                category: 'Aksesuar',
                image: '🎧',
                description: 'Gürültü önleyici kulaklık'
            },
            {
                id: 4,
                name: 'Samsung 4K TV',
                price: 35000,
                stock: 8,
                category: 'Elektronik',
                image: '📺',
                description: '55 inch OLED TV'
            },
            {
                id: 5,
                name: 'iPad Pro 12.9',
                price: 38000,
                stock: 12,
                category: 'Tablet',
                image: '📱',
                description: 'M2 işlemcili tablet'
            },
            {
                id: 6,
                name: 'Logitech MX Master 3',
                price: 2500,
                stock: 30,
                category: 'Aksesuar',
                image: '🖱️',
                description: 'Ergonomik mouse'
            }
        ]);
    }
};

// Initialize
if (typeof window !== 'undefined') {
    initializeData();
}

// =============================================
// AUTH API
// =============================================

export const authApi = {
    // Login
    login: async (email: string, password: string): Promise<AuthResponse> => {
        await delay(500);

        const users = storage.get<any[]>('users') || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Email veya şifre hatalı!');
        }

        const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));

        return {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },
                token
            }
        };
    },

    // Register
    register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
        await delay(500);

        const users = storage.get<any[]>('users') || [];

        if (users.find(u => u.email === email)) {
            throw new Error('Bu email zaten kayıtlı!');
        }

        const newUser = {
            id: Date.now(),
            email,
            password,
            name,
            role: 'user' as const
        };

        users.push(newUser);
        storage.set('users', users);

        return {
            success: true,
            data: {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role
                },
                token: btoa(JSON.stringify({ userId: newUser.id, role: newUser.role }))
            }
        };
    },

    // Validate Token
    validateToken: async (token: string): Promise<AuthResponse> => {
        await delay(200);

        try {
            const payload = JSON.parse(atob(token));
            const users = storage.get<any[]>('users') || [];
            const user = users.find(u => u.id === payload.userId);

            if (!user) {
                throw new Error('Invalid token');
            }

            return {
                success: true,
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    },
                    token
                }
            };
        } catch {
            throw new Error('Invalid token');
        }
    }
};

// =============================================
// PRODUCTS API
// =============================================

export const productsApi = {
    // Get All
    getAll: async (): Promise<ApiResponse<Product[]>> => {
        await delay(300);
        const products = storage.get<Product[]>('products') || [];
        return { success: true, data: products };
    },

    // Get By Id
    getById: async (id: number): Promise<ApiResponse<Product>> => {
        await delay(200);
        const products = storage.get<Product[]>('products') || [];
        const product = products.find(p => p.id === id);

        if (!product) {
            throw new Error('Ürün bulunamadı!');
        }

        return { success: true, data: product };
    },

    // Create
    create: async (productData: CreateProductDto): Promise<ApiResponse<Product>> => {
        await delay(400);
        const products = storage.get<Product[]>('products') || [];

        const newProduct: Product = {
            id: Date.now(),
            ...productData,
            createdAt: new Date().toISOString()
        };

        products.push(newProduct);
        storage.set('products', products);

        return { success: true, data: newProduct };
    },

    // Update
    update: async (id: number, productData: UpdateProductDto): Promise<ApiResponse<Product>> => {
        await delay(400);
        const products = storage.get<Product[]>('products') || [];
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error('Ürün bulunamadı!');
        }

        products[index] = {
            ...products[index],
            ...productData,
            updatedAt: new Date().toISOString()
        };

        storage.set('products', products);
        return { success: true, data: products[index] };
    },

    // Delete
    delete: async (id: number): Promise<ApiResponse<void>> => {
        await delay(300);
        const products = storage.get<Product[]>('products') || [];
        const filtered = products.filter(p => p.id !== id);

        if (products.length === filtered.length) {
            throw new Error('Ürün bulunamadı!');
        }

        storage.set('products', filtered);
        return { success: true, message: 'Ürün silindi' };
    }
};

// =============================================
// ORDERS API
// =============================================

export const ordersApi = {
    // Create Order
    create: async (orderData: CreateOrderDto): Promise<ApiResponse<Order>> => {
        await delay(500);
        const orders = storage.get<Order[]>('orders') || [];

        const newOrder: Order = {
            id: Date.now(),
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        orders.push(newOrder);
        storage.set('orders', orders);

        return { success: true, data: newOrder };
    },

    // Get User Orders
    getUserOrders: async (userId: number): Promise<ApiResponse<Order[]>> => {
        await delay(300);
        const orders = storage.get<Order[]>('orders') || [];
        const userOrders = orders.filter(o => o.userId === userId);

        return { success: true, data: userOrders };
    }
};

// Default export
export default {
    auth: authApi,
    products: productsApi,
    orders: ordersApi
};
