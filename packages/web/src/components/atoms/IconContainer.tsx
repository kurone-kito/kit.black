import type { Component, ParentProps } from 'solid-js';
import { mergeProps } from 'solid-js/web';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface IconProps extends Readonly<ParentProps> {
  /** The CSS class. */
  readonly class?: string | undefined;

  /**
   * The accessible name for the icon. When omitted or blank (empty or
   * whitespace-only), the icon is treated as decorative (`aria-hidden`)
   * because its meaning is assumed to be carried by adjacent text or a
   * labelled ancestor.
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
  /** Whether a non-blank accessible name was given. */
  const isNamed = () => (concProps.label ?? '').trim() !== '';
  return (
    <i
      aria-hidden={isNamed() ? undefined : true}
      aria-label={isNamed() ? concProps.label : undefined}
      class={twMerge('not-italic', concProps.class)}
      role={isNamed() ? 'img' : undefined}
    >
      {concProps.children}
    </i>
  );
};
