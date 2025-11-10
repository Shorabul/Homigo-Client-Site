export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            // backgroundImage: {
            //     "brand-gradient": "linear-gradient(to right, #ff580c 0%, #fe8f61 51%, #ff580c 100%)",
            // },
        },
    },
    daisyui: {
        themes: [
            {
                light: {
                    primary: "#1e40af",        // blue
                    secondary: "#facc15",      // yellow
                    accent: "#10b981",         // green
                    neutral: "#f3f4f6",        // light gray
                    "base-100": "#db1435",     // background
                    info: "#3b82f6",
                    success: "#22c55e",
                    warning: "#f59e0b",
                    error: "#ef4444",
                    "brand-start": "#1e40af",  // gradient start
                    "brand-end": "#3b82f6",    // gradient end
                },
            },
            {
                dark: {
                    primary: "#f472b6",        // pink
                    secondary: "#fbbf24",      // gold
                    accent: "#14b8a6",         // teal
                    neutral: "#111827",        // dark gray
                    "base-100": "#fbbf24",     // background
                    info: "#0ea5e9",
                    success: "#22c55e",
                    warning: "#facc15",
                    error: "#f87171",
                    "brand-start": "#f472b6",  // gradient start
                    "brand-end": "#fbbf24",    // gradient end
                },
            },
        ],
        darkTheme: "dark",
    },

};

