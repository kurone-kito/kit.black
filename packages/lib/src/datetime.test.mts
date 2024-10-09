import { describe, expect, expectTypeOf, it } from 'vitest';
import type { DateParsable } from './datetime.mjs';
import {
  formatDate,
  formatTime,
  formatTimeRange,
  formatWeek,
  plusDate,
  truncateTime,
  weekDates,
  weekRange,
} from './datetime.mjs';

describe('DateParsable', () => {
  it('should be a Date or string', () =>
    expectTypeOf<DateParsable>().toEqualTypeOf<string | number | Date>());
});

describe('formatDate', () => {
  it.each([
    ['2021-08-10T11:45:14.191Z', '08/10'],
    [new Date('2021-08-10T11:45:14.191Z'), '08/10'],
    [1_628_595_914_191, '08/10'],
  ])('%s -> "%s"', (date, expected) => expect(formatDate(date)).toBe(expected));
});

describe('formatTime', () => {
  it.each([
    ['2021-08-10T11:45:14.191Z', '20:45'],
    [new Date('2021-08-10T11:45:14.191Z'), '20:45'],
    [1_628_595_914_191, '20:45'],
  ])('%s -> "%s"', (date, expected) => expect(formatTime(date)).toBe(expected));
});

describe('formatTimeRange', () => {
  it.each([
    [
      '2021-08-10T11:45:14.191Z',
      new Date('2021-08-10T12:45:14.191Z'),
      '20:45〜21:45',
    ],
    [new Date('2021-08-10T11:45:14.191Z'), 1_628_599_514_191, '20:45〜21:45'],
    [1_628_595_914_191, '2021-08-10T12:45:14.191Z', '20:45〜21:45'],
    [
      '2021-08-10T11:45:14.191Z',
      new Date('2021-08-11T11:45:14.191Z'),
      '20:45〜翌20:45',
    ],
    [new Date('2021-08-10T11:45:14.191Z'), 1_628_682_314_191, '20:45〜翌20:45'],
    [1_628_595_914_191, '2021-08-11T11:45:14.191Z', '20:45〜翌20:45'],
  ])('%s, %s -> "%s"', (from, to, expected) =>
    expect(formatTimeRange(from, to)).toBe(expected),
  );
});

describe('formatWeek', () => {
  it.each([
    ['2021-08-10T11:45:14.191Z', 'tue'],
    [new Date('2021-08-10T11:45:14.191Z'), 'tue'],
    [1_628_595_914_191, 'tue'],
  ])('%s -> "%s"', (date, expected) => expect(formatWeek(date)).toBe(expected));
});

describe('plusDate', () => {
  it.each([
    ['2021-08-10T11:45:14.191Z', 1, '2021-08-11T11:45:14.191Z'],
    [new Date('2021-08-10T11:45:14.191Z'), 1, '2021-08-11T11:45:14.191Z'],
    [1_628_595_914_191, 1, '2021-08-11T11:45:14.191Z'],
  ])('%s, %s -> "%s"', (date, days, expected) =>
    expect(plusDate(date, days).toISOString()).toBe(expected),
  );
});

describe('truncateTime', () => {
  it.each([
    ['2021-08-10T11:45:14.191', new Date('2021-08-10T00:00')],
    [new Date('2021-08-10T11:45:14.191'), new Date('2021-08-10T00:00')],
  ])('%s -> "%s"', (date, expected) =>
    expect(truncateTime(date)).toEqual(expected),
  );
});

describe('weekDates', () => {
  it.each([
    [
      '2021-08-10T11:45:14.191',
      [
        new Date('2021-08-10T00:00'),
        new Date('2021-08-11T00:00'),
        new Date('2021-08-12T00:00'),
        new Date('2021-08-13T00:00'),
        new Date('2021-08-14T00:00'),
        new Date('2021-08-15T00:00'),
        new Date('2021-08-16T00:00'),
      ],
    ],
    [
      '2021-09-19T11:45:14.810',
      [
        new Date('2021-09-19T00:00'),
        new Date('2021-09-20T00:00'),
        new Date('2021-09-21T00:00'),
        new Date('2021-09-22T00:00'),
        new Date('2021-09-23T00:00'),
        new Date('2021-09-24T00:00'),
        new Date('2021-09-25T00:00'),
      ],
    ],
  ])('%s -> "%s"', (date, expected) =>
    expect(weekDates(date)).toEqual(expected),
  );
});

describe('weekRange', () => {
  it.each([
    [
      '2021-08-10T11:45:14.191',
      6,
      [new Date('2021-08-10T00:00'), new Date('2021-08-16T00:00')],
    ],
    [
      '2021-09-19T11:45:14.810',
      6,
      [new Date('2021-09-19T00:00'), new Date('2021-09-25T00:00')],
    ],
  ])('%s, %s -> "%s"', (date, range, expected) =>
    expect(weekRange(date, range)).toEqual(expected),
  );
});
