import type { Meta, StoryObj } from 'storybook-solidjs';
import { LinkItem } from './LinkItem.js';

/** Type definition for the component. */
type Target = typeof LinkItem;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { children: '◆', href: 'https://example.com/' },
  component: LinkItem,
} satisfies Meta<Target>;
