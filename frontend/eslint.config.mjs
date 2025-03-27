import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			globals: globals.browser,
		},
		extends: [
			pluginJs.configs.recommended,
			tseslint.configs.recommended,
			pluginReact.configs.flat.recommended,
		],
		rules: {
			'indent': ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'always'],
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					'argsIgnorePattern': '^_',
					'varsIgnorePattern': '^_',
					'caughtErrorsIgnorePattern': '^_',
				},
			],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	globalIgnores([
		'build/',
		'**/*.js',
	]),
]);