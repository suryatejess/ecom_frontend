import React, { useEffect, useState } from "react";
import Signin from "./Signin";
import SignOutButton from "./SignOutButton";
import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem("token");
    // TODO : totalCartQuantity should be updated everytime even without refresh
    const [totalCartQuantity, setTotalCartQuantity] = useState(0);
    const [error, setError] = useState("");

    const url_getAllProductsInCart = "http://localhost:8080/cart/";

    useEffect(() => {
        if (isLoggedIn) {
            findTotalCartQuantity();
        } else {
            setTotalCartQuantity(0);
        }
    }, [isLoggedIn]);

    const findTotalCartQuantity = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(url_getAllProductsInCart, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(
                    "failed to fetch all the cart items of this user",
                );
            }

            const data = await response.json();

            const total = data.reduce((sum, item) => sum + item.quantity, 0);

            setTotalCartQuantity(total);
        } catch (error) {
            setError(error);
        }
    };

    // console.log(import.meta.env.VITE_API_BASE_URL);

    return (
        <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* <div className="flex flex-row justify-between border-b-2 mb-2 p-2"> */}
                <a href="/" className="text-sm font-semibold tracking-wide">
                    STORE
                </a>

                <div className="flex gap-4">
                    <div>
                        <a className="relative" href="/cart">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-shopping-bag h-5 w-5"
                            >
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                                <path d="M3 6h18"></path>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-medium">
                                {totalCartQuantity}
                            </span>
                        </a>
                    </div>
                    {isLoggedIn ? <SignOutButton /> : <Signin />}
                </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default Navbar;
