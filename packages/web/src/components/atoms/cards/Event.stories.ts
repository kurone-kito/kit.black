import type { Meta, StoryObj } from 'storybook-solidjs';
import { Event } from './Event.js';

/** Type definition for the component. */
type Target = typeof Event;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    alt: 'Alt',
    children: 'Children',
    heading: 'Heading',
    src: 'https://placehold.jp/1280x1810.png',
  },
  component: Event,
} satisfies Meta<Target>;
