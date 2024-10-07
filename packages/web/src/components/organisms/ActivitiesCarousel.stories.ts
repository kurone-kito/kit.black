import type { Meta, StoryObj } from 'storybook-solidjs';
import { ActivitiesCarousel } from './ActivitiesCarousel.js';

/** Type definition for the component. */
type Target = typeof ActivitiesCarousel;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default { component: ActivitiesCarousel } satisfies Meta<Target>;
