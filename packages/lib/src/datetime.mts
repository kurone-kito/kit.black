import type { ReadonlyTuple } from 'type-fest';

/** Type definition that the value which parsable as a date. */
export type DateParsable = ConstructorParameters<typeof Date>[number];

/** Type definition that the week. */
export type Week = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

/** The length of the week dates. */
export const WEEKDATES = 7;

/** The date formatter. */
const dateFormatter = new Intl.DateTimeFormat('en-ZA', {
  month: 'numeric',
  day: 'numeric',
  timeZone: 'Asia/Tokyo',
});

/** The time formatter. */
const timeFormatter = new Intl.DateTimeFormat('en-ZA', {
  minute: 'numeric',
  hour: 'numeric',
  timeZone: 'Asia/Tokyo',
});

/** The week formatter. */
const weekFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  timeZone: 'Asia/Tokyo',
});

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
  const overDate = dateFrom.getDate() !== dateTo.getDate();
  return `${formatTime(from)}〜${overDate ? '翌' : ''}${formatTime(to)}`;
};

/**
 * Get the date obtained by adding the specified date.
 * @param date The date to add.
 * @param days The days to add.
 * @returns The date obtained by adding the specified date.
 */
export const plusDate = (date: DateParsable, days: number): Date => {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + days);
  return clone;
};

/**
 * Truncate the date.
 * @param date The date to truncate.
 * @returns The truncated date.
 */
export const truncateTime = (date: DateParsable): Date => {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
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
