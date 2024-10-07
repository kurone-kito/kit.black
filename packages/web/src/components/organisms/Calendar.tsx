import { tupleMap, weekRange, formatDate } from '@kurone-kito/kit.black-lib';
import type { Component } from 'solid-js';
import rows from '../../data.json';
import { Article } from '../atoms/Article.js';
import type { RowProps } from '../atoms/calendar/Row.js';
import { Calendar as MoleculeCalendar } from '../molecules/calendar/Calendar.js';
import { now } from '../../modules/datetime.js';

const [since, until] = tupleMap(weekRange(now()), formatDate);

/**
 * The calendar component.
 * @returns The component.
 */
export const Calendar: Component = () => (
  <Article
    class="!px-safe flex flex-col justify-center xl:w-10/12"
    heading="#VTuber予定表"
  >
    <MoleculeCalendar
      id="calendar"
      rows={rows as readonly RowProps[]}
      since={since}
      until={until}
    />
  </Article>
);
