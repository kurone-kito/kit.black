import type { Meta, StoryObj } from 'storybook-solidjs';
import { IconContainer } from './IconContainer.js';

/** Type definition for the component. */
type Target = typeof IconContainer;

/** The default story for the component: decorative, no accessible name. */
export const Default: StoryObj<Target> = {};

/** A story for the opt-in labeled (non-decorative) variant. */
export const Labeled: StoryObj<Target> = {
  args: { label: 'A named icon' },
};

export default {
  args: { children: '◆', class: 'text-pink-500' },
  component: IconContainer,
} satisfies Meta<Target>;
