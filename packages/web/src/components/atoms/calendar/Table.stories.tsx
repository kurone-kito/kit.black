import type { Meta, StoryObj } from 'storybook-solidjs';
import { Table } from './Table.js';

/** Type definition for the component. */
type Target = typeof Table;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    children: (
      <>
        <td>10/21</td>
        <td>19:19</td>
        <td>Children</td>
      </>
    ),
  },
  component: Table,
} satisfies Meta<Target>;
