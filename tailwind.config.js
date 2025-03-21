import defaultTheme from "tailwindcss/defaultTheme";
const forms = require("@tailwindcss/forms");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/views/**/*.blade.php",
        "./resources/**/*.tsx",
        "./resources/**/*.module.scss",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [forms, require("@tailwindcss/aspect-ratio")],
};
