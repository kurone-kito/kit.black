import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import base from '@kurone-kito/eslint-config-base';
import tailwind from 'eslint-plugin-tailwindcss';
import tsEslint from 'typescript-eslint';

/** The compatibility layer for ESLint configuration. */
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslint.configs.recommended,
});

export default tsEslint.config(
  ...base,
  ...tailwind.configs['flat/recommended'],
  ...compat.extends('eslint-config-stylelint'),
);
