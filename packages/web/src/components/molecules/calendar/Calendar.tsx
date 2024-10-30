import type { Component, Ref } from 'solid-js';
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

  /** The reference to the input element. */
  readonly ref?: Ref<HTMLElement> | undefined;

  /** The rows list. */
  readonly rows?: readonly RowProps[] | undefined;

  /** The since date. */
  readonly since: string;

  /** The until date. */
  readonly until: string;
}

/**
 * The calendar component.
 * @param props The properties.
 * @returns The component.
 */
export const Calendar: Component<CalendarProps> = (props) => (
  <section
    class="bg-base-100 border-base-200 @container-[size]/schedule mx-auto my-20 mb-8 flex aspect-[3/4] h-auto w-full items-end justify-around border-2 bg-[image:var(--image-kito-url)] bg-contain bg-right-top bg-no-repeat p-[3%] shadow-lg lg:aspect-[4/3] xl:w-10/12"
    id={props.id}
    ref={props.ref}
    lang="ja"
    style={{ '--image-kito-url': `url('${kito2}')` }}
  >
    <div class="flex flex-col text-[2.3cqi] lg:flex-row-reverse lg:gap-2 lg:text-[1.8cqi]">
      <Header dateSpan={`${props.since}〜${props.until}`} />
      <Frame>
        <For each={props.rows} fallback={<Row date="--">読み込み中...</Row>}>
          {(props) => <Row {...props} />}
        </For>
      </Frame>
    </div>
  </section>
);
