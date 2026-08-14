import { describe, expect, it } from 'vitest';
import en from './en.js';
import ja from './ja.js';

describe('i18n dictionaries', () => {
  it('define exactly the same key set for ja and en', () => {
    // A runtime check, independent of TypeScript's excess-property
    // check on each dictionary's own object-literal assignment: that
    // check only runs inside a full `tsc`/build pass, not `pnpm run
    // lint` or `pnpm run test`, so this is the only check in the fast
    // loop that catches a key added to one locale and not the other.
    expect(Object.keys(ja).sort()).toStrictEqual(Object.keys(en).sort());
  });

  it.each([
    ['en', en],
    ['ja', ja],
  ])(
    'gives the two complementary-landmark asides distinct accessible names in %s',
    (_locale, resources) => {
      // The two `<aside>` landmarks (Footer, Works) must have distinct
      // accessible names -- html-validate's `unique-landmark` rule
      // fails when duplicate `complementary` regions share a name,
      // not merely when either is empty.
      expect(resources.footerCredits).not.toBe(resources.worksMore);
    },
  );
});
