import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../store/mainStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const login = useMainStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call the login function from Zustand
        const result = login(email, password);
        if (result.success) {
            navigate("/admin-dashboard"); // Redirect to admin dashboard
        } else {
            setError(result.message);
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
