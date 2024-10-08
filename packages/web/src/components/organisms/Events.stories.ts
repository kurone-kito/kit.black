import type { Meta, StoryObj } from 'storybook-solidjs';
import { Events } from './Events.js';

/** Type definition for the component. */
type Target = typeof Events;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Events } satisfies Meta<Target>;
