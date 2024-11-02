import type { Component, JSX, ParentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import type { Except, SetRequired } from 'type-fest';
import type { AnchorProps } from '../../atoms/Anchor.js';
import { Anchor } from '../../atoms/Anchor.js';
import { IconContainer } from '../../atoms/IconContainer.js';

/** Type definition for the properties. */
export interface HeaderItemProps
  extends Except<SetRequired<AnchorProps, 'href'>, 'children' | 'class'>,
    Readonly<ParentProps> {
  /** The account name. */
  readonly accountId?: JSX.Element;
}

/**
 * The header item component.
 * @param props The properties.
 * @returns The component.
 */
export const HeaderItem: Component<HeaderItemProps> = (props) => {
  const [local, others] = splitProps(props, ['accountId', 'children']);
  return (
    <li translate="no">
      <Anchor class="text-semibold link link-primary" {...others}>
        <IconContainer>{local.children}</IconContainer>
        &nbsp;{local.accountId}
      </Anchor>
    </li>
  );
};
