import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Avatar } from './Avatar.js';

afterEach(() => cleanup());

describe('Avatar', () => {
  it('renders the skip link with an accessible name when nextLabel is given', () => {
    const { container } = render(() => (
      <Avatar nextId="next" nextLabel="Go to the next avatar" src="a.webp" />
    ));
    const link = container.querySelector('a');
    expect(link).not.toBeNull();
    expect(link).toHaveAttribute('aria-label', 'Go to the next avatar');
    expect(link).toHaveAttribute('href', '#next');
  });

  it('omits the skip link entirely when nextLabel is missing', () => {
    const { container } = render(() => <Avatar nextId="next" src="a.webp" />);
    expect(container.querySelector('a')).toBeNull();
  });

  it('omits the skip link entirely when nextLabel is blank', () => {
    const { container } = render(() => (
      <Avatar nextId="next" nextLabel="   " src="a.webp" />
    ));
    expect(container.querySelector('a')).toBeNull();
  });
});
