import type { Component, ParentProps } from 'solid-js';
import { Table } from '../../atoms/calendar/Table.js';
import { IconContainer } from '../../atoms/IconContainer.js';

/**
 * The main section component for schedule.
 * @param props The properties.
 */
export const Frame: Component<Readonly<ParentProps>> = (props) => (
  <section class="flex flex-col justify-center lg:basis-8/12">
    <ul class="text-stroke-3 flex gap-4 pt-2 lg:tracking-tighter">
      <li>JST (+9:00)</li>
      <li>
        <IconContainer class="text-accent" />
        &nbsp;ライブ配信あり
      </li>
      <li>
        <IconContainer class="text-secondary" />
        &nbsp;作品リリースあり
      </li>
    </ul>
    <Table>{props.children}</Table>
    <p class="text-stroke-3 drop-shadow">
      お仕事ぱたぱたのため、状況により変更・延期となる場合があります🐱💦
    </p>
  </section>
);
