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
 * Format the date.
 * @param from The date to format.
 * @param to The date to format.
 * @returns The formatted date.
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
 * Get the date obtained by adding the specified date.
 *
 * `TIMEZONE` observes no daylight-saving transitions, so one calendar
 * day is always exactly 86,400,000 ms; adding whole days as milliseconds
 * is therefore equivalent to `TIMEZONE` calendar-day arithmetic for any
 * input instant, regardless of the host process's own time zone.
 * @param date The date to add.
 * @param days The days to add.
 * @returns The date obtained by adding the specified date.
 */
export const plusDate = (date: DateParsable, days: number): Date =>
  new Date(new Date(date).getTime() + days * 86_400_000);

/**
 * Truncate the date to `TIMEZONE` midnight of its `TIMEZONE` calendar
 * day, regardless of the host process's own time zone.
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
