import ProductsTogether from "../components/ProductsTogether";
import SignOutButton from "../components/SignOutButton";

function Home() {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <>
            <div className="pl-12 mt-6">
                <h1 className="text-lg font-bold">Products</h1>
                <p className="text-sm font-light">
                    Thoughtfully designed essentials for everyday life
                </p>
            </div>
            <ProductsTogether />
        </>
    );
}

export default Home;
