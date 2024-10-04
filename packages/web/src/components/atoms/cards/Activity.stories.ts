import type { Meta, StoryObj } from 'storybook-solidjs';
import { Activity } from './Activity.js';

/** Type definition for the component. */
type Target = typeof Activity;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    alt: 'Alt',
    children: 'Children',
    heading: 'Heading',
    src: 'https://placehold.jp/1280x720.png',
  },
  component: Activity,
} satisfies Meta<Target>;
