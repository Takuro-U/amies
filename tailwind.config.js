import defaultTheme from "tailwindcss/defaultTheme";
const forms = require("@tailwindcss/forms");
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/views/**/*.blade.php",
        "./resources/**/*.tsx",
        "./resources/**/*.module.scss",
        flowbite.content(),
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [forms, flowbite.plugin()],
};
