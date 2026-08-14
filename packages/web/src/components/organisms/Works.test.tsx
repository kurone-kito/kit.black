import { MemoryRouter, Route } from '@solidjs/router';
import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Works } from './Works.js';

afterEach(() => cleanup());

describe('Works organism', () => {
  it('names the complementary landmark so it is distinguishable from other asides', () => {
    const { container } = render(() => (
      <MemoryRouter>
        <Route path="/:language?" component={Works} />
      </MemoryRouter>
    ));
    const aside = container.querySelector('aside');
    expect(aside).not.toBeNull();
    expect(aside?.getAttribute('aria-label')?.trim()).toBeTruthy();
  });
});
