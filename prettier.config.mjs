import config from '@kurone-kito/prettier-config/.prettierrc.json' with { type: 'json' };

/** @type {import('prettier').Config} */
const additional = {
  plugins: [
    'prettier-plugin-packagejson',
    'prettier-plugin-sh',
    'prettier-plugin-sort-json',
    'prettier-plugin-tailwindcss',
  ],
};

export default { ...config, ...additional };
