import { MetaProvider } from '@solidjs/meta';
import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Suspense, onMount } from 'solid-js';
import { themeChange } from 'theme-change';
import { Footer } from '../organisms/Footer.js';
import { Head } from '../organisms/Head.js';
import { Navbar } from '../organisms/Navbar.js';

/**
 * The root template component.
 * @param props The properties.
 * @returns The component.
 */
export const RootTemplate: Component<RouteSectionProps> = (props) => {
  onMount(() => themeChange(false));
  return (
    <MetaProvider>
      <Head />
      <Navbar />
      <Suspense>
        <main>
          {props.children}
          <Footer />
        </main>
      </Suspense>
    </MetaProvider>
  );
};
