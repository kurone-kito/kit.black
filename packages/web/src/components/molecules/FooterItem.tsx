import type { Component, ParentProps } from 'solid-js';
import { Anchor, type AnchorAttrsRequired } from '../atoms/Anchor.js';
import { IconContainer } from '../atoms/IconContainer.js';

/** Type definition for the properties. */
export interface LinkItemProps
  extends Pick<AnchorAttrsRequired, 'href'>,
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
    <Anchor
      aria-label={props.tip}
      class="tooltip"
      data-tip={props.tip}
      href={props.href}
    >
      <IconContainer>{props.children}</IconContainer>
    </Anchor>
  </li>
);
