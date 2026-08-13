import { cleanup, render } from '@solidjs/testing-library';
import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import type { Component } from 'solid-js';
import { afterEach, describe, expect, it } from 'vitest';
import { useLanguageHref, useUnprefixedHref } from './useLanguageHref.js';

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
 * A probe component that renders {@link useUnprefixedHref}'s current
 * value.
 * @returns The component.
 */
const UnprefixedHrefProbe: Component = () => {
  const href = useUnprefixedHref();
  return <>{href()}</>;
};

/**
 * Renders the given probe component under a `MemoryRouter` initialized
 * at the given path.
 * @param path The initial memory-history location.
 * @param Probe The probe component to render.
 * @returns The `render` result.
 */
const renderProbe = (path: string, Probe: Component) => {
  const history = createMemoryHistory();
  history.set({ value: path, replace: true });
  return render(() => (
    <MemoryRouter history={history}>
      <Route component={Probe} path="*" />
    </MemoryRouter>
  ));
};

/**
 * Renders {@link HrefProbe} under a `MemoryRouter` initialized at the
 * given path.
 * @param path The initial memory-history location.
 * @param target The target language to swap to.
 * @returns The `render` result.
 */
const renderHrefProbe = (path: string, target: 'en' | 'ja') =>
  renderProbe(path, () => <HrefProbe target={target} />);

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

  it('swaps the locale segment while preserving a trailing path', () => {
    // A consuming segment-boundary regex (`(?:\/|$)`) would eat the `/`
    // before the trailing segment too, mangling the two words together
    // -- this case only fails under that bug, unlike the bare `/en/`
    // cases above.
    const { container } = renderHrefProbe('/en/about', 'ja');
    expect(container.textContent).toBe('/ja/about');
  });

  it('does not treat a non-locale path starting with "en" as prefixed', () => {
    const { container } = renderHrefProbe('/enterprise', 'ja');
    expect(container.textContent).toBe('/ja/enterprise');
  });
});

describe('useUnprefixedHref', () => {
  it('stays at the root when the path is already unprefixed', () => {
    const { container } = renderProbe('/', UnprefixedHrefProbe);
    expect(container.textContent).toBe('/');
  });

  it('strips a bare locale segment back to the root', () => {
    const { container } = renderProbe('/ja/', UnprefixedHrefProbe);
    expect(container.textContent).toBe('/');
  });

  it('strips the locale segment while preserving a trailing path', () => {
    const { container } = renderProbe('/en/about', UnprefixedHrefProbe);
    expect(container.textContent).toBe('/about');
  });

  it('does not treat a non-locale path starting with "en" as prefixed', () => {
    const { container } = renderProbe('/enterprise', UnprefixedHrefProbe);
    expect(container.textContent).toBe('/enterprise');
  });
});
