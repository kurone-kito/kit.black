import { createMediaQuery } from '@solid-primitives/media';
import { MetaProvider } from '@solidjs/meta';
import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { createSignal, onMount, Show, Suspense } from 'solid-js';
import { themeChange } from 'theme-change';
import { Footer } from '../organisms/Footer.js';
import { Head } from '../organisms/Head.js';
import { Navbar } from '../organisms/Navbar.js';
import { DURATION, Splash } from '../organisms/Splash.js';

/**
 * The root template component.
 * @param props The properties.
 * @returns The component.
 */
export const RootTemplate: Component<RouteSectionProps> = (props) => {
  const reduceMotion = createMediaQuery('(prefers-reduced-motion: reduce)');
  const [isSplash, setSplash] = createSignal<boolean>(!reduceMotion());
  onMount(() => {
    themeChange(false);
    setTimeout(() => setSplash(false), DURATION);
  });
  return (
    <MetaProvider>
      <Head />
      <Navbar />
      <Show when={isSplash()}>
        <Splash />
      </Show>
      <Suspense>
        <main>
          {props.children}
          <Footer />
        </main>
      </Suspense>
    </MetaProvider>
  );
};
