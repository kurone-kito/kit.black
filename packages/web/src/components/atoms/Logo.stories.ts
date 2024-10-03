import type { Meta, StoryObj } from 'storybook-solidjs';
import { Logo } from './Logo.js';

/** Type definition for the component. */
type Target = typeof Logo;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { class: '', level: 1 },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: Array.from({ length: 6 }, (_, i) => i + 1),
    },
  },
  component: Logo,
} satisfies Meta<Target>;
