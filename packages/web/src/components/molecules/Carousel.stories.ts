import type { Meta, StoryObj } from 'storybook-solidjs';
import { Carousel } from './Carousel.js';

/** Type definition for the component. */
type Target = typeof Carousel;

/** The dimensions of the image. */
const rect = { height: 144, width: 256 } as const;

/** The source of the image. */
const src = `https://placehold.jp/${rect.width}x${rect.height}.png` as const;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    class: '',
    items: Array.from({ length: 10 }, (_, i) => [src, `${i}`] as const),
  },
  component: Carousel,
} satisfies Meta<Target>;
