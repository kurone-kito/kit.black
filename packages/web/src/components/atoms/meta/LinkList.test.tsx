import { MetaProvider } from '@solidjs/meta';
import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { LinkList } from './LinkList.js';

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
});

describe('LinkList', () => {
  it('renders no icon or manifest links when no URL props are given', () => {
    render(() => (
      <MetaProvider>
        <LinkList />
      </MetaProvider>
    ));
    expect(document.head.querySelector('link[rel="icon"]')).toBeNull();
    expect(
      document.head.querySelector('link[rel="apple-touch-icon"]'),
    ).toBeNull();
    expect(document.head.querySelector('link[rel="manifest"]')).toBeNull();
  });

  it('renders no preconnect links to Google Fonts, since fonts are self-hosted', () => {
    render(() => (
      <MetaProvider>
        <LinkList />
      </MetaProvider>
    ));
    expect(
      document.head.querySelector('link[href="https://fonts.googleapis.com"]'),
    ).toBeNull();
    expect(
      document.head.querySelector('link[href="https://fonts.gstatic.com"]'),
    ).toBeNull();
  });

  it('renders the ico, 32x32, and 16x16 icon links when provided', () => {
    render(() => (
      <MetaProvider>
        <LinkList
          icon16Url="/favicon-16x16.png"
          icon32Url="/favicon-32x32.png"
          iconIcoUrl="/favicon.ico"
        />
      </MetaProvider>
    ));
    const icons = document.head.querySelectorAll('link[rel="icon"]');
    expect(icons).toHaveLength(3);
    const ico = document.head.querySelector('link[href="/favicon.ico"]');
    expect(ico).toHaveAttribute('sizes', '16x16 32x32 48x48');
    const png32 = document.head.querySelector(
      'link[href="/favicon-32x32.png"]',
    );
    expect(png32).toHaveAttribute('sizes', '32x32');
    expect(png32).toHaveAttribute('type', 'image/png');
    const png16 = document.head.querySelector(
      'link[href="/favicon-16x16.png"]',
    );
    expect(png16).toHaveAttribute('sizes', '16x16');
    expect(png16).toHaveAttribute('type', 'image/png');
  });

  it('renders the apple-touch-icon and manifest links when provided', () => {
    render(() => (
      <MetaProvider>
        <LinkList
          appleTouchIconUrl="/apple-touch-icon.png"
          manifestUrl="/site.webmanifest"
        />
      </MetaProvider>
    ));
    expect(
      document.head.querySelector('link[rel="apple-touch-icon"]'),
    ).toHaveAttribute('href', '/apple-touch-icon.png');
    expect(document.head.querySelector('link[rel="manifest"]')).toHaveAttribute(
      'href',
      '/site.webmanifest',
    );
  });

  it('renders no canonical or alternate links when unset', () => {
    render(() => (
      <MetaProvider>
        <LinkList />
      </MetaProvider>
    ));
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('link[rel="alternate"]')).toBeNull();
  });

  it('renders the canonical link when provided', () => {
    render(() => (
      <MetaProvider>
        <LinkList canonicalUrl="https://kit.black/en/" />
      </MetaProvider>
    ));
    expect(
      document.head.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute('href', 'https://kit.black/en/');
  });

  it('renders one alternate link per entry, each with its own hreflang', () => {
    render(() => (
      <MetaProvider>
        <LinkList
          alternates={[
            { hreflang: 'ja', href: 'https://kit.black/ja/' },
            { hreflang: 'en', href: 'https://kit.black/en/' },
            { hreflang: 'x-default', href: 'https://kit.black/' },
          ]}
        />
      </MetaProvider>
    ));
    const alternates = document.head.querySelectorAll('link[rel="alternate"]');
    expect(alternates).toHaveLength(3);
    expect(document.head.querySelector('link[hreflang="ja"]')).toHaveAttribute(
      'href',
      'https://kit.black/ja/',
    );
    expect(document.head.querySelector('link[hreflang="en"]')).toHaveAttribute(
      'href',
      'https://kit.black/en/',
    );
    expect(
      document.head.querySelector('link[hreflang="x-default"]'),
    ).toHaveAttribute('href', 'https://kit.black/');
  });
});
