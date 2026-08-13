import type { ReadonlyTuple } from 'type-fest';

/** Type definition that the value which parsable as a date. */
export type DateParsable = ConstructorParameters<typeof Date>[number];

/** Type definition that the week. */
export type Week = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

/** The length of the week dates. */
export const WEEKDATES = 7;

/**
 * The single time zone this module's scheduling logic is anchored to.
 * Every formatter and every date computation below shares this constant
 * so the zone is never duplicated as a second, driftable literal.
 *
 * Known, accepted limitation: `TIMEZONE` observed daylight-saving time
 * from 1948 through 1951, and used a non-`HH:MM` local-mean-time offset
 * (`+09:18:59`) before 1888, when Japan adopted a standard zone. Neither
 * historical period is special-cased below, so `truncateTime` throws on
 * a pre-1888 instant and `plusDate` briefly loses calendar-day alignment
 * across the 1948-1951 transitions. This is out of scope: every real
 * caller in this monorepo (`packages/fetcher/src/bin.mts`,
 * `packages/fetcher/src/parseEvent.mts`,
 * `packages/web/src/components/organisms/Calendar.tsx`) always passes
 * the current date, never a historical one.
 */
export const TIMEZONE = 'Asia/Tokyo';

/** The date formatter. */
const dateFormatter = new Intl.DateTimeFormat('en-ZA', {
  month: 'numeric',
  day: 'numeric',
  timeZone: TIMEZONE,
});

/** The time formatter. */
const timeFormatter = new Intl.DateTimeFormat('en-ZA', {
  minute: 'numeric',
  hour: 'numeric',
  timeZone: TIMEZONE,
});

/** The week formatter. */
const weekFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  timeZone: TIMEZONE,
});

/**
 * The calendar-day-key formatter: renders any instant as its `TIMEZONE`
 * calendar date in `YYYY-MM-DD` form (the `en-CA` locale orders its
 * numeric date fields that way), independent of the host process's own
 * time zone.
 */
const dayKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: TIMEZONE,
});

/**
 * The UTC-offset formatter: renders `TIMEZONE`'s numeric UTC offset (for
 * example `+09:00`) for a given instant, so the offset is always derived
 * from `TIMEZONE` rather than hard-coded a second time.
 */
const offsetFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIMEZONE,
  timeZoneName: 'longOffset',
});

/**
 * Get the calendar-day key of the date, expressed in `TIMEZONE`.
 * @param date The date to key.
 * @returns The `YYYY-MM-DD` calendar day, in `TIMEZONE`.
 */
const dayKeyOf = (date: Date): string => dayKeyFormatter.format(date);

/**
 * Get the numeric UTC offset of `TIMEZONE` at the given instant (for
 * example `+09:00`).
 * @param date The instant to resolve the offset for.
 * @returns The numeric UTC offset, in `±HH:MM` form.
 */
const offsetOf = (date: Date): string => {
  const part = offsetFormatter
    .formatToParts(date)
    .find((p) => p.type === 'timeZoneName');
  if (!part) {
    // Guard against a silent NaN / Invalid Date: if Intl ever omits the
    // requested part, fail loudly instead of returning a mis-anchored
    // instant.
    throw new Error('Intl.DateTimeFormat did not return a UTC offset');
  }
  return part.value.replace('GMT', '');
};

/**
 * Format the date.
 * @param date The date to format.
 * @returns The formatted date.
 */
export const formatDate = (date: DateParsable): string =>
  dateFormatter.format(new Date(date));

/**
 * Format the time.
 * @param date The date to format.
 * @returns The formatted time.
 */
export const formatTime = (date: DateParsable): string =>
  timeFormatter.format(new Date(date));

/**
 * Format the week.
 * @param date The date to format.
 * @returns The formatted week.
 */
export const formatWeek = (date: DateParsable): Week =>
  weekFormatter.format(new Date(date)).toLowerCase() as Week;

/**
 * Format a time range.
 *
 * The `翌` (next-day) marker compares `TIMEZONE` calendar-day keys, not
 * host-local day-of-month: two instants in different months that share
 * the same day-of-month (for example July 5 and August 5) are correctly
 * treated as different days, which a bare day-of-month comparison would
 * have missed.
 * @param from The start of the range to format.
 * @param to The end of the range to format.
 * @returns The formatted time range.
 */
export const formatTimeRange = (
  from: DateParsable,
  to: DateParsable,
): string => {
  const dateFrom = new Date(from);
  const dateTo = new Date(to);
  const overDate = dayKeyOf(dateFrom) !== dayKeyOf(dateTo);
  return `${formatTime(from)}〜${overDate ? '翌' : ''}${formatTime(to)}`;
};

/**
 * Get the date obtained by adding the specified number of days.
 *
 * `TIMEZONE` has observed no daylight-saving transitions since 1951, so
 * one calendar day is exactly 86,400,000 ms for every instant any real
 * caller in this monorepo passes (see the historical-limitation note on
 * `TIMEZONE`); adding whole days as milliseconds is equivalent to
 * `TIMEZONE` calendar-day arithmetic for those instants, regardless of
 * the host process's own time zone.
 * @param date The date to add.
 * @param days The days to add.
 * @returns The date obtained by adding the specified number of days.
 */
export const plusDate = (date: DateParsable, days: number): Date =>
  new Date(new Date(date).getTime() + days * 86_400_000);

/**
 * Truncate the date to `TIMEZONE` midnight of its `TIMEZONE` calendar
 * day, regardless of the host process's own time zone.
 *
 * Unlike the previous host-local implementation, an unparsable `date`
 * now throws a `RangeError` (via `Intl.DateTimeFormat`) instead of
 * silently producing an `Invalid Date`, so a malformed schedule input
 * fails loudly rather than propagating a `NaN` instant. A pre-1888
 * `date` also throws (see the historical-limitation note on
 * `TIMEZONE`), since Japan's local-mean-time offset before that year
 * cannot be expressed as the `±HH:MM` this function builds.
 * @param date The date to truncate.
 * @returns The truncated date.
 */
export const truncateTime = (date: DateParsable): Date => {
  const instant = new Date(date);
  const dayKey = dayKeyOf(instant);
  const offset = offsetOf(instant);
  // `dayKey` is `YYYY-MM-DD` and `offset` is `±HH:MM`, together an
  // ISO-8601 date-time string with an explicit offset, which `Date`
  // parses identically on every host time zone.
  return new Date(`${dayKey}T00:00:00${offset}`);
};

/**
 * Get the week dates.
 * @param start The start date.
 * @returns The week dates.
 */
export const weekDates = (
  start: DateParsable,
): ReadonlyTuple<Date, typeof WEEKDATES> => {
  const t = truncateTime(start);
  return Object.freeze(
    Array.from({ length: WEEKDATES }, (_, i) => plusDate(t, i)),
  ) as ReadonlyTuple<Date, typeof WEEKDATES>;
};
/**
 * Get the week dates range.
 * @param start The start date.
 * @param range The range of the week dates.
 * @returns The week dates range.
 */
export const weekRange = (
  start: DateParsable,
  range: number = WEEKDATES - 1,
): ReadonlyTuple<Date, 2> => {
  const t = truncateTime(start);
  return [plusDate(t, 0), plusDate(t, range)] as const;
};
