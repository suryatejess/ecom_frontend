import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [appUsername, setAppUsername] = useState(
        localStorage.getItem("app_username"),
    );

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token"),
    );

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    const fetchUsername = (username) => {
        localStorage.setItem("app_username", username);
        setAppUsername(username);
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
