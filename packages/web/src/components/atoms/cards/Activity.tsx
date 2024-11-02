import type { Component, JSX } from 'solid-js';
import { Show, splitProps } from 'solid-js';

/** Type definition for the properties. */
export interface ActivityProps
  extends Pick<
      Readonly<JSX.HTMLAttributes<HTMLDivElement>>,
      'class' | 'children' | 'innerHTML'
    >,
    Pick<Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>, 'alt' | 'src'> {
  /** The activity heading title. */
  readonly heading?: JSX.Element;
}

/**
 * The activity card component.
 * @param props The properties.
 * @returns The component.
 */
export const Activity: Component<ActivityProps> = (props) => {
  const [local, others] = splitProps(props, ['alt', 'heading', 'src']);
  return (
    <li class="card bg-base-300 shadow-xl">
      <Show when={local.src}>
        <figure>
          <img
            alt={local.alt}
            decoding="async"
            fetchpriority="low"
            height={720}
            loading="lazy"
            src={local.src}
            width={1280}
          />
        </figure>
      </Show>
      <div class="card-body">
        <Show when={local.heading}>
          <h3 class="card-title">{local.heading}</h3>
        </Show>
        <div {...others} />
      </div>
    </li>
  );
};
