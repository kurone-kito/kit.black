import type { Meta, StoryObj } from 'storybook-solidjs';
import { Works } from './Works.js';

/** Type definition for the component. */
type Target = typeof Works;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Works } satisfies Meta<Target>;
