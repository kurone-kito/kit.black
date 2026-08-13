import { afterEach, describe, expect, it, vi } from 'vitest';
import type { calendar_v3 } from 'googleapis';
import { MAX_EVENTS } from './constants.mjs';
import type { EventType } from './constants.mjs';
import {
  createVacationEventsFactory,
  isAvailableRaw,
  toEventFactory,
  toEventsFactory,
} from './parseEvent.mjs';

afterEach(() => vi.restoreAllMocks());

describe('toEventFactory', () => {
  it('maps a timed event to an EventDetail', () => {
    const raw: calendar_v3.Schema$Event = {
      end: { dateTime: '2026-01-01T13:00:00+09:00' },
      id: 'timed-event',
      start: { dateTime: '2026-01-01T12:00:00+09:00' },
      summary: 'New Year',
    };
    const event = toEventFactory('others')(raw);
    expect(event).toEqual({
      date: '01/01',
      epoch: Date.parse('2026-01-01T12:00:00+09:00'),
      time: '12:00〜13:00',
      title: 'New Year',
      type: 'others',
    });
  });

  it('maps an all-day event (date only, no dateTime) to an EventDetail with no time', () => {
    const raw: calendar_v3.Schema$Event = {
      id: 'all-day-event',
      start: { date: '2026-01-01' },
      summary: 'Holiday',
    };
    const event = toEventFactory('others')(raw);
    expect(event?.time).toBeUndefined();
    expect(event?.title).toBe('Holiday');
  });

  it('skips an event whose start has neither dateTime nor date, without throwing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const raw: calendar_v3.Schema$Event = {
      id: 'malformed-event',
      start: {},
      summary: 'Malformed',
    };
    expect(() => toEventFactory('others')(raw)).not.toThrow();
    expect(toEventFactory('others')(raw)).toBeUndefined();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Malformed'));
  });

  it('skips an event with no start object at all, without throwing', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const raw: calendar_v3.Schema$Event = { id: 'no-start-event' };
    expect(() => toEventFactory('others')(raw)).not.toThrow();
    expect(toEventFactory('others')(raw)).toBeUndefined();
  });

  it('falls back to the event id when summary is an empty string', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const raw: calendar_v3.Schema$Event = {
      id: 'empty-summary-event',
      start: {},
      summary: '',
    };
    toEventFactory('others')(raw);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('empty-summary-event'),
    );
  });

  it('falls back to the event id when summary is whitespace-only', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const raw: calendar_v3.Schema$Event = {
      id: 'whitespace-summary-event',
      start: {},
      summary: '   ',
    };
    toEventFactory('others')(raw);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('whitespace-summary-event'),
    );
  });

  it('renders the 翌 (next-day) marker when the event crosses a JST midnight', () => {
    const raw: calendar_v3.Schema$Event = {
      end: { dateTime: '2026-01-02T00:30:00+09:00' },
      id: 'midnight-event',
      start: { dateTime: '2026-01-01T23:30:00+09:00' },
      summary: 'Late Night',
    };
    const event = toEventFactory('others')(raw);
    expect(event).toEqual({
      date: '01/01',
      epoch: Date.parse('2026-01-01T23:30:00+09:00'),
      time: '23:30〜翌00:30',
      title: 'Late Night',
      type: 'others',
    });
  });
});

describe('isAvailableRaw', () => {
  it('excludes a cancelled event', () => {
    const raw: calendar_v3.Schema$Event = {
      id: 'cancelled',
      status: 'cancelled',
    };
    expect(isAvailableRaw(raw)).toBe(false);
  });

  it('keeps an event whose status is not cancelled', () => {
    const raw: calendar_v3.Schema$Event = {
      id: 'confirmed',
      status: 'confirmed',
    };
    expect(isAvailableRaw(raw)).toBe(true);
  });

  it('keeps an event with no status field at all', () => {
    const raw: calendar_v3.Schema$Event = { id: 'no-status' };
    expect(isAvailableRaw(raw)).toBe(true);
  });
});

