import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { calendar_v3 } from 'googleapis';
import {
  fetchAllRawEventsFactory,
  fetchRawEventsFactory,
} from './fetchRaw.mjs';

/**
 * Build a stub `calendar_v3.Calendar` client whose `events.list` method
 * resolves with the given items, without performing any network I/O.
 * Both factories under test accept a client through their existing
 * parameter, so no mocking framework beyond `vi.fn` is needed.
 * @param items The `data.items` the stub response should resolve with.
 * @returns The stub client and the underlying `list` mock, for
 * assertions on call arguments and call count.
 */
const stubClient = (items: readonly calendar_v3.Schema$Event[] | undefined) => {
  const list = vi.fn().mockResolvedValue({ data: { items } });
  const client = { events: { list } } as unknown as calendar_v3.Calendar;
  return { client, list };
};

describe('fetchRawEventsFactory', () => {
  it('always sends singleEvents, the Japan time zone, and startTime ordering', async () => {
    const { client, list } = stubClient([]);
    const fetchRawEvents = fetchRawEventsFactory(client);
    await fetchRawEvents({
      calendarId: 'primary',
      timeMax: 'b',
      timeMin: 'a',
    });
    expect(list).toHaveBeenCalledWith({
      calendarId: 'primary',
      orderBy: 'startTime',
      singleEvents: true,
      timeMax: 'b',
      timeMin: 'a',
      timeZone: 'Asia/Tokyo',
    });
  });

  it('returns an empty array when the response has no items', async () => {
    const { client } = stubClient(undefined);
    const fetchRawEvents = fetchRawEventsFactory(client);
    const result = await fetchRawEvents({ calendarId: 'primary' });
    expect(result).toEqual([]);
  });

  it('returns the response items unchanged', async () => {
    const events: readonly calendar_v3.Schema$Event[] = [
      { id: 'e1' },
      { id: 'e2' },
    ];
    const { client } = stubClient(events);
    const fetchRawEvents = fetchRawEventsFactory(client);
    const result = await fetchRawEvents({ calendarId: 'primary' });
    expect(result).toEqual(events);
  });
});

describe('fetchAllRawEventsFactory', () => {
  // `fetchAllRawEventsFactory` calls `getCalendarIds()` unconditionally
  // in its body, so the `ID_<TYPE>` variables must be stubbed even
  // though the calendar client itself is injected below. The client
  // parameter defaults to `getCalendar()`, but a default parameter only
  // evaluates when the argument is omitted; every test here always
  // passes an explicit stub client, so `getCalendar()` (and the JWT
  // env vars it needs) never runs and does not need stubbing.
  beforeAll(() => {
    vi.stubEnv('ID_OTHERS', '[id-others]');
    vi.stubEnv('ID_RELEASE', '[id-release]');
    vi.stubEnv('ID_STREAMING', '[id-streaming]');
  });

  afterAll(() => vi.unstubAllEnvs());

  it('fans out across all three event types and returns a Map keyed by type', async () => {
    const { client, list } = stubClient([]);
    const fetchAllRawEvents = fetchAllRawEventsFactory(client);
    const since = new Date('2026-01-01T00:00:00+09:00');
    const until = new Date('2026-01-08T00:00:00+09:00');
    const result = await fetchAllRawEvents([since, until]);
    expect(list).toHaveBeenCalledTimes(3);
    expect([...result.keys()].toSorted()).toEqual(
      ['others', 'release', 'streaming'].toSorted(),
    );
  });

  it('passes the calendar id derived from the matching ID_<TYPE> env var for each event type', async () => {
    const { client, list } = stubClient([]);
    const fetchAllRawEvents = fetchAllRawEventsFactory(client);
    const since = new Date('2026-01-01T00:00:00+09:00');
    const until = new Date('2026-01-08T00:00:00+09:00');
    await fetchAllRawEvents([since, until]);
    // Assert all three calls individually, in the fixed `eventTypes`
    // order the factory awaits them in (`others`, `release`,
    // `streaming`) -- asserting only one call (as a previous revision
    // did) would still pass if the calendar ids were reused or swapped
    // across types, since every call in that case would satisfy a
    // single `toHaveBeenCalledWith` check.
    expect(list.mock.calls.map(([params]) => params.calendarId)).toEqual([
      'c_[id-others]@group.calendar.google.com',
      'c_[id-release]@group.calendar.google.com',
      'c_[id-streaming]@group.calendar.google.com',
    ]);
  });

  it('returns an empty array for a type whose response has no items', async () => {
    const { client } = stubClient(undefined);
    const fetchAllRawEvents = fetchAllRawEventsFactory(client);
    const since = new Date('2026-01-01T00:00:00+09:00');
    const until = new Date('2026-01-08T00:00:00+09:00');
    const result = await fetchAllRawEvents([since, until]);
    expect(result.get('others')).toEqual([]);
  });
});
