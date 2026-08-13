import { Link } from '@solidjs/meta';
import type { Component } from 'solid-js';
import { Index, Show } from 'solid-js';

/** A single `hreflang` alternate-language link. */
export interface AlternateLink {
  /** The `hreflang` value, e.g. `"ja"`, `"en"`, or `"x-default"`. */
  readonly hreflang: string;

  /** The absolute URL of the alternate-language page. */
  readonly href: string;
}

/** Type definition for the properties. */
export interface LinkListProps {
  /** The apple-touch-icon URL. */
  readonly appleTouchIconUrl?: string | undefined;

  /** The `hreflang` alternate-language links. */
  readonly alternates?: readonly AlternateLink[] | undefined;

  /** The author URL. */
  readonly authorUrl?: string | undefined;

  /** The canonical URL of the page. */
  readonly canonicalUrl?: string | undefined;

  /** The 16x16 PNG favicon URL. */
  readonly icon16Url?: string | undefined;

  /** The 32x32 PNG favicon URL. */
  readonly icon32Url?: string | undefined;

  /** The multi-resolution `.ico` favicon URL. */
  readonly iconIcoUrl?: string | undefined;

  /** The license URL. */
  readonly licenseUrl?: string | undefined;

  /** The web app manifest URL. */
  readonly manifestUrl?: string | undefined;

  /** The images to preload. */
  readonly preloadImages?: readonly string[] | undefined;

  /** The next page URL. */
  readonly next?: string | undefined;

  /** The previous page URL. */
  readonly prev?: string | undefined;
}

/**
 * The link list component.
 * @param props The component properties.
 * @returns The component.
 */
export const LinkList: Component<LinkListProps> = (props) => (
  <>
    <Show when={props.authorUrl}>
      {(href) => <Link href={href()} rel="author" />}
    </Show>
    <Show when={props.canonicalUrl}>
      {(href) => <Link href={href()} rel="canonical" />}
    </Show>
    <Show when={props.iconIcoUrl}>
      {(href) => <Link href={href()} rel="icon" sizes="16x16 32x32 48x48" />}
    </Show>
    <Show when={props.icon32Url}>
      {(href) => (
        <Link href={href()} rel="icon" sizes="32x32" type="image/png" />
      )}
    </Show>
    <Show when={props.icon16Url}>
      {(href) => (
        <Link href={href()} rel="icon" sizes="16x16" type="image/png" />
      )}
    </Show>
    <Show when={props.appleTouchIconUrl}>
      {(href) => <Link href={href()} rel="apple-touch-icon" />}
    </Show>
    <Show when={props.manifestUrl}>
      {(href) => <Link href={href()} rel="manifest" />}
    </Show>
    <Show when={props.licenseUrl}>
      {(href) => <Link href={href()} hreflang="en" rel="license" />}
    </Show>
    <Show when={props.next}>{(href) => <Link href={href()} rel="next" />}</Show>
    <Index each={props.alternates}>
      {(alternate) => (
        <Link
          href={alternate().href}
          hreflang={alternate().hreflang}
          rel="alternate"
        />
      )}
    </Index>
    <Index each={props.preloadImages}>
      {(image) => <Link as="image" href={image()} rel="preload" />}
    </Index>
    <Show when={props.prev}>{(href) => <Link href={href()} rel="prev" />}</Show>
  </>
);
