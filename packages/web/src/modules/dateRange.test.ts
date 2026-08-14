import { describe, expect, it } from 'vitest';
import type { RowProps } from '../components/atoms/calendar/Row.js';
import { dateRangeOf } from './dateRange.js';

describe('dateRangeOf', () => {
  it('returns the first and last defined date across multiple days', () =>
    expect(
      dateRangeOf([
        { children: 'A', date: '08/10', type: 'others', week: 'sun' },
        { children: 'B', date: '08/11', type: 'others', week: 'mon' },
        { children: 'C', date: '08/16', type: 'others', week: 'sat' },
      ]),
    ).toEqual(['08/10', '08/16']));

  it('returns the same date twice for a single row', () =>
    expect(
      dateRangeOf([
        { children: 'A', date: '08/10', type: 'others', week: 'sun' },
      ]),
    ).toEqual(['08/10', '08/10']));

  it('falls back to the last row that carries a date, when the last day has multiple events', () =>
    // The fetcher only sets `date` on the first row of each calendar
    // day (see `packages/fetcher/src/toRow.mts`), so the array's final
    // entry can have `date: undefined` even though it belongs to the
    // last day in range.
    expect(
      dateRangeOf([
        { children: 'A', date: '08/10', type: 'others', week: 'sun' },
        {
          children: 'B',
          date: '08/16',
          dateSpan: 2,
          type: 'others',
          week: 'sat',
        },
        { children: 'C', date: undefined, type: 'others', week: 'sat' },
      ]),
    ).toEqual(['08/10', '08/16']));

  it('returns empty strings for an empty rows array', () =>
    expect(dateRangeOf([])).toEqual(['', '']));

  it('returns empty strings when no row carries a date', () =>
    expect(
      dateRangeOf([
        { children: 'A', date: undefined, type: 'others', week: 'sun' },
      ] satisfies readonly RowProps[]),
    ).toEqual(['', '']));
});
