import type { Meta, StoryObj } from 'storybook-solidjs';
import { HamburgerButton } from './HamburgerButton.js';

/** Type definition for the component. */
type Target = typeof HamburgerButton;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { class: '' },
  component: HamburgerButton,
} satisfies Meta<Target>;
