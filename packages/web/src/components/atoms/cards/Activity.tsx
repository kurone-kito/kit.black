import type { Component, JSX, ParentProps } from 'solid-js';
import { Show } from 'solid-js';

/** Type definition for the properties. */
export interface ActivityProps
  extends Pick<
      Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>,
      'alt' | 'src'
    >,
    Readonly<ParentProps> {
  /** The activity heading title. */
  readonly heading?: JSX.Element;
}

/**
 * The activity card component.
 * @param props The properties.
 * @returns The component.
 */
export const Activity: Component<ActivityProps> = (props) => (
  <li class="card bg-base-300 shadow-xl">
    <Show when={props.src}>
      <figure>
        <img alt={props.alt} height={720} src={props.src} width={1280} />
      </figure>
    </Show>
    <div class="card-body">
      <Show when={props.heading}>
        <h3 class="card-title">{props.heading}</h3>
      </Show>
      <Show when={props.children}>
        <p>{props.children}</p>
      </Show>
    </div>
  </li>
);
