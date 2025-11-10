// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light")
    );

    useEffect(() => {
        // Set on <html>
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            className="btn btn-ghost"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
    );
}


