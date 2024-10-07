import type { Meta, StoryObj } from 'storybook-solidjs';
import { Calendar } from './Calendar.js';

/** Type definition for the component. */
type Target = typeof Calendar;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: Calendar } satisfies Meta<Target>;
