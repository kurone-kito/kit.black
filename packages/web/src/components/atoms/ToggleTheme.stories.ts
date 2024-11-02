import type { Meta, StoryObj } from 'storybook-solidjs';
import { ToggleTheme } from './ToggleTheme.js';

/** Type definition for the component. */
type Target = typeof ToggleTheme;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    labelToDark: 'Dark',
    labelToLight: 'Light',
    themes: ['light', 'dark'],
    toggleTooltip: 'Toggle theme',
  },
  component: ToggleTheme,
} satisfies Meta<Target>;
