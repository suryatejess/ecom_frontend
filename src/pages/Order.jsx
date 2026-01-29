import { useEffect, useState } from "react";

import OrderItemProduct from "../components/OrderItemProduct";

function Order() {
    const [error, setError] = useState();
    const [allOrders, setAllOrders] = useState([]);
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if (selected == i) {
            return setSelected(null);
        }

        setSelected(i);
    };

    const url_getAllOrders = "http://localhost:8080/order/";

    const getAllOrders = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(url_getAllOrders, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(
                    "some problem occurred while fetching the orders",
                );
            }

            const result = await response.json();

            setAllOrders(result);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto px-6">
                {/* continue shopping */}
                <div className="mb-8">
                    <a
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-2 mt-5"
                    >
                        ← Continue shopping
                    </a>

                    <h1 className="mt-4 text-2xl font-semibold">Orders</h1>

                    <div className="flex flex-col">
                        {allOrders.map((order, i) => (
                            <div
                                key={order.id}
                                className="border rounded p-4 cursor-pointer"
                                onClick={() => toggle(i)}
                            >
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <h2 className="font-semibold mb-4">
                                            Order #{order.id}
                                        </h2>

                                        <h3 className="font-semibold mb-4">
                                            {
                                                new Date(order.orderPlacedDate)
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                        </h3>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <span>{order.orderStatus}</span>

                                        <span>
                                            {/* TODO : replace '+', and '-' with an svg image */}

                                            {selected === i ? "-" : "+"}
                                        </span>
                                    </div>
                                    {/* have to include address, status, receiver name */}
                                </div>

                                {/* items in this order - start */}
                                {/* this would be visually visible only when card is expanded */}

                                {selected === i ? (
                                    <div className="mt-4 space-y-3">
                                        {order.items.map((item) => (
                                            <OrderItemProduct
                                                key={item.productId}
                                                productId={item.productId}
                                                title={item.productName}
                                                quantity={item.quantity}
                                                price={item.price}
                                            />
                                        ))}
                                    </div>
                                ) : null}

                                {/* items in this order - end */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
