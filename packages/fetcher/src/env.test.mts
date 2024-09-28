import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { getCalendarIds, getJwtInput } from './env.mjs';

beforeAll(() => {
  vi.stubEnv('CLIENT_ID', '[client-id]');
  vi.stubEnv('CLIENT_SECRET', '[client-secret]');
  vi.stubEnv('ID_OTHERS', '[id-others]');
  vi.stubEnv('ID_RELEASE', '[id-release]');
  vi.stubEnv('ID_STREAMING', '[id-streaming]');
  vi.stubEnv('REFRESH_TOKEN', '[refresh-token]');
});

afterAll(() => vi.unstubAllEnvs());

describe('calendarIds', () => {
  it('should be { others: "c_[id-others]@group.calendar.google.com", release: "c_[id-release]@group.calendar.google.com", streaming: "c_[id-streaming]@group.calendar.google.com" }', () =>
    expect(getCalendarIds()).toEqual({
      others: 'c_[id-others]@group.calendar.google.com',
      release: 'c_[id-release]@group.calendar.google.com',
      streaming: 'c_[id-streaming]@group.calendar.google.com',
    }));
});

describe('jwtInput', () => {
  it('should be { type: "authorized_user", client_id: "[client-id]", client_secret: "[client-secret]", refresh_token: "[refresh-token]" }', () =>
    expect(getJwtInput()).toEqual({
      type: 'authorized_user',
      client_id: '[client-id]',
      client_secret: '[client-secret]',
      refresh_token: '[refresh-token]',
    }));
});
