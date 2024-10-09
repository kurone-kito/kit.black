import type { Meta, StoryObj } from 'storybook-solidjs';
import { RootTemplate } from './RootTemplate.js';

/** Type definition for the component. */
type Target = typeof RootTemplate;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { children: 'Children' },
  component: RootTemplate,
} satisfies Meta<Target>;
