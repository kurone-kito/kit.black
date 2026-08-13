import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { HamburgerButton } from '../atoms/HamburgerButton.js';
import { useTranslator } from '../../modules/createI18N.js';
import { LanguageChanger } from './LanguageChanger.js';
import { ToggleTheme } from './ToggleTheme.js';

/** The `id` of the collapsible menu list, referenced by `aria-controls`. */
const menuId = 'navbar-menu';

/**
 * The navigation bar.
 * @returns The component.
 */
export const Navbar: Component = () => {
  const [expanded, setExpandState] = createSignal(false);
  const t = useTranslator();
  return (
    <nav
      aria-label={t('navbarLabel')}
      class="navbar pointer-events-none fixed top-0 z-50 justify-end"
    >
      <ul
        class="navbar-end max-lg:bg-primary/90 bg-primary/40 hover:bg-primary/90 pointer-events-auto flex items-center justify-between rounded-lg transition-all"
        classList={{ 'w-14': !expanded(), 'w-44': expanded() }}
        id={menuId}
      >
        <li classList={{ hidden: !expanded() }}>
          <LanguageChanger />
        </li>
        <li classList={{ hidden: !expanded() }}>
          <ToggleTheme />
        </li>
        <li>
          <HamburgerButton
            controls={menuId}
            expanded={expanded()}
            label={t('hamburgerMenu')}
            onClick={(event) => setExpandState(event.currentTarget.checked)}
          />
        </li>
      </ul>
    </nav>
  );
};
