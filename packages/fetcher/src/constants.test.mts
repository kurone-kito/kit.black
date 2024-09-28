import { describe, expect, expectTypeOf, it } from 'vitest';
import type { EventType } from './constants.mjs';
import { eventTypes } from './constants.mjs';

describe('EventType', () => {
  it('should be "others" | "release" | "streaming"', () =>
    expectTypeOf<EventType>().toEqualTypeOf<
      'others' | 'release' | 'streaming'
    >());
});

describe('eventTypes', () => {
  it('should be ["others", "release", "streaming"]', () =>
    expect(eventTypes).toEqual(['others', 'release', 'streaming']));
});
