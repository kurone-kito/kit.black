import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
import { ToggleTheme as InternalToggleTheme } from '../atoms/ToggleTheme.js';
import { createDarkMode } from '../../modules/createDarkMode.js';
import { useTranslator } from '../../modules/createI18N.js';

/** The dark theme value. */
const VALUE_DARK = 'dark';

/** The light theme value. */
const VALUE_LIGHT = 'light';

/** The themes list. */
const themes = [VALUE_LIGHT, VALUE_DARK] as const;

/**
 * The toggle to change the theme.
 * @returns The component.
 */
export const ToggleTheme: Component = () => {
  const isDarkMode = createDarkMode({ dark: VALUE_DARK, light: VALUE_LIGHT });
  let ref!: HTMLInputElement;
  onMount(() => (ref.checked = isDarkMode()));
  const t = useTranslator();
  return (
    <InternalToggleTheme
      labelToDark={t('toDark')}
      labelToLight={t('toLight')}
      ref={ref}
      themes={themes}
      toggleTooltip="Toggle theme"
    />
  );
};
