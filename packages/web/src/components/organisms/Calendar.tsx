import { tupleMap, weekRange, formatDate } from '@kurone-kito/kit.black-lib';
import type { Component } from 'solid-js';
import rows from '../../data.json';
import { useTranslator } from '../../modules/createI18N.js';
import { Article } from '../atoms/Article.js';
import type { RowProps } from '../atoms/calendar/Row.js';
import { Calendar as MoleculeCalendar } from '../molecules/calendar/Calendar.js';

/*
 * Captured once, at build time -- this must stay aligned with the
 * `data.json` the same build produced, so it is intentionally not a
 * reactive value. Do not replace this with a live-updating clock; doing
 * so would desynchronize the displayed range from the fetched rows.
 */
const [since, until] = tupleMap(weekRange(new Date()), formatDate);

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
