import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import SignInFirstComponent from "../components/SignInFirstComponent";

function Cart() {
    const isLoggedIn = !!localStorage.getItem("token");

    if (!isLoggedIn) {
        return <SignInFirstComponent name="Cart" />;
    }

    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState("");
    const [subtotal, setSubtotal] = useState("xyz");

    const url_getAllProductsInCart = "http://localhost:8080/cart/";

    useEffect(() => {
        findAllProducts();
    }, []);

    const findAllProducts = async () => {
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

            setAllProducts(data);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            {/* <h1>i am cart so what?</h1> */}

            {/* load products into a data */}
            {/* just display all the properties */}
            {/* build the UI for it and then slowly use it */}

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    {allProducts.map((item) => (
                        <CartItem
                            key={item.productId}
                            productId={item.productId}
                            productQuantity={item.quantity}
                        />
                    ))}
                </div>

                {/* order summary */}
                <div className="lg:col-span-1">
                    <OrderSummary subtotal={subtotal} />
                </div>
            </div>
        </>
    );
}

export default Cart;
