import type { Component, JSX, ParentProps } from 'solid-js';

/** Type definition for the properties. */
export interface RubyProps extends Readonly<ParentProps> {
  /** The CSS classes. */
  readonly class?: string | undefined;

  /** The ruby text. */
  readonly ruby: NonNullable<JSX.Element>;
}

/**
 * The ruby component.
 * @returns The component.
 */
export const Ruby: Component<RubyProps> = (props) => (
  <ruby class={props.class}>
    {props.children}
    <rp>(</rp>
    <rt>{props.ruby}</rt>
    <rp>)</rp>
  </ruby>
);
