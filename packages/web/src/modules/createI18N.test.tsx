import { cleanup, render } from '@solidjs/testing-library';
import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import type { Component } from 'solid-js';
import { createRoot } from 'solid-js';
import { afterEach, describe, expect, it } from 'vitest';
import en from '../i18n/en.js';
import ja from '../i18n/ja.js';
import { createI18N, useLanguage } from './createI18N.js';

afterEach(() => cleanup());

/** A probe component that renders {@link useLanguage}'s current value. */
const LanguageProbe: Component = () => {
  const language = useLanguage();
  return <>{language()}</>;
};

/**
 * Renders {@link LanguageProbe} under a `MemoryRouter` initialized at the
 * given path, matched against an optional `language` route param.
 * @param path The initial memory-history location.
 * @returns The `render` result.
 */
const renderLanguageProbe = (path: string) => {
  const history = createMemoryHistory();
  history.set({ value: path, replace: true });
  return render(() => (
    <MemoryRouter history={history}>
      <Route component={LanguageProbe} path="/:language?" />
    </MemoryRouter>
  ));
};

describe('useLanguage', () => {
  it('falls back to ja when the route language param is absent', () => {
    const { container } = renderLanguageProbe('/');
    expect(container.textContent).toBe('ja');
  });

  it('uses the route language param when present', () => {
    const { container } = renderLanguageProbe('/en');
    expect(container.textContent).toBe('en');
  });
});

describe('createI18N', () => {
  it('resolves a key from the ja dictionary', () =>
    createRoot((dispose) => {
      const t = createI18N(() => 'ja');
      expect(t('calendar')).toBe(ja.calendar);
      dispose();
    }));

  it('resolves a key from the en dictionary', () =>
    createRoot((dispose) => {
      const t = createI18N(() => 'en');
      expect(t('calendar')).toBe(en.calendar);
      dispose();
    }));

  it('interpolates the released template for ja', () =>
    createRoot((dispose) => {
      const t = createI18N(() => 'ja');
      expect(t('released', { year: 2026 })).toBe('2026 年リリース');
      dispose();
    }));

  it('interpolates the released template for en', () =>
    createRoot((dispose) => {
      const t = createI18N(() => 'en');
      expect(t('released', { year: 2026 })).toBe('Released in 2026');
      dispose();
    }));
});
