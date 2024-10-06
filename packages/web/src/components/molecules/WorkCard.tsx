import type { Component, JSX, ParentProps } from 'solid-js';
import { Show } from 'solid-js';
import { Anchor } from '../atoms/Anchor.js';

/** Type definition for the properties. */
export interface WorkCardProps
  extends Pick<
      Readonly<JSX.ImgHTMLAttributes<HTMLImageElement>>,
      'alt' | 'src'
    >,
    Readonly<ParentProps> {
  /** The work heading title. */
  readonly heading?: JSX.Element;

  /** The URL to the work. */
  readonly href?: string;

  /** The landscape image URL. */
  readonly landscapeSrc?: string;

  /** The year of the work. */
  readonly since?: number;
}

/**
 * The work card component.
 * @param props The properties.
 * @returns The component.
 */
export const WorkCard: Component<WorkCardProps> = (props) => (
  <li class="card bg-base-300 lg:card-side shadow-xl">
    <Show when={props.src}>
      <figure class="aspect-video !items-start lg:aspect-[128/207] lg:h-full lg:w-auto lg:max-w-72 xl:aspect-square xl:max-w-96">
        <Show
          fallback={
            <img
              alt={props.alt}
              class="w-full"
              height={1024}
              src={props.src}
              width={1656}
            />
          }
          when={props.landscapeSrc}
        >
          <img
            alt={props.alt}
            class="block w-full lg:hidden"
            height={1280}
            src={props.landscapeSrc}
            width={720}
          />
          <img
            alt={props.alt}
            class="hidden w-full lg:block"
            height={1024}
            src={props.src}
            width={1656}
          />
        </Show>
      </figure>
    </Show>
    <div class="card-body lg:basis-0">
      <Show when={props.heading}>
        <h3 class="card-title">{props.heading}</h3>
      </Show>
      {props.children}
      <Show when={props.since || props.href}>
        <ul class="flex items-center gap-4">
          <Show when={props.href}>
            <li>
              <Anchor class="btn btn-primary" href={props.href}>
                もっと見る
              </Anchor>
            </li>
          </Show>
          <Show when={props.since}>
            {(since) => (
              <li>
                <time datetime={`${since()}`}>{since()}</time> 年リリース
              </li>
            )}
          </Show>
        </ul>
      </Show>
    </div>
  </li>
);