describe('createVacationEventsFactory', () => {
  // JST midnight of 2026-01-01, expressed with a fixed offset so the
  // assertion does not depend on the host process's own time zone.
  const since = Date.parse('2026-01-01T00:00:00+09:00');

  it('creates one vacation row for every date in the 7-day window when there are no events', () => {
    const createVacationEvents = createVacationEventsFactory(since);
    const rows = createVacationEvents([]);
    expect(rows.map((r) => r.date).toSorted()).toEqual([
      '01/01',
      '01/02',
      '01/03',
      '01/04',
      '01/05',
      '01/06',
      '01/07',
    ]);
    for (const row of rows) {
      expect(row.title).toBe('(💤おやすみ)');
      expect(row.type).toBe('others');
    }
  });

  it('omits a vacation row for a date that already has an event', () => {
    const createVacationEvents = createVacationEventsFactory(since);
    const existing = {
      date: '01/03',
      epoch: 0,
      title: 'Something',
      type: 'others' as const,
    };
    const rows = createVacationEvents([existing]);
    expect(rows).toHaveLength(6);
    expect(rows.some((r) => r.date === '01/03')).toBe(false);
  });

  it('anchors the vacation row epoch to that date’s JST midnight', () => {
    const createVacationEvents = createVacationEventsFactory(since);
    const rows = createVacationEvents([]);
    const jan1 = rows.find((r) => r.date === '01/01');
    expect(jan1?.epoch).toBe(Date.parse('2026-01-01T00:00:00+09:00'));
  });
});

describe('toEventsFactory', () => {
  it('keeps an event exactly at `since` and drops an event exactly at `until`', () => {
    const since = new Date('2026-01-01T00:00:00+09:00');
    const until = new Date('2026-01-02T00:00:00+09:00');
    const toEvents = toEventsFactory([since, until] as const);
    const atSince: calendar_v3.Schema$Event = {
      end: { dateTime: new Date(since.getTime() + 1_800_000).toISOString() },
      id: 'at-since',
      start: { dateTime: since.toISOString() },
      summary: 'At since',
    };
    const atUntil: calendar_v3.Schema$Event = {
      end: { dateTime: new Date(until.getTime() + 1_800_000).toISOString() },
      id: 'at-until',
      start: { dateTime: until.toISOString() },
      summary: 'At until',
    };
    const source = new Map<EventType, readonly calendar_v3.Schema$Event[]>([
      ['others', [atSince, atUntil]],
    ]);
    const result = toEvents(source);
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('At since');
  });

  it('truncates to MAX_EVENTS after chronological sort, not before', () => {
    const since = new Date('2026-01-01T00:00:00+09:00');
    const until = new Date('2026-01-02T00:00:00+09:00');
    const toEvents = toEventsFactory([since, until] as const);
    const count = MAX_EVENTS + 1;
    // Fixed 10-minute-apart timestamps, all inside the one-day window.
    const raw: calendar_v3.Schema$Event[] = Array.from(
      { length: count },
      (_, i) => ({
        end: {
          dateTime: new Date(
            since.getTime() + i * 600_000 + 300_000,
          ).toISOString(),
        },
        id: `event-${i}`,
        start: {
          dateTime: new Date(since.getTime() + i * 600_000).toISOString(),
        },
        summary: `Event ${i}`,
      }),
      // Insert in reverse-chronological order, so a hypothetical
      // slice-before-sort implementation would keep the wrong 12.
    ).toReversed();
    const source = new Map<EventType, readonly calendar_v3.Schema$Event[]>([
      ['others', raw],
    ]);
    const result = toEvents(source);
    expect(result).toHaveLength(MAX_EVENTS);
    // The earliest event (index 0) must survive; the latest (index
    // `count - 1`, the 13th) must be truncated away.
    expect(result.some((e) => e.title === 'Event 0')).toBe(true);
    expect(result.some((e) => e.title === `Event ${count - 1}`)).toBe(false);
    expect([...result]).toEqual(
      [...result].toSorted((a, b) => a.epoch - b.epoch),
    );
  });

  it('merges synthesized vacation rows for in-window dates with no events', () => {
    const since = new Date('2026-01-01T00:00:00+09:00');
    const until = new Date('2026-01-03T00:00:00+09:00');
    const toEvents = toEventsFactory([since, until] as const);
    const dayOne: calendar_v3.Schema$Event = {
      end: { dateTime: new Date(since.getTime() + 1_800_000).toISOString() },
      id: 'day-one',
      start: { dateTime: since.toISOString() },
      summary: 'Day one event',
    };
    const source = new Map<EventType, readonly calendar_v3.Schema$Event[]>([
      ['others', [dayOne]],
    ]);
    const result = toEvents(source);
    expect(result.map((e) => e.date)).toEqual(['01/01', '01/02']);
    expect(result[1]?.title).toBe('(💤おやすみ)');
  });
});
