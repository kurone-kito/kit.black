import type { Meta, StoryObj } from 'storybook-solidjs';
import { Anchor } from './Anchor.js';

/** Type definition for the component. */
type Target = typeof Anchor;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { children: 'Children', class: 'link', href: 'https://example.com' },
  component: Anchor,
} satisfies Meta<Target>;
