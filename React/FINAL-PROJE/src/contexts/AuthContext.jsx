// Auth Context - Global authentication state
// C# analojisi: Identity + DI Container

import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/mockApi';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useLocalStorage('authToken', null);
    const [loading, setLoading] = useState(true);

    // Sayfa yüklendiğinde token kontrol et
    useEffect(() => {
        const validateToken = async () => {
            if (token) {
                try {
                    const response = await authApi.validateToken(token);
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Token validation failed:', error);
                    setToken(null);
                }
            }
            setLoading(false);
        };

        validateToken();
    }, [token]);

    // Login
    const login = async (email, password) => {
        try {
            const response = await authApi.login(email, password);
            setUser(response.data.user);
            setToken(response.data.token);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Register
    const register = async (email, password, name) => {
        try {
            const response = await authApi.register(email, password, name);
            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Logout
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    // Is Authenticated
    const isAuthenticated = !!user;

    // Is Admin
    const isAdmin = user?.role === 'admin';

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export default AuthContext;
