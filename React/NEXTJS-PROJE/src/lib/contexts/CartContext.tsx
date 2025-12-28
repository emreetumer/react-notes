// Cart Context - TypeScript version
// C# analojisi: Session State + Generic Collections

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

    // Add to cart
    const addToCart = (product: Product, quantity: number = 1): void => {
        setCartItems((prev: CartItem[]) => {
            const existingItem = prev.find((item: CartItem) => item.id === product.id);

            if (existingItem) {
                return prev.map((item: CartItem) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity }];
            }
        });
    };

    // Remove from cart
    const removeFromCart = (productId: number): void => {
        setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== productId));
    };

    // Update quantity
    const updateQuantity = (productId: number, quantity: number): void => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems((prev: CartItem[]) =>
                prev.map((item: CartItem) =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    // Clear cart
    const clearCart = (): void => {
        setCartItems([]);
    };

    // Get item count
    const itemCount: number = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Get total price
    const totalPrice: number = cartItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    // Is in cart
    const isInCart = (productId: number): boolean => {
        return cartItems.some(item => item.id === productId);
    };

    // Get item quantity
    const getItemQuantity = (productId: number): number => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
        isInCart,
        getItemQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook
export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}

export default CartContext;
