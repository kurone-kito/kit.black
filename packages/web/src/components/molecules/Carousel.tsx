import type { Component } from 'solid-js';
import { Index } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { CarouselItem } from '../atoms/CarouselItem.js';

/** Type definition that represents a carousel item. */
export type Item = readonly [image: string, alt: string];

/** Type definition for the properties. */
export interface SceneCarouselProps {
  /** The CSS classes. */
  readonly class?: string | undefined;

  /** The items. */
  readonly items: readonly Item[];
}

/**
 * The carousel component.
 * @returns The component.
 */
export const Carousel: Component<SceneCarouselProps> = (props) => (
  <div class="bg-base-100 px-0.5 py-12">
    <figure
      class={twMerge(
        'carousel carousel-center aspect-[19/9] h-auto w-full space-x-4 px-4 md:aspect-[27/9] xl:aspect-[28/9] 2xl:aspect-[43/9]',
        props.class,
      )}
    >
      <Index each={props.items}>
        {(index) => (
          <CarouselItem
            alt={index()[1]}
            class="carousel-item h-full w-auto cursor-ew-resize"
            height={720}
            src={index()[0]}
            width={1280}
          />
        )}
      </Index>
    </figure>
  </div>
);
