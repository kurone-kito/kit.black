import { MetaProvider } from '@solidjs/meta';
import { createMemoryHistory, MemoryRouter, Route } from '@solidjs/router';
import { cleanup, render, waitFor } from '@solidjs/testing-library';
import type { Component } from 'solid-js';
import { onMount, Suspense } from 'solid-js';
import { afterEach, describe, expect, it } from 'vitest';
import { Head } from './Head.js';

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
  document.documentElement.lang = '';
});

/**
 * Renders {@link Head} under a `MemoryRouter` initialized at the given
 * path, matched against the same `:language?` route param the app's
 * real `[[language]]` route uses. The `Suspense` boundary mirrors
 * `RootTemplate`'s real tree.
 *
 * This still logs a harmless `computations created outside a
 * \`createRoot\` or \`render\` will never be disposed` warning to
 * stderr: `@solidjs/router`'s route-matching schedules a computation
 * via a microtask that resolves after `render`'s synchronous owner
 * scope has already exited. It does not affect any assertion below --
 * confirmed by isolating every other piece of this component tree
 * (bare `useLocation`, `useTranslator`, `<Title>`, and `LinkList`
 * alone) under the same `MemoryRouter`/`MetaProvider`/`Suspense`
 * wrapping without reproducing it, so it is specific to `@solidjs/router`
 * internals rather than this test's structure or `Head`'s own logic.
 * @param path The initial memory-history location.
 * @returns The `render` result.
 */
const renderHead = (path: string) => {
  const history = createMemoryHistory();
  history.set({ value: path, replace: true });
  return render(() => (
    <MetaProvider>
      <MemoryRouter history={history}>
        <Suspense>
          {/*
           * The trailing `/*` lets this harness match a synthetic
           * non-root path (e.g. `/en/about`) that the app itself does
           * not route yet, while `:language?` still populates for
           * `useLanguage()` so the OGP-locale assertions stay
           * meaningful at those paths too.
           */}
          <Route path="/:language?/*" component={Head} />
        </Suspense>
      </MemoryRouter>
    </MetaProvider>
  ));
};

describe('organisms/Head', () => {
  it('declares the ja OGP locale on the /ja/ page', () => {
    renderHead('/ja/');
    expect(
      document.head.querySelector('meta[property="og:locale"]'),
    ).toHaveAttribute('content', 'ja_JP');
  });

  it('declares the en OGP locale on the /en/ page', () => {
    renderHead('/en/');
    expect(
      document.head.querySelector('meta[property="og:locale"]'),
    ).toHaveAttribute('content', 'en_US');
  });

  it('falls back to the ja OGP locale on the unprefixed root', () => {
    renderHead('/');
    expect(
      document.head.querySelector('meta[property="og:locale"]'),
    ).toHaveAttribute('content', 'ja_JP');
  });

  it('declares a canonical link and og:url matching the current page', () => {
    renderHead('/en/');
    expect(
      document.head.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute('href', 'https://kit.black/en/');
    expect(
      document.head.querySelector('meta[property="og:url"]'),
    ).toHaveAttribute('content', 'https://kit.black/en/');
  });

  it('declares a distinct canonical link and og:url per page', () => {
    renderHead('/ja/');
    expect(
      document.head.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute('href', 'https://kit.black/ja/');
    expect(
      document.head.querySelector('meta[property="og:url"]'),
    ).toHaveAttribute('content', 'https://kit.black/ja/');
  });

  it('emits ja, en, and x-default hreflang alternates on every page', () => {
    renderHead('/en/');
    // `link[hreflang="en"]` alone would also match the unrelated
    // `rel="license"` link (see `LinkList.tsx`), so scope every selector
    // to `rel="alternate"` as well.
    const alternates = document.head.querySelectorAll('link[rel="alternate"]');
    expect(alternates).toHaveLength(3);
    expect(
      document.head.querySelector('link[rel="alternate"][hreflang="ja"]'),
    ).toHaveAttribute('href', 'https://kit.black/ja/');
    expect(
      document.head.querySelector('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute('href', 'https://kit.black/en/');
    expect(
      document.head.querySelector(
        'link[rel="alternate"][hreflang="x-default"]',
      ),
    ).toHaveAttribute('href', 'https://kit.black/');
  });

  it('derives x-default from the current path instead of the site root', () => {
    renderHead('/en/about');
    expect(
      document.head.querySelector(
        'link[rel="alternate"][hreflang="x-default"]',
      ),
    ).toHaveAttribute('href', 'https://kit.black/about');
  });

  it('sets document.documentElement.lang to match the initial en page', async () => {
    renderHead('/en/');
    await waitFor(() => expect(document.documentElement.lang).toBe('en'));
  });

  it('sets document.documentElement.lang to match the initial ja page', async () => {
    renderHead('/ja/');
    await waitFor(() => expect(document.documentElement.lang).toBe('ja'));
  });

  it('keeps document.documentElement.lang synchronized after a client-side navigation, without remounting Head', async () => {
    // A naive `onMount`-only implementation could pass a lang assertion
    // alone by coincidentally remounting on this navigation. Wrapping
    // `Head` with a mount-count probe keeps this test honest: it fails
    // if the fix ever starts relying on a remount instead of reacting
    // to `useLanguage()` in place, matching how `Head` is actually
    // mounted once at the router root (`RootTemplate`) in production.
    let mountCount = 0;
    const ProbedHead: Component = () => {
      onMount(() => {
        mountCount += 1;
      });
      return <Head />;
    };
    const history = createMemoryHistory();
    history.set({ value: '/en/', replace: true });
    render(() => (
      <MetaProvider>
        <MemoryRouter history={history}>
          <Suspense>
            <Route path="/:language?/*" component={ProbedHead} />
          </Suspense>
        </MemoryRouter>
      </MetaProvider>
    ));
    await waitFor(() => expect(document.documentElement.lang).toBe('en'));
    expect(mountCount).toBe(1);

    history.set({ value: '/ja/', replace: true });
    await waitFor(() => expect(document.documentElement.lang).toBe('ja'));
    expect(mountCount).toBe(1);
  });
});
