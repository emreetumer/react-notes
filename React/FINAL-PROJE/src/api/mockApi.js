// MOCK API - Gerçek .NET API simülasyonu
// LocalStorage kullanarak backend gibi çalışır

// Fake delay (API çağrısı simülasyonu)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage helper
const storage = {
    get: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Initial data (ilk çalıştırmada)
const initializeData = () => {
    if (!storage.get('users')) {
        storage.set('users', [
            {
                id: 1,
                email: 'admin@test.com',
                password: 'admin123',
                name: 'Admin User',
                role: 'admin'
            },
            {
                id: 2,
                email: 'user@test.com',
                password: '123456',
                name: 'Test User',
                role: 'user'
            }
        ]);
    }

    if (!storage.get('products')) {
        storage.set('products', [
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

// Initialize on load
initializeData();

// =============================================
// AUTH API
// =============================================

export const authApi = {
    // Login - C#: POST /api/auth/login
    login: async (email, password) => {
        await delay(500); // API gecikme simülasyonu

        const users = storage.get('users');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Email veya şifre hatalı!');
        }

        // Token simülasyonu (gerçekte JWT olur)
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

    // Register - C#: POST /api/auth/register
    register: async (email, password, name) => {
        await delay(500);

        const users = storage.get('users');

        // Email kontrolü
        if (users.find(u => u.email === email)) {
            throw new Error('Bu email zaten kayıtlı!');
        }

        const newUser = {
            id: Date.now(),
            email,
            password,
            name,
            role: 'user'
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
                }
            }
        };
    },

    // Validate Token - C#: GET /api/auth/validate
    validateToken: async (token) => {
        await delay(200);

        try {
            const payload = JSON.parse(atob(token));
            const users = storage.get('users');
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
                    }
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
    // Get All - C#: GET /api/products
    getAll: async () => {
        await delay(300);

        const products = storage.get('products');

        return {
            success: true,
            data: products
        };
    },

    // Get By Id - C#: GET /api/products/{id}
    getById: async (id) => {
        await delay(200);

        const products = storage.get('products');
        const product = products.find(p => p.id === parseInt(id));

        if (!product) {
            throw new Error('Ürün bulunamadı!');
        }

        return {
            success: true,
            data: product
        };
    },

    // Create - C#: POST /api/products [Authorize(Roles = "Admin")]
    create: async (productData) => {
        await delay(400);

        const products = storage.get('products');

        const newProduct = {
            id: Date.now(),
            ...productData,
            createdAt: new Date().toISOString()
        };

        products.push(newProduct);
        storage.set('products', products);

        return {
            success: true,
            data: newProduct
        };
    },

    // Update - C#: PUT /api/products/{id} [Authorize(Roles = "Admin")]
    update: async (id, productData) => {
        await delay(400);

        const products = storage.get('products');
        const index = products.findIndex(p => p.id === parseInt(id));

        if (index === -1) {
            throw new Error('Ürün bulunamadı!');
        }

        products[index] = {
            ...products[index],
            ...productData,
            updatedAt: new Date().toISOString()
        };

        storage.set('products', products);

        return {
            success: true,
            data: products[index]
        };
    },

    // Delete - C#: DELETE /api/products/{id} [Authorize(Roles = "Admin")]
    delete: async (id) => {
        await delay(300);

        const products = storage.get('products');
        const filtered = products.filter(p => p.id !== parseInt(id));

        if (products.length === filtered.length) {
            throw new Error('Ürün bulunamadı!');
        }

        storage.set('products', filtered);

        return {
            success: true,
            message: 'Ürün silindi'
        };
    },

    // Search - C#: GET /api/products/search?q={query}
    search: async (query) => {
        await delay(300);

        const products = storage.get('products');
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );

        return {
            success: true,
            data: filtered
        };
    },

    // Filter by Category - C#: GET /api/products/category/{category}
    filterByCategory: async (category) => {
        await delay(300);

        const products = storage.get('products');
        const filtered = category === 'all'
            ? products
            : products.filter(p => p.category === category);

        return {
            success: true,
            data: filtered
        };
    }
};

// =============================================
// ORDERS API (Bonus)
// =============================================

export const ordersApi = {
    // Create Order - C#: POST /api/orders
    create: async (orderData) => {
        await delay(500);

        const orders = storage.get('orders') || [];

        const newOrder = {
            id: Date.now(),
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        orders.push(newOrder);
        storage.set('orders', orders);

        return {
            success: true,
            data: newOrder
        };
    },

    // Get User Orders - C#: GET /api/orders/user/{userId}
    getUserOrders: async (userId) => {
        await delay(300);

        const orders = storage.get('orders') || [];
        const userOrders = orders.filter(o => o.userId === userId);

        return {
            success: true,
            data: userOrders
        };
    }
};

// Export default
export default {
    auth: authApi,
    products: productsApi,
    orders: ordersApi
};
