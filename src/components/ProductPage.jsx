import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ProductPage = (props) => {
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_API_BASE_URL;

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [validDecrementButton, setValidDecrementButton] = useState(false);
    const [validIncrementButton, setValidIncrementButton] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`${backendUrl}/product/${id}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchProduct();
    }, [id, backendUrl]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!product) return <p className="p-8">Loading product...</p>;

    const decrementQuantity = () => {
        setQuantity((prev) => Math.max(prev - 1, 0));
    };

    const incrementQuantity = (presentQuantity) => {
        setQuantity((prev) => Math.min(prev + 1, product.availableQuantity));
    };

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
                    productId: id,
                    quantity: quantity,
                }),
            });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    {/* <- back to products */}
                    <a href="/" className="inline-flex items-center text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeinejoin="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-left h-4 w-4"
                        >
                            <path d="m12 19-7-7 7-7"></path>
                            <path d="M19 12H5"></path>
                        </svg>
                        Back to products
                    </a>

                    {/* down */}
                    <div className="grid grid-rows-2 sm:grid-cols-2 mt-4">
                        {/* image  */}
                        <img
                            src={product.image}
                            alt="here the image of the product is supposed to be there"
                        />

                        {/* right */}
                        <div>
                            <div className="flex flex-col">
                                <h1>{product.name}</h1>
                                <h3>
                                    <span>₹</span>
                                    {product.price}
                                </h3>
                                <p>{product.longDesc}</p>

                                {/* quantity */}
                                <div>
                                    <p>Quantity</p>

                                    <button
                                        className="text-white bg-black px-2 m-1 cursor-pointer"
                                        onClick={decrementQuantity}
                                    >
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        className="text-white px-2 m-1 bg-black cursor-pointer"
                                        onClick={incrementQuantity}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* TODO : I have to add the functionality of adding into a cart later i.e. add to cart */}
                                <button
                                    onClick={addToCart}
                                    className="bg-black text-white rounded-md cursor-pointer"
                                >
                                    Add to Cart
                                </button>

                                <div className="border-t-2 pt-6 mt-6">
                                    <p className="text-green-600 text-sm">
                                        {product.availableQuantity} in stock
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
