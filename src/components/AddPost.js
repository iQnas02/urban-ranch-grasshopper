import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../store/mainStore";

const AddPost = () => {
    const user = useMainStore((state) => state.user);
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        title: "",
        text: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);

    if (!user || user.role !== "admin") {
        return <h3 className="text-center text-danger">Access Denied</h3>;
    }

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
            alert('File size exceeds 10MB');
            return;
        }
        if (file && !file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }
        setPostData({ ...postData, image: file });
    };

    const addPost = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("text", postData.text);
        formData.append("image", postData.image);

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:3001/add-post", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Post added successfully!");
            navigate("/gallery");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'Failed to add post.';
            console.error("Error adding post:", error);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add a New Post</h2>
            <form onSubmit={addPost}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={postData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Text</label>
                    <textarea
                        name="text"
                        className="form-control"
                        value={postData.text}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                    <div className="form-text">Accepted file types: .jpg, .png, .gif (Max size: 10MB)</div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddPost;
