import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AuthLogin() {
    const { isLoggedIn, login, fetchUsername } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const url_backendSigin = "http://localhost:8080/auth/login";

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(url_backendSigin, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.status === 401) {
                throw new Error("Incorrect username or password");
            }

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const jwt = await response.text();

            login(jwt);
            fetchUsername(username);

            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <div>
                    <h1 className="text-lg font-bold text-center">
                        Welcome back
                    </h1>
                    <p className="font-light">
                        Enter your credentials to access your account
                    </p>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="uname">Username</label>
                            <br />
                            <input
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError("");
                                }}
                                className="border-2 w-full"
                                type="text"
                                id="uname"
                                placeholder="johndoe"
                                name="uname"
                            />
                            <br />
                        </div>
                        <div className="mt-3">
                            <label className="mt-6" htmlFor="password">
                                Password
                            </label>
                            <br />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-2 w-full"
                                type="password"
                                id="password"
                                placeholder="password"
                                name="password"
                            />
                            <br />
                        </div>

                        <input
                            className="bg-black text-white p-2 w-full mt-6 cursor-pointer"
                            type="submit"
                            value={"Sign in"}
                        />
                    </form>
                    <hr className="border-amber-500 m-8" />
                    <p className="text-sm text-center mt-4">
                        Dont have an account?{" "}
                        <Link
                            to="/auth/signup"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                    {error && (
                        <p className="text-red-600 text-sm text-center">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default AuthLogin;
