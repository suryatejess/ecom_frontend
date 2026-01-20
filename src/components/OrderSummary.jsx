import React from "react";

const OrderSummary = (props) => {
    return (
        <>
            <h2>Order Summary</h2>

            {/* subtotal , shopping */}
            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{props.subtotal}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
            </div>

            {/* total */}
            <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{props.subtotal}</span>
                </div>
            </div>
        </>
    );
};

export default OrderSummary;
