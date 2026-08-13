import type { Meta, StoryObj } from 'storybook-solidjs';
import { DownloadCalendarButton } from './DownloadCalendarButton.js';

/** Type definition for the component. */
type Target = typeof DownloadCalendarButton;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { class: '', label: 'Save the schedule calendar as an image' },
  component: DownloadCalendarButton,
} satisfies Meta<Target>;
