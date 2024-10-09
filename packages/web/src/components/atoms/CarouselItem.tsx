import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface CarouselItemProps
  extends Pick<
    Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>,
    'alt' | 'class' | 'height' | 'src' | 'width'
  > {}

/**
 * The carousel item component.
 * @param props The properties.
 * @returns The component.
 */
export const CarouselItem: Component<CarouselItemProps> = (props) => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div class={twMerge('aspect-video', local.class)}>
      <img
        class="rounded-box saturate-100 transition-[filter] duration-500 hover:saturate-100 lg:saturate-[.33]"
        {...rest}
      />
    </div>
  );
};
