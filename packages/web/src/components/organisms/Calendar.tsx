import type { Component } from 'solid-js';
import rows from '../../data.json';
import { dateRangeOf } from '../../modules/dateRange.js';
import { calendarDownloadFilename } from '../../modules/downloadFilename.js';
import { useTranslator } from '../../modules/createI18N.js';
import { Article } from '../atoms/Article.js';
import type { RowProps } from '../atoms/calendar/Row.js';
import { DownloadCalendarButton } from '../atoms/DownloadCalendarButton.js';
import { Calendar as MoleculeCalendar } from '../molecules/calendar/Calendar.js';

/*
 * Derived once, at build time, from the same `rows` the component
 * renders below -- so this must stay aligned with the `data.json` the
 * same build produced, and is intentionally not a reactive value. Do
 * not replace this with a wall-clock read (`new Date()`); this module
 * evaluates once server-side during prerender and again client-side on
 * hydration, and a wall-clock value can disagree between the two once
 * real time has passed -- see #174.
 */
const typedRows = rows as readonly RowProps[];
const [since, until] = dateRangeOf(typedRows);

/**
 * The calendar component.
 * @returns The component.
 */
export const Calendar: Component = () => {
  const t = useTranslator();
  let calendarRef!: HTMLElement;

  /**
   * Captures the calendar element and downloads it as an image.
   *
   * `@zumer/snapdom` is browser-only, so it is loaded via a dynamic
   * `import()` inside this handler -- never as a top-level import --
   * so SolidStart SSR and the static build never evaluate it.
   */
  const handleDownload = async (): Promise<void> => {
    let url: string | undefined;
    let anchor: HTMLAnchorElement | undefined;
    try {
      const { snapdom } = await import('@zumer/snapdom');
      const blob = await snapdom.toBlob(calendarRef, {
        embedFonts: true,
        scale: 2,
        type: 'webp',
      });
      const filename = calendarDownloadFilename(since, until, blob.type);
      url = URL.createObjectURL(blob);
      anchor = document.createElement('a');
      anchor.download = filename;
      anchor.href = url;
      document.body.appendChild(anchor);
      anchor.click();
    } catch (error) {
      console.error('Failed to download the calendar image.', error);
    } finally {
      anchor?.remove();
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <Article
      class="!px-safe flex flex-col justify-center xl:w-10/12"
      heading="#VTuber予定表"
    >
      <p>{t('calendar')}</p>
      <MoleculeCalendar
        id="calendar"
        ref={calendarRef}
        rows={typedRows}
        since={since}
        until={until}
      />
      <DownloadCalendarButton
        class="mx-auto"
        label={t('downloadCalendar')}
        onClick={handleDownload}
      />
    </Article>
  );
};
