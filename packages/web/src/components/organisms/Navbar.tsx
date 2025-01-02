import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { HamburgerButton } from '../atoms/HamburgerButton.js';
import { LanguageChanger } from './LanguageChanger.js';
import { ToggleTheme } from './ToggleTheme.js';

/**
 * The navigation bar.
 * @returns The component.
 */
export const Navbar: Component = () => {
  const [expanded, setExpandState] = createSignal(false);
  return (
    <header
      aria-label="Main navigation"
      class="navbar pointer-events-none fixed top-0 z-50 justify-end"
      role="navigation"
    >
      <ul
        aria-expanded={expanded()}
        class="navbar-end max-lg:bg-primary/90 bg-primary/40 hover:bg-primary/90 pointer-events-auto flex items-center justify-between rounded-lg transition-all"
        classList={{ 'w-14': !expanded(), 'w-44': expanded() }}
        role="menubar"
      >
        <li classList={{ hidden: !expanded() }}>
          <LanguageChanger />
        </li>
        <li classList={{ hidden: !expanded() }}>
          <ToggleTheme />
        </li>
        <li>
          <HamburgerButton
            onClick={(event) => setExpandState(event.currentTarget.checked)}
          />
        </li>
      </ul>
    </header>
  );
};
