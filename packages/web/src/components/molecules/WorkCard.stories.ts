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
    class: 'prose',
    heading: 'Heading',
    href: 'https://example.com',
    released: '2024 年リリース',
    src: 'https://placehold.jp/1024x1656.png',
  },
  component: WorkCard,
} satisfies Meta<Target>;
