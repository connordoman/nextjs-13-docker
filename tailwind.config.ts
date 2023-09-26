import type { Config } from "tailwindcss";

const THEME_COLORS = {
    ucla_blue: {
        DEFAULT: "#2274a5",
        100: "#071721",
        200: "#0e2f42",
        300: "#144663",
        400: "#1b5e84",
        500: "#2274a5",
        600: "#3098d5",
        700: "#64b2df",
        800: "#98ccea",
        900: "#cbe5f4",
    },
    ubco_blue: {
        DEFAULT: "#0055B7",
        100: "#003d8f",
        200: "#0056c6",
        300: "#0070fe",
        400: "#1a8cff",
        500: "#0055B7",
        600: "#3366ff",
        700: "#6685ff",
        800: "#99a3ff",
        900: "#ccd2ff",
    },
    orange_pantone: {
        DEFAULT: "#f75c03",
        100: "#311200",
        200: "#632501",
        300: "#943701",
        400: "#c64a02",
        500: "#f75c03",
        600: "#fd7c31",
        700: "#fd9d65",
        800: "#febd98",
        900: "#fedecc",
    },
    jonquil: {
        DEFAULT: "#f1c40f",
        100: "#302703",
        200: "#604e06",
        300: "#917508",
        400: "#c19c0b",
        500: "#f1c40f",
        600: "#f4cf3e",
        700: "#f7db6e",
        800: "#f9e79f",
        900: "#fcf3cf",
    },
    dogwood_rose: {
        DEFAULT: "#d90368",
        100: "#2b0115",
        200: "#560129",
        300: "#82023e",
        400: "#ad0352",
        500: "#d90368",
        600: "#fc1a83",
        700: "#fc53a2",
        800: "#fd8cc1",
        900: "#fec6e0",
    },
    bright_emerald: {
        DEFAULT: "#00cc66",
        100: "#002914",
        200: "#005229",
        300: "#007a3d",
        400: "#00a352",
        500: "#00cc66",
        600: "#0aff85",
        700: "#47ffa3",
        800: "#85ffc2",
        900: "#c2ffe0",
    },
};

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        colors: {
            ...THEME_COLORS,
        },
    },
    plugins: [],
};
export default config;
