// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                light: {
                    "base-100": "#F6F6F6",
                    "text-base": "#222",
                },
            },
            {
                dark: {
                    "base-100": "#222",
                    "text-base": "#F6F6F6",
                },
            },
        ],
        darkTheme: "dark",
    },
};
