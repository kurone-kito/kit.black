import { describe, expect, it } from 'vitest';
import type { EventDetail } from './types.mjs';
import { toRowMapper } from './toRow.mjs';

/**
 * Build a minimal event fixture.
 * @param overrides The properties to override.
 * @returns The event.
 */
const event = (overrides: Partial<EventDetail> = {}): EventDetail => ({
  date: '01/01',
  epoch: Date.parse('2026-01-01T12:00:00+09:00'),
  title: 'New Year',
  type: 'others',
  ...overrides,
});

describe('toRowMapper', () => {
  it('sets holiday: true for a Japanese public holiday date', () => {
    const row = toRowMapper(event(), 0, [event()]);
    expect(row.holiday).toBe(true);
  });

  it('omits holiday for a non-holiday date', () => {
    const nonHoliday = event({
      date: '01/02',
      epoch: Date.parse('2026-01-02T12:00:00+09:00'),
    });
    const row = toRowMapper(nonHoliday, 0, [nonHoliday]);
    expect(row.holiday).toBeUndefined();
  });

  it('detects a holiday whose JST date crosses the UTC day boundary', () => {
    // 2028-01-01T00:30 JST (元日) is 2027-12-31T15:30Z in UTC -- a
    // Friday and not a holiday if the lookup were TZ-naive.
    const boundary = event({
      date: '01/01',
      epoch: Date.parse('2027-12-31T15:30:00Z'),
    });
    const row = toRowMapper(boundary, 0, [boundary]);
    expect(row.holiday).toBe(true);
    expect(row.week).toBe('sat');
  });

  it('still computes date, dateSpan, and week as before', () => {
    const a = event({ date: '01/01' });
    const b = event({ date: '01/01' });
    const rowA = toRowMapper(a, 0, [a, b]);
    const rowB = toRowMapper(b, 1, [a, b]);
    expect(rowA.date).toBe('01/01');
    expect(rowA.dateSpan).toBe(2);
    expect(rowB.date).toBeUndefined();
    expect(rowB.dateSpan).toBeUndefined();
    expect(rowA.week).toBe('thu');
  });

  it('omits holiday on a same-day row that does not render the date cell', () => {
    // Only the first-occurrence row renders <td class="date">, so only
    // that row needs holiday -- mirrors the existing dateSpan gate.
    const a = event({ date: '01/01' });
    const b = event({ date: '01/01' });
    const rowA = toRowMapper(a, 0, [a, b]);
    const rowB = toRowMapper(b, 1, [a, b]);
    expect(rowA.holiday).toBe(true);
    expect(rowB.holiday).toBeUndefined();
  });

  it('pins toRowMapper’s actual whole-array-scan behavior for same-date events that are not adjacent', () => {
    // `array.filter`/`findIndex` scan the whole array by `date`, not by
    // position, so this is `toRowMapper`'s real, already-shipped
    // behavior for this input shape -- this test pins that pure-function
    // contract per issue #163's acceptance criteria (a non-adjacent
    // same-date case), it does not assert that the input shape itself is
    // expected or that rendering `dateSpan: 2` here would be valid HTML.
    // `Row.tsx` applies `dateSpan` as `rowSpan`, which requires
    // contiguous rows, so this input never reaches rendering in
    // production: `toEventsFactory` sorts events chronologically before
    // `.map(toRowMapper)`, which guarantees same-date events are always
    // adjacent by the time they reach this function. Enforcing that
    // invariant belongs to the sorting step, not to this pure mapper, so
    // no production source change is made here.
    const a = event({ date: '01/01' });
    const middle = event({
      date: '01/02',
      epoch: Date.parse('2026-01-02T12:00:00+09:00'),
    });
    const b = event({ date: '01/01' });
    const array = [a, middle, b];
    const rowA = toRowMapper(a, 0, array);
    const rowMiddle = toRowMapper(middle, 1, array);
    const rowB = toRowMapper(b, 2, array);
    expect(rowA.date).toBe('01/01');
    expect(rowA.dateSpan).toBe(2);
    expect(rowMiddle.date).toBe('01/02');
    expect(rowMiddle.dateSpan).toBeUndefined();
    expect(rowB.date).toBeUndefined();
    expect(rowB.dateSpan).toBeUndefined();
  });
});
