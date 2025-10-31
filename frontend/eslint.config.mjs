import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import baseConfig from '../eslint.config.mjs';

export default defineConfig([
	...baseConfig,
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: new URL('.', import.meta.url).pathname,
			},
		},
		extends: [
			pluginReact.configs.flat.recommended,
		],		
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