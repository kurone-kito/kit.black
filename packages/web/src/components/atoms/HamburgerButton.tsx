import { CrossThin } from '@kurone-kito/launchpad-icons-solid/dist/CrossThin';
import { Hamburger } from '@kurone-kito/launchpad-icons-solid/dist/Hamburger';
import type { Component, JSX } from 'solid-js';
import { twMerge } from 'tailwind-merge';

export interface HamburgerButtonProps {
  /** The CSS classes. */
  readonly class?: string | undefined;

  /** The click event handler. */
  readonly onClick?:
    | JSX.EventHandlerUnion<HTMLInputElement, MouseEvent>
    | undefined;
}

/**
 * A button that toggles a target element.
 * @param props The component properties.
 * @returns The component.
 */
export const HamburgerButton: Component<HamburgerButtonProps> = (props) => (
  <label class={twMerge('btn btn-ghost swap swap-rotate', props.class)}>
    <input
      onClick={props.onClick}
      role="button"
      type="checkbox"
      value="expanded"
    />
    <Hamburger class="swap-off [&_line]:stroke-primary-content h-5 w-5" />
    <CrossThin class="swap-on [&_line]:stroke-primary-content h-5 w-5" />
  </label>
);
