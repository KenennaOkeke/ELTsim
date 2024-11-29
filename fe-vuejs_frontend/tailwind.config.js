const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		'./index.html',
		'./a/**/*.{vue,js,ts,jsx,tsx}',
	],
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
