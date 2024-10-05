import type { Component, ParentProps } from 'solid-js';

/**
 * The table component for schedule
 * @param props
 * @returns The component.
 */
export const Table: Component<Readonly<ParentProps>> = (props) => (
  <table class="table-xs text-neutral-content table w-full border-separate border-spacing-x-0.5 border-spacing-y-1 sm:border-spacing-y-1.5 sm:pr-[10%] md:border-spacing-x-1.5 md:pr-[15%] lg:border-spacing-0.5 lg:pr-0 [&_*]:whitespace-nowrap [&_*]:text-nowrap [&_*]:break-keep [&_*]:text-[2.3cqi] lg:[&_*]:text-[1.9cqi]">
    <colgroup>
      <col class="w-1 text-center tracking-tight" />
      <col class="w-28 tracking-tighter" />
      <col class="max-w-0 overflow-ellipsis font-semibold" />
    </colgroup>
    <thead class="[&_th]:text-neutral-content [&_th]:rounded-full [&_th]:bg-neutral-800/35 [&_th]:p-[1cqi] [&_th]:drop-shadow-lg [&_th]:backdrop-blur-sm [&_th]:backdrop-filter">
      <tr class="text-center font-bold">
        <th>日付</th>
        <th>時刻</th>
        <th>活動内容</th>
      </tr>
    </thead>
    <tbody class="[&_.release]:!bg-secondary/60 [&_.release]:text-secondary-content [&_.streaming]:!bg-primary/60 [&_.streaming]:text-primary-content [&_.sat]:!bg-blue-500/60 [&_.sun]:!bg-red-500/60 [&_td]:rounded-full [&_td]:bg-neutral-900/40 [&_td]:px-[2cqi] [&_td]:py-[1.8cqi] [&_td]:drop-shadow-lg [&_td]:backdrop-blur-sm [&_td]:backdrop-filter">
      {props.children}
    </tbody>
  </table>
);
