import type { Component, JSX } from 'solid-js';
import { Show, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { Except, SetNonNullable, SetRequired } from 'type-fest';

/** The required attributes for the anchor. */
export type AnchorAttrsRequired = SetNonNullable<
  SetRequired<Readonly<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>, 'href'>,
  'href'
>;

/** Type definition for the properties. */
export interface AnchorProps
  extends Except<AnchorAttrsRequired, 'rel' | 'target'> {
  /**
   * The component to render as.
   * @default 'a'
   */
  readonly as?: 'a' | Component<AnchorAttrsRequired> | undefined;
}

/** The pattern for the external URL. */
const external = /^https?:\/\//;

/**
 * The anchor component.
 * @param props The properties.
 * @returns The component.
 */
export const Anchor: Component<AnchorProps> = (props) => {
  const [local, others] = splitProps(props, ['as']);
  const concProps = mergeProps({ as: 'a' }, local);
  return (
    <Show
      fallback={<Dynamic component={concProps.as} {...others} />}
      when={others.href && external.test(others.href)}
    >
      <Dynamic
        component={concProps.as}
        rel="noopener noreferrer"
        target="_blank"
        {...others}
      />
    </Show>
  );
};
