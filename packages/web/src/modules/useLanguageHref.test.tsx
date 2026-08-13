import { cleanup, render } from '@solidjs/testing-library';
import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import type { Component } from 'solid-js';
import { afterEach, describe, expect, it } from 'vitest';
import { useLanguageHref } from './useLanguageHref.js';

afterEach(() => cleanup());

/**
 * A probe component that renders {@link useLanguageHref}'s current value
 * for the given target language.
 * @param props The properties.
 * @param props.target The target language to swap to.
 * @returns The component.
 */
const HrefProbe: Component<{ readonly target: 'en' | 'ja' }> = (props) => {
  const href = useLanguageHref(props.target);
  return <>{href()}</>;
};

/**
 * Renders {@link HrefProbe} under a `MemoryRouter` initialized at the
 * given path.
 * @param path The initial memory-history location.
 * @param target The target language to swap to.
 * @returns The `render` result.
 */
const renderHrefProbe = (path: string, target: 'en' | 'ja') => {
  const history = createMemoryHistory();
  history.set({ value: path, replace: true });
  return render(() => (
    <MemoryRouter history={history}>
      <Route component={() => <HrefProbe target={target} />} path="*" />
    </MemoryRouter>
  ));
};

describe('useLanguageHref', () => {
  it('targets the language root when swapping from the unprefixed root', () => {
    const { container } = renderHrefProbe('/', 'ja');
    expect(container.textContent).toBe('/ja/');
  });

  it('swaps ja to en while preserving the rest of the path', () => {
    const { container } = renderHrefProbe('/ja/', 'en');
    expect(container.textContent).toBe('/en/');
  });

  it('swaps en to ja while preserving the rest of the path', () => {
    const { container } = renderHrefProbe('/en/', 'ja');
    expect(container.textContent).toBe('/ja/');
  });
});
