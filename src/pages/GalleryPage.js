import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import axios from 'axios';

const Gallery = () => {
    const [posts, setPosts] = useState([]);

    const fetchGallery = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/gallery");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching gallery:", error);
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
                        <img src={`http://localhost:3001${post.image}`} alt={post.title} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.text}</p>
                            <p className="text-muted small">{new Date(post.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Gallery;
