import type { Component } from 'solid-js';
import constants from '../../constants.json';
import { now } from '../../modules/datetime.js';

/**
 * The footer component.
 * @returns The component.
 */
export const Footer: Component = () => (
  <footer class="footer footer-center bg-base-300 text-base-content px-safe pb-safe-or-6 pt-6 font-extralight">
    <aside class="font-thin tracking-wide" translate="no">
      <p>
        &copy; 2018-{now().getFullYear()} {constants.author.name}
      </p>
    </aside>
  </footer>
);
