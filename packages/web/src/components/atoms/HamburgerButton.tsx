import { CrossThin } from '@kurone-kito/launchpad-icons-solid/dist/CrossThin';
import { Hamburger } from '@kurone-kito/launchpad-icons-solid/dist/Hamburger';
import type { Component, JSX } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface HamburgerButtonProps {
  /** The CSS classes. */
  readonly class?: string | undefined;

  /** The `id` of the element this control expands/collapses. */
  readonly controls?: string | undefined;

  /**
   * Whether the controlled element is currently expanded.
   * @default false
   */
  readonly expanded?: boolean | undefined;

  /** The accessible label for the toggle input. */
  readonly label: string;

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
      aria-controls={props.controls}
      aria-expanded={props.expanded ?? false}
      aria-label={props.label}
      onClick={props.onClick}
      type="checkbox"
      value="expanded"
    />
    <Hamburger class="swap-off [&_line]:stroke-primary-content h-5 w-5" />
    <CrossThin class="swap-on [&_line]:stroke-primary-content h-5 w-5" />
  </label>
);
