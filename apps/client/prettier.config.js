module.exports = {
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	tabWidth: 2,
	semi: true,
	overrides: [
		{
			files: '.editorconfig',
			options: {
				parser: 'yaml',
			},
		},
	],
};
