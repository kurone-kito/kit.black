import { Meta } from '@solidjs/meta';
import type { Component } from 'solid-js';
import { Index, Show } from 'solid-js';

/** Type definition for the properties. */
export interface OgpProps {
  /** The description of the page. */
  readonly description?: string | undefined;

  /** The alt text of the images. */
  readonly imageAlt?: string | undefined;

  /** The height of the images. */
  readonly imageHeight?: number | string | undefined;

  /** The mime type of the images. */
  readonly imageType?: string | undefined;

  /** The width of the images. */
  readonly imageWidth?: number | string | undefined;

  /** The image URLs of the page. */
  readonly images?: readonly string[] | undefined;

  /** The language of the page. */
  readonly language?: string | undefined;

  /** The site name. */
  readonly siteName: string;

  /** The title of the page. */
  readonly title?: string | undefined;

  /** The URL of the page. */
  readonly url?: string | undefined;
}

/**
 * The OGP component.
 * @param props The component properties.
 * @returns The component.
 */
export const Ogp: Component<OgpProps> = (props) => (
  <>
    <Show when={props.description}>
      <Meta property="og:description" content={props.description} />
    </Show>
    <Index each={props.images}>
      {(image) => <Meta property="og:image" content={image()} />}
    </Index>
    <Show when={props.imageAlt}>
      <Meta property="og:image:alt" content={props.imageAlt} />
    </Show>
    <Show when={props.imageHeight}>
      <Meta property="og:image:height" content={`${props.imageHeight}`} />
    </Show>
    <Show when={props.imageType}>
      <Meta property="og:image:type" content={props.imageType} />
    </Show>
    <Show when={props.imageWidth}>
      <Meta property="og:image:width" content={`${props.imageWidth}`} />
    </Show>
    <Show when={props.language}>
      <Meta property="og:locale" content={props.language} />
    </Show>
    <Show when={props.siteName}>
      <Meta property="og:site_name" content={props.siteName} />
    </Show>
    <Show
      fallback={<Meta property="og:title" content={props.siteName} />}
      when={props.title}
    >
      <Meta
        property="og:title"
        content={`${props.title} | ${props.siteName}`}
      />
    </Show>
    <Meta property="og:type" content="website" />
    <Show when={props.url}>
      <Meta property="og:url" content={props.url} />
    </Show>
  </>
);
