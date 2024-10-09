import type { Meta, StoryObj } from 'storybook-solidjs';
import { IconContainer } from './IconContainer.js';

/** Type definition for the component. */
type Target = typeof IconContainer;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { children: '◆', class: 'text-pink-500' },
  component: IconContainer,
} satisfies Meta<Target>;
