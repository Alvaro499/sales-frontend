import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		ignores: ['vite.config.ts', 'eslint.config.js'],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				project: './tsconfig.app.json',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			react: pluginReact,
			'@typescript-eslint': tseslint.plugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			// React
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',

			// TypeScript
			'@typescript-eslint/no-explicit-any': 'warn',

			// Estilo (alineado con Prettier)
			'max-len': [
				'error',
				{
					code: 100,
					ignoreUrls: true,
					ignoreTemplateLiterals: true,
				},
			],
			'arrow-parens': ['error', 'as-needed'],
		},
	},
	tseslint.configs.recommended,
	{
		// Configuración específica para Prettier (DEBE ir última)
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		...eslintConfigPrettier,
		rules: {
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					tabWidth: 4,
					singleQuote: true,
					jsxSingleQuote: true,
					printWidth: 100,
					endOfLine: 'lf',
				},
			],
		},
	},
]);
