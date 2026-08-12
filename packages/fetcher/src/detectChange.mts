import { WEEKDATES, weekRange } from '@kurone-kito/kit.black-lib';
import { fetchAllRawEventsFactory } from './fetchRaw.mjs';
import { toEventsFactory } from './parseEvent.mjs';
import { toRowMapper } from './toRow.mjs';

/**
 * Normalizes JSON text for a whitespace-insensitive comparison.
 * @param text The text to normalize.
 * @returns The trimmed text.
 */
export const normalize = (text: string): string => text.trim();

/**
 * Determines whether the fresh calendar data differs from the live
 * published data.
 * @param fresh The freshly fetched data, as JSON text.
 * @param live The live published data, as JSON text.
 * @returns `true` when the two differ.
 */
export const isChanged = (fresh: string, live: string): boolean =>
  normalize(fresh) !== normalize(live);

/**
 * Fetches the fresh calendar data as JSON text, in the same shape the
 * fetcher's `kb-fetcher` binary prints (and thus that `prebuild:fetcher`
 * writes to `src/data.json`).
 *
 * This call and the later production build's own `prebuild:fetcher` call
 * are two independent Google Calendar API requests made minutes apart.
 * A calendar edit landing between them can produce a false "unchanged"
 * verdict for a single cycle; this is intentionally accepted (fail-open
 * favors availability over precision) and self-heals at the next
 * scheduled run.
 * @returns The fresh calendar data.
 */
export const fetchFreshDataText = async (): Promise<string> => {
  const fetchAllRawEvents = fetchAllRawEventsFactory();
  const span = weekRange(new Date(), WEEKDATES);
  const toEvents = toEventsFactory(span);
  const raw = await fetchAllRawEvents(span);
  return JSON.stringify(toEvents(raw).map(toRowMapper), undefined, 2);
};

/**
 * Fetches the live published calendar data, bypassing CDN caches.
 * @param url The URL of the live data.
 * @returns The live data text, or `undefined` when it could not be
 * fetched (non-OK response, network error, or any other failure).
 */
export const fetchLiveDataText = async (
  url: string,
): Promise<string | undefined> => {
  try {
    // The unique query string is the CDN-cache bypass: a fresh URL on
    // every call is a guaranteed cache miss, without depending on a
    // `cache` fetch option that this Node runtime's `RequestInit` type
    // does not declare.
    const bypass = `${url}?_=${Date.now()}`;
    const res = await fetch(bypass);
    return res.ok ? await res.text() : undefined;
  } catch {
    return undefined;
  }
};
