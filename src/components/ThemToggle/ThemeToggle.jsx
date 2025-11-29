
import { useEffect, useState } from "react";
import { MdLightMode, MdNightlight } from "react-icons/md";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");


    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                defaultChecked={localStorage.getItem("theme") === "dark"}
                onChange={(e) => handleTheme(e.target.checked)}
            />


            <MdLightMode className="swap-on fill-yellow-400 w-5 h-5"></MdLightMode>



            <MdNightlight className="swap-off w-5 h-5" />

        </label>

    );
}