import { describe, expect, it } from 'vitest';
import {
  calendarDownloadFilename,
  extensionFromBlobType,
} from './downloadFilename.js';

describe('extensionFromBlobType', () => {
  it.each([
    ['image/webp', 'webp'],
    ['image/png', 'png'],
  ] as const)('%s -> "%s"', (blobType, expected) =>
    expect(extensionFromBlobType(blobType)).toBe(expected),
  );

  it('falls back to png for an unexpected blob type', () =>
    expect(extensionFromBlobType('image/jpeg')).toBe('png'));
});

describe('calendarDownloadFilename', () => {
  it('builds a webp filename from the displayed range', () =>
    expect(calendarDownloadFilename('08/10', '08/16', 'image/webp')).toBe(
      'schedule-08-10-08-16.webp',
    ));

  it('builds a png filename from the displayed range', () =>
    expect(calendarDownloadFilename('08/10', '08/16', 'image/png')).toBe(
      'schedule-08-10-08-16.png',
    ));
});
