import type { Meta, StoryObj } from 'storybook-solidjs';
import { Footer } from './Footer.js';

/** Type definition for the component. */
type Target = typeof Footer;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Footer } satisfies Meta<Target>;
