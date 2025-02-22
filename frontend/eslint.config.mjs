import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
	},
	{
		languageOptions: { globals: globals.browser },
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
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