import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Routes,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import TestComponent from "./pages/TestComponent";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import RootLayout from "./layouts/RootLayout";

function App() {
    const [count, setCount] = useState(0);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/test" element={<TestComponent />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Route>,
        ),
    );

    return <RouterProvider router={router} />;
}

export default App;
