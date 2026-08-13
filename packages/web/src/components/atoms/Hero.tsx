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
  /** The accessible label describing the hero content. */
  readonly label: string;

  /** The logo */
  readonly logo?: JSX.Element;

  /**
   * The accessible label for the mobile-only duplicate section. Must be
   * distinct from {@link label}: the two sections are not mutually
   * exclusive in the accessibility tree — below the `lg` breakpoint,
   * this section (showing the introduction text) and the primary
   * section (showing only the logo, since its own text is hidden at
   * that width) are both visible at once.
   */
  readonly secondaryLabel: string;
}

/**
 * The hero component.
 * @param props The component properties.
 * @returns The component.
 */
export const Hero: Component<HeroProps> = (props) => {
  const [local, others] = splitProps(props, [
    'class',
    'label',
    'logo',
    'secondaryLabel',
  ]);
  return (
    <>
      <section aria-label={local.label} class="hero bg-base-300 lg:pb-20">
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
        aria-label={local.secondaryLabel}
        class={twMerge(
          'container mx-auto flex flex-col items-center gap-8 py-20 leading-loose tracking-wider lg:hidden',
          local.class,
        )}
        {...others}
      />
    </>
  );
};
