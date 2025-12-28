// Cart Context - Shopping cart state
// C# analojisi: Session state management

import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useLocalStorage('cart', []);

    // Add to cart
    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);

            if (existingItem) {
                // Zaten varsa miktarı artır
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Yoksa ekle
                return [...prev, { ...product, quantity }];
            }
        });
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    // Update quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(prev =>
                prev.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Get item count
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Get total price
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    // Is in cart
    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    // Get item quantity
    const getItemQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const value = {
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
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}

export default CartContext;
