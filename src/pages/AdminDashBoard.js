import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../store/mainStore";

const AdminDashboard = () => {
    const user = useMainStore((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        // If the user is not logged in or not an admin, redirect to login
        if (!user || user.role !== "admin") {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user?.email}!</p>
            <p>You have admin access.</p>
        </div>
    );
};

export default AdminDashboard;
