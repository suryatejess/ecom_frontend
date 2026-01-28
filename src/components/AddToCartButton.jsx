import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

const AddToCartButton = ({ id }) => {
    const { addToCart } = useCart();

    // const [error, setError] = useState("");

    return (
        <>
            {/* ADD TO CART BUTTON */}
            <button
                onClick={() => addToCart(id)}
                className="absolute bottom-3 right-3 rounded-md bg-black text-white flex items-center justify-center transition-opacity px-4 py-3 cursor-pointer hover:bg-amber-600 hover:scale-110 z-10"
            >
                +
            </button>
        </>
    );
};

export default AddToCartButton;
