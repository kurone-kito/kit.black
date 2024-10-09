import type { Meta, StoryObj } from 'storybook-solidjs';
import { Article } from './Article.js';

/** Type definition for the component. */
type Target = typeof Article;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    children: 'Children',
    class: '',
    heading: 'Heading',
    style: { color: 'tomato' },
  },
  component: Article,
} satisfies Meta<Target>;
