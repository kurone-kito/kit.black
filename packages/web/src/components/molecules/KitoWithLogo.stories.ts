import type { Meta, StoryObj } from 'storybook-solidjs';
import { KitoWithLogo } from './KitoWithLogo.js';

/** Type definition for the component. */
type Target = typeof KitoWithLogo;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { nextLabel: 'Go to the next avatar' },
  component: KitoWithLogo,
} satisfies Meta<Target>;
