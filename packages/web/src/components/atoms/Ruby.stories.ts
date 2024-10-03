import type { Meta, StoryObj } from 'storybook-solidjs';
import { Ruby } from './Ruby.js';

/** Type definition for the component. */
type Target = typeof Ruby;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { children: 'Children', class: '', ruby: 'Ruby' },
  component: Ruby,
} satisfies Meta<Target>;
