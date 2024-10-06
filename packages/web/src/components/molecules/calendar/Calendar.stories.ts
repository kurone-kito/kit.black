import type { Meta, StoryObj } from 'storybook-solidjs';
import { Calendar } from './Calendar.js';

/** Type definition for the component. */
type Target = typeof Calendar;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    id: 'schedule',
    rows: [
      {
        children: 'Children',
        date: '08/10',
        dateSpan: 2,
        time: '11:45',
        type: 'release',
      },
      { children: 'Children', time: '19:19', type: 'release' },
    ],
    since: '2021-08-10',
    until: '2021-08-17',
  },
  component: Calendar,
} satisfies Meta<Target>;
