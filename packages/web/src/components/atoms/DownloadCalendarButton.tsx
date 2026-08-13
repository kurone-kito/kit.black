import { FaSolidDownload } from 'solid-icons/fa';
import type { Component, JSX } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface DownloadCalendarButtonProps {
  /** The CSS classes. */
  readonly class?: string | undefined;

  /** The visible and accessible label. */
  readonly label: string;

  /** The click event handler. */
  readonly onClick?:
    | JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
    | undefined;
}

/**
 * The button to download the schedule calendar as an image.
 * @param props The component properties.
 * @returns The component.
 */
export const DownloadCalendarButton: Component<DownloadCalendarButtonProps> = (
  props,
) => (
  <button
    class={twMerge('btn btn-primary gap-2 font-semibold', props.class)}
    onClick={props.onClick}
    type="button"
  >
    <FaSolidDownload aria-hidden="true" class="h-5 w-5" />
    {props.label}
  </button>
);
