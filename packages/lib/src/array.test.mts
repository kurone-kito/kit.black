import { describe, expect, expectTypeOf, it } from 'vitest';
import { tupleMap } from './array.mjs';

describe('tupleMap', () => {
  it('should map a tuple', () => {
    const result = tupleMap([1, 2, 3] as const, (value) => `${value}` as const);
    expect(result).toEqual(['1', '2', '3']);
    expectTypeOf(result).toMatchTypeOf<readonly [string, string, string]>();
  });
});
