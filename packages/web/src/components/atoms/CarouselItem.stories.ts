import type { Meta, StoryObj } from 'storybook-solidjs';
import { CarouselItem } from './CarouselItem.js';

/** Type definition for the component. */
type Target = typeof CarouselItem;

/** The dimensions of the image. */
const rect = { height: 144, width: 256 } as const;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    ...rect,
    alt: 'Alt',
    class: '',
    src: `https://placehold.jp/${rect.width}x${rect.height}.png` as const,
  },
  component: CarouselItem,
} satisfies Meta<Target>;
