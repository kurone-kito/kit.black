import { cleanup, render, screen } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Logo } from './Logo.js';

afterEach(() => cleanup());

describe('Logo', () => {
  it('renders an h1 by default when level is omitted', () => {
    render(() => <Logo />);
    const wordmark = screen
      .getByText('Kuroné')
      .closest('h1, h2, h3, h4, h5, h6, p');
    expect(wordmark?.tagName).toBe('H1');
  });

  it('renders the requested heading level when level is a number', () => {
    render(() => <Logo level={3} />);
    const wordmark = screen
      .getByText('Kuroné')
      .closest('h1, h2, h3, h4, h5, h6, p');
    expect(wordmark?.tagName).toBe('H3');
  });

  it('renders no heading element when level is false', () => {
    const { container } = render(() => <Logo level={false} />);
    const wordmark = screen
      .getByText('Kuroné')
      .closest('h1, h2, h3, h4, h5, h6, p');
    expect(wordmark?.tagName).toBe('P');
    expect(container.querySelectorAll('h1, h2, h3, h4, h5, h6')).toHaveLength(
      0,
    );
  });
});
