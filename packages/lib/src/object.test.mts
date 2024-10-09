import { describe, expectTypeOf, it } from 'vitest';
import type { ReadonlyRecord, RecordKey } from './object.mjs';

describe('ReadonlyRecord', () => {
  it('ReadonlyRecord<RecordKey, number> --> { readonly [key in RecordKey]: number }', () => {
    expectTypeOf<ReadonlyRecord<RecordKey, number>>().toEqualTypeOf<{
      readonly [key in RecordKey]: number;
    }>();
    expectTypeOf<ReadonlyRecord<RecordKey, number>>().toEqualTypeOf<
      Readonly<Record<RecordKey, number>>
    >();
  });
});

describe('RecordKey', () => {
  it('should be the key of any object', () =>
    expectTypeOf<RecordKey>().toEqualTypeOf<number | string | symbol>());
});
