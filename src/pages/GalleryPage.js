import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

const Gallery = () => {
    const [posts, setPosts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchGallery();
        checkUserStatus();
    }, []);

    const checkUserStatus = () => {
        const user = JSON.parse(localStorage.getItem('user')); // Check if user is logged in
        if (user && user.role === 'admin') {
            setIsAdmin(true); // Set admin status if user is logged in and is an admin
        }
    };

    const fetchGallery = async () => {
        try {
            const response = await axios.get("http://localhost:3001/gallery");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching gallery:", error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
            if (!user) {
                console.error("You must be logged in to delete a post.");
                return;
            }

            const response = await axios.delete(`http://localhost:3001/delete-post/${postId}`, {
                headers: { Authorization: `Bearer ${user.token}` } // Add user token (or session ID) if needed for authorization
            });

            console.log('Post deleted:', response);
            setPosts(posts.filter(post => post._id !== postId)); // Update UI after deleting post
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Gallery</h1>
            <Carousel responsive={responsive} className="mb-4">
                {posts.map(post => (
                    <div key={post._id} className="card mx-2">
                        <img src={`http://localhost:3001/uploads/${post.image}`} alt={post.title} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.text}</p>
                            <p className="text-muted small">{new Date(post.date).toLocaleDateString()}</p>
                            {isAdmin && (
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => deletePost(post._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Gallery;
