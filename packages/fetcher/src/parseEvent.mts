import type { DateParsable } from '@kurone-kito/kit.black-lib';
import {
  formatDate,
  formatTimeRange,
  tupleMap,
  weekDates,
} from '@kurone-kito/kit.black-lib';
import type { calendar_v3 } from 'googleapis';
import type { EventType } from './constants.mjs';
import { eventTypes, MAX_EVENTS } from './constants.mjs';
import type { EventDetail } from './types.mjs';
import type { ReadonlyTuple } from 'type-fest';

/**
 * Check if the event is available.
 * @param event The raw event.
 * @returns `true` if the event is available, otherwise `false`.
 */
export const isAvailableRaw = (event: calendar_v3.Schema$Event): boolean =>
  event.status !== 'cancelled';

/**
 * Create the function that creates the vacation events.
 * @param since The date to start.
 * @returns The function that creates the vacation events.
 */
export const createVacationEventsFactory = (since: DateParsable) => {
  const datesMap = new Map<string, number>(
    weekDates(since).map((d) => [formatDate(d), d.getTime()] as const),
  );
  const datesSet = new Set(datesMap.keys());
  return (events: readonly EventDetail[]): readonly EventDetail[] => {
    const eventsDate = events.map(({ date }) => date);
    const diff = [...datesSet.difference(new Set(eventsDate))];
    return diff.map<EventDetail>((date) => ({
      date,
      epoch: datesMap.get(date) ?? 0,
      title: '(💤おやすみ)',
      type: 'others',
    }));
  };
};

/**
 * create thee function that converts the raw event to the event.
 * @param type The type of the event.
 * @returns The function that converts the raw event to the event.
 */
export const toEventFactory =
  (type: EventType) =>
  /**
   * Convert the raw event to the event.
   *
   * `calendar_v3.Schema$Event.start` may have neither `dateTime` nor
   * `date` set. Rather than throwing and failing the entire batch on
   * one malformed event, this skips the event: it logs a warning to
   * `stderr` naming the event so the drop is visible in the build log,
   * and returns `undefined` so the caller can filter it out. A skipped
   * event's date is no longer represented, so
   * {@link createVacationEventsFactory} may synthesize a vacation-day
   * placeholder for that date instead -- an accepted side effect of
   * skipping rather than a separate bug.
   * @param raw The raw event.
   * @returns The event, or `undefined` if the event has no resolvable
   * start time.
   */
  (raw: calendar_v3.Schema$Event): EventDetail | undefined => {
    const { end, start, summary } = raw;
    const { dateTime, date } = start ?? {};
    const epoch = new Date((dateTime || date) ?? '').getTime();
    if (Number.isNaN(epoch)) {
      const label = summary?.trim() || raw.id || '(unknown)';
      console.warn(`Skipping event with no resolvable start time: ${label}`);
      return undefined;
    }
    const time = date ? undefined : formatTimeRange(epoch, end?.dateTime ?? '');
    return { date: formatDate(epoch), epoch, time, title: summary ?? '', type };
  };

/**
 * Create the function that converts the raw events to the events.
 * @param span The span of the events.
 * @returns The function that converts the raw events to the events.
 *
 * limited to {@link MAX_EVENTS} items in chronological order.
 */
export const toEventsFactory = (span: ReadonlyTuple<Date, 2>) => {
  const [since, until] = tupleMap(span, (d) => d.getTime());
  const createVacationEvents = createVacationEventsFactory(since);
  return (
    source: ReadonlyMap<EventType, readonly calendar_v3.Schema$Event[]>,
  ): readonly EventDetail[] => {
    const all = eventTypes.flatMap(
      (t) =>
        source
          .get(t)
          ?.filter(isAvailableRaw)
          .map(toEventFactory(t))
          .filter((e): e is EventDetail => e !== undefined) ?? [],
    );
    const merged = [...all, ...createVacationEvents(all)];
    return merged
      .filter(({ epoch: e }) => e >= since && e < until)
      .toSorted((a, b) => a.epoch - b.epoch)
      .slice(0, MAX_EVENTS);
  };
};
