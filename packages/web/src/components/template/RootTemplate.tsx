import { MetaProvider } from '@solidjs/meta';
import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { onMount, Suspense } from 'solid-js';
import { themeChange } from 'theme-change';
import { Footer } from '../organisms/Footer.js';
import { Head } from '../organisms/Head.js';
import { Navbar } from '../organisms/Navbar.js';
import { Splash } from '../organisms/Splash.js';

/**
 * The root template component.
 *
 * The splash overlay always renders here; `app.css`'s `splash-overlay`
 * class owns its visibility and 3s timing (including the
 * `prefers-reduced-motion` fallback) so the behavior is identical with
 * or without JavaScript -- see #159.
 * @param props The properties.
 * @returns The component.
 */
export const RootTemplate: Component<RouteSectionProps> = (props) => {
  onMount(() => themeChange(false));
  return (
    <MetaProvider>
      <Head />
      <Navbar />
      <Splash />
      <Suspense>
        <main>
          {props.children}
          <Footer />
        </main>
      </Suspense>
    </MetaProvider>
  );
};
