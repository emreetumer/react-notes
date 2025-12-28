// Auth Context - TypeScript version
// C# analojisi: Identity + DI Container + Interfaces

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../api/mockApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { User, AuthContextType, AuthResponse } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useLocalStorage<string | null>('authToken', null);
    const [loading, setLoading] = useState<boolean>(true);

    // Token validation on mount
    useEffect(() => {
        const validateToken = async () => {
            if (token) {
                try {
                    const response = await authApi.validateToken(token);
                    if (response.data?.user) {
                        setUser(response.data.user);
                    }
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
    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await authApi.login(email, password);
            if (response.data) {
                setUser(response.data.user);
                setToken(response.data.token);
            }
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Login failed'
            };
        }
    };

    // Register
    const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
        try {
            const response = await authApi.register(email, password, name);
            if (response.data) {
                setUser(response.data.user);
                setToken(response.data.token);
            }
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Registration failed'
            };
        }
    };

    // Logout
    const logout = (): void => {
        setUser(null);
        setToken(null);
    };

    const value: AuthContextType = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook with type safety
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export default AuthContext;
