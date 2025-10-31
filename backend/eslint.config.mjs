import { defineConfig } from 'eslint/config';
import baseConfig from '../eslint.config.mjs';

export default defineConfig([
	...baseConfig,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: new URL('.', import.meta.url).pathname,
			},
		},
	},
]);