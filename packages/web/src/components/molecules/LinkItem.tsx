import type { Component, JSX, ParentProps } from 'solid-js';
import { Show } from 'solid-js';
import { Anchor } from '../atoms/Anchor.js';
import { IconContainer } from '../atoms/IconContainer.js';

/** Type definition for the properties. */
export interface LinkItemProps
  extends Required<Pick<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>>,
    Readonly<ParentProps> {
  /** The caption. */
  readonly caption?: JSX.Element;
}

/**
 * The link item component.
 * @param props The properties.
 * @returns The component.
 */
export const LinkItem: Component<LinkItemProps> = (props) => (
  <li class="flex flex-col items-center">
    <p>
      <Anchor class="btn btn-accent btn-lg h-24 w-24 p-1.5" href={props.href}>
        <IconContainer class="text-7xl font-black">
          {props.children}
        </IconContainer>
      </Anchor>
    </p>
    <Show when={props.caption}>
      <p class="text-center">{props.caption}</p>
    </Show>
  </li>
);
