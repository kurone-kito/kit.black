import type { Component } from 'solid-js';
import type { Except } from 'type-fest';
import { Logo } from '../atoms/Logo.js';
import type { KitoProps } from './Kito.js';
import { Kito } from './Kito.js';

/** Type definition for the properties. */
export interface KitoWithLogoProps extends Except<KitoProps, 'class' | 'id'> {}

/**
 * The Kito's cutin with logo component.
 * @param props The properties.
 * @returns The component.
 */
export const KitoWithLogo: Component<KitoWithLogoProps> = (props) => (
  <div class="flex aspect-[29/40] h-auto w-full max-w-[100lvw] items-end sm:container md:max-w-md xl:max-w-lg">
    <Kito
      class="h-full w-auto opacity-45 transition-[opacity] hover:opacity-45 lg:opacity-35"
      id="hero"
      {...props}
    />
    <Logo class="-ml-[36%] h-[50%] w-auto opacity-95" role="banner" />
  </div>
);
