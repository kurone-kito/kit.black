import type { Meta, StoryObj } from 'storybook-solidjs';
import { HeaderItem } from './HeaderItem.js';

/** Type definition for the component. */
type Target = typeof HeaderItem;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { accountId: 'AccountId', children: '◆', href: 'https://example.com/' },
  component: HeaderItem,
} satisfies Meta<Target>;
