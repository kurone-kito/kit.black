import type { Component, JSX, ParentProps } from 'solid-js';

/** Type definition for the properties. */
export interface HeroProps extends Readonly<ParentProps> {
  /** The logo */
  readonly logo?: JSX.Element;
}

/**
 * The hero component.
 * @param props The component properties.
 * @returns The component.
 */
export const Hero: Component<HeroProps> = (props) => (
  <>
    <section class="hero bg-base-300 lg:pb-20">
      <div class="hero-content w-full items-stretch px-0">
        {props.logo}
        <div class="hidden flex-col justify-around py-28 leading-loose tracking-wider lg:flex">
          {props.children}
        </div>
      </div>
    </section>
    <section class="container mx-auto flex flex-col items-center gap-8 py-20 leading-loose tracking-wider lg:hidden">
      {props.children}
    </section>
  </>
);
