import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { ToggleTheme } from './ToggleTheme.js';

afterEach(() => cleanup());

describe('ToggleTheme', () => {
  it('names the switch control directly instead of relying on sibling icons', () => {
    const { container } = render(() => (
      <ToggleTheme toggleTooltip="Toggle theme" />
    ));
    const input = container.querySelector('input[role="switch"]');
    expect(input).not.toBeNull();
    expect(input).toHaveAttribute('aria-label', 'Toggle theme');
  });

  it('makes the sun and moon icons decorative so they never carry a competing accessible name', () => {
    const { container } = render(() => (
      <ToggleTheme toggleTooltip="Toggle theme" />
    ));
    const icons = container.querySelectorAll('svg');
    expect(icons).toHaveLength(2);
    for (const icon of icons) {
      expect(icon).not.toHaveAttribute('aria-label');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
