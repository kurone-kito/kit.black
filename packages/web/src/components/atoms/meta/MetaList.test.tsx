import { MetaProvider } from '@solidjs/meta';
import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { MetaList } from './MetaList.js';

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
});

describe('MetaList', () => {
  it('emits a correctly-spelled referrer meta tag', () => {
    render(() => (
      <MetaProvider>
        <MetaList />
      </MetaProvider>
    ));
    expect(
      document.head.querySelector('meta[name="referrer"]'),
    ).toHaveAttribute('content', 'strict-origin-when-cross-origin');
  });

  it('never emits the misspelled referer meta tag', () => {
    render(() => (
      <MetaProvider>
        <MetaList />
      </MetaProvider>
    ));
    expect(document.head.querySelector('meta[name="referer"]')).toBeNull();
  });
});
