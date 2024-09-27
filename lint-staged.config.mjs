import base from '@kurone-kito/lint-staged-config/.lintstagedrc.json' with { type: 'json' };

const { '*': baseScripts } = base;

/** @type {Readonly<Record<string, readonly string[]>>} */
export default {
  '*': baseScripts,
  '*.css': [
    'stylelint --aei --cache --cache-location node_modules/.cache/stylelint/ --fix',
  ],
};
