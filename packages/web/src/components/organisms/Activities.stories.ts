import type { Meta, StoryObj } from 'storybook-solidjs';
import { Activities } from './Activities.js';

/** Type definition for the component. */
type Target = typeof Activities;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Activities } satisfies Meta<Target>;
