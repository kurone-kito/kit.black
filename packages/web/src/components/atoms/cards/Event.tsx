import type { Component, JSX } from 'solid-js';
import { Show, splitProps } from 'solid-js';

/** Type definition for the properties. */
export interface EventProps
  extends Pick<
      Readonly<JSX.HTMLAttributes<HTMLDivElement>>,
      'class' | 'children' | 'innerHTML'
    >,
    Pick<Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>, 'alt' | 'src'> {
  /** The event heading title. */
  readonly heading?: JSX.Element;
}

/**
 * The event card component.
 * @param props The properties.
 * @returns The component.
 */
export const Event: Component<EventProps> = (props) => {
  const [local, others] = splitProps(props, ['alt', 'heading', 'src']);
  return (
    <li class="card bg-base-300 lg:card-side shadow-xl">
      <Show when={local.src}>
        <figure class="aspect-[128/181] lg:h-full lg:w-auto lg:max-w-52 xl:max-w-56 2xl:max-w-80">
          <img
            alt={local.alt}
            decoding="async"
            fetchpriority="low"
            height={1810}
            loading="lazy"
            src={local.src}
            width={1280}
          />
        </figure>
      </Show>
      <div class="card-body lg:basis-0 2xl:max-w-[26rem]">
        <Show when={local.heading}>
          <h3 class="card-title pb-8">{local.heading}</h3>
        </Show>
        <div {...others} />
      </div>
    </li>
  );
};
