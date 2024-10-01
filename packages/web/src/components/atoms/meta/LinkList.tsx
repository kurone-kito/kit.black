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
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <Show keyed when={props.authorUrl}>
      {(href) => <Link rel="author" href={href} />}
    </Show>
    <Switch>
      <Match when={props.faviconType && props.faviconUrl}>
        <Link rel="icon" href={props.faviconUrl} type={props.faviconType} />
      </Match>
      <Match when={!props.faviconType && props.faviconUrl}>
        <Link rel="icon" href={props.faviconUrl} />
      </Match>
    </Switch>
    <Show keyed when={props.licenseUrl}>
      {(href) => <Link rel="license" href={href} />}
    </Show>
    <Show keyed when={props.next}>
      {(href) => <Link rel="next" href={href} />}
    </Show>
    <Index each={props.preloadImages}>
      {(image) => <Link as="image" rel="preload" href={image()} />}
    </Index>
    <Show keyed when={props.prev}>
      {(href) => <Link rel="prev" href={href} />}
    </Show>
    <Show keyed when={props.licenseUrl}>
      {(href) => <Link rel="terms-of-service" href={href} />}
    </Show>
  </>
);
