"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { toast } from 'sonner';

interface SastoBazzarCompareContextType {
    compareItems: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: number) => void;
    clearCompare: () => void;
    isInCompare: (productId: number) => boolean;
    isCompareBarVisible: boolean;
    setIsCompareBarVisible: (visible: boolean) => void;
    updateProductInCompare: (product: Product) => void;
}

const SastoBazzarCompareContext = createContext<SastoBazzarCompareContextType | undefined>(undefined);

export const SastoBazzarCompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [compareItems, setCompareItems] = useState<Product[]>([]);
    const [isCompareBarVisible, setIsCompareBarVisible] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);


    useEffect(() => {
        const saved = localStorage.getItem('SastoBazzar-compare');
        if (saved) {
            try {
                setCompareItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse compare list", e);
            }
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('SastoBazzar-compare', JSON.stringify(compareItems));
        }
    }, [compareItems, isInitialized]);

    const addToCompare = (product: Product) => {
        if (compareItems.length >= 4) {
            toast.error("You can only compare up to 4 products at a time.");
            return;
        }
        if (compareItems.find(item => item.id === product.id)) return;
        setCompareItems(prev => [...prev, product]);
        toast.success("Added to compare");
        setIsCompareBarVisible(true);
    };

    const removeFromCompare = (productId: number) => {
        setCompareItems(prev => prev.filter(item => item.id !== productId));
        toast.info("Removed from compare");
    };

    const clearCompare = () => setCompareItems([]);

    const isInCompare = (productId: number) => compareItems.some(item => item.id === productId);

    const updateProductInCompare = (product: Product) => {
        setCompareItems(prev => prev.map(item => item.id === product.id ? product : item));
    };

    return (
        <SastoBazzarCompareContext.Provider value={{
            compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare,
            isCompareBarVisible, setIsCompareBarVisible, updateProductInCompare
        }}>
            {children}
        </SastoBazzarCompareContext.Provider>
    );
};

export const useSastoBazzarCompare = () => {
    const context = useContext(SastoBazzarCompareContext);
    if (!context) throw new Error('useSastoBazzarCompare must be used within a SastoBazzarCompareProvider');
    return context;
};
