import type { Meta, StoryObj } from 'storybook-solidjs';
import { ProfileItem } from './ProfileItem.js';

/** Type definition for the component. */
type Target = typeof ProfileItem;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { children: 'Children', heading: 'Heading' },
  component: ProfileItem,
} satisfies Meta<Target>;
