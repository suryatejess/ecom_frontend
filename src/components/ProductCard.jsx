import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductCard = (props) => {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <>
            <div className="flex flex-col">
                {/* CARD */}
                {/* <div className="p-0 aspect-square relative mb-4 overflow-hidden rounded-lg"> */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-100">
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
                    <h3 className="text-sm font-normal text-gray-800">
                        {props.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                        <span>₹</span>
                        {props.price}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
