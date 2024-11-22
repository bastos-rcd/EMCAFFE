/** @type {import("prettier").Config} */
export default {
	plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

	tabWidth: 4,
	useTabs: true,
	singleQuote: true,
	printWidth: 80,

	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
