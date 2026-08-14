import { MemoryRouter, Route } from '@solidjs/router';
import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Footer } from './Footer.js';

afterEach(() => cleanup());

describe('Footer organism', () => {
  it('names the complementary landmark so it is distinguishable from other asides', () => {
    const { container } = render(() => (
      <MemoryRouter>
        <Route path="/:language?" component={Footer} />
      </MemoryRouter>
    ));
    const aside = container.querySelector('aside');
    expect(aside).not.toBeNull();
    expect(aside?.getAttribute('aria-label')?.trim()).toBeTruthy();
  });
});
