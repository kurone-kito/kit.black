import { Link } from '@solidjs/meta';
import type { Component } from 'solid-js';
import { Index, Match, Show, Switch } from 'solid-js';

/** Type definition for the properties. */
export interface LinkListProps {
  /** The author URL. */
  readonly authorUrl?: string | undefined;

  /** The mime type of the favicon. */
  readonly faviconType?: string | undefined;

  /** The favicon URL. */
  readonly faviconUrl?: string | undefined;

  /** The license URL. */
  readonly licenseUrl?: string | undefined;

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
    <Link href="https://fonts.googleapis.com" rel="preconnect" />
    <Link
      crossOrigin="anonymous"
      href="https://fonts.gstatic.com"
      rel="preconnect"
    />
    <Show when={props.authorUrl}>
      {(href) => <Link href={href()} rel="author" />}
    </Show>
    <Switch>
      <Match when={props.faviconType && props.faviconUrl}>
        <Link href={props.faviconUrl} rel="icon" type={props.faviconType} />
      </Match>
      <Match when={!props.faviconType && props.faviconUrl}>
        <Link href={props.faviconUrl} rel="icon" />
      </Match>
    </Switch>
    <Show when={props.licenseUrl}>
      {(href) => <Link href={href()} hreflang="en" rel="license" />}
    </Show>
    <Show when={props.next}>{(href) => <Link href={href()} rel="next" />}</Show>
    <Index each={props.preloadImages}>
      {(image) => <Link as="image" href={image()} rel="preload" />}
    </Index>
    <Show when={props.prev}>{(href) => <Link href={href()} rel="prev" />}</Show>
    <Show when={props.licenseUrl}>
      {(href) => <Link href={href()} hreflang="en" rel="terms-of-service" />}
    </Show>
  </>
);
