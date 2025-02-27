import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import RegisterFormPage from "./pages/RegisterFormPage";
import LoginPage from "./pages/LoginPage";


import './App.css';
import AdminDashBoard from "./pages/AdminDashBoard";
import GalleryPage from "./pages/GalleryPage";
import AddPost from "./components/AddPost";

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/register" element={<RegisterFormPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/add-post" element={<AddPost />} />
                <Route path="/admin-dashboard" element={<AdminDashBoard />} />

                <Route path="/" element={<h1>Welcome to the App!</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
