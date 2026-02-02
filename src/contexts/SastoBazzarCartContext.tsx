"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';

export interface CartItem extends Omit<Product, 'price'> {
    quantity: number;
    price: number;
    // legacy fields for compatibility
    title?: string;
    image?: string | null;
}

interface SastoBazzarCartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    totalItems: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const SastoBazzarCartContext = createContext<SastoBazzarCartContextType | undefined>(undefined);

export const SastoBazzarCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('SastoBazzar-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage on changes
    useEffect(() => {
        localStorage.setItem('SastoBazzar-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            const price = typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 0);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            // Map backend fields to legacy fields for consistency in UI components
            return [...prev, {
                ...product,
                quantity: 1,
                title: product.name,
                image: product.thumbnail_image,
                price: price
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) return;
        setItems(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((total, item) => {
        const price = typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0);
        return total + (price * item.quantity);
    }, 0);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <SastoBazzarCartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity, clearCart,
            cartTotal, totalItems, isCartOpen, setIsCartOpen
        }}>
            {children}
        </SastoBazzarCartContext.Provider>
    );
};

export const useSastoBazzarCart = () => {
    const context = useContext(SastoBazzarCartContext);
    if (!context) throw new Error('useSastoBazzarCart must be used within a SastoBazzarCartProvider');
    return context;
};
