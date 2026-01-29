import React, { useEffect, useState } from "react";

const OrderItemProduct = (props) => {
    const [productImage, setProductImage] = useState();
    const [error, setError] = useState();
    const [productDetails, setProductDetails] = useState();

    /*
    props needed 
        - productId
        - title 
        - quantity 
*/

    const url_fetchProductBasedOnId =
        "http://localhost:8080/product/" + props.productId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url_fetchProductBasedOnId);

                if (!response.ok) {
                    throw new Error("error while fetching the product");
                }

                const result = await response.json();

                setProductImage(result.image);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-row border-2">
                    {/* image */}
                    <div className="flex items-center">
                        <img
                            src={productImage}
                            alt="image of the product"
                            className="h-16 w-16"
                        />
                    </div>

                    {/* title, quantity, price */}
                    <div className="flex flex-col">
                        {/* title */}
                        <div>{props.title}</div>

                        {/* qty and price */}
                        <div>
                            Qty: {props.quantity} x <span>₹</span>
                            {props.price} = {props.quantity}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderItemProduct;
