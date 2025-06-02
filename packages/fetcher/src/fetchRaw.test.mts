import type { calendar_v3 } from 'googleapis';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  fetchAllRawEventsFactory,
  fetchRawEventsFactory,
  getCalendar,
} from './fetchRaw.mjs';

vi.mock('./env.mjs', () => ({
  getCalendarIds: vi.fn(() => ({
    others: 'id-others',
    release: 'id-release',
    streaming: 'id-streaming',
  })),
  getJwtInput: vi.fn(() => ({
    client_id: 'a',
    client_secret: 'b',
    refresh_token: 'c',
    type: 'authorized_user',
  })),
}));

vi.mock('googleapis', () => ({
  google: {
    auth: { fromJSON: vi.fn(() => 'auth') },
    calendar: vi.fn(() => ({
      events: { list: vi.fn(async () => ({ data: { items: ['item'] } })) },
    })),
  },
}));

const createClient = (): calendar_v3.Calendar =>
  ({
    events: { list: vi.fn(async () => ({ data: { items: ['event'] } })) },
  }) as unknown as calendar_v3.Calendar;

describe('getCalendar', () => {
  it('creates calendar client with given jwt', async () => {
    const { google } = await import('googleapis');
    const jwt = { client_id: 'x' } as any;
    const calendar = getCalendar(jwt);
    expect(google.auth.fromJSON).toHaveBeenCalledWith(jwt);
    expect(google.calendar).toHaveBeenCalledWith({
      auth: 'auth',
      version: 'v3',
    });
    expect(calendar).toHaveProperty('events');
  });
});

describe('fetchRawEventsFactory', () => {
  let client: calendar_v3.Calendar;
  beforeEach(() => {
    client = createClient();
  });
  it('fetches events from calendar', async () => {
    const fetchRawEvents = fetchRawEventsFactory(client);
    const result = await fetchRawEvents({ calendarId: 'id' });
    expect(client.events.list).toHaveBeenCalledWith({
      calendarId: 'id',
      singleEvents: true,
      timeZone: 'Asia/Tokyo',
    });
    expect(result).toEqual(['event']);
  });
});

describe('fetchAllRawEventsFactory', () => {
  it('aggregates events from each calendar', async () => {
    const client = createClient();
    const factory = fetchAllRawEventsFactory(client);
    const span = [new Date('2020-01-01'), new Date('2020-01-02')] as const;
    const map = await factory(span);
    const { list } = client.events;
    expect(list).toHaveBeenCalledTimes(3);
    expect(map.get('others')).toEqual(['event']);
    expect(map.get('release')).toEqual(['event']);
    expect(map.get('streaming')).toEqual(['event']);
  });
});
