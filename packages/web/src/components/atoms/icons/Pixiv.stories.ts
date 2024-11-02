import type { Meta, StoryObj } from 'storybook-solidjs';
import { Pixiv } from './Pixiv.js';

/** Type definition for the component. */
type Target = typeof Pixiv;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Pixiv } satisfies Meta<Target>;
