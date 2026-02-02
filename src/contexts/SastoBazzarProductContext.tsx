"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/SastoBazzar';
import { SastoBazzar_API_URL } from '@/constants/SastoBazzar';

interface SastoBazzarProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    getProductById: (id: number) => Product | undefined;
    getProductBySlug: (slug: string) => Product | undefined;
    getProductsByCategory: (category: string) => Product[];
}

const SastoBazzarProductContext = createContext<SastoBazzarProductContextType | undefined>(undefined);

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
};

export const SastoBazzarProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${SastoBazzar_API_URL}/products`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();

                // Add slugs to products as the fakestoreapi doesn't provide them
                const productsWithSlugs = data.map((p: Product) => ({
                    ...p,
                    slug: p.slug || slugify(p.title)
                }));

                setProducts(productsWithSlugs);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getProductById = (id: number) => products.find(p => p.id === id);
    const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
    const getProductsByCategory = (category: string) =>
        products.filter(p => p.category.toLowerCase() === category.toLowerCase());

    return (
        <SastoBazzarProductContext.Provider value={{ products, loading, error, getProductById, getProductBySlug, getProductsByCategory }}>
            {children}
        </SastoBazzarProductContext.Provider>
    );
};

export const useSastoBazzarProduct = () => {
    const context = useContext(SastoBazzarProductContext);
    if (!context) throw new Error('useSastoBazzarProduct must be used within a SastoBazzarProductProvider');
    return context;
};
