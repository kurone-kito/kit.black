import type { Meta, StoryObj } from 'storybook-solidjs';
import { Avatar } from './Avatar.js';

/** Type definition for the component. */
type Target = typeof Avatar;

/** The dimensions of the image. */
const rect = { height: 267, width: 138 } as const;

/** The default story for the component. */
export const Default: StoryObj<Target> = {};

export default {
  args: {
    ...rect,
    alt: 'Alt',
    anchorClass: '',
    class: '',
    id: 'Id',
    nextId: 'NextId',
    src: `https://placehold.jp/${rect.width}x${rect.height}.png` as const,
  },
  component: Avatar,
} satisfies Meta<Target>;
