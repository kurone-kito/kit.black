import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { IconContainer } from './IconContainer.js';

afterEach(() => cleanup());

describe('IconContainer', () => {
  it('is decorative by default: aria-hidden, no role', () => {
    const { container } = render(() => <IconContainer />);
    const icon = container.querySelector('i');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('role');
    expect(icon).not.toHaveAttribute('aria-label');
  });

  it('exposes an accessible name when a label is given', () => {
    const { container } = render(() => <IconContainer label="A named icon" />);
    const icon = container.querySelector('i');
    expect(icon).toHaveAttribute('role', 'img');
    expect(icon).toHaveAttribute('aria-label', 'A named icon');
    expect(icon).not.toHaveAttribute('aria-hidden');
  });
});
