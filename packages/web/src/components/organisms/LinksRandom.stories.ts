import type { Meta, StoryObj } from 'storybook-solidjs';
import { LinksRandom } from './LinksRandom.js';

/** Type definition for the component. */
type Target = typeof LinksRandom;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: LinksRandom } satisfies Meta<Target>;
