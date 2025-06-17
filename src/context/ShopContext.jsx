import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

// Helper: Create an empty cart structure from current products
const getDefaultCart = () => {
    const cart = {};
    for (const product of products) {
        cart[product.id] = {};
    }
    return cart;
};

// Helper: Merge new products into old cart
const mergeCarts = (defaultCart, savedCart) => {
    const merged = { ...defaultCart };
    for (const productId in savedCart) {
        if (!merged[productId]) merged[productId] = {};
        for (const size in savedCart[productId]) {
            merged[productId][size] = savedCart[productId][size];
        }
    }
    return merged;
};

// Fallback for structuredClone
const deepClone = (obj) => {
    return typeof structuredClone === 'function'
        ? structuredClone(obj)
        : JSON.parse(JSON.stringify(obj));
};

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            const defaultCart = getDefaultCart();

            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                return mergeCarts(defaultCart, parsed);
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
        }
        return getDefaultCart();
    });

    // Save cart to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart:", error);
            toast.error("Could not save cart state.");
        }
    }, [cartItems]);

    // Add to cart
    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error('Please select a product size.');
            return;
        }

        setCartItems(prev => {
            const newCart = deepClone(prev);

            if (!newCart[itemId]) newCart[itemId] = {};

            newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;

            toast.success('Product added to cart!');
            return newCart;
        });
    };

    // Get cart item count
    const getCartCount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const qty = cartItems[itemId][size];
                if (typeof qty === "number" && qty > 0) {
                    total += qty;
                }
            }
        }
        return total;
    };

    // Get total cart price
    const getTotalCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p.id === Number(itemId));
            if (!product) {
                console.warn(`Product ID ${itemId} not found.`);
                continue;
            }
            for (const size in cartItems[itemId]) {
                const qty = cartItems[itemId][size];
                if (qty > 0) total += product.price * qty;
            }
        }
        return total;
    };

    // Update quantity
    const updateQuantity = (itemId, size, quantity) => {
        setCartItems(prev => {
            const newCart = deepClone(prev);

            if (newCart[itemId] && newCart[itemId][size] !== undefined) {
                if (quantity > 0) {
                    newCart[itemId][size] = quantity;
                } else {
                    delete newCart[itemId][size];
                    if (Object.keys(newCart[itemId]).length === 0) {
                        delete newCart[itemId];
                    }
                }
            }

            return newCart;
        });
    };

    // Clear all cart items
    const clearCart = () => {
        setCartItems(getDefaultCart());
        toast.info("Cart has been cleared!");
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        getTotalCartAmount,
        updateQuantity,
        clearCart
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
