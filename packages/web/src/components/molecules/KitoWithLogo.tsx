import type { Component } from 'solid-js';
import { Logo } from '../atoms/Logo.js';
import { Kito } from './Kito.js';

/**
 * The Kito's cutin with logo component.
 * @returns The component.
 */
export const KitoWithLogo: Component = () => (
  <div class="flex aspect-[29/40] h-auto w-full max-w-[100dvw] items-end sm:container md:max-w-md xl:max-w-lg">
    <Kito
      class="h-full w-auto opacity-35 transition-[opacity] hover:opacity-40"
      id="hero"
    />
    <Logo class="-ml-[36%] h-[50%] w-auto opacity-95" role="banner" />
  </div>
);
