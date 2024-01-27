/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			primary: "#a4ffaf",
			secondary: "#24232b",
			darkerSecondary: "#18171f",
			darkestSecondary: "#08070c",
			gray: "#8d8a9b",
			white: "#fff",
		},
	},
	plugins: [],
};
