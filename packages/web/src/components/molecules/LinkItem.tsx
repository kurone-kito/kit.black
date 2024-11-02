import type { Component, JSX, ParentProps } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import type { Except, SetRequired } from 'type-fest';
import type { AnchorProps } from '../atoms/Anchor.js';
import { Anchor } from '../atoms/Anchor.js';
import { IconContainer } from '../atoms/IconContainer.js';

/** Type definition for the properties. */
export interface LinkItemProps
  extends Except<
      SetRequired<AnchorProps, 'href'>,
      'children' | 'class' | 'title'
    >,
    Readonly<ParentProps> {
  /** The caption. */
  readonly caption?: JSX.Element;

  /** The title. */
  readonly title?: string;
}

/**
 * The link item component.
 * @param props The properties.
 * @returns The component.
 */
export const LinkItem: Component<LinkItemProps> = (props) => {
  const [local, others] = splitProps(props, ['caption', 'children', 'title']);
  return (
    <li class="flex flex-col items-center">
      <p class="tooltip tooltip-top" data-tip={local.title}>
        <Anchor
          aria-label={local.title}
          class="btn btn-accent btn-lg h-24 w-24 p-1.5"
          {...others}
        >
          <IconContainer class="text-7xl font-black">
            {local.children}
          </IconContainer>
        </Anchor>
      </p>
      <Show when={local.caption}>
        <p class="text-center" translate="no">
          {local.caption}
        </p>
      </Show>
    </li>
  );
};
