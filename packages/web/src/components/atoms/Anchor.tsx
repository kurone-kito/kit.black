import type { Component, JSX } from 'solid-js';
import { Show } from 'solid-js';
import type { Except } from 'type-fest';

/** Type definition for the properties. */
export interface AnchorProps
  extends Except<
    Readonly<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>,
    'rel' | 'target'
  > {}

/** The pattern for the external URL. */
const external = /^https?:\/\//;

/**
 * The anchor component.
 * @param props The properties.
 * @returns The component.
 */
export const Anchor: Component<AnchorProps> = (props) => (
  <Show
    fallback={<a {...props} />}
    when={props.href && external.test(props.href)}
  >
    <a rel="noopener noreferrer" target="_blank" {...props} />
  </Show>
);
