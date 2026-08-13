import type { ReadonlyRecord } from '@kurone-kito/kit.black-lib';
import type { JWTInput } from 'google-auth-library';
import type { EventType } from './constants.mjs';
import { eventTypes } from './constants.mjs';

/**
 * Read a required environment variable, failing fast with an
 * actionable message when it is missing.
 * @param name The environment variable name.
 * @returns The variable's value.
 * @throws {Error} When the variable is unset or empty.
 */
const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

/**
 * get the calendar IDs for each event type from the environment variables.
 * @returns the calendar IDs for each event type.
 * @throws {Error} When any `ID_<EVENT_TYPE>` variable is unset or empty.
 */
export const getCalendarIds = (): ReadonlyRecord<EventType, string> =>
  eventTypes.reduce<Partial<ReadonlyRecord<EventType, string>>>((acc, cur) => {
    const id = requireEnv(`ID_${cur.toUpperCase()}`);
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
 * @throws {Error} When `CLIENT_ID`, `CLIENT_SECRET`, or `REFRESH_TOKEN`
 * is unset or empty.
 */
export const getJwtInput = (): JWTInput =>
  keys.reduce<JWTInput>(
    (acc, key) => ({ ...acc, [key]: requireEnv(key.toUpperCase()) }),
    { type: 'authorized_user' },
  );
