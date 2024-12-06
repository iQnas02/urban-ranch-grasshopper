import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            {/* Language Switcher */}
            <div style={{ marginBottom: "20px" }}>
                <button onClick={() => setLanguage("en")} style={{ marginRight: "10px" }}>
                    English
                </button>
                <button onClick={() => setLanguage("lt")}>Lietuvių</button>
            </div>

            {/* Form */}
            <h1>{translations.title}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{translations.date}:</label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="date"
                            value="December 26 - 30 (200 Eur)"
                            onChange={handleChange}
                        />
                        Gruodžio 26 - 30 d. (200 Eur)
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="date"
                            value="December 20 - 23 (150 Eur)"
                            onChange={handleChange}
                        />
                        Gruodžio 20 - 23 d. (150 Eur)
                    </label>
                    <br />
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

                <br />

                <div>
                    <label>{translations.camperName}:</label>
                    <br />
                    <input
                        type="text"
                        name="camperName"
                        value={formData.camperName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>{translations.parentName}:</label>
                    <br />
                    <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>{translations.parentEmail}:</label>
                    <br />
                    <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>{translations.parentPhone}:</label>
                    <br />
                    <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>{translations.notes}:</label>
                    <br />
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <br />

                <button type="submit">{translations.submit}</button>
            </form>
        </div>
    );
};

export default App;
