import type { Component, JSX } from 'solid-js';
import { Show } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface AvatarProps
  extends Pick<
    Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>,
    'alt' | 'class' | 'fetchpriority' | 'height' | 'id' | 'src' | 'width'
  > {
  /** The CSS classes for anchor. */
  readonly anchorClass?: string | undefined;

  /** The ID of the next element. */
  readonly nextId: string;

  /**
   * The accessible label for the link to the next element. The link is
   * omitted entirely when this is blank, so a focusable control never
   * ships with an empty accessible name.
   */
  readonly nextLabel?: string | undefined;
}

/**
 * The avatar component.
 * @param props The properties.
 * @returns The component.
 */
export const Avatar: Component<AvatarProps> = (props) => (
  <div
    id={props.id}
    class={twMerge('relative aspect-[46/89] h-auto w-full', props.class)}
  >
    <img
      alt={props.alt}
      class="w-full object-contain drop-shadow-lg"
      decoding="async"
      fetchpriority={props.fetchpriority ?? 'low'}
      height={props.height}
      src={props.src}
      width={props.width}
    />
    <Show when={props.nextLabel?.trim()}>
      <a
        aria-label={props.nextLabel}
        href={`#${props.nextId}`}
        class={twMerge(
          'absolute left-0 right-0 mx-auto cursor-grab max-md:hidden',
          props.anchorClass,
        )}
      >
        &nbsp;
      </a>
    </Show>
  </div>
);
