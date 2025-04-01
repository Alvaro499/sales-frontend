import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		ignores: ['vite.config.ts', 'eslint.config.js'], // 🧹 Ignoramos estos archivos
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				project: './tsconfig.app.json',
			},
		},
		plugins: {
			js,
			react: pluginReact,
			prettier,
		},
		settings: {
			react: {
				version: 'detect', // 👈 Evita el warning de versión
			},
		},
		rules: {
			// ✅ Reglas React modernas
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/jsx-uses-vars': 'error',
			'react/jsx-no-target-blank': 'warn',

			// ✅ Prettier
			'prettier/prettier': 'error',

			// ✅ TS: desactiva el requisito de tipo de retorno explícito
			'@typescript-eslint/explicit-function-return-type': 'off',
		},
	},

	// 🧠 Extensiones base
	tseslint.configs.recommended,
	eslintConfigPrettier, // 🧹 Esto desactiva conflictos de formato con Prettier
]);
