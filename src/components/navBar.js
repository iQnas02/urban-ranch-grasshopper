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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
            <div className="container">
                <Link to="/" className="navbar-brand">MyApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                        <li className="nav-item"><Link to="/gallery" className="nav-link">Gallery</Link></li>

                        <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
                        {user && user.role === "admin" && (
                            <>

                                <li className="nav-item"><Link to="/admin-dashboard" className="nav-link">Admin
                                    Dashboard</Link></li>
                                <li className="nav-item"><Link to="/add-post" className="nav-link">Add Post</Link></li>

                            </>


                        )}
                        {!user ? (
                            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                        ) : (
                            <>
                                <li className="nav-item nav-link text-white">Welcome, {user.email}</li>
                                <li className="nav-item">
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-success"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
