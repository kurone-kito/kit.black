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
    <Meta name="twitter:card" content="summary_large_image" />
    <Show when={props.author}>
      <Meta name="twitter:creator" content={props.author} />
    </Show>
    <Show when={props.description}>
      <Meta name="twitter:description" content={props.description} />
    </Show>
    <Show when={props.image}>
      <Meta name="twitter:image" content={props.image} />
    </Show>
    <Show when={props.author}>
      <Meta name="twitter:author" content={props.author} />
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
