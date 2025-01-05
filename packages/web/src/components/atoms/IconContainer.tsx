import type { Component, ParentProps } from 'solid-js';
import { mergeProps } from 'solid-js/web';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface IconProps extends Readonly<ParentProps> {
  /** The CSS class. */
  readonly class?: string | undefined;
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
    <i class={twMerge('not-italic', concProps.class)} role="img">
      {concProps.children}
    </i>
  );
};
