/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.ejs", "./views/*.ejs", "./public/**/*.html"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui"), require("@tailwindcss/typography")],
    daisyui: {
        themes: ["dim"], // you can change to "cupcake", "dark", etc.
    },
};
