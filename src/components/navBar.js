import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMainStore } from "../store/mainStore";

const NavBar = () => {
    const user = useMainStore((state) => state.user);
    const logout = useMainStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                {user && user.role === "admin" && (
                    <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                )}
                {!user ? (
                    <li><Link to="/login">Login</Link></li>
                ) : (
                    <>
                        <li>Welcome, {user.email}</li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
