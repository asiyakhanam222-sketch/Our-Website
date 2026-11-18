"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  websiteSlug: string;
  title: string;
  category: string;
  image: string;
  packageType: "code" | "turnkey";
  codePrice: number;
  turnkeyPrice: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (websiteSlug: string) => void;
  updatePackageType: (
    websiteSlug: string,
    packageType: "code" | "turnkey"
  ) => void;
  clearCart: () => void;
  isInCart: (websiteSlug: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "our_website_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved cart safely after client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to read cart from localStorage:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save cart updates to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [items, hydrated]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.websiteSlug === newItem.websiteSlug);
      if (exists) {
        return prev.map((i) =>
          i.websiteSlug === newItem.websiteSlug ? newItem : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (websiteSlug: string) => {
    setItems((prev) => prev.filter((i) => i.websiteSlug !== websiteSlug));
  };

  const updatePackageType = (
    websiteSlug: string,
    packageType: "code" | "turnkey"
  ) => {
    setItems((prev) =>
      prev.map((i) =>
        i.websiteSlug === websiteSlug ? { ...i, packageType } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const isInCart = (websiteSlug: string) =>
    items.some((i) => i.websiteSlug === websiteSlug);

  const subtotal = items.reduce(
    (total, item) =>
      total +
      (item.packageType === "turnkey" ? item.turnkeyPrice : item.codePrice),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount: items.length,
        subtotal,
        addToCart,
        removeFromCart,
        updatePackageType,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}