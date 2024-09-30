import type { Meta, StoryObj } from 'storybook-solidjs';
import App from './app.js';

/** Type definition for the component. */
type Target = typeof App;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: App } satisfies Meta<Target>;
