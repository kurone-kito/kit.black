import { afterEach, describe, expect, it, vi } from 'vitest';
import type { calendar_v3 } from 'googleapis';
import { toEventFactory } from './parseEvent.mjs';

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
});
