import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
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

describe('getCalendarIds validation', () => {
  afterEach(() => vi.stubEnv('ID_STREAMING', '[id-streaming]'));

  it('throws naming the missing variable when an ID is unset', () => {
    vi.stubEnv('ID_STREAMING', '');
    expect(() => getCalendarIds()).toThrow(
      'Missing required environment variable: ID_STREAMING',
    );
  });

  it('throws naming the missing variable when an ID is whitespace-only', () => {
    vi.stubEnv('ID_STREAMING', '   ');
    expect(() => getCalendarIds()).toThrow(
      'Missing required environment variable: ID_STREAMING',
    );
  });
});

describe('getJwtInput validation', () => {
  afterEach(() => vi.stubEnv('CLIENT_ID', '[client-id]'));

  it('throws naming the missing variable when a credential is unset', () => {
    vi.stubEnv('CLIENT_ID', '');
    expect(() => getJwtInput()).toThrow(
      'Missing required environment variable: CLIENT_ID',
    );
  });

  it('throws naming the missing variable when a credential is whitespace-only', () => {
    vi.stubEnv('CLIENT_ID', '   ');
    expect(() => getJwtInput()).toThrow(
      'Missing required environment variable: CLIENT_ID',
    );
  });
});
