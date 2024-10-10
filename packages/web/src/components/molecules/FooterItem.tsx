import type { Component, JSX, ParentProps } from 'solid-js';
import { Anchor } from '../atoms/Anchor.js';
import { IconContainer } from '../atoms/IconContainer.js';

/** Type definition for the properties. */
export interface LinkItemProps
  extends Required<Pick<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>>,
    Readonly<ParentProps> {
  /** The tooltip. */
  readonly tip: string;
}

/**
 * The footer item component.
 * @param props The properties.
 * @returns The component.
 */
export const FooterItem: Component<LinkItemProps> = (props) => (
  <li>
    <Anchor class="tooltip" data-tip={props.tip} href={props.href}>
      <IconContainer>{props.children}</IconContainer>
    </Anchor>
  </li>
);
