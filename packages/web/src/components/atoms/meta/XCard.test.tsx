import { MetaProvider } from '@solidjs/meta';
import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { XCard } from './XCard.js';

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
});

describe('XCard', () => {
  it('declares a summary card, matching the square image aspect ratio', () => {
    render(() => (
      <MetaProvider>
        <XCard siteName="Example" />
      </MetaProvider>
    ));
    expect(
      document.head.querySelector('meta[name="twitter:card"]'),
    ).toHaveAttribute('content', 'summary');
  });

  it('emits twitter:image:alt when both image and imageAlt are set', () => {
    render(() => (
      <MetaProvider>
        <XCard
          image="https://example.test/card.png"
          imageAlt="An example card"
          siteName="Example"
        />
      </MetaProvider>
    ));
    expect(
      document.head.querySelector('meta[name="twitter:image:alt"]'),
    ).toHaveAttribute('content', 'An example card');
  });

  it('does not emit twitter:image:alt when image is unset', () => {
    render(() => (
      <MetaProvider>
        <XCard imageAlt="An example card" siteName="Example" />
      </MetaProvider>
    ));
    expect(
      document.head.querySelector('meta[name="twitter:image:alt"]'),
    ).toBeNull();
  });
});
