import type { BaseExternalAccountClient, JWTInput } from 'google-auth-library';
import type { calendar_v3 } from 'googleapis';
import { google } from 'googleapis';
import type { Except, ReadonlyTuple, SetRequired } from 'type-fest';
import { getCalendarIds, getJwtInput } from './env.mjs';
import type { EventType } from './constants.mjs';
import { eventTypes } from './constants.mjs';
import { tupleMap } from '@kurone-kito/kit.black-lib';

/**
 * Get the calendar client.
 * @param jwtInput The input to the JWT arguments.
 * @returns The calendar client.
 */
export const getCalendar = (
  jwtInput: JWTInput = getJwtInput(),
): calendar_v3.Calendar => {
  const auth = google.auth.fromJSON(jwtInput) as BaseExternalAccountClient;
  return google.calendar({ auth, version: 'v3' });
};

/**
 * Creates a function to fetch raw events.
 * @param client The calendar client.
 * @returns The function to fetch raw events.
 */
export const fetchRawEventsFactory =
  (client: calendar_v3.Calendar = getCalendar()) =>
  /**
   * Fetches raw events.
   * @param params The parameters to fetch events.
   * @returns The raw events.
   */
  async (
    params: Except<
      SetRequired<calendar_v3.Params$Resource$Events$List, 'calendarId'>,
      'singleEvents' | 'timeZone'
    >,
  ): Promise<readonly calendar_v3.Schema$Event[]> => {
    const { data } = await client.events.list({
      singleEvents: true,
      timeZone: 'Asia/Tokyo',
      ...params,
    });
    const { items = [] } = data;
    return items;
  };

/**
 * Fetch all raw events.
 * @param span The date span of the events.
 * @param client The calendar client.
 * @returns The raw events.
 */
export const fetchAllRawEventsFactory = (
  client: calendar_v3.Calendar = getCalendar(),
) => {
  const fetchRawEvents = fetchRawEventsFactory(client);
  const calendarIds = getCalendarIds();
  type Entry = readonly [EventType, readonly calendar_v3.Schema$Event[]];
  return async (
    span: ReadonlyTuple<Date, 2>,
  ): Promise<ReadonlyMap<EventType, readonly calendar_v3.Schema$Event[]>> => {
    const [timeMin, timeMax] = tupleMap(span, (v) => v.toISOString());
    const entries = await eventTypes.reduce<Promise<readonly Entry[]>>(
      (acc, type) =>
        acc.then(async (array) => {
          const calendarId = calendarIds[type];
          const list = await fetchRawEvents({ calendarId, timeMin, timeMax });
          return [...array, [type, list]];
        }),
      Promise.resolve([]),
    );
    return new Map(entries);
  };
};
