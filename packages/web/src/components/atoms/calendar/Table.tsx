import type { Component, JSX, ParentProps } from 'solid-js';

/** Type definition for the properties. */
export interface TableProps extends Readonly<ParentProps> {
  /** The label of the date. */
  readonly date: JSX.Element;

  /** The label of the detail. */
  readonly detail: JSX.Element;

  /** The label of the time. */
  readonly time: JSX.Element;
}

/**
 * The table component for schedule
 * @param props The properties.
 * @returns The component.
 */
export const Table: Component<TableProps> = (props) => (
  <table class="table-xs table w-full border-separate border-spacing-x-0.5 border-spacing-y-1 sm:border-spacing-y-1.5 sm:pr-[10%] md:border-spacing-x-1.5 md:pr-[15%] lg:border-spacing-0.5 lg:pr-0 [&_*]:whitespace-nowrap [&_*]:text-nowrap [&_*]:break-keep [&_*]:text-[2.3cqi] lg:[&_*]:text-[1.9cqi]">
    <colgroup>
      <col class="w-1 tracking-tight" />
      <col class="w-28 tracking-tighter" />
      <col class="max-w-0 overflow-ellipsis font-semibold" />
    </colgroup>
    <thead class="[&_th]:bg-base-300/80 [&_th]:rounded-badge [&_th]:p-[1cqi]">
      <tr class="text-center font-bold">
        <th>{props.date}</th>
        <th>{props.time}</th>
        <th>{props.detail}</th>
      </tr>
    </thead>
    <tbody class="[&_.release]:!bg-secondary/80 [&_.release]:text-secondary-content [&_.streaming]:!bg-accent/80 [&_.streaming]:text-accent-content [&_td]:bg-base-300/80 [&_td]:rounded-badge [&_.date]:text-center [&_.sat]:!bg-blue-500/60 [&_.sun]:!bg-red-500/60 [&_.time]:text-center [&_td]:px-[2cqi] [&_td]:py-[1.8cqi]">
      {props.children}
    </tbody>
  </table>
);
