import CartItem from "../components/CartItem";
import ClearCartButton from "../components/ClearCartButton";
import OrderItemProduct from "../components/OrderItemProduct";
import OrderSummary from "../components/OrderSummary";
import ProductPage from "../components/ProductPage";
import ProductsTogether from "../components/ProductsTogether";
import Auth from "./Auth";
import AuthLogin from "./AuthLogin";

function TestComponent() {
    return (
        <>
            <OrderItemProduct
                productId="52"
                title="Orange"
                quantity="5"
                price="89"
            />
        </>
    );
}

export default TestComponent;
