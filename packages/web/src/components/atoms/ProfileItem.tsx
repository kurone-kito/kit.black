import type { Component, JSX, ParentProps } from 'solid-js';

/** Type definition for the properties. */
export interface ProfileItemProps extends Readonly<ParentProps> {
  /** The heading. */
  readonly heading: JSX.Element;
}

/**
 * The profile item component.
 * @param props The properties.
 * @returns The component.
 */
export const ProfileItem: Component<ProfileItemProps> = (props) => (
  <li>
    <h2 class="text-base-content/80 inline font-bold">{props.heading}</h2>
    :&nbsp;
    {props.children}
  </li>
);
