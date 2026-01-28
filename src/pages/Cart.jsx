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
    const [subtotal, setSubtotal] = useState(0);

    const url_getAllProductsInCart = "http://localhost:8080/cart/";
    const url_clearCartItems = "http://localhost:8080/cart/";

    useEffect(() => {
        findAllProducts();
    }, []);

    useEffect(() => {
        calcTotalCost();
    }, [allProducts]);

    const calcTotalCost = async () => {
        try {
            if (allProducts.length === 0) {
                setSubtotal(0);
                return;
            }

            const productTotals = await Promise.all(
                allProducts.map(async (item) => {
                    const productRes = await fetch(
                        `http://localhost:8080/product/${item.productId}`,
                    );

                    if (!productRes.ok) {
                        throw new Error("failed to fetch product");
                    }

                    const product = await productRes.json();

                    return product.price * item.quantity;
                }),
            );

            const total = productTotals.reduce((sum, value) => sum + value, 0);
            setSubtotal(total);
        } catch (error) {
            setError(error);
        }
    };

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

    const clearCartItemsFunction = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = fetch(url_clearCartItems, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(response.status);
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            {/* <div className="grid lg:grid-cols-3 gap-12"> */}
            <div className="max-w-7xl mx-auto px-6">
                {/* continue shopping and Cart heading*/}
                <div className="mb-8">
                    <a
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-2 mt-5"
                    >
                        ← Continue shopping
                    </a>

                    <h1 className="mt-4 text-2xl font-semibold">Cart</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* this is differentiating line */}

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
                        {allProducts.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                You have nothing in your cart.
                            </p>
                        ) : (
                            <OrderSummary subtotal={subtotal} />
                        )}
                    </div>

                    {/* this is differentiating line */}

                    {/* clear cart button - render only when there are any products in the cart */}
                    <div className="lg:col-span-1">
                        {allProducts.length === 0 ? (
                            <></>
                        ) : (
                            // <OrderSummary subtotal={subtotal} />
                            <button
                                onClick={clearCartItemsFunction}
                                className="w-full bg-black text-white py-2 rounded cursor-pointer"
                            >
                                clear cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export default Cart;
