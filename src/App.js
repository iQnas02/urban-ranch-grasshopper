import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // For external CSS

const App = () => {
    const [language, setLanguage] = useState("en"); // Default language
    const [translations, setTranslations] = useState({}); // Translation data
    const [formData, setFormData] = useState({
        date: "",
        camperName: "",
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        notes: "",
    });

    // Fetch translations from backend
    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/translations/${language}`);
                setTranslations(response.data);
            } catch (error) {
                console.error("Error fetching translations", error);
            }
        };
        fetchTranslations();
    }, [language]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/submit-form", {
                language,
                formData,
            });

            if (response.status === 200) {
                alert("Form submitted successfully!");
            } else {
                alert("Failed to submit the form.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="app-container">
            {/* Language Switcher */}
            <div className="language-switcher">
                <button
                    className={language === "en" ? "active" : ""}
                    onClick={() => setLanguage("en")}
                >
                    English
                </button>
                <button
                    className={language === "lt" ? "active" : ""}
                    onClick={() => setLanguage("lt")}
                >
                    Lietuvių
                </button>
            </div>

            {/* Form */}
            <h1 className="form-title">{translations.title || "Registration Form"}</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>{translations.date || "Select a Date"}:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="date"
                                value="December 26 - 30 (200 Eur)"
                                onChange={handleChange}
                            />
                            Gruodžio 26 - 30 d. (200 Eur)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="date"
                                value="December 20 - 23 (150 Eur)"
                                onChange={handleChange}
                            />
                            Gruodžio 20 - 23 d. (150 Eur)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="date"
                                value="January 1 - 4 (150 Eur)"
                                onChange={handleChange}
                            />
                            Sausio 1 - 4 d. (150 Eur)
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>{translations.camperName || "Camper Name"}:</label>
                    <input
                        type="text"
                        name="camperName"
                        value={formData.camperName}
                        onChange={handleChange}
                        required
                        placeholder="Enter camper's name"
                    />
                </div>

                <div className="form-group">
                    <label>{translations.parentName || "Parent's Name"}:</label>
                    <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                        placeholder="Enter parent's name"
                    />
                </div>

                <div className="form-group">
                    <label>{translations.parentEmail || "Parent's Email"}:</label>
                    <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        required
                        placeholder="Enter parent's email"
                    />
                </div>

                <div className="form-group">
                    <label>{translations.parentPhone || "Parent's Phone"}:</label>
                    <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleChange}
                        required
                        placeholder="Enter parent's phone number"
                    />
                </div>

                <div className="form-group">
                    <label>{translations.notes || "Notes"}:</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Enter any additional notes (e.g., allergies)"
                    ></textarea>
                </div>

                <button type="submit" className="submit-button">
                    {translations.submit || "Submit"}
                </button>
            </form>
        </div>
    );
};

export default App;
