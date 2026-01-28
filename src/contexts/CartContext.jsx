import { useContext, createContext, useState, useEffect } from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const [error, setError] = useState();
    const [allProducts, setAllProducts] = useState([]);

    const CART_URL = "http://localhost:8080/cart/";

    // 🔹 Derived state
    const cartCount = allProducts.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (isLoggedIn) {
            fetchCart();
        } else {
            setAllProducts([]);
        }
    }, [isLoggedIn]);

    // fetches the product and sets them to the state variable `allProducts`
    const fetchCart = async () => {
        if (!isLoggedIn) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(CART_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }

            const data = await response.json();
            setAllProducts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // this goes in AddToCartButton
    // think about how to send to "productId" prop to addToCart function when calling in other component i.e. wherever it is being used
    async function addToCart(productId) {
        try {
            if (!isLoggedIn) return;

            const token = localStorage.getItem("token");

            const response = await fetch(CART_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                throw new Error("failed to add products to cart");
            }

            await fetchCart();
        } catch (err) {
            setError(err.message);
        }
    }

    // this goes in Cart
    const clearCart = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(CART_URL, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("failed to clear cart");
            }

            setAllProducts([]);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                // helps for the Navbar component cart count
                cartCount,
                // helps for Cart.jsx
                allProducts,
                error,

                fetchCart,
                // helps in the  AddToCartButton component
                addToCart,
                // helps in the Cart.jsx clear cart
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be added inside CartProvider");
    }
    return context;
};
