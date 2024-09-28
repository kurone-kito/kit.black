import type { ReadonlyRecord } from '@kurone-kito/kit.black-lib';
import type { JWTInput } from 'google-auth-library';
import type { EventType } from './constants.mjs';
import { eventTypes } from './constants.mjs';

/**
 * get the calendar IDs for each event type from the environment variables.
 * @returns the calendar IDs for each event type.
 */
export const getCalendarIds = (): ReadonlyRecord<EventType, string> =>
  eventTypes.reduce<Partial<ReadonlyRecord<EventType, string>>>((acc, cur) => {
    const id = process.env[`ID_${cur.toUpperCase()}`];
    return { ...acc, [cur]: `c_${id}@group.calendar.google.com` };
  }, {}) as ReadonlyRecord<EventType, string>;

/** The keys to extract from the environment. */
const keys = [
  'client_id',
  'client_secret',
  'refresh_token',
] as const satisfies readonly (keyof JWTInput)[];

/**
 * Get the input to the JWT arguments from the environment variables.
 * @returns the input to the JWT arguments.
 */
export const getJwtInput = (): JWTInput =>
  keys.reduce<JWTInput>(
    (acc, key) => ({ ...acc, [key]: process.env[key.toUpperCase()] }),
    { type: 'authorized_user' },
  );
