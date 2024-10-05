import type { Meta, StoryObj } from 'storybook-solidjs';
import { Marshmallow } from './Marshmallow.js';

/** Type definition for the component. */
type Target = typeof Marshmallow;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Marshmallow } satisfies Meta<Target>;
