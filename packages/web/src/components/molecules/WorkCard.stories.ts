import type { Meta, StoryObj } from 'storybook-solidjs';
import { WorkCard } from './WorkCard.js';

/** Type definition for the component. */
type Target = typeof WorkCard;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    alt: 'Alt',
    children: 'Children',
    heading: 'Heading',
    href: 'https://example.com',
    since: 2024,
    src: 'https://placehold.jp/1024x1656.png',
  },
  component: WorkCard,
} satisfies Meta<Target>;
