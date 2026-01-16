import React, { useState } from "react";

const AddToCartButton = (props) => {
    const [error, setError] = useState("");

    async function addToCart() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/cart/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: props.id,
                    quantity: 1,
                }),
            });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {/* ADD TO CART BUTTON */}
            <button
                onClick={addToCart}
                className="absolute bottom-3 right-3 rounded-md bg-black text-white flex items-center justify-center transition-opacity px-4 py-3 cursor-pointer hover:bg-amber-600 hover:scale-110 z-10"
            >
                +
            </button>
        </>
    );
};

export default AddToCartButton;
