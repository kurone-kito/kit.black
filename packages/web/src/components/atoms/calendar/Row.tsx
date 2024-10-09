import type { EventDetailRow } from '@kurone-kito/kit.black-fetcher';
import type { ReadonlyRecord, Week } from '@kurone-kito/kit.black-lib';
import type { Component } from 'solid-js';
import { mergeProps, Show } from 'solid-js';
import type { Except } from 'type-fest';

export interface RowProps extends Except<Partial<EventDetailRow>, 'week'> {
  /**
   * The week.
   *
   * When omitted the {@link date}, this property is ignored.
   */
  readonly week?: Week | '' | undefined;
}

/** The default properties. */
const defaultProps = { type: 'others', week: '' } as const satisfies RowProps;

/**
 * The row component for schedule.
 * @param props The properties.
 * @returns The component.
 */
export const Row: Component<RowProps> = (props) => {
  const concProps = mergeProps(defaultProps, props);
  type CL = ReadonlyRecord<string, boolean>;
  const tc = { [concProps.type]: !!concProps.type } as const satisfies CL;
  const wc = { [concProps.week]: !!concProps.week } as const satisfies CL;
  return (
    <tr>
      <Show when={props.date}>
        <td classList={wc} rowSpan={props.dateSpan}>
          {props.date}
        </td>
      </Show>
      <Show
        fallback={
          <td classList={tc} colSpan={2}>
            {props.children}
          </td>
        }
        when={props.time}
      >
        <td classList={tc}>{props.time}</td>
        <td classList={tc}>{props.children}</td>
      </Show>
    </tr>
  );
};
