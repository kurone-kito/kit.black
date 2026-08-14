import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Kito } from './Kito.js';

afterEach(() => cleanup());

describe('Kito', () => {
  it('fetches the hero (kito) avatar eagerly at high priority', () => {
    const { container } = render(() => <Kito id="hero" />);
    const image = container.querySelector('#hero-avatar-kito img');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('keeps the second (momoneko) avatar at the default low priority', () => {
    const { container } = render(() => <Kito id="hero" />);
    const image = container.querySelector('#hero-avatar-momoneko img');
    expect(image).toHaveAttribute('fetchpriority', 'low');
  });
});
