import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [shifts, setShifts] = useState([]);
    const [newShift, setNewShift] = useState("");

    useEffect(() => {
        fetchShifts();
    }, []);

    const fetchShifts = async () => {
        const response = await axios.get("http://localhost:3001/shifts");
        setShifts(response.data);
    };

    const addShift = async () => {
        if (!newShift) return;
        const response = await axios.post("http://localhost:3001/shifts", { date: newShift });
        setShifts([...shifts, response.data]);
        setNewShift("");
    };

    const deleteShift = async (id) => {
        await axios.delete(`http://localhost:3001/shifts/${id}`);
        setShifts(shifts.filter((shift) => shift.id !== id));
    };

    return (
        <div>
            <h1>Admin Shift Management</h1>
            <input
                type="text"
                value={newShift}
                onChange={(e) => setNewShift(e.target.value)}
                placeholder="Enter new shift date"
            />
            <button onClick={addShift}>Add Shift</button>
            <ul>
                {shifts.map((shift) => (
                    <li key={shift.id}>
                        {shift.date} <button onClick={() => deleteShift(shift.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
