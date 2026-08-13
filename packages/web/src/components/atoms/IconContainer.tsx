import type { Component, ParentProps } from 'solid-js';
import { mergeProps } from 'solid-js/web';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface IconProps extends Readonly<ParentProps> {
  /** The CSS class. */
  readonly class?: string | undefined;

  /**
   * The accessible name for the icon. When omitted, the icon is treated
   * as decorative (`aria-hidden`) because its meaning is assumed to be
   * carried by adjacent text or a labelled ancestor.
   */
  readonly label?: string | undefined;
}

/** The default properties. */
const defaultProps = { children: '◆' } as const satisfies IconProps;

/**
 * The icon component.
 * @param props The properties.
 * @returns The component.
 */
export const IconContainer: Component<IconProps> = (props) => {
  const concProps = mergeProps(defaultProps, props);
  return (
    <i
      aria-hidden={concProps.label === undefined ? true : undefined}
      aria-label={concProps.label}
      class={twMerge('not-italic', concProps.class)}
      role={concProps.label === undefined ? undefined : 'img'}
    >
      {concProps.children}
    </i>
  );
};
