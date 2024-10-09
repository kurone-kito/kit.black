import type { Meta, StoryObj } from 'storybook-solidjs';
import { Links } from './Links.js';

/** Type definition for the component. */
type Target = typeof Links;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Links } satisfies Meta<Target>;
