import type { Component, JSX, ParentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Type definition for the properties. */
export interface HeroProps
  extends Pick<
      Readonly<JSX.HTMLAttributes<HTMLElement>>,
      'class' | 'innerHTML'
    >,
    Readonly<ParentProps> {
  /** The logo */
  readonly logo?: JSX.Element;
}

/**
 * The hero component.
 * @param props The component properties.
 * @returns The component.
 */
export const Hero: Component<HeroProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'logo']);
  return (
    <>
      <section class="hero bg-base-300 lg:pb-20">
        <div class="hero-content w-full items-stretch px-0">
          {local.logo}
          <div
            class={twMerge(
              'hidden flex-col justify-around py-28 leading-loose tracking-wider lg:flex',
              local.class,
            )}
            {...others}
          />
        </div>
      </section>
      <section
        class={twMerge(
          'container mx-auto flex flex-col items-center gap-8 py-20 leading-loose tracking-wider lg:hidden',
          local.class,
        )}
        {...others}
      />
    </>
  );
};
