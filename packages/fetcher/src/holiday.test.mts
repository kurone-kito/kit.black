import { afterEach, describe, expect, it, vi } from 'vitest';
import { isJpHoliday, toJstCalendarDate } from './holiday.mjs';

afterEach(() => vi.restoreAllMocks());

describe('toJstCalendarDate', () => {
  it.each([
    // A time that is still 2026-01-01 in JST but already 2025-12-31
    // in UTC — the exact trap this helper exists to avoid.
    [Date.parse('2026-01-01T00:30:00+09:00'), 2026, 0, 1],
    [Date.parse('2026-01-02T12:00:00+09:00'), 2026, 0, 2],
  ])('epoch %d -> local Date(%d, %d, %d)', (epoch, year, month, day) =>
    expect(toJstCalendarDate(epoch)).toEqual(new Date(year, month, day)),
  );

  it('fails loudly instead of silently coercing a missing part to NaN', () => {
    // If Intl.DateTimeFormat#formatToParts ever omits a requested part,
    // the guard should throw rather than let holiday detection degrade
    // to a silent false negative (Number(undefined) === NaN).
    vi.spyOn(Intl.DateTimeFormat.prototype, 'formatToParts').mockReturnValue([
      { type: 'month', value: '1' },
      { type: 'day', value: '1' },
    ]);
    expect(() => toJstCalendarDate(Date.now())).toThrow(
      /did not return a "year" part/,
    );
  });
});

describe('isJpHoliday', () => {
  it.each([
    // 元日 (New Year's Day), noon JST -- unambiguous, same calendar
    // date in both JST and UTC.
    ['2026-01-01T12:00:00+09:00', true],
    // The day after New Year's Day is not a holiday.
    ['2026-01-02T12:00:00+09:00', false],
    // 元日 2028, observed 00:30 JST -- 2027-12-31T15:30:00Z in UTC, a
    // Friday and not a holiday. A time-zone-naive lookup (raw epoch
    // fed straight into `holiday_jp`) would answer `false` here; the
    // correct JST-aware answer is `true`.
    ['2028-01-01T00:30:00+09:00', true],
  ])('%s -> %s', (iso, expected) =>
    expect(isJpHoliday(Date.parse(iso))).toBe(expected),
  );

  it('answers the same JST-boundary case regardless of the host time zone', () => {
    // This assertion is meaningful precisely because `toJstCalendarDate`
    // derives the JST date via an explicit `timeZone: 'Asia/Tokyo'`
    // formatter rather than the host's local time zone, so it holds
    // under `TZ=UTC` (this repository's `push.yml` default) and under
    // `TZ=Asia/Tokyo` (the production build) alike.
    const epoch = Date.parse('2027-12-31T15:30:00Z');
    expect(isJpHoliday(epoch)).toBe(true);
  });
});
