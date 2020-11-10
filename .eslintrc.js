module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: [
		'standard'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		semi: [2, 'never'],
		indent: [2, 'tab'],
		camelcase: [0, 'never'],
		'no-mixed-spaces-and-tabs': [0, 'smart-tabs'],
		'no-tabs': 0
	}
}
