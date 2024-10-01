import type { Meta, StoryObj } from 'storybook-solidjs';
import Index from './index.js';

/** Type definition for the component. */
type Target = typeof Index;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Index } satisfies Meta<Target>;
