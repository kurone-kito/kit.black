import type { Meta, StoryObj } from 'storybook-solidjs';
import { Row } from './Row.js';

/** Type definition for the component. */
type Target = typeof Row;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    date: '08/10',
    children: 'Children',
    dateSpan: 1,
    time: '19:19',
    type: 'release',
    week: '',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['others', 'release', 'streaming'],
    },
    week: {
      control: { type: 'select' },
      options: ['', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    },
  },
  component: Row,
} satisfies Meta<Target>;
