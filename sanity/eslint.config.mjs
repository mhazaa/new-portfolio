import studio from '@sanity/eslint-config-studio';
import tseslint from 'typescript-eslint';

export default [
	...studio,
	...tseslint.configs.recommended,
	{
		rules: {
			'indent': ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
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
];