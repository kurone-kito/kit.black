import type { Meta, StoryObj } from 'storybook-solidjs';
import { X } from './X.js';

/** Type definition for the component. */
type Target = typeof X;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: X } satisfies Meta<Target>;
