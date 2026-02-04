import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const url_backendMe = "http://localhost:8080/auth/me";

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const checkIfLoggedIn = async () => {
        try {
            const response = await fetch(url_backendMe, {
                method: "GET",
                credentials: "include",
            });

            console.log("deez nuts after  AutheContext:checkIfLoggedIn");

            if (!response.ok) {
                setIsLoggedIn(false);
                setAppUsername(null);
                return;
            }

            const data = await response.json();
            setIsLoggedIn(true);
            setAppUsername(data.username);

            console.log("deez nuts begin :: " + isLoggedIn);
            console.log("isLoggedIn :: " + isLoggedIn);
            console.log("appUsername :: " + appUsername);
            console.log("deez nuts end :: " + isLoggedIn);
        } catch (error) {
            setError(error.message);
        }
    };

    const [error, setError] = useState("");

    const [appUsername, setAppUsername] = useState("anony");

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (token) => {
        console.log("deez nuts begin");
        checkIfLoggedIn();
        setIsLoggedIn(true);
    };

    const logout = () => {
        // TODO : call the logout method from the backend

        setIsLoggedIn(false);
    };

    const fetchUsername = (username) => {
        console.log("deez nuts in fetchUsername");
        checkIfLoggedIn();
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                appUsername,
                fetchUsername,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be added inside AuthProvider");
    }
    return context;
};
