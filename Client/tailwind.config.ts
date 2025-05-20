import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				"home-heading-small": ["28px", "34px"],
				"home-heading-large ": ["48px", "56px"],
			},
		},
	},
	plugins: [],
	darkMode: "class", // 'media' or 'class'
};

export default config;
