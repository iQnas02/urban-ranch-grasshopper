import { useEffect, useState } from "react";

const useVisitorCount = () => {
    const [count, setCount] = useState(() => {
        return Number(localStorage.getItem("visitorCount")) || 0;
    });

    useEffect(() => {
        // Check if this is a new session
        if (!sessionStorage.getItem("visited")) {
            sessionStorage.setItem("visited", "true");

            const newCount = count + 1;
            setCount(newCount);
            localStorage.setItem("visitorCount", newCount);
        }
    }, [count]);

    return count;
};

export default useVisitorCount;
