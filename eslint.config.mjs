import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: globals.browser,
		},
		extends: [
			pluginJs.configs.recommended,
			tseslint.configs.recommended,
		],
		rules: {
			'indent': ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'always'],
			'@typescript-eslint/ban-ts-comment': 'off',
		},
    },
	globalIgnores([
		'frontend/',
		'sanity/',
	]),
]);