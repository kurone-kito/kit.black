import { Meta } from '@solidjs/meta';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';

/** Type definition for the properties. */
export interface XCardProps {
  /** The author of the meta tag. */
  readonly author?: string | undefined;

  /** The card description. */
  readonly description?: string | undefined;

  /** The card image URL. */
  readonly image?: string | undefined;

  /** The alt text of the card image. */
  readonly imageAlt?: string | undefined;

  /** The site name. */
  readonly siteName: string;

  /** The title of the page. */
  readonly title?: string | undefined;
}

/**
 * The X card component.
 * @param props The component properties.
 * @returns The component.
 */
export const XCard: Component<XCardProps> = (props) => (
  <>
    {/* The referenced image is square; `summary` is the correct card
        type for a 1:1 aspect ratio (`summary_large_image` expects a
        1.91:1 landscape image). */}
    <Meta name="twitter:card" content="summary" />
    <Show when={props.author}>
      <Meta name="twitter:creator" content={props.author} />
    </Show>
    <Show when={props.description}>
      <Meta name="twitter:description" content={props.description} />
    </Show>
    <Show when={props.image}>
      <Meta name="twitter:image" content={props.image} />
    </Show>
    <Show when={props.image && props.imageAlt}>
      <Meta name="twitter:image:alt" content={props.imageAlt} />
    </Show>
    <Show
      fallback={<Meta name="twitter:title" content={props.siteName} />}
      when={props.title}
    >
      <Meta
        name="twitter:title"
        content={`${props.title} | ${props.siteName}`}
      />
    </Show>
  </>
);
