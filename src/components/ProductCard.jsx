import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductCard = (props) => {
    const isLoggedIn = !!localStorage.getItem("token");

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
                    {isLoggedIn && <AddToCartButton id={props.id} />}
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
