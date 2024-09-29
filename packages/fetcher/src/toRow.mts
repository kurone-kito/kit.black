import { Mapper, formatWeek } from '@kurone-kito/kit.black-lib';
import type { EventDetail, EventDetailRow } from './types.mjs';

/**
 * Maps the event to the row properties.
 * @param item The event.
 * @param index The index.
 * @param array The array.
 * @returns The row properties.
 */
export const toRowMapper: Mapper<EventDetail, EventDetailRow> = (
  item,
  index,
  array,
) => {
  const { date: dt, epoch, time, title: children, type } = item;
  const week = formatWeek(epoch);
  const equalsDate = (e: EventDetail) => e.date === dt;
  const date = index === array.findIndex(equalsDate) ? dt : undefined;
  const span = array.filter(equalsDate).length;
  const dateSpan = date && span > 1 ? span : undefined;
  return { children, date, dateSpan, time, type, week } as const;
};
