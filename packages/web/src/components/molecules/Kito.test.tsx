import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Kito } from './Kito.js';

afterEach(() => cleanup());

describe('Kito', () => {
  it('fetches the hero (kito) avatar eagerly at high priority', () => {
    const { container } = render(() => <Kito id="hero" />);
    const images = container.querySelectorAll('img');
    expect(images[0]).toHaveAttribute('fetchpriority', 'high');
  });

  it('keeps the second (momoneko) avatar at the default low priority', () => {
    const { container } = render(() => <Kito id="hero" />);
    const images = container.querySelectorAll('img');
    expect(images[1]).toHaveAttribute('fetchpriority', 'low');
  });
});
