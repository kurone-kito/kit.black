import type { Meta, StoryObj } from 'storybook-solidjs';
import { Threads } from './Threads.js';

/** Type definition for the component. */
type Target = typeof Threads;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Threads } satisfies Meta<Target>;
