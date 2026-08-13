import type { Component, JSX } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { Anchor } from '../atoms/Anchor.js';

/** Type definition for the properties. */
export interface WorkCardProps
  extends Pick<
      Readonly<JSX.HTMLAttributes<HTMLDivElement>>,
      'children' | 'class' | 'innerHTML'
    >,
    Pick<Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>, 'alt' | 'src'> {
  /** The work heading title. */
  readonly heading?: JSX.Element;

  /** The URL to the work. */
  readonly href: string;

  /** The label for more information button. */
  readonly labelMore: JSX.Element;

  /** The release year text. */
  readonly released: JSX.Element;
}

/**
 * The work card component.
 * @param props The properties.
 * @returns The component.
 */
export const WorkCard: Component<WorkCardProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'innerHTML']);
  return (
    <li class="card bg-base-300 lg:card-side shadow-xl">
      <Show when={others.src}>
        <figure class="aspect-video !items-start lg:aspect-[128/207] lg:h-full lg:w-auto lg:max-w-72 xl:aspect-square xl:max-w-96">
          {/* Work images (assets/works/*.webp) are portrait, 1024x1656. */}
          <img
            alt={others.alt}
            class="w-full"
            decoding="async"
            fetchpriority="low"
            height={1656}
            loading="lazy"
            src={others.src}
            width={1024}
          />
        </figure>
      </Show>
      <div class="card-body lg:basis-0">
        <Show when={others.heading}>
          <h3 class="card-title">{others.heading}</h3>
        </Show>
        <div
          class={twMerge('flex h-full flex-col justify-between', others.class)}
          {...local}
        />
        <Show when={others.released || others.href}>
          <ul class="flex items-center gap-4">
            <Show when={others.href}>
              <li>
                <Anchor
                  class="btn btn-primary font-semibold"
                  href={others.href}
                >
                  {others.labelMore}
                </Anchor>
              </li>
            </Show>
            <Show when={others.released}>
              {(released) => <li>{released()}</li>}
            </Show>
          </ul>
        </Show>
      </div>
    </li>
  );
};
