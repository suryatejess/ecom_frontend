import ProductPage from "../components/ProductPage";
import ProductsTogether from "../components/ProductsTogether";
import Auth from "./Auth";
import AuthLogin from "./AuthLogin";

function TestComponent(){
    return(
        <>
            <ProductPage 
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aspect-ratio-16x9.svg/2560px-Aspect-ratio-16x9.svg.png" 
                name="Mouse" 
                price="89"
                longDesc="Handcrafted ceramic vase with a modern minimalist design. Perfect for dried flowers or as a standalone decorative piece."
                availableQuantity="15"
                id="1"
            />
        </>
    )
}

export default TestComponent; 