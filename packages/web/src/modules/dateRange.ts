import type { RowProps } from '../components/atoms/calendar/Row.js';

/**
 * Derives the displayed schedule's start/end date labels from the
 * fetched rows, instead of reading the wall clock.
 *
 * Pinning this to the same `rows` the build's `data.json` produced
 * keeps the displayed range in agreement with what is actually
 * rendered, regardless of when or where (server prerender vs. client
 * hydration) this is evaluated -- see #174.
 * @param rows The schedule rows this build's `data.json` produced.
 * @returns A `[since, until]` tuple; each is `''` when no row carries a
 *   `date` (for example, an empty `rows`).
 */
export const dateRangeOf = (
  rows: readonly RowProps[],
): readonly [since: string, until: string] => {
  const dates = rows.flatMap((row) => (row.date ? [row.date] : []));
  return [dates.at(0) ?? '', dates.at(-1) ?? ''];
};
