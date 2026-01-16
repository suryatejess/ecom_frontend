import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function AuthLogin() {
    const isLoggedIn = !!localStorage.getItem("token");

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // console.log("first line");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(await response.text);
            }

            console.log("before jwt");

            const jwt = await response.text();

            console.log("jwt is done");

            localStorage.setItem("token", jwt);

            console.log("login successful", jwt);

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
                                onChange={(e) => setUsername(e.target.value)}
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
                                type="text"
                                id="password"
                                placeholder="password"
                                name="password"
                            />
                            <br />
                        </div>

                        <input
                            className="bg-black text-white p-2 w-full mt-6"
                            type="submit"
                            value={"Sign in"}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default AuthLogin;
