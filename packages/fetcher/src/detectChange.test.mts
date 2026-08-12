import { describe, expect, it } from 'vitest';
import { isChanged, normalize } from './detectChange.mjs';

describe('normalize', () => {
  it('should trim leading and trailing whitespace', () =>
    expect(normalize('\n  [1,2,3]  \n')).toBe('[1,2,3]'));
});

describe('isChanged', () => {
  it('should be false when the texts are identical', () =>
    expect(isChanged('[1,2,3]', '[1,2,3]')).toBe(false));

  it('should be false when the texts differ only by surrounding whitespace', () =>
    expect(isChanged('[1,2,3]\n', '\n[1,2,3]')).toBe(false));

  it('should be true when the texts differ', () =>
    expect(isChanged('[1,2,3]', '[1,2,4]')).toBe(true));
});
