import type { Meta, StoryObj } from 'storybook-solidjs';
import { Header } from './Header.js';

/** Type definition for the component. */
type Target = typeof Header;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { dateSpan: '10/21〜10/27' },
  component: Header,
} satisfies Meta<Target>;
