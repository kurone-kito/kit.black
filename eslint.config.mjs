import solidConfig from '@kurone-kito/eslint-config-solid';

/**
 * The ESLint configuration for this project.
 *
 * Extends the shared preset with a local `ignores` entry for the
 * vendored IDD helper bundle (`scripts/`, `schemas/`, `fixtures/schemas/`),
 * re-synced verbatim from `kurone-kito/idd-skill` and required to stay
 * byte-identical to upstream across every re-import.
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...solidConfig,
  { ignores: ['scripts/**', 'schemas/**', 'fixtures/schemas/**'] },
];
