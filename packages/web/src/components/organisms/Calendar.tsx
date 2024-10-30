import { tupleMap, weekRange, formatDate } from '@kurone-kito/kit.black-lib';
import type { Component } from 'solid-js';
import rows from '../../data.json';
import { useTranslator } from '../../modules/createI18N.js';
import { now } from '../../modules/datetime.js';
import { Article } from '../atoms/Article.js';
import type { RowProps } from '../atoms/calendar/Row.js';
import { Calendar as MoleculeCalendar } from '../molecules/calendar/Calendar.js';

const [since, until] = tupleMap(weekRange(now()), formatDate);

/**
 * The calendar component.
 * @returns The component.
 */
export const Calendar: Component = () => {
  const t = useTranslator();
  return (
    <Article
      class="!px-safe flex flex-col justify-center xl:w-10/12"
      heading="#VTuber予定表"
    >
      <p>{t('calendar')}</p>
      <MoleculeCalendar
        id="calendar"
        rows={rows as readonly RowProps[]}
        since={since}
        until={until}
      />
    </Article>
  );
};
