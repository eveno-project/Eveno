module.exports = {
	presets: [
		['@babel/preset-env', {
			targets: {
				node: 'current', // Ensures compatibility with Node.js
			},
		}],
		'@babel/preset-typescript', // For TypeScript support
		'@babel/preset-react', // If you're using React
	],
	plugins: [
		// Add any Babel plugins here if needed
	],
};
