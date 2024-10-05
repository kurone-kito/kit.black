import type { Meta, StoryObj } from 'storybook-solidjs';
import { Bluesky } from './Bluesky.js';

/** Type definition for the component. */
type Target = typeof Bluesky;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Bluesky } satisfies Meta<Target>;
