import { defineConfig, globalIgnores } from 'eslint/config';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        files: ['**/*.{ts,tsx}'],
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
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					'argsIgnorePattern': '^_',
					'varsIgnorePattern': '^_',
					'caughtErrorsIgnorePattern': '^_',
				},
			],
		},
    },
	globalIgnores([
		'frontend/',
		'sanity/',
	]),
]);