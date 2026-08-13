import type { Meta, StoryObj } from 'storybook-solidjs';
import { Splash } from './Splash.js';

/** Type definition for the component. */
type Target = typeof Splash;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { animation: true, label: 'Loading the website' },
  component: Splash,
} satisfies Meta<Target>;
