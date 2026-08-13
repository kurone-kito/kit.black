import { createRoot } from 'solid-js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createDarkMode } from './createDarkMode.js';

/** The storage key {@link createDarkMode} persists the theme under. */
const storageKey = 'theme';

/** The options shared by every test in this file. */
const options = { dark: 'dark', light: 'light' };

/**
 * Stubs `window.matchMedia` so `(prefers-color-scheme: dark)` reports a
 * fixed, controllable state. jsdom has no native `matchMedia`
 * implementation.
 * @param matches Whether the dark-mode media query should report a match.
 */
const stubMatchMedia = (matches: boolean): void => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  );
};

beforeEach(() => localStorage.removeItem(storageKey));

afterEach(() => {
  localStorage.removeItem(storageKey);
  vi.unstubAllGlobals();
});

describe('createDarkMode', () => {
  it('follows a dark media preference when nothing is stored', () =>
    createRoot((dispose) => {
      stubMatchMedia(true);
      const isDark = createDarkMode(options);
      expect(isDark()).toBe(true);
      dispose();
    }));

  it('follows a light media preference when nothing is stored', () =>
    createRoot((dispose) => {
      stubMatchMedia(false);
      const isDark = createDarkMode(options);
      expect(isDark()).toBe(false);
      dispose();
    }));

  it('lets a stored dark value win over a light media preference', () =>
    createRoot((dispose) => {
      localStorage.setItem(storageKey, options.dark);
      stubMatchMedia(false);
      const isDark = createDarkMode(options);
      expect(isDark()).toBe(true);
      dispose();
    }));

  it('lets a stored light value win over a dark media preference', () =>
    createRoot((dispose) => {
      localStorage.setItem(storageKey, options.light);
      stubMatchMedia(true);
      const isDark = createDarkMode(options);
      expect(isDark()).toBe(false);
      dispose();
    }));
});
