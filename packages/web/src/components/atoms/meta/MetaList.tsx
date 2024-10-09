import { Meta } from '@solidjs/meta';
import type { Component } from 'solid-js';
import { Match, Show, Switch } from 'solid-js';

/** Type definition for the properties. */
export interface MetaListProps {
  /** The author of the meta tag. */
  readonly author?: string | undefined;

  /** The color of the meta tag on the dark mode. */
  readonly colorDark?: string | undefined;

  /** The color of the meta tag on the light mode. */
  readonly colorLight?: string | undefined;

  /** The description of the meta tag. */
  readonly description?: string | undefined;

  /** The keywords of the meta tag. */
  readonly keywords?: string | undefined;
}

/**
 * The meta list component.
 * @param props The component properties.
 * @returns The component.
 */
export const MetaList: Component<MetaListProps> = (props) => (
  <>
    <Show when={props.author}>
      <Meta name="author" content={props.author} />
    </Show>
    <Switch>
      <Match when={props.colorDark && props.colorLight}>
        <Meta name="color-scheme" content="light dark" />
      </Match>
      <Match when={props.colorDark && !props.colorLight}>
        <Meta name="color-scheme" content="dark" />
      </Match>
      <Match when={!props.colorDark && props.colorLight}>
        <Meta name="color-scheme" content="light" />
      </Match>
    </Switch>
    <Show when={props.description}>
      <Meta name="description" content={props.description} />
    </Show>
    <Meta name="generator" content="SolidStart" />
    <Show when={props.keywords}>
      <Meta name="keywords" content={props.keywords} />
    </Show>
    <Meta name="referer" content="strict-origin-when-cross-origin" />
    <Show when={props.colorLight}>
      <Meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content={props.colorLight}
      />
    </Show>
    <Show when={props.colorDark}>
      <Meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content={props.colorDark}
      />
    </Show>
    <Meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
  </>
);
