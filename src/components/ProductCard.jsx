import React from "react";

const ProductCard = (props) => {
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
            <div className="flex flex-col mx-4">
                {/* CARD */}
                <div className="border-2 p-0 aspect-square relative mb-4 overflow-hidden rounded-lg">
                    {/* IMAGE LINK */}
                    <a
                        href={`/product/${props.id}`}
                        className="block w-full h-full"
                    >
                        <img
                            src={props.image}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            alt=""
                        />
                    </a>

                    {/* ADD TO CART BUTTON */}
                    <button
                        onClick={addToCart}
                        className="absolute bottom-3 right-3 rounded-md bg-black text-white flex items-center justify-center transition-opacity px-4 py-3 cursor-pointer hover:bg-amber-600 hover:scale-110 z-10"
                    >
                        +
                    </button>
                </div>

                {/* NAME & PRICE */}
                <div>
                    <h3 className="text-sm font-light">{props.name}</h3>
                    <p className="text-sm font-medium">{props.price}</p>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
