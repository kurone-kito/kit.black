import type { Meta, StoryObj } from 'storybook-solidjs';
import { LanguageChanger } from './LanguageChanger.js';

/** Type definition for the component. */
type Target = typeof LanguageChanger;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: { enHref: 'https://example.com/', jaHref: 'https://example.com/' },
  component: LanguageChanger,
} satisfies Meta<Target>;
