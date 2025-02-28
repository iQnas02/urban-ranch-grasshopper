import { create } from "zustand";

export const useMainStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // Initialize from localStorage
    login: (email, password) => {
        const adminEmail = "admin@example.com"; // Your Admin Email
        const adminPassword = "password123"; // Your Admin Password

        // Check credentials
        if (email === adminEmail && password === adminPassword) {
            const user = { email, role: "admin" }; // This still stores role info for admin users
            localStorage.setItem("user", JSON.stringify(user)); // Persist in localStorage
            set({ user });
            return { success: true };
        } else {
            return { success: false, message: "Invalid email or password" };
        }
    },
    logout: () => {
        localStorage.removeItem("user");
        set({ user: null });
    },
}));
