import holidayJp from '@holiday-jp/holiday_jp';

/** The formatter that extracts the JST calendar date parts from an epoch. */
const jstDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'numeric',
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
});

/**
 * Convert the epoch to the JST calendar date, expressed as a `Date`
 * whose **local** year/month/day match the JST calendar date.
 *
 * `@holiday-jp/holiday_jp`'s `isHoliday` reads back `Date#getFullYear`
 * / `getMonth` / `getDate`, which resolve in the host process's local
 * time zone. Passing the raw epoch straight in would therefore answer
 * for the wrong calendar date whenever the host does not run in JST
 * (for example UTC, this repository's `push.yml` default). Deriving
 * the JST year/month/day first and rebuilding a local `Date` from
 * those parts keeps the lookup correct no matter what time zone the
 * process runs under.
 * @param epoch The epoch time, in milliseconds.
 * @returns The date whose local calendar date is the JST calendar date.
 */
export const toJstCalendarDate = (epoch: number): Date => {
  const parts = jstDateFormatter.formatToParts(new Date(epoch));
  const get = (type: 'day' | 'month' | 'year'): number => {
    const part = parts.find((p) => p.type === type);
    if (!part) {
      // Guard against a silent NaN / Invalid Date: if Intl ever omits
      // a requested part, fail loudly instead of letting holiday
      // detection degrade to a silent false negative.
      throw new Error(`Intl.DateTimeFormat did not return a "${type}" part`);
    }
    return Number(part.value);
  };
  return new Date(get('year'), get('month') - 1, get('day'));
};

/**
 * Determine whether the epoch falls on a Japanese public holiday, in
 * JST, regardless of the host process's time zone.
 * @param epoch The epoch time, in milliseconds.
 * @returns `true` when the JST calendar date is a Japanese public
 * holiday.
 */
export const isJpHoliday = (epoch: number): boolean =>
  holidayJp.isHoliday(toJstCalendarDate(epoch));
