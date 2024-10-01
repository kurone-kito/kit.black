import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Suspense } from 'solid-js';

/**
 * The root template component.
 * @param props The properties.
 * @returns The component.
 */
export const RootTemplate: Component<RouteSectionProps> = (props) => (
  <main>
    <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
  </main>
);
