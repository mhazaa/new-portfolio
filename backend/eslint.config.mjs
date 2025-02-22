import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
	},
	{
		languageOptions: { globals: globals.browser },
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'indent': [
				'error',
				'tab',
			],
			'linebreak-style': [
				'error',
				'unix',
			],
			'quotes': [
				'error',
				'single',
			],
			'semi': [
				'error',
				'always',
			],
			'@typescript-eslint/ban-ts-comment': 'off',
		},
	},
];