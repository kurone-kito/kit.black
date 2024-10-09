import type { Meta, StoryObj } from 'storybook-solidjs';
import { Frame } from './Frame.js';

/** Type definition for the component. */
type Target = typeof Frame;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    children: (
      <>
        <td>10/21</td>
        <td>1:00</td>
        <td>Children</td>
      </>
    ),
  },
  component: Frame,
} satisfies Meta<Target>;
