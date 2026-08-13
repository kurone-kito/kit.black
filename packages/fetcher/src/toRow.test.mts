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

  it('computes dateSpan and a single dated row for same-date events that are not adjacent in the array', () => {
    // `array.filter`/`findIndex` scan the whole array, so a different
    // date sitting between the two same-date events must not change
    // the dateSpan or which row renders the date cell.
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
