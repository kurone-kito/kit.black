import type { Meta, StoryObj } from 'storybook-solidjs';
import { FooterItem } from './FooterItem.js';

/** Type definition for the component. */
type Target = typeof FooterItem;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { children: '◆', tip: 'Tip', href: 'https://example.com/' },
  component: FooterItem,
} satisfies Meta<Target>;
