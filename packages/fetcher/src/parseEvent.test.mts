import { formatDate, weekDates } from '@kurone-kito/kit.black-lib';
import type { calendar_v3 } from 'googleapis';
import { describe, expect, it } from 'vitest';
import type { EventType } from './constants.mjs';
import {
  createVacationEventsFactory,
  isAvailableRaw,
  toEventFactory,
  toEventsFactory,
} from './parseEvent.mjs';

if (!(Set.prototype as any).difference) {
  // eslint-disable-next-line no-extend-native
  (Set.prototype as any).difference = function (other: Set<unknown>) {
    const res = new Set(this);
    for (const v of Array.from(other)) res.delete(v);
    return res;
  };
}

describe('toEventFactory', () => {
  it('Should convert raw event to event', () => {
    const raw: calendar_v3.Schema$Event = {
      start: { dateTime: '2021-08-10T10:00:00+09:00' },
      end: { dateTime: '2021-08-10T11:00:00+09:00' },
      summary: 'A',
    };
    const toEvent = toEventFactory('others');
    expect(toEvent(raw)).toEqual({
      date: '08/10',
      epoch: new Date('2021-08-10T10:00:00+09:00').getTime(),
      time: '10:00〜11:00',
      title: 'A',
      type: 'others',
    });
  });

  it('Should convert raw event with date to event', () => {
    const raw: calendar_v3.Schema$Event = {
      start: { date: '2021-08-10' },
      end: { date: '2021-08-11' },
    };
    const toEvent = toEventFactory('release');
    expect(toEvent(raw)).toEqual({
      date: '08/10',
      epoch: new Date('2021-08-10').getTime(),
      time: undefined,
      title: '',
      type: 'release',
    });
  });
});

describe('isAvailableRaw', () => {
  it('returns true when status is not cancelled', () => {
    expect(
      isAvailableRaw({ status: 'confirmed' } as calendar_v3.Schema$Event),
    ).toBe(true);
  });

  it('returns false when status is cancelled', () => {
    expect(
      isAvailableRaw({ status: 'cancelled' } as calendar_v3.Schema$Event),
    ).toBe(false);
  });
});

describe('createVacationEventsFactory', () => {
  it('creates vacation events for missing dates', () => {
    const since = new Date('2021-08-10T00:00:00Z');
    const events = [
      {
        date: '08/10',
        epoch: new Date('2021-08-10T10:00:00+09:00').getTime(),
        title: 'A',
        type: 'others',
      },
    ] as const;
    const createVacations = createVacationEventsFactory(since);
    const result = createVacations(events);
    const expected = weekDates(since)
      .slice(1)
      .map((d) => ({
        date: formatDate(d),
        epoch: d.getTime(),
        title: '(💤おやすみ)',
        type: 'others',
      }));
    expect(result).toEqual(expected);
  });
});

describe('toEventsFactory', () => {
  it('merges events with vacations and sorts them', () => {
    const since = new Date('2021-08-10T00:00:00Z');
    const until = new Date('2021-08-17T00:00:00Z');
    const map = new Map<EventType, readonly calendar_v3.Schema$Event[]>([
      [
        'others',
        [
          {
            start: { dateTime: '2021-08-10T10:00:00+09:00' },
            end: { dateTime: '2021-08-10T11:00:00+09:00' },
            summary: 'A',
          },
          { status: 'cancelled' } as calendar_v3.Schema$Event,
        ],
      ],
      [
        'release',
        [
          {
            start: { date: '2021-08-12' },
            end: { date: '2021-08-13' },
          },
        ],
      ],
      ['streaming', []],
    ]);
    const toEvents = toEventsFactory([since, until]);
    const result = toEvents(map);
    const vacations = weekDates(since)
      .filter((d) => !['08/10', '08/12'].includes(formatDate(d)))
      .map((d) => ({
        date: formatDate(d),
        epoch: d.getTime(),
        title: '(💤おやすみ)',
        type: 'others',
      }));
    const expected = [
      {
        date: '08/10',
        epoch: new Date('2021-08-10T10:00:00+09:00').getTime(),
        time: '10:00〜11:00',
        title: 'A',
        type: 'others',
      },
      vacations[0],
      {
        date: '08/12',
        epoch: new Date('2021-08-12').getTime(),
        time: undefined,
        title: '',
        type: 'release',
      },
      ...vacations.slice(1),
    ];
    expect(result).toEqual(expected);
  });
});
