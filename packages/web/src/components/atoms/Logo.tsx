import type { Component, JSX } from 'solid-js';
import { mergeProps } from 'solid-js/web';
import { Dynamic } from 'solid-js/web';
import { twMerge } from 'tailwind-merge';
import type { IntRange } from 'type-fest';

/** Type definition for the properties. */
export interface LogoProps extends Pick<JSX.AriaAttributes, 'role'> {
  /**
   * The heading level.
   * @default 1
   */
  readonly level?: IntRange<1, 7> | undefined;

  /** The CSS classes. */
  readonly class?: string | undefined;
}

/** The default properties. */
const defaultProps = { level: 1 } as const satisfies LogoProps;

/**
 * The logo component.
 * @returns The component.
 */
export const Logo: Component<LogoProps> = (props) => {
  const concProps = mergeProps(defaultProps, props);
  return (
    <div
      class={twMerge(
        'font-Lato text-base-content @container-[size]/logo flex aspect-[47/50] cursor-default select-none flex-row-reverse uppercase drop-shadow-md',
        props.class,
      )}
      role={props.role}
    >
      <Dynamic
        class="-ml-[3.5cqh] break-all p-0 text-[44.5cqh] font-black leading-[32.8cqh] after:absolute after:bottom-[1cqh] after:right-[2.1cqh] after:text-[5cqh] after:font-black after:leading-none after:content-['TM']"
        component={`h${concProps.level}` as const}
      >
        <span class="-tracking-[4.5cqh]">Kuroné</span>
        <span class="-tracking-[7.4cqh]">Kito</span>
      </Dynamic>
      <p class="max-w-[11cqh] p-0 text-center text-[6.9cqh] font-light -tracking-[0.5cqh] [writing-mode:vertical-rl]">
        <em class="font-black not-italic -tracking-[0.2cqh]">VTuber</em> &amp;
        Frontend engineer
      </p>
    </div>
  );
};
