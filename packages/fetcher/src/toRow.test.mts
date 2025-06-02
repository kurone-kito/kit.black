import { describe, expect, it, vi } from 'vitest';
import { toRowMapper } from './toRow.mjs';

describe('toRowMapper', () => {
  it('Should map events to rows with date and time', () => {
    const events = [
      {
        date: '08/10',
        epoch: 1628557200000,
        time: '10:00〜11:00',
        title: 'A',
        type: 'others',
      },
      {
        date: '08/10',
        epoch: 1628564400000,
        time: '12:00〜13:00',
        title: 'B',
        type: 'others',
      },
      {
        date: '08/11',
        epoch: 1628640000000,
        title: '(💤おやすみ)',
        type: 'others',
      },
    ] as const;
    expect(events.map(toRowMapper)).toEqual([
      {
        children: 'A',
        date: '08/10',
        dateSpan: 2,
        time: '10:00〜11:00',
        type: 'others',
        week: 'tue',
      },
      {
        children: 'B',
        date: undefined,
        dateSpan: undefined,
        time: '12:00〜13:00',
        type: 'others',
        week: 'tue',
      },
      {
        children: '(💤おやすみ)',
        date: '08/11',
        dateSpan: undefined,
        time: undefined,
        type: 'others',
        week: 'wed',
      },
    ]);
  });
});
