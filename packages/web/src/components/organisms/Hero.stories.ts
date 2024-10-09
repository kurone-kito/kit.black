import type { Meta, StoryObj } from 'storybook-solidjs';
import { Hero } from './Hero.js';

/** Type definition for the component. */
type Target = typeof Hero;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Hero } satisfies Meta<Target>;
