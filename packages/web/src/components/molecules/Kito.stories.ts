import type { Meta, StoryObj } from 'storybook-solidjs';
import { Kito } from './Kito.js';

/** Type definition for the component. */
type Target = typeof Kito;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { class: 'w-full', id: 'id' },
  component: Kito,
} satisfies Meta<Target>;
