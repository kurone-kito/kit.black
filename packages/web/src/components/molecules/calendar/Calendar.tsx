import type { Component } from 'solid-js';
import { For } from 'solid-js';
import kito2 from '../../../assets/avatars/kito2.webp';
import type { RowProps } from '../../atoms/calendar/Row.js';
import { Row } from '../../atoms/calendar/Row.js';
import { Frame } from './Frame.js';
import { Header } from './Header.js';

/** Type definition for the properties. */
export interface CalendarProps {
  /** The identifier. */
  readonly id?: string | undefined;

  readonly rows?: readonly RowProps[] | undefined;

  /** The since date. */
  readonly since: string;

  /** The until date. */
  readonly until: string;
}

/**
 * The calendar component.
 * @returns The component.
 */
export const Calendar: Component<CalendarProps> = (props) => (
  <section
    class="bg-base-200 @container-[size]/schedule mx-auto mb-8 flex aspect-[3/4] h-auto w-full items-end justify-around bg-[image:var(--image-kito-url)] bg-contain bg-right-top bg-no-repeat p-[3%] shadow-lg lg:aspect-[4/3] xl:w-10/12"
    style={{ '--image-kito-url': `url("${kito2}")` }}
    id={props.id}
  >
    <div class="flex flex-col text-[2.3cqi] lg:flex-row-reverse lg:gap-2 lg:text-[1.8cqi]">
      <Header dateSpan={`${props.since}〜${props.until}`} />
      <Frame>
        <For each={props.rows} fallback={<Row date="--">Loading...</Row>}>
          {(props) => <Row {...props} />}
        </For>
      </Frame>
    </div>
  </section>
);
