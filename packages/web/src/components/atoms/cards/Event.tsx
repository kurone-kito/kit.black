import type { Component, JSX, ParentProps } from 'solid-js';
import { Show } from 'solid-js';

/** Type definition for the properties. */
export interface EventProps
  extends Pick<
      Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>,
      'alt' | 'src'
    >,
    Readonly<ParentProps> {
  /** The event heading title. */
  readonly heading?: JSX.Element;
}

/**
 * The event card component.
 * @param props The properties.
 * @returns The component.
 */
export const Event: Component<EventProps> = (props) => (
  <li class="card bg-base-300 lg:card-side shadow-xl">
    <Show when={props.src}>
      <figure class="aspect-[128/181] lg:h-full lg:w-auto lg:max-w-52 xl:max-w-56 2xl:max-w-80">
        <img alt={props.alt} height={1810} src={props.src} width={1280} />
      </figure>
    </Show>
    <div class="card-body lg:basis-0 2xl:max-w-[26rem]">
      <Show when={props.heading}>
        <h3 class="card-title pb-8">{props.heading}</h3>
      </Show>
      <ul class="list-inside list-disc [&>li]:py-2">{props.children}</ul>
    </div>
  </li>
);
